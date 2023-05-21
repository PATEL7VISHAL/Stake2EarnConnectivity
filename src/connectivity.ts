import { AnchorProvider, Program, web3 } from '@project-serum/anchor';
import { utf8 } from '@project-serum/anchor/dist/cjs/utils/bytes';
import {
    MINT_SIZE,
    TOKEN_PROGRAM_ID,
    createAssociatedTokenAccountInstruction,
    createBurnInstruction,
    createInitializeMintInstruction,
    createMintToInstruction,
    getAssociatedTokenAddressSync,
    createTransferInstruction,
    getAccount as getTokenAccountInfo
} from '@solana/spl-token';
import { WalletContextState } from "@solana/wallet-adapter-react";

import {
    Collection,
    PROGRAM_ID as MPL_ID,
    createCreateMasterEditionV3Instruction,
    createCreateMetadataAccountV3Instruction,
    createMintNewEditionFromMasterEditionViaTokenInstruction,
    createUpdateMetadataAccountV2Instruction,
    createVerifySizedCollectionItemInstruction
} from '@metaplex-foundation/mpl-token-metadata';

import { FindNftsByOwnerOutput, Metaplex, Nft } from '@metaplex-foundation/js';

import { IDL, HsNftBurn } from './hs_nft_burn';
import { ASSOCIATED_PROGRAM_ID } from '@project-serum/anchor/dist/cjs/utils/token';

const log = console.log;
const Seeds = {
    MAIN_STATE: utf8.encode("Main"),
    USER_STATE: utf8.encode("userState"),
}
const systemProgram = web3.SystemProgram.programId;

export type MasterEditionNftsInfo = Array<{
    name: string,
    image: string,
    totalSupply: number,
    currentSupply: number,
    link: string
}>
export type EditionNfts = Array<{ nft: web3.PublicKey, masterNft: web3.PublicKey, edition: number }>
export interface NftInfo {
    m1EditionNfts: EditionNfts;
    m2EditionNfts: EditionNfts;
    m3EditionNfts: EditionNfts;
    rewardCollectionNfts: EditionNfts;
}

export enum TransactionType {
    Normal,
    AppendIx,
    MultiSign,
}

export class Connectivity {
    wallet: WalletContextState
    connection: web3.Connection;
    txis: web3.TransactionInstruction[] = [];
    rewardCollectionNft: web3.PublicKey;
    metaplex: Metaplex;
    txs: web3.Transaction[] = []
    txsInfo: any[] = []
    m1nft: web3.PublicKey
    m2nft: web3.PublicKey
    m3nft: web3.PublicKey
    programId: web3.PublicKey
    program: Program<HsNftBurn>
    mainStateAccount: web3.PublicKey
    receiver: web3.PublicKey
    isUserStateInit: boolean = false;
    editionMap: Map<string, string> = new Map();
    // m1nftC2: web3.PublicKey

