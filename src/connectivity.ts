import { web3 } from '@project-serum/anchor';
import { utf8 } from '@project-serum/anchor/dist/cjs/utils/bytes';
import {
    MINT_SIZE,
    TOKEN_PROGRAM_ID,
    createAssociatedTokenAccountInstruction,
    createInitializeMintInstruction,
    createMintToInstruction,
    createBurnInstruction,
    getAssociatedTokenAddressSync,
    TOKEN_2022_PROGRAM_ID,
    getAccount as getTokenAccount
} from '@solana/spl-token';
import { WalletContextState } from "@solana/wallet-adapter-react";

import {
    Collection,
    PROGRAM_ID as MPL_ID,
    createBurnEditionNftInstruction,
    createCreateMasterEditionV3Instruction,
    createCreateMetadataAccountV3Instruction,
    createMintNewEditionFromMasterEditionViaTokenInstruction,
    createUpdateMetadataAccountV2Instruction,
    MasterEditionV2,
    createVerifySizedCollectionItemInstruction,
    // createBurnInstruction
} from '@metaplex-foundation/mpl-token-metadata';

import { Metaplex, printNewEditionBuilder } from '@metaplex-foundation/js';

// import { Connection, clusterApiUrl } from "@solana/web3.js";

const log = console.log;

export type EditionNfts = Array<{ nft: web3.PublicKey, masterNft: web3.PublicKey, edition: number }>
export interface NftInfo {
    c1Nfts: EditionNfts;
    c2Nfts: EditionNfts;
    c3Nfts: EditionNfts;
    rewardCollectionNfts: EditionNfts;
}

export class Connectivity {
    wallet: WalletContextState
    connection: web3.Connection;
    txis: web3.TransactionInstruction[] = [];
    collectionNft1: web3.PublicKey;
    collectionNft2: web3.PublicKey;
    collectionNft3: web3.PublicKey;
    rewardCollectionNft: web3.PublicKey;
    metaplex: Metaplex;
    txs: web3.Transaction[] = []
    txsInfo: any[] = []
    nft1: web3.PublicKey
    nft2: web3.PublicKey
    nft3: web3.PublicKey
    // nft1C2: web3.PublicKey

    constructor(_wallet) {
        this.wallet = _wallet;
        this.connection = new web3.Connection("https://api.devnet.solana.com", { commitment: 'confirmed' })
        this.collectionNft1 = new web3.PublicKey("B1kjLp3eRCkXM68N19hFUVr278UFv1ZCXyXPFdzVb3ya")
        this.collectionNft2 = new web3.PublicKey("Efe7NLRmjFqCEaEEH9noqVkAxq4tgqAfis9Z7hzkgw6F")
        this.collectionNft3 = new web3.PublicKey("Cn1LF5vceyj8SZJnawmLucWmrJXJxeBP6FRLkYVZWFLc")
        this.rewardCollectionNft = new web3.PublicKey("3CSRZM915VqsCjhCrX7ZZnkpScBmXwJWwiGYPcLL6CCa")
        this.metaplex = new Metaplex(this.connection)
        this.nft1 = new web3.PublicKey("4j99PTwFe48LVBtBd7ym4DqFqb2jq5w9A1EsJvCxPw58")
        this.nft2 = new web3.PublicKey("Ehqddi2obiYoJgsATbRkeYoe2n3BNzfF4kFJpfcwUa75")
        this.nft3 = new web3.PublicKey("4AviUQhTy49cnGzBG2dmon91xDaDZVrZ1fxkrwRzV4pC")
        // this.nft2 = new web3.PublicKey("4vZwwV4y6hMUJJzGPY9TMmsXsr67xcmxxuLfBrDSeG8s")
        // this.nft3 = new web3.PublicKey("AvfQJiCzY7bKwXSEEXwKz53h3QBuNcL2eCZSui3kE25Z")
        // this.nft1C2 = new web3.PublicKey("Ehqddi2obiYoJgsATbRkeYoe2n3BNzfF4kFJpfcwUa75")
    }

    async _sendTransaction(signatures: web3.Keypair[] = []) {
        try {
            const tx = new web3.Transaction().add(...this.txis);
            // tx.recentBlockhash = (await this.connection.getLatestBlockhash()).blockhash
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
        tx.feePayer = this.wallet.publicKey
        tx.recentBlockhash = (await this.connection.getLatestBlockhash()).blockhash
        for (let signature of signatures)
            tx.sign(signature)

        this.txs.push(tx)
        this.txsInfo.push(info)
    }

    async _sendMultTransaction() {
        let rawTxs = await this.wallet.signAllTransactions(this.txs);
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

    async createToken(token_keypair: web3.Keypair) {
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

    async createMetadataAccount(tokenId: web3.PublicKey, metadata: any, collection: Collection = null) {
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

    async createMasterEdition(tokenId: web3.PublicKey) {
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

    async createEdition(tokenId: web3.PublicKey, masterEditionNft: web3.PublicKey, edition: number) {
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

    async verifyCollectionNft(nft: web3.PublicKey, collectionNft: web3.PublicKey) {
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

    async verifyRewardCollectionNft(tokenId: web3.PublicKey) {
        const collectionMetadata = this._getMetadataAccount(this.rewardCollectionNft)
        const collectionMaster = this._getMasterEditionAccount(this.rewardCollectionNft)
        const metadataAccount = this._getMetadataAccount(tokenId)

        // const ix = createVerifyCollectionInstruction({
        const ix = createVerifySizedCollectionItemInstruction({
            collection: collectionMetadata,
            collectionAuthority: this.wallet.publicKey,
            collectionMasterEditionAccount: collectionMaster,
            collectionMint: this.rewardCollectionNft,
            metadata: metadataAccount,
            payer: this.wallet.publicKey,
        })

        this.txis.push(ix)
    }

    async _updateMetadataAccount(tokenId: web3.PublicKey) {
        const metadata = this._getMetadataAccount(tokenId);
        const ix = createUpdateMetadataAccountV2Instruction(
            {
                metadata: metadata,
                updateAuthority: this.wallet.publicKey
            },
            {
                updateMetadataAccountArgsV2: {
                    data: {
                        collection: {
                            key: this.rewardCollectionNft,
                            verified: false,
                        },
                        creators: [
                            {
                                address: this.wallet.publicKey,
                                share: 39,
                                verified: true,
                            }
                        ],
                        name: "NEW_NAME",
                        sellerFeeBasisPoints: 21,
                        symbol: "NEW_SYMBOL",
                        uri: "NEW_URI",
                        uses: null
                    },
                    isMutable: true,
                    primarySaleHappened: false,
                    updateAuthority: this.wallet.publicKey,
                }
            }
        )

        this.txis.push(ix)
    }

    async __checkAndAddNft(metadata: any, arr: EditionNfts) {
        try {
            // const master = this._getMasterEditionAccount(this.nft1)
            const editionMetdata: any = (await this.metaplex.nfts().findByMetadata({
                metadata: metadata.address
            }))

            // const mint = res.mint.address
            const parentEdition = editionMetdata?.edition?.parent;
            const edition = editionMetdata?.edition?.number
            const mint = editionMetdata.mint.address
            //! Currrent here the masterNft is hard coded we need some condition 
            // if (parentEdition) arr.push({ edition, nft: mint, masterNft: this.nft1 })
            if (parentEdition) arr.push({ edition, nft: mint, masterNft: this.nft1 })
            // if (parentEdition) arr.push({ edition, nft: mint, masterNft: this.nft2})

            // const _parentEditionMetadataAccount = await MasterEditionV2.fromAccountAddress(this.connection, parentEdition)
            // const masterEditionInfo = await MasterEditionV2.fromAccountAddress(this.connection, parentEdition)
            // log("MasterEditionInfo : ", masterEditionInfo)

            // this.metaplex.

            // log("medata : ", _parentEditionMetadataAccount.toBase58())
            // const masterNft = (await this.metaplex.nfts().findByMetadata({
            //     metadata: _parentEditionMetadataAccount
            // }))?.mint?.address;

            // log("masterNFT : ", masterNft.toBase58())

            // if (masterNft) arr.push({ nft: mint, edition, masterNft })

        } catch (e) {
            log("Error: ", e)
        }
    }

    async _getCollectionNft() {
        const user = this.wallet.publicKey
        if (user == null) return null

        const nfts = await this.metaplex.nfts().findAllByOwner({
            owner: user
        })

        let c1Nfts: EditionNfts = [];
        let c2Nfts: EditionNfts = [];
        let c3Nfts: EditionNfts = [];
        let rewardCollectionNfts: EditionNfts = []

        for (let i of nfts) {
            if (i.collection) {
                if (i.collection.address.toBase58() == this.collectionNft1.toBase58() && i.collection.verified == true) await this.__checkAndAddNft(i, c1Nfts)
                if (i.collection.address.toBase58() == this.collectionNft2.toBase58() && i.collection.verified == true) await this.__checkAndAddNft(i, c2Nfts)
                if (i.collection.address.toBase58() == this.collectionNft3.toBase58() && i.collection.verified == true) await this.__checkAndAddNft(i, c3Nfts)
                if (i.collection.address.toBase58() == this.rewardCollectionNft.toBase58() && i.collection.verified == true) await this.__checkAndAddNft(i, rewardCollectionNfts)
            }
        }

        return {
            c1Nfts,
            c2Nfts,
            c3Nfts,
            rewardCollectionNfts,
        }
    }

    async _createNft() {
        this.txis = []

        // ? MasterNft without collection: "8U2EriCcJp7am7W7w5u8tGFHApFtzY1UEFjM5aZUB5KH"
        // ? Edition NFt without collection: "7H1eAQtBK9mG86fQMev4EdX6X6Ytr98zCxKL8E8fVSfB"
        // const tokenKp = web3.Keypair.generate()
        // const token = tokenKp.publicKey
        // await this.createToken(tokenKp);
        // await this.createMetadataAccount(token, { name: "NFT1C3", symbol: "N1C3", uri: "None" }, { key: this.collectionNft3, verified: false })
        // // await this.createMetadataAccount(token, { name: "NFT6", symbol: "N6", uri: "None" })
        // await this.createMasterEdition(token)
        // await this.verifyCollectionNft(token, this.collectionNft3)
        // const tx = new web3.Transaction().add(...this.txis)

        // const res = await this.wallet.sendTransaction(tx, this.connection, { signers: [tokenKp] })
        // log("res: ", res);

        for (let i = 15; i < 20;) {
            this.txis = []
            const tokenKp = web3.Keypair.generate()
            const token = tokenKp.publicKey
            await this.createToken(tokenKp);
            await this.createEdition(token, this.nft3, i + 1)

            const tx = new web3.Transaction().add(...this.txis)

            const res = await this.wallet.sendTransaction(tx, this.connection, { signers: [tokenKp] })
            log("res: ", res);
            i += 1
        }

        // this.txis = []

    }

    async _getMetadata(token: web3.PublicKey) {
        const res = await this.metaplex.nfts().findByMint({
            mintAddress: token,
            loadJsonMetadata: false,
        })
        log("NFT: ", res);
        return res;
    }

    async burn(nfts: EditionNfts, collectionNft: web3.PublicKey) {
        const user = this.wallet.publicKey
        if (user == null) return null;

        //NOTE: Burn NFTS:
        let ixs = []
        for (let i of nfts) {
            // ? MasterNft without collection: "8U2EriCcJp7am7W7w5u8tGFHApFtzY1UEFjM5aZUB5KH"
            //? Edition NFt without collection: "7H1eAQtBK9mG86fQMev4EdX6X6Ytr98zCxKL8E8fVSfB"
            const mint = i.nft;
            const printEditionTokenAccount = getAssociatedTokenAddressSync(mint, user)
            // const master = i.masterNft;
            // const masterEditionAccount = this._getMasterEditionAccount(master)
            // const editionAccount = this._getMasterEditionAccount(mint)

            // const masterEditionTokenAccount = getAssociatedTokenAddressSync(master, user)
            // const metadataAccount = this._getMetadataAccount(mint)
            // const editionMarkerAccount = this._getEditionMakerAccount(masterEditionAccount, i.edition)
            // const collectionMetadata = this._getMetadataAccount(this.collectionNft1)

            const ix = createBurnInstruction(printEditionTokenAccount, mint, user, 1)

            //?NOT WOKR
            // const ix = createBurnInstruction({
            //     authority: user,
            //     metadata: metadataAccount,
            //     mint,
            //     splTokenProgram: TOKEN_PROGRAM_ID,
            //     sysvarInstructions: web3.SYSVAR_INSTRUCTIONS_PUBKEY,
            //     token: printEditionTokenAccount,
            //     collectionMetadata,
            //     edition: editionAccount,
            //     editionMarker: editionMarkerAccount,
            //     masterEdition: masterEditionAccount,
            //     masterEditionMint: master,
            //     masterEditionToken: masterEditionTokenAccount,
            //     systemProgram: web3.SystemProgram.programId,

            // },
            //     {
            //         burnArgs: {
            //             __kind: 'V1',
            //             amount: 1
            //         }
            //     }
            // )

            //? Master nft burn
            // const ix = createBurnNftInstruction({
            //     masterEditionAccount: masterEditionAccount,
            //     metadata: metadataAccount,
            //     mint: i.nft,
            //     owner: user,
            //     splTokenProgram: TOKEN_PROGRAM_ID,
            //     tokenAccount: ata,
            //     collectionMetadata: collectionMetadataAccount
            // })

            //? Edition nft burn (not working now might be problem with metaplex smart contract)
            // const ix = createBurnEditionNftInstruction({
            //     editionMarkerAccount,
            //     masterEditionAccount,
            //     masterEditionMint: master,
            //     masterEditionTokenAccount,
            //     metadata: metadataAccount,
            //     owner: user,
            //     printEditionAccount: editionAccount,
            //     printEditionMint: mint,
            //     printEditionTokenAccount,
            //     splTokenProgram: TOKEN_PROGRAM_ID,
            // })

            // let ix2 = this.metaplex.nfts().builders().delete({
            //     mintAddress: mint,
            //     ownerTokenAccount: printEditionTokenAccount,
            // }).getInstructions()

            // ix2[0].keys[1].pubkey = user
            // log("ix: ", ix);

            ixs.push(ix)
        }
        const burnTx = new web3.Transaction().add(...ixs)
        await this._addTx(burnTx, { EditionNfts: nfts })
        // await this.wallet.sendTransaction(burnTx, this.connection)

        //MINT NFT: 
        const rNftKp = web3.Keypair.generate();
        const rewardNft = rNftKp.publicKey

        this.txis = []
        await this.createToken(rNftKp)
        await this.createMetadataAccount(rewardNft, { name: "Reward 1", symbol: "R1", uri: "none" }, { key: this.rewardCollectionNft, verified: false })
        await this.createMasterEdition(rewardNft)
        await this.verifyRewardCollectionNft(rewardNft)
        const tx = new web3.Transaction().add(...this.txis)
        this.txis = []
        await this._addTx(tx, { MintRrewardNFT: rewardNft.toBase58() }, [rNftKp])
        // let res = await this.wallet.sendTransaction(tx, this.connection, { signers: [rNftKp] })
        // log("res: ", res)

        await this._sendMultTransaction();
    }

}