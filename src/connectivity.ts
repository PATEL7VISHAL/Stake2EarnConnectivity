import { AnchorProvider, Program, web3 } from '@project-serum/anchor';
import { utf8 } from '@project-serum/anchor/dist/cjs/utils/bytes';
import {
    createAssociatedTokenAccountInstruction,
    getAssociatedTokenAddressSync,
    createTransferInstruction
} from '@solana/spl-token';
import { WalletContextState } from "@solana/wallet-adapter-react";

import { Metaplex, Nft, Sft, Metadata } from '@metaplex-foundation/js';
import { PROGRAM_ID as MPL_ID } from '@metaplex-foundation/mpl-token-metadata';

import { TOKEN_PROGRAM_ID } from '@project-serum/anchor/dist/cjs/utils/token';
import { IDL, SleepBe } from './sleep_be';

const log = console.log;
const systemProgram = web3.SystemProgram.programId;
export enum TransactionType {
    Normal,
    AppendIx,
    MultiSign,
}
const Seeds = {
    SEED_MAIN_STATE: utf8.encode("mainState"),
    SEED_USER_STATE: utf8.encode("userState"),
    SEED_NFT_STAKE_STATE: utf8.encode("nftState"),
}

export enum StakingDuration {
    STAKING_FOR_30_DAYS,
    STAKING_FOR_45_DAYS,
    STAKING_FOR_60_DAYS,
}

export interface StakeNftInfo {
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
    program: Program<SleepBe>
    mainStateAccount: web3.PublicKey
    owner: web3.PublicKey
    receiver: web3.PublicKey
    stakeNftCreator: web3.PublicKey

    constructor(_wallet: WalletContextState) {
        this.wallet = _wallet;
        this.connection = new web3.Connection("https://api.devnet.solana.com", { commitment: 'confirmed' })
        this.metaplex = new Metaplex(this.connection)

        //? Program setup
        this.programId = new web3.PublicKey("52xXG54KwrmExmWejpuixbycMyidMk22a9W2aY8QJy7T")
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
            const tx = new web3.Transaction().add(...this.txis);
            const res = await this.wallet.sendTransaction(tx, this.connection, { signers: signatures, preflightCommitment: 'confirmed' });
            log("Trasaction Sign: ", res);
            alert("Trasaction Sussessful")
        } catch (e) {
            log("Error: ", e);
            alert("Trasaction Fail")
        }