    constructor(_wallet) {
        this.wallet = _wallet;
        this.connection = new web3.Connection("https://api.devnet.solana.com", { commitment: 'confirmed' })
        this.rewardCollectionNft = new web3.PublicKey("3CSRZM915VqsCjhCrX7ZZnkpScBmXwJWwiGYPcLL6CCa")
        this.metaplex = new Metaplex(this.connection)

        //? These Three keys are masterEdition Nft key 
        this.m1nft = new web3.PublicKey("4j99PTwFe48LVBtBd7ym4DqFqb2jq5w9A1EsJvCxPw58")
        this.m2nft = new web3.PublicKey("Ehqddi2obiYoJgsATbRkeYoe2n3BNzfF4kFJpfcwUa75")
        this.m3nft = new web3.PublicKey("4AviUQhTy49cnGzBG2dmon91xDaDZVrZ1fxkrwRzV4pC")

        const _m1EditionAccount = this._getMasterEditionAccount(this.m1nft);
        const _m2EditionAccount = this._getMasterEditionAccount(this.m2nft);
        const _m3EditionAccount = this._getMasterEditionAccount(this.m3nft);

        this.editionMap.set(_m1EditionAccount.toBase58(), this.m1nft.toBase58())
        this.editionMap.set(_m2EditionAccount.toBase58(), this.m2nft.toBase58())
        this.editionMap.set(_m3EditionAccount.toBase58(), this.m3nft.toBase58())

        //? Program setup
        this.programId = new web3.PublicKey("BobdGodLQdC8yTmGqLvi8EFyLaN91i7NpfmgLqRAWMMw")
        const anchorProvider = new AnchorProvider(this.connection, this.wallet, { commitment: 'confirmed', preflightCommitment: 'confirmed' })
        this.program = new Program(IDL, this.programId, anchorProvider);
        this.mainStateAccount = web3.PublicKey.findProgramAddressSync([Seeds.MAIN_STATE], this.programId)[0]
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
            Seeds.USER_STATE,
            user.toBuffer(),
        ], this.programId)[0]
    }

    async __getUserStateInfo(user) {
        const state = this.__getUserStateAccount(user)
        const res = await this.program.account.userState.fetch(state);
        return res;
    }

    async __getOrIninUserStateAccount(user: web3.PublicKey) {
        let userStateAccount = this.__getUserStateAccount(user);
        let info = await this.connection.getAccountInfo(userStateAccount);

        if (!this.isUserStateInit)
            if (info == null) {
                this.isUserStateInit = true
                const ix = await this.program.methods.initUserState().accounts({
                    systemProgram,
                    user,
                    userStateAccount,
                }).instruction()
                this.txis.push(ix)
            }
        return userStateAccount
    }

    async _getOrCreateTokenAccount(owner: web3.PublicKey, token: web3.PublicKey, isOffCurve = false) {
        const ata = getAssociatedTokenAddressSync(token, owner, isOffCurve);
        const info = await this.connection.getAccountInfo(ata);

        if (info == null) {
            log("added token account init")
            const ix = createAssociatedTokenAccountInstruction(this.wallet.publicKey, ata, owner, token);
            this.txis.push(ix);
        }
        return ata;
    }

    _getMetadataAccount(tokenId: web3.PublicKey) {
        return web3.PublicKey.findProgramAddressSync(
            [
                utf8.encode("metadata"),
                MPL_ID.toBuffer(),
                tokenId.toBuffer(),
            ],
            MPL_ID
        )[0]
    }

    _getMasterEditionAccount(tokenId: web3.PublicKey) {
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

    _getEditionMakerAccount(masterEditionNft: web3.PublicKey, edition: number) {
        return web3.PublicKey.findProgramAddressSync(
            [
                utf8.encode("metadata"),
                MPL_ID.toBuffer(),
                masterEditionNft.toBuffer(),
                utf8.encode("edition"),
                utf8.encode(Math.floor((edition / 248)).toString()) //? edition Math.floor(number / EDITION_MARKER_BIT_SIZE).toString()
            ]
            , MPL_ID)[0];
    }

    async __createToken(token_keypair: web3.Keypair) {
        const rent = await this.connection.getMinimumBalanceForRentExemption(MINT_SIZE);

        const ix1 = web3.SystemProgram.createAccount({
            fromPubkey: this.wallet.publicKey,
            lamports: rent,
            newAccountPubkey: token_keypair.publicKey,
            programId: TOKEN_PROGRAM_ID,
            space: MINT_SIZE,
        })
        this.txis.push(ix1)

        const ix2 = createInitializeMintInstruction(
            token_keypair.publicKey,
            0,
            this.wallet.publicKey,
            this.wallet.publicKey
        );
        this.txis.push(ix2)

        const ata = await this._getOrCreateTokenAccount(this.wallet.publicKey, token_keypair.publicKey)
        const ix3 = createMintToInstruction(token_keypair.publicKey, ata, this.wallet.publicKey, 1)
        this.txis.push(ix3)

        console.log("Token is created : ", token_keypair.publicKey.toBase58())
        return token_keypair
    }

    async __createMetadataAccount(tokenId: web3.PublicKey, metadata: any, collection: Collection = null) {
        const metadataAccount = this._getMetadataAccount(tokenId);
        const ix = createCreateMetadataAccountV3Instruction(
            {
                metadata: metadataAccount,
                mint: tokenId,
                mintAuthority: this.wallet.publicKey,
                payer: this.wallet.publicKey,
                updateAuthority: this.wallet.publicKey,
                rent: web3.SYSVAR_RENT_PUBKEY,
                systemProgram: web3.SystemProgram.programId
            }, {
            createMetadataAccountArgsV3: {
                collectionDetails: null,
                data: {
                    collection: collection,
                    creators: [
                        {
                            address: this.wallet.publicKey,
                            share: 100,
                            verified: true,
                        }
                    ],
                    name: metadata.name,
                    symbol: metadata.symbol,
                    uri: metadata.uri,
                    sellerFeeBasisPoints: 1,
                    uses: null,
                },
                isMutable: true,
            }
        }
        )
        this.txis.push(ix)
    }

    async __createMasterEdition(tokenId: web3.PublicKey) {
        const masterEditionAccount = this._getMasterEditionAccount(tokenId)
        const metadataAccount = this._getMetadataAccount(tokenId);

        let ix = createCreateMasterEditionV3Instruction(
            {
                edition: masterEditionAccount,
                metadata: metadataAccount,
                mint: tokenId,
                mintAuthority: this.wallet.publicKey,
                payer: this.wallet.publicKey,
                updateAuthority: this.wallet.publicKey,
                rent: web3.SYSVAR_RENT_PUBKEY,
                systemProgram: web3.SystemProgram.programId,
                tokenProgram: TOKEN_PROGRAM_ID,
            },
            {
                createMasterEditionArgs: {
                    maxSupply: 1000
                }
            }
        )
        this.txis.push(ix)
    }

    async __createEdition(tokenId: web3.PublicKey, masterEditionNft: web3.PublicKey, edition: number) {
        const user = this.wallet.publicKey
        const ata = getAssociatedTokenAddressSync(masterEditionNft, user)
        const editionAccount = this._getMasterEditionAccount(tokenId);
        const metadataAccount = this._getMetadataAccount(tokenId)
        const masterEditionAccount = this._getMasterEditionAccount(masterEditionNft)
        const masterMetadataAccount = this._getMetadataAccount(masterEditionNft);
        const editionMakerAccount = this._getEditionMakerAccount(masterEditionNft, edition);
        let ix = createMintNewEditionFromMasterEditionViaTokenInstruction({
            editionMarkPda: editionMakerAccount,
            masterEdition: masterEditionAccount,
            metadata: masterMetadataAccount,
            newEdition: editionAccount,
            newMetadata: metadataAccount,
            newMetadataUpdateAuthority: user,
            newMint: tokenId,
            newMintAuthority: user,
            payer: user,
            tokenAccount: ata,
            tokenAccountOwner: user,
            rent: web3.SYSVAR_RENT_PUBKEY,
            systemProgram: web3.SystemProgram.programId,
            tokenProgram: TOKEN_PROGRAM_ID,
        }, {
            mintNewEditionFromMasterEditionViaTokenArgs: {
                edition
            }
        })

        this.txis.push(ix)
    }

    async __verifyCollectionNft(nft: web3.PublicKey, collectionNft: web3.PublicKey) {
        const collectionMetadata = this._getMetadataAccount(collectionNft)
        const collectionMaster = this._getMasterEditionAccount(collectionNft)
        const metadataAccount = this._getMetadataAccount(nft)

        // const ix = createVerifyCollectionInstruction({
        const ix = createVerifySizedCollectionItemInstruction({
            collection: collectionMetadata,
            collectionAuthority: this.wallet.publicKey,
            collectionMasterEditionAccount: collectionMaster,
            collectionMint: collectionNft,
            metadata: metadataAccount,
            payer: this.wallet.publicKey,
        })

        this.txis.push(ix)
    }

    async _getMasterEditionNftInfo() {
        let info: MasterEditionNftsInfo = []

        let tmp = []
        tmp.push(await this._getMetadata(this.m1nft))
        tmp.push(await this._getMetadata(this.m2nft))
        tmp.push(await this._getMetadata(this.m3nft))

        for (let i of tmp) {
            try {
                const name = i?.name
                const link = `https://solscan.io/token/${i?.mint?.address?.toBase58()}?cluster=devnet`
                let image = ""
                try {
                    const jsonData = JSON.parse(await (await fetch(i.uri)).text())
                    image = jsonData?.image == null ? "" : jsonData?.image
                } catch (e) { }

                const totalSupply = i?.edition?.maxSupply?.toNumber()
                const currentSupply = i?.edition?.supply?.toNumber()

                info.push({
                    name,
                    image,
                    currentSupply,
                    totalSupply,
                    link,
                })
            } catch (e) {
                log("Failed to fetch ")
            }
        }



        return info;
    }

    async _getEditionNfts() {
        const user = this.wallet.publicKey
        if (user == null) return null

        const info: any = (await this.metaplex.nfts().findAllByOwner({
            owner: user
        }))?.filter((value) => value?.tokenStandard == 3)

        let m1EditionNfts: EditionNfts = [];
        let m2EditionNfts: EditionNfts = [];
        let m3EditionNfts: EditionNfts = [];
        let rewardCollectionNfts: EditionNfts = []

        const m1NftStr = this.m1nft.toBase58()
        const m2NftStr = this.m2nft.toBase58()
        const m3NftStr = this.m3nft.toBase58()

        for (let i of info) {
            const mint = i?.mintAddress;
            if (mint == null) continue;
            try {
                const nftInfo: any = await this.metaplex.nfts().findByMint({ mintAddress: mint, loadJsonMetadata: false })
                const materEdition = nftInfo?.edition?.parent?.toBase58();

                const materEditionNft = this.editionMap.get(materEdition)

                if (materEditionNft == m1NftStr) m1EditionNfts.push({
                    edition: nftInfo?.edition?.number,
                    masterNft: this.m1nft,
                    nft: mint
                })
                else if (materEditionNft == m2NftStr) m2EditionNfts.push({
                    edition: nftInfo?.edition?.number,
                    masterNft: this.m2nft,
                    nft: mint
                })
                else if (materEditionNft == m3NftStr) m3EditionNfts.push({
                    edition: nftInfo?.edition?.number,
                    masterNft: this.m3nft,
                    nft: mint
                })

            } catch (e) {
                log(`Unable to fetch "${mint?.toBase58()}"  token details`)
                continue;
            }
        }

        return {
            m1EditionNfts,
            m2EditionNfts,
            m3EditionNfts,
            rewardCollectionNfts,
        }
    }

    //THIS FUNCTION use for testing (to Create Edition NFT)
    async _createNft() {
        this.txis = []

        const masterEditionNft = this.m1nft;
        for (let i = 30; i < 31;) {
            this.txis = []
            const tokenKp = web3.Keypair.generate()
            const token = tokenKp.publicKey
            await this.__createToken(tokenKp);
            await this.__createEdition(token, masterEditionNft, i + 1)

            const tx = new web3.Transaction().add(...this.txis)

            const res = await this.wallet.sendTransaction(tx, this.connection, { signers: [tokenKp] })
            log("res: ", res);
            i += 1
        }
    }

    async _getMetadata(token: web3.PublicKey) {
        const res = await this.metaplex.nfts().findByMint({
            mintAddress: token,
            loadJsonMetadata: false,
        })
        log("NFT: ", res);
        return res;
    }

    async __sendNftToProgram(mint: string | web3.PublicKey) {
        const user = this.wallet.publicKey
        if (user == null) throw 'Wallet not found'
        if (typeof mint == 'string') mint = new web3.PublicKey(mint)
        const userAta = getAssociatedTokenAddressSync(mint, user)
        const mainAccountAta = await this._getOrCreateTokenAccount(this.mainStateAccount, mint, true)

        const ix = createTransferInstruction(userAta, mainAccountAta, user, 1)
        this.txis.push(ix)
        const tx = new web3.Transaction().add(...this.txis)
        this.txis = []
        const sign = await this.wallet.sendTransaction(tx, this.connection);
        log("Tx Sign: ", sign)
    }

    async __burnNftByProgram(editionMint: web3.PublicKey, masterNft: web3.PublicKey, edition: number, txType: TransactionType = TransactionType.Normal) {
        const user = this.wallet.publicKey;
        const userStateAccount = await this.__getOrIninUserStateAccount(user);
        const editionMetadataAccount = this._getMetadataAccount(editionMint)
        const editionAccount = this._getMasterEditionAccount(editionMint)
        const editionTokenAccount = getAssociatedTokenAddressSync(editionMint, user);

        const masterEditionAccount = this._getMasterEditionAccount(masterNft)
        const masterEditionTokenAccount = await this._getOrCreateTokenAccount(user, masterNft);
        const editionMarkAccount = this._getEditionMakerAccount(masterNft, edition)

        const ix = await this.program.methods.burnNft().accounts({
            editionAccount,
            editionMarkAccount,
            editionMetadataAccount,
            editionMint,
            editionTokenAccount,
            mainStateAccount: this.mainStateAccount,
            masterEditionAccount,
            masterEditionMint: masterNft,
            masterEditionTokenAccount,
            mplProgram: MPL_ID,
            tokenProgram: TOKEN_PROGRAM_ID,
            user: user,
            userState: userStateAccount,
        }).instruction()

        switch (txType) {
            case TransactionType.Normal: {
                this.txis.push(ix)
                const tx = new web3.Transaction().add(...this.txis);
                const sign = await this.wallet.sendTransaction(tx, this.connection)
                log("Tx sign: ", sign)
                break;
            }

            case TransactionType.AppendIx: {
                this.txis.push(ix)
                break;
            }

            case TransactionType.MultiSign: {
                this.txis.push(ix)
                const tx = new web3.Transaction().add(...this.txis);
                await this._addTx(tx, { burnNft: editionMint.toBase58() })
                break;
            }

            default:
                throw "Unknown Input"
        }
    }

    async burn(nftsInfo: EditionNfts) {
        const user = this.wallet.publicKey;
        if (user == null) throw "Wallet not connected"

        for (let info of nftsInfo) {
            await this.__burnNftByProgram(info.nft, info.masterNft, info.edition, TransactionType.MultiSign)
        }

        await this._sendMultTransaction();
    }

    async getRewardNft(rewardNft: web3.PublicKey, txType: TransactionType = TransactionType.Normal) {
        const user = this.wallet.publicKey;
        if (user == null) throw "Wallet ID not found"

        const userStateAccount = this.__getUserStateAccount(user)
        const userAta = await this._getOrCreateTokenAccount(user, rewardNft);

        const mainAccountAta = getAssociatedTokenAddressSync(rewardNft, this.mainStateAccount, true);

        const ix = await this.program.methods.getReward().accounts({
            user: user,
            userState: userStateAccount,
            userAta,
            mainState: this.mainStateAccount,
            mainAccountAta: mainAccountAta,
            tokenProgram: TOKEN_PROGRAM_ID,
        }).instruction();

        switch (txType) {
            case TransactionType.Normal: {
                this.txis.push(ix)
                const tx = new web3.Transaction().add(...this.txis);
                this.txis = []
                const sign = await this.wallet.sendTransaction(tx, this.connection)
                log("Tx sign: ", sign)
                break;
            }

            case TransactionType.AppendIx: {
                this.txis.push(ix)
                break;
            }

            case TransactionType.MultiSign: {
                this.txis.push(ix)
                const tx = new web3.Transaction().add(...this.txis);
                await this._addTx(tx, { rewardNft: rewardNft.toBase58() })
                break;
            }

            default:
                throw "Unknow Input"
        }
    }
}