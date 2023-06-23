import { AnchorProvider, Program, web3 } from '@project-serum/anchor';
import { base64, utf8 } from '@project-serum/anchor/dist/cjs/utils/bytes';
import {
    createAssociatedTokenAccountInstruction,
    getAssociatedTokenAddressSync
} from '@solana/spl-token';
import { WalletContextState } from "@solana/wallet-adapter-react";

import { Metaplex } from '@metaplex-foundation/js';
import { PROGRAM_ID as MPL_ID } from '@metaplex-foundation/mpl-token-metadata';

import { ASSOCIATED_PROGRAM_ID, TOKEN_PROGRAM_ID } from '@project-serum/anchor/dist/cjs/utils/token';
import axios from 'axios';
import { IDL, Stake2earn } from './stake2earn';

const log = console.log;
const systemProgram = web3.SystemProgram.programId;
export enum TransactionType {
    Normal,
    AppendIx,
    MultiSign,
}
const Seeds = {
    SEED_MAIN_STATE: utf8.encode("main_state"),
    SEED_USER_STATE: utf8.encode("user_state"),
    SEED_NFT_STATE: utf8.encode("nft_state"),
    SEED_DUMMY_NFT_STATE: utf8.encode("dummy_nft_state")
}

export interface NftState {
    currentOwner: string,
    isInstake: boolean,
    stakeInTime: number | null,
    releaseDate: Date | null,
    minStakingDuration: number | null,
    isInMarketplace: boolean,
    price: number | null,
}

export interface NftInfo {
    mint: string,
    nftState: NftState | null,
    name: string,
    symbol: string,
    uri: string,
    image: string,
}

export class Connectivity {
    wallet: WalletContextState
    connection: web3.Connection;
    txis: web3.TransactionInstruction[] = [];
    metaplex: Metaplex;
    txs: web3.Transaction[] = []
    txsInfo: any[] = []
    programId: web3.PublicKey
    program: Program<Stake2earn>
    mainStateAccount: web3.PublicKey
    owner: web3.PublicKey
    receiver: web3.PublicKey
    stakeNftCreator: web3.PublicKey
    extraSignature: web3.Keypair[] = []

    constructor(_wallet: WalletContextState) {
        this.wallet = _wallet;
        this.connection = new web3.Connection("https://api.devnet.solana.com", { commitment: 'confirmed' })
        this.metaplex = new Metaplex(this.connection)

        //? Program setup
        // this.programId = new web3.PublicKey("6N2uJ2YQoNfedif7zVQEwTNaxW1yZFjSMKhGQDqiYXpb")
        this.programId = new web3.PublicKey("BK8ySfPmvvYvDYHNwzVeqfsxhpQ6PWCEtbpovcbaNhHH")
        const anchorProvider = new AnchorProvider(this.connection, this.wallet, { commitment: 'confirmed', preflightCommitment: 'confirmed' })
        this.program = new Program(IDL, this.programId, anchorProvider);
        this.receiver = new web3.PublicKey("GPv247pHoMhA6MFdLmzXzA9JdmVgn6g1VvLUS8kn38Ej")
        this.mainStateAccount = web3.PublicKey.findProgramAddressSync([Seeds.SEED_MAIN_STATE], this.programId)[0];
        this.stakeNftCreator = new web3.PublicKey("5DCC58iQbP5Gab18C9UA9RuXJ8ccb7a1HRvEZ7tyw7Fv")
        this.owner = new web3.PublicKey("GPv247pHoMhA6MFdLmzXzA9JdmVgn6g1VvLUS8kn38Ej")
    }

    static calculateNonDecimalValue(value: number, decimal: number) {
        return Math.trunc(value * (10 ** decimal))
    }

    static async sleep(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async _sendTransaction(signatures: web3.Keypair[] = []) {
        try {
            if (this.extraSignature) signatures.push(...this.extraSignature)
            const tx = new web3.Transaction().add(...this.txis);
            const res = await this.wallet.sendTransaction(tx, this.connection, { signers: signatures, preflightCommitment: 'confirmed' });
            log("Trasaction Sign: ", res);
            alert("Trasaction Sussessful")
            return res;
        } catch (e) {
            log("Error: ", e);
            alert("Trasaction Fail")
        }

        finally {
            this.txis = [];
            this.extraSignature = [];
        }
    }

    async _addTx(tx: web3.Transaction, info: any, signatures: web3.Keypair[] = []) {
        this.txis = []
        tx.feePayer = this.wallet.publicKey
        tx.recentBlockhash = (await this.connection.getLatestBlockhash()).blockhash
        for (let signature of signatures)
            tx.sign(signature)

        this.txs.push(tx)
        this.txsInfo.push(info)
    }

    async _sendMultTransaction() {
        let rawTxs = await this.wallet.signAllTransactions(this.txs);
        this.txs = []
        let pass = []
        let fail = []
        let i = 0;

        for (let tx of rawTxs) {
            try {
                let raw = tx.serialize();
                const sign = await this.connection.sendRawTransaction(raw);
                pass.push({ info: this.txsInfo[i], sign })
            } catch (e) {
                fail.push({ info: this.txsInfo[i] })
            }
            finally {
                i += 1
            }
        }

        this.txs = []
        this.txsInfo = []
        this.extraSignature = []
        log("pass: ", pass)
        log("fail: ", fail)
    }

    __getUserStateAccount(user: web3.PublicKey) {
        return web3.PublicKey.findProgramAddressSync([
            Seeds.SEED_USER_STATE,
            user.toBuffer(),
        ], this.programId)[0]
    }

    async __getMainStateInfo() {
        const res = await this.program.account.mainState.fetch(this.mainStateAccount);

        const state = {
            owner: res.owner.toBase58(),
            receiver: res.receiver.toBase58(),
            stakeNftCollectionId: res.stakeNftCollectionId.toBase58(),
            totalStaked: res.totalStaked.toNumber(),
            currentStaked: res.currentStaked.toNumber(),
        }

        return state;
    }

    async __getUserStateInfo(user: web3.PublicKey) {
        const stateAccount = this.__getUserStateAccount(user)
        const state = await this.program.account.userState.fetch(stateAccount);
        const parse = {
            totalStaked: state.totalStaked.toNumber(),
            currentStaked: state.currentStaked.toNumber(),
        }

        return parse;
    }

    async __getOrInitUserStateAccount(user: web3.PublicKey) {
        let userStateAccount = this.__getUserStateAccount(user);
        let info = await this.connection.getAccountInfo(userStateAccount);

        if (info == null) {
            const ix = await this.program.methods.initUserState().accounts({
                systemProgram,
                user,
                userStateAccount,
            }).instruction()
            this.txis.push(ix)
        }
        return userStateAccount
    }

    __getNftStateAccount(nft: web3.PublicKey) {
        return web3.PublicKey.findProgramAddressSync([
            Seeds.SEED_NFT_STATE,
            nft.toBuffer(),
        ], this.programId)[0]
    }

    __getDummyNftStateAccount(nft: web3.PublicKey) {
        return web3.PublicKey.findProgramAddressSync([
            Seeds.SEED_DUMMY_NFT_STATE,
            nft.toBuffer(),
        ], this.programId)[0]
    }

    static __parseNftStateRes(state: any): NftState | null {
        const stakeInTime = state.stakeInTime.toNumber();
        const stakingType = state.stakingType

        let minStakingDuration = 0
        if (stakingType.variant1 != null) minStakingDuration = 30
        else if (stakingType.variant2 != null) minStakingDuration = 45
        else if (stakingType.variant3 != null) minStakingDuration = 60
        else { }

        //?MIN Calculation (TESTING)
        const releaseDate = new Date((stakeInTime + (minStakingDuration * 60)) * 1000)

        //?DAYs Calculation (TESTING)
        // const releaseDate = new Date((stakeInTime + (minStakingDuration * 60 * 60)) * 1000)

        const parseValue = {
            currentOwner: state.currentOwner.toBase58(),
            isInstake: state.isInStake,
            stakeInTime: state.isInStake ? stakeInTime : null,
            stakingType: state.isInStake ? stakingType : null,
            releaseDate: state.isInStake ? releaseDate : null,
            minStakingDuration: state.isInStake ? minStakingDuration : null,
            isInMarketplace: state.isInMarketplace,
            price: state.isInMarketplace ? (state.price.toNumber() / 1000_000_000) : null,
        }
        return parseValue
    }

    __getNftStateInfoFromBuffer(data: Buffer): NftState | null {
        try {
            const state = this.program.coder.accounts.decode("nftState", data)

            const nftState = Connectivity.__parseNftStateRes(state);
            return nftState
        } catch { return null }
    }

    async __getNftStateInfo(nft: web3.PublicKey | string): Promise<NftState> {
        try {
            if (typeof nft == "string") nft = new web3.PublicKey(nft)
            const nftStateAccount = this.__getNftStateAccount(nft)
            const state = await this.program.account.nftState.fetch(nftStateAccount);

            const nftState = Connectivity.__parseNftStateRes(state);
            return nftState
        } catch { return null }
    }

    async __getNftOwnedByAccount(owner: web3.PublicKey) {
        const nfts: any = await this.metaplex.nfts().findAllByOwner({
            owner
        });

        let verifiedStakedNft: NftInfo[] = [];
        let stateAccountsInfoReqData = [];
        for (let i of nfts) {
            try {
                const creator = i?.creators[0];
                if (creator.verified && creator.address.toBase58() == this.stakeNftCreator.toBase58()) {
                    //? create data for api call 
                    const nftStateAccount = this.__getNftStateAccount(i?.mintAddress);
                    stateAccountsInfoReqData.push({
                        "jsonrpc": "2.0",
                        "id": 1,
                        "method": "getAccountInfo",
                        "params": [
                            nftStateAccount.toBase58(),
                            {
                                "encoding": "jsonParsed", //? Here it's require encoding in jsonParsed
                                "commitment": "confirmed"
                            }
                        ]
                    })

                    verifiedStakedNft.push({
                        mint: i?.mintAddress?.toBase58(),
                        nftState: null,
                        name: i.name,
                        symbol: i.symbol,
                        image: "",
                        uri: i.uri,
                    })
                }
            } catch { continue; }
        }

        try {
            if (stateAccountsInfoReqData.length > 0) {
                const res = await axios.post(this.connection.rpcEndpoint, stateAccountsInfoReqData, { headers: { "Content-Type": "application/json" } })
                const data = res?.data;

                let index = 0;
                for (let i of data) {
                    try {
                        let a = [];
                        const dataStr = i?.result?.value?.data?.at(0);
                        if (dataStr == null) continue;
                        const buffer = base64.decode(dataStr)
                        const nftState = this.__getNftStateInfoFromBuffer(buffer)
                        verifiedStakedNft[index].nftState = nftState
                    } catch (e) {
                        // log
                    } finally {
                        index += 1;
                    }
                }
            }
        } catch (e) {
            log("Error! to fetch NftStates:  ", e)
        }

        return verifiedStakedNft;
    }

    async getNftOnMarketPlace() {
        const info = await this.__getNftOwnedByAccount(this.mainStateAccount);
        return info
    }

    async getUserNftsInfo(): Promise<NftInfo[]> {
        const user = this.wallet.publicKey;
        if (user == null) throw "Wallet id not found"

        const info = await this.__getNftOwnedByAccount(user);
        return info
    }

    async getStakedNftsInfo(): Promise<NftInfo[]> {
        const user = this.wallet.publicKey;
        if (user == null) throw "Wallet id not found"
        const userState = this.__getUserStateAccount(user);

        const info = await this.__getNftOwnedByAccount(userState);
        return info
    }

    //TODO: need to merge the dummy nft functionality.
    async __getOrInitNftStateAccount(nft: web3.PublicKey) {
        let nftStateAccount = this.__getNftStateAccount(nft);
        let info = await this.connection.getAccountInfo(nftStateAccount);

        if (info == null) {
            const ix = await this.program.methods.initNftState().accounts({
                mint: nft,
                user: this.wallet.publicKey,
                systemProgram,
                nftStateAccount,
            }).instruction()
            this.txis.push(ix)
        }

        return nftStateAccount;
    }

    async __checkAndGetDummyNft(mainNft: web3.PublicKey, initIfRequire = true) {
        const dummyNftStateAccount = this.__getDummyNftStateAccount(mainNft);
        try {
            const stateInfo = await this.program.account.dummyNftState.fetch(dummyNftStateAccount);
            const dummyNft = stateInfo.id;
            if (dummyNft == null) throw "DummyNft no found"
            return dummyNft;
        } catch (e) {
            if (!initIfRequire) return null;
            log("Creating DummyNft")

            const tokenKp = web3.Keypair.generate();
            const dummyNft = tokenKp.publicKey;
            const dummyNftMetadataAccount = this.__getMetadataAccount(dummyNft)
            const dummyNftMasterEditionAccount = this.__getMasterEditionAccount(dummyNft)
            const mainNftMetadataAccount = this.__getMetadataAccount(mainNft)
            const stateAccountAta = getAssociatedTokenAddressSync(dummyNft, dummyNftStateAccount, true);

            const ix = await this.program.methods.initDummyNftState().accounts({
                dummyNft,
                dummyNftMetadataAccount,
                dummyNftMasterEditionAccount,
                dummyNftStateAccount,
                mainNft,
                mainNftMetadataAccount,
                mplProgram: MPL_ID,
                stateAccountAta,
                systemProgram,
                tokenProgram: TOKEN_PROGRAM_ID,
                associatedTokenProgram: ASSOCIATED_PROGRAM_ID,
                user: this.wallet.publicKey,
            }).instruction();

            this.extraSignature.push(tokenKp)
            this.txis.push(ix)

            // const tx = new web3.Transaction().add(...this.txis)
            // const res = await this.wallet.sendTransaction(tx, this.connection, { signers: [tokenKp] })
            // log("dummyNft init: ", res);

            return dummyNft
        }
    }

    async _getOrCreateTokenAccount(mint: web3.PublicKey, owner: web3.PublicKey, isOffCurve = false) {
        const ata = getAssociatedTokenAddressSync(mint, owner, isOffCurve);
        const info = await this.connection.getAccountInfo(ata);

        if (info == null) {
            log("added token account init")
            const ix = createAssociatedTokenAccountInstruction(this.wallet.publicKey, ata, owner, mint);
            this.txis.push(ix);
        }
        return ata;
    }

    __getMetadataAccount(tokenId: web3.PublicKey) {
        return web3.PublicKey.findProgramAddressSync(
            [
                utf8.encode("metadata"),
                MPL_ID.toBuffer(),
                tokenId.toBuffer(),
            ],
            MPL_ID
        )[0]
    }

    __getMasterEditionAccount(tokenId: web3.PublicKey) {
        return web3.PublicKey.findProgramAddressSync(
            [
                utf8.encode("metadata"),
                MPL_ID.toBuffer(),
                tokenId.toBuffer(),
                utf8.encode("edition")
            ],
            MPL_ID
        )[0]
    }

    async _getMetadata(token: web3.PublicKey, loadJsonMetadata: boolean = false) {
        const res = await this.metaplex.nfts().findByMint({
            mintAddress: token,
            loadJsonMetadata,
        })
        return res;
    }

    async stake(nft: web3.PublicKey | string) {
        const user = this.wallet.publicKey;
        if (user == null) throw "Wallet id not found"
        if (typeof nft == "string") nft = new web3.PublicKey(nft)

        const userAta = await this._getOrCreateTokenAccount(nft, user);
        const nftMetadataAccount = this.__getMetadataAccount(nft)
        const userStateAccount = await this.__getOrInitUserStateAccount(user);
        const userStateAta = await this._getOrCreateTokenAccount(nft, userStateAccount, true);
        const nftStateAccount = await this.__getOrInitNftStateAccount(nft);

        const dummyNft = await this.__checkAndGetDummyNft(nft);
        const dummyNftStateAccount = this.__getDummyNftStateAccount(nft);
        const dummyStateAtaD = getAssociatedTokenAddressSync(dummyNft, dummyNftStateAccount, true)
        const userAtaD = await this._getOrCreateTokenAccount(dummyNft, user);

        const ix = await this.program.methods.stakeNft().accounts({
            nft,
            mainStateAccount: this.mainStateAccount,
            nftMetadataAccount,
            nftStateAccount,
            tokenProgram: TOKEN_PROGRAM_ID,
            user,
            userAta,
            userStateAccount,
            userStateAta,
            dummyNftStateAccount,
            dummyStateAtaD,
            userAtaD,
        }).instruction()
        this.txis.push(ix);

        await this._sendTransaction();
    }

    async unstake(nft: web3.PublicKey | string) {
        if (typeof nft == 'string') nft = new web3.PublicKey(nft)
        const user = this.wallet.publicKey;
        if (user == null) throw "Wallet id not found"

        const userAta = getAssociatedTokenAddressSync(nft, user);
        const nftMetadataAccount = this.__getMetadataAccount(nft)
        const userStateAccount = this.__getUserStateAccount(user);
        const userStateAta = getAssociatedTokenAddressSync(nft, userStateAccount, true);
        const nftStateAccount = this.__getNftStateAccount(nft);
        const dummyNft = await this.__checkAndGetDummyNft(nft);
        if (dummyNft == null) throw "Dummy Nft not found "
        log("DummyNft ID: ", dummyNft.toBase58())
        const dummyNftStateAccount = this.__getDummyNftStateAccount(nft);
        const dummyStateAtaD = getAssociatedTokenAddressSync(dummyNft, dummyNftStateAccount, true)
        const userAtaD = getAssociatedTokenAddressSync(dummyNft, user);

        const ix = await this.program.methods.unstakeNft().accounts({
            nft,
            mainStateAccount: this.mainStateAccount,
            nftMetadataAccount,
            nftStateAccount,
            tokenProgram: TOKEN_PROGRAM_ID,
            user,
            userAta,
            userStateAccount,
            userStateAta,
            dummyNftStateAccount,
            dummyStateAtaD,
            userAtaD,
        }).instruction()

        this.txis.push(ix);
        await this._sendTransaction();
    }

}