        finally {
            this.txis = [];
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
            stakeNftOwner: res.stakeNftOwner.toBase58(),
            rewardFee: res.rewardFee.toNumber(),
            totalStaked: res.totalStaked.toNumber(),
            currentStaked: res.currentStaked.toNumber()
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

    __getNftStakeStateAccount(nft: web3.PublicKey) {
        return web3.PublicKey.findProgramAddressSync([
            Seeds.SEED_NFT_STAKE_STATE,
            nft.toBuffer(),
        ], this.programId)[0]
    }

    async __getNftStakeStateInfo(nft: web3.PublicKey | string) {
        if (typeof nft == "string") nft = new web3.PublicKey(nft)
        const nftStateAccount = this.__getNftStakeStateAccount(nft)
        const state = await this.program.account.nftStakeState.fetch(nftStateAccount);
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

        const parse = {
            owner: state.isInStake ? state.owner.toBase58() : null,
            isInstake: state.isInStake,
            stakeInTime: state.isInStake ? stakeInTime : null,
            stakingType: state.isInStake ? stakingType : null,
            minStakingDuration: state.isInStake ? minStakingDuration : null,
            releaseDate: state.isInStake ? releaseDate : null,
        }
        return parse
    }

    async getStakedNft() {
        const user = this.wallet.publicKey;
        if (user == null) return []
        const userStateAccount = this.__getUserStateAccount(user)

        const res = await this.metaplex.nfts().findAllByOwner({
            owner: userStateAccount
        });

        let verifiedNft: StakeNftInfo[] = [];
        for (let i of res) {
            try {
                const creator = i?.creators[0];
                if (creator.verified && creator.address.toBase58() == this.stakeNftCreator.toBase58()) verifiedNft.push({
                    name: i.name,
                    image: "",
                    symbol: i.symbol,
                    uri: i.uri,
                })
            } catch { continue; }
        }

        return verifiedNft;
    }

    async __getOrInitNftStateAccount(nft: web3.PublicKey) {
        let nftStakeStateAccount = this.__getNftStakeStateAccount(nft);
        let info = await this.connection.getAccountInfo(nftStakeStateAccount);

        if (info == null) {
            const ix = await this.program.methods.initNftStakeState().accounts({
                mint: nft,
                user: this.wallet.publicKey,
                systemProgram,
                nftStakeStateAccount,
            }).instruction()
            this.txis.push(ix)
        }

        return nftStakeStateAccount;
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

    async _getMetadata(token: web3.PublicKey) {
        const res = await this.metaplex.nfts().findByMint({
            mintAddress: token,
            loadJsonMetadata: false,
        })
        return res;
    }

    async stake(nft: web3.PublicKey | string, stakingDuration: StakingDuration) {
        const user = this.wallet.publicKey;
        if (user == null) throw "Wallet id not found"
        if (typeof nft == "string") nft = new web3.PublicKey(nft)

        const userAta = await this._getOrCreateTokenAccount(nft, user);
        const nftMetadataAccount = this.__getMetadataAccount(nft)
        const userStateAccount = await this.__getOrInitUserStateAccount(user);
        const userStateAta = await this._getOrCreateTokenAccount(nft, userStateAccount, true);
        const nftStakeStateAccount = await this.__getOrInitNftStateAccount(nft);
        let variantType: { variant1?: {}; variant2?: {}; variant3?: {}; };

        switch (stakingDuration) {
            case 0:
                variantType = { variant1: {} }
                break;
            case 1:
                variantType = { variant2: {} }
                break;
            case 2:
                variantType = { variant3: {} }
                break;
            default: {
                this.txis = []
                throw "Unknown Staking duration"
            }
        }

        const ix = await this.program.methods.stakeNft(variantType).accounts({
            nft,
            mainStateAccount: this.mainStateAccount,
            nftMetadataAccount,
            nftStakeStateAccount,
            tokenProgram: TOKEN_PROGRAM_ID,
            user,
            userAta,
            userStateAccount,
            userStateAta,
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
        const nftStakeStateAccount = this.__getNftStakeStateAccount(nft);

        const ix = await this.program.methods.unstakeNft().accounts({
            nft,
            mainStateAccount: this.mainStateAccount,
            nftMetadataAccount,
            nftStakeStateAccount,
            tokenProgram: TOKEN_PROGRAM_ID,
            user,
            userAta,
            userStateAccount,
            userStateAta,
        }).instruction()

        this.txis.push(ix);
        await this._sendTransaction();
    }

    async payFeeForReward() {
        const user = this.wallet.publicKey;
        let ix = await this.program.methods.payFee().accounts({
            user,
            receiver: this.receiver,
            mainStateAccount: this.mainStateAccount,
            systemProgram: web3.SystemProgram.programId,
        }).instruction();

        const tx = new web3.Transaction().add(ix);
        const sign = await this.wallet.sendTransaction(tx, this.connection);
        log("Trsansaction Sign: ", sign)
        return sign;
    }

    //? Extra:
    async verifySignature(signature: string) {
        const payer = this.wallet.publicKey;
        const res: any = await this.connection.getParsedTransaction(signature);
        const innerInstruction = res?.meta?.innerInstructions[0]?.instructions[0];
        if (innerInstruction == null) throw "Invalid Transaction"

        const innerInstructionProgramId = innerInstruction.programId.toBase58()
        const innerInstructionInfo = innerInstruction?.parsed?.info;
        const innerInstructionType = innerInstruction?.parsed?.type;

        if (
            innerInstructionProgramId != web3.SystemProgram.programId.toBase58()
            || innerInstructionInfo?.destination != this.receiver.toBase58()
            || innerInstructionInfo?.source != payer.toBase58()
            || innerInstructionInfo?.lamports != 1000_000
            || innerInstructionType != "transfer"
        ) throw "Invalid Trasanction"
        else {
            log("Traansaction Verified !")
        }

        // log({
        //     innerInstructionProgramId,
        //     innerInstructionInfo,
        //     innerInstructionType
        // })
    }

    async transferReward(receiver: web3.PublicKey) {
        const remnToken = this.receiver //! temperary
        const sender = this.receiver;
        const senderAta = getAssociatedTokenAddressSync(remnToken, sender)
        const receiverAta = getAssociatedTokenAddressSync(remnToken, receiver)

        const amount = 1;
        const ix = createTransferInstruction(senderAta, receiverAta, sender, amount);
        const tx = new web3.Transaction().add(ix)
        // tx.feePayer = "";

        // tx.recentBlockhash = (await this.connection.getLatestBlockhash()).blockhash
        // tx.sign(...)

        // const rawTx =tx.serialize()
        // const res = await this.connection.sendRawTransaction(rawTx);
    }
}