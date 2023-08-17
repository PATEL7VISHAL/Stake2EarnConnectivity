import {
  AnchorProvider,
  BN,
  IdlAccounts,
  Program,
  web3,
  IdlTypes,
} from "@project-serum/anchor";
import { base64, utf8 } from "@project-serum/anchor/dist/cjs/utils/bytes";
import {
  createAssociatedTokenAccountInstruction,
  getAssociatedTokenAddressSync,
} from "@solana/spl-token";
import { WalletContextState } from "@solana/wallet-adapter-react";

import {
  FindNftsByOwnerOutput,
  Metaplex,
  sendTokensBuilder,
  toNftEditionFromReadApiAsset,
  Metadata as MetadataMJ,
} from "@metaplex-foundation/js";
import {
  PROGRAM_ID as MPL_ID,
  Metadata,
} from "@metaplex-foundation/mpl-token-metadata";

import {
  ASSOCIATED_PROGRAM_ID,
  TOKEN_PROGRAM_ID,
} from "@project-serum/anchor/dist/cjs/utils/token";
import axios from "axios";
import { IDL, Stake2earn } from "./stake2earn";
import { hrServerNftsIdStr } from "./hrServerNfts";
import {
  IdlAccount,
  IdlAccountItem,
  IdlField,
  IdlType,
} from "@project-serum/anchor/dist/cjs/idl";
const log = console.log;
const systemProgram = web3.SystemProgram.programId;
export enum TransactionType {
  Normal,
  AppendIx,
  MultiSign,
}
const Seeds = {
  // SEED_MAIN_STATE: utf8.encode("main_state8"),
  // SEED_PROGRAM_STATE: utf8.encode("program_state2"),
  SEED_PROGRAM_STATE: utf8.encode("program_state4"),
};

const NftStateTypeName = "NftState";
const MainStateTypeName = "mainState";
type MainStateType = IdlAccounts<Stake2earn>[typeof MainStateTypeName];
type NftStateType = IdlTypes<Stake2earn>[typeof NftStateTypeName];

const PERCENTAGES_TOTAL = 1000_00;
const authorizationRules = new web3.PublicKey(
  "eBJLFYPxJmMGKuFwpDWkzxZeUrad92kZRC5BJLpzyT9"
);
const authorizationRulesProgram = new web3.PublicKey(
  "auth9SigNpDKz4sJJ1DfCTuZrZNSAgh9sFD3rboVmgg"
);

export interface NftState {
  isInit: boolean;
  nft: string;
  dummyNft: string;
  isStaked: boolean;
  // stakeInTime: string;
  stakeInTime: Date;
  claimableRewardAmount: number;
  nftType: number;
  nftTypeStr: string;
  isClaimed: boolean;
  stakedDays: number;
}

export interface NftInfo {
  mint: string;
  nftState: NftState | null;
  name: string;
  symbol: string;
  uri: string;
  image: string;
}

export interface CreateStakingRoundInput {
  // rewardAmount: number,
  roundStartTime: number;
  // roundDurationInDays: number,
}

export interface EndStakingRoundInput {
  rewardAmount: number;
}

export interface HRServerNftInfoType {
  nftId: string;
  //TODO:
  nftInfo: any;
  stateAccountId: web3.PublicKey;
  stateInfo: NftState | null;
}

export class Connectivity {
  wallet: WalletContextState;
  connection: web3.Connection;
  txis: web3.TransactionInstruction[] = [];
  metaplex: Metaplex;
  txs: web3.Transaction[] = [];
  txsInfo: any[] = [];
  programId: web3.PublicKey;
  program: Program<Stake2earn>;
  mainStateAccount: web3.PublicKey;
  programStateAccount: web3.PublicKey;
  owner: web3.PublicKey;
  extraSignature: web3.Keypair[] = [];
  wBtcTokenId: web3.PublicKey;
  collectionId: web3.PublicKey;
  nftCreator: web3.PublicKey;
  cacheHRNftsInfo: HRServerNftInfoType[] = [];
  cacheNftInfos: Map<string, string> = new Map();
  oldCollectionId: web3.PublicKey;
  programOwnedNewNfts: Map<number, { nft: string; metadata: MetadataMJ }>;

  constructor(_wallet: WalletContextState) {
    this.wallet = _wallet;
    this.connection = new web3.Connection("https://api.devnet.solana.com", {
      commitment: "confirmed",
    });
    this.metaplex = new Metaplex(this.connection);

    //? Program setup
    this.programId = new web3.PublicKey(
      "DQPz7LX1PDoK51SS2KXjLrS4t3ewgpiDkSkoLNGLwZiA"
    );
    // this.programId = new web3.PublicKey("BK8ySfPmvvYvDYHNwzVeqfsxhpQ6PWCEtbpovcbaNhHH")
    const anchorProvider = new AnchorProvider(this.connection, this.wallet, {
      commitment: "confirmed",
      preflightCommitment: "confirmed",
    });
    this.program = new Program(IDL, this.programId, anchorProvider);
    this.programStateAccount = web3.PublicKey.findProgramAddressSync(
      [Seeds.SEED_PROGRAM_STATE],
      this.programId
    )[0];
    this.mainStateAccount = new web3.PublicKey(
      "58PjB3iDHSTZBfh3R2qMw8NrAxDefYCABDTxXiHm686A"
    );
    this.wBtcTokenId = new web3.PublicKey(
      "uG6WCzPivRaLGps1pimZupyPCiFeJrvriPu74foLuPR"
    );
    this.collectionId = new web3.PublicKey(
      "J7Wb3SzgHLzojmBchTzqgy7iRjxdbWyjRLrHVyA2Wyu4"
    );
    this.oldCollectionId = new web3.PublicKey(
      "5tQGk7SQLjYXhMkJFpZvyTdgptsXpDZP4qt4knWhXRRZ"
    );
    this.programOwnedNewNfts = new Map();
  }

  static calculateNonDecimalValue(value: number, decimal: number) {
    return Math.trunc(value * 10 ** decimal);
  }

  static async sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async _sendTransaction(signatures: web3.Keypair[] = []) {
    try {
      if (this.extraSignature) signatures.push(...this.extraSignature);
      const tx = new web3.Transaction().add(...this.txis);
      // const res = await this.wallet.sendTransaction(tx, this.connection, { signers: signatures, preflightCommitment: 'confirmed' });

      tx.feePayer = this.wallet.publicKey;
      const blockhash = (await this.connection.getLatestBlockhash()).blockhash;
      tx.recentBlockhash = blockhash;
      for (let i of signatures) tx.sign(i);

      const signedTx = await this.wallet.signTransaction(tx);
      const res = await this.connection.sendRawTransaction(
        signedTx.serialize()
      );
      log("Trasaction Sign: ", res);
      // alert("Trasaction Sussessful")
      return res;
    } catch (e) {
      log("Error: ", e);
      throw e;
      // alert("Trasaction Fail")
    } finally {
      this.txis = [];
      this.extraSignature = [];
    }
  }

  async _addTx(
    tx: web3.Transaction,
    info: any,
    signatures: web3.Keypair[] = []
  ) {
    this.txis = [];
    tx.feePayer = this.wallet.publicKey;
    tx.recentBlockhash = (await this.connection.getLatestBlockhash()).blockhash;
    for (let signature of signatures) tx.sign(signature);

    this.txs.push(tx);
    this.txsInfo.push(info);
  }

  async _sendMultTransaction() {
    let rawTxs = await this.wallet.signAllTransactions(this.txs);
    this.txs = [];
    let pass = [];
    let fail = [];
    let i = 0;

    for (let tx of rawTxs) {
      try {
        let raw = tx.serialize();
        const sign = await this.connection.sendRawTransaction(raw);
        pass.push({ info: this.txsInfo[i], sign });
      } catch (e) {
        fail.push({ info: this.txsInfo[i] });
      } finally {
        i += 1;
      }
    }

    this.txs = [];
    this.txsInfo = [];
    this.extraSignature = [];
    log("pass: ", pass);
    log("fail: ", fail);
  }

  async __getMainStateInfo() {
    const res = await this.program.account.mainState.fetch(
      this.mainStateAccount
    );
    const parseNftsState: NftState[] = [];

    for (let i = 0; i < 256; ++i) {
      let nftState: NftStateType = res.nftsState[i];
      if (nftState.isInit.toNumber() == 1)
        parseNftsState.push(this.__parseNftState(nftState));
    }

    const start_staking_time = res.startStakingTime.toNumber();
    const end_staking_time = res.endStakingTime.toNumber();

    let state = {
      w_btc_token_id: res.wBtcTokenId.toBase58(),
      stake_nft_collection_id: res.stakeNftCollectionId.toBase58(),
      whiteNftsStakeInfo: {
        totalCurrentStaked:
          res.whiteNftsStakeInfo.totalCurrentStaked.toNumber(),
        rewardRate:
          res.whiteNftsStakeInfo.rewardRate.toNumber() / PERCENTAGES_TOTAL,
        totalStakingHours: res.whiteNftsStakeInfo.totalStakingHours.toNumber(),
      },

      diamondNftsStakeInfo: {
        totalCurrentStaked:
          res.diamondNftsStakeInfo.totalCurrentStaked.toNumber(),
        rewardRate:
          res.diamondNftsStakeInfo.rewardRate.toNumber() / PERCENTAGES_TOTAL,
        totalStakingHours:
          res.diamondNftsStakeInfo.totalStakingHours.toNumber(),
      },

      legendaryNftsStakeInfo: {
        totalCurrentStaked:
          res.legendaryNftStakeInfo.totalCurrentStaked.toNumber(),
        rewardRate:
          res.legendaryNftStakeInfo.rewardRate.toNumber() / PERCENTAGES_TOTAL,
        totalStakingHours:
          res.legendaryNftStakeInfo.totalStakingHours.toNumber(),
      },
      currentStakingRound: res.currentStakingRound.toNumber(),
      // startStakingTime: res.startStakingTime.toNumber(),
      // endStakingTime: res.endStakingTime.toNumber(),
      startStakingTime:
        start_staking_time == 0 ? null : new Date(start_staking_time * 1000),
      // endStakingTime: end_staking_time == 0 ? null : new Date(end_staking_time * 1000),
      overAllBtcAmount: res.overallBtcAmount.toNumber(),
      overAllClaimedBtcAmount: res.overallClaimedBtcAmount.toNumber(),
      nftsState: parseNftsState,
      isRewardCalculated: res.isRewardCalculated.toNumber() == 1 ? true : false,
      totalRewardableAmount:
        res.totalRewardableAmount.toNumber() / 1000_000_000,
    };

    //NOTE: getting user info:
    let userNfts = await this.metaplex
      .nfts()
      .findAllByOwner({ owner: this.wallet.publicKey })
      .catch<FindNftsByOwnerOutput>((_) => []);

    const _programOwnedNfts = this.metaplex
      .nfts()
      .findAllByOwner({ owner: this.programStateAccount })
      .catch<FindNftsByOwnerOutput>((_) => []);

    // let userHRServerNfts: web3.PublicKey[] = [];
    // let userDummyNfts: web3.PublicKey[] = [];
    let userHRServerNfts: Set<string> = new Set();
    let userDummyNfts: Set<string> = new Set();
    let userOldNfts: Map<number, { nft: string; metadata: MetadataMJ }> =
      new Map();
    let programHRServerNfts: Set<string> = new Set();
    let programDummyNfts: Set<string> = new Set();
    let userClaimablAmountInfo = new Map<string, number>();
    let userTotalClaimableAmount = 0;

    const getIdFromName = (name: string) => {
      const start = name.indexOf("#") + 1;
      const idStr = name.slice(start).trim();
      return parseInt(idStr);
    };

    for (let i of state.nftsState) {
      if (!i.isInit) continue;

      programHRServerNfts.add(i.nft);
      programDummyNfts.add(i.dummyNft);
    }

    for (let i of userNfts) {
      if (i.model != "metadata") continue;
      const mintAddress = i.mintAddress;
      if (programHRServerNfts.has(mintAddress.toBase58())) {
        userHRServerNfts.add(mintAddress.toBase58());
      } else if (programDummyNfts.has(mintAddress.toBase58())) {
        userDummyNfts.add(mintAddress.toBase58());
      } else {
        const collectionId = i?.collection?.address;
        if (collectionId) {
          const collectionIdStr = collectionId?.toBase58();

          if (collectionIdStr == this.collectionId.toBase58())
            userHRServerNfts.add(mintAddress.toBase58());
          else if (collectionIdStr == this.oldCollectionId.toBase58()) {
            const id = getIdFromName(i.name);
            userOldNfts.set(id, { nft: mintAddress.toBase58(), metadata: i });
          }
        }
      }
    }

    for (let i of state.nftsState) {
      if (userHRServerNfts.has(i.nft) || userDummyNfts.has(i.dummyNft)) {
        userClaimablAmountInfo.set(
          i.nft,
          i.claimableRewardAmount / 1000_000_000
        );
        userTotalClaimableAmount += i.claimableRewardAmount / 1000_000_000;
      }
    }

    if (this.cacheNftInfos.size == 0) {
      let _nfts = [
        ...Array.from(programDummyNfts),
        ...Array.from(programHRServerNfts),
        ...Array.from(userHRServerNfts),
      ];
      let allNftsStr = new Set<string>();
      _nfts.map((e) => allNftsStr.add(e));

      // let allNftKey = Array.from(allNftsStr).map((e)=>new web3.PublicKey(e))
      let _NftsMetadataAccountKeys: web3.PublicKey[] = Array.from(
        allNftsStr
      ).map((e) => this.__getMetadataAccount(new web3.PublicKey(e)));
      let _NftMetadataInfo = await this.connection.getMultipleAccountsInfo(
        _NftsMetadataAccountKeys
      );
      for (let i of _NftMetadataInfo) {
        if (!i) continue;

        try {
          const metadata = Metadata.fromAccountInfo(i)[0];
          const name = metadata?.data.name;
          const end = metadata?.data.name.indexOf("\x00");
          this.cacheNftInfos.set(metadata.mint.toBase58(), name.slice(0, end));
        } catch { }
      }
    }

    //Finding programOwnedNfts specific oldNft upgrade
    const programOwnedNewNfts = new Map<
      number,
      { nft: string; metadata: MetadataMJ }
    >();
    const programOwnedNfts = await _programOwnedNfts;

    for (let i of programOwnedNfts) {
      if (i.model != "metadata") continue;
      const collectionIdStr = i.collection?.address?.toBase58();

      if (!collectionIdStr) continue;

      if (
        collectionIdStr == this.collectionId.toBase58() &&
        i?.collection?.verified
      ) {
        const id = getIdFromName(i.name);
        programOwnedNewNfts.set(id, { nft: i.mintAddress.toBase58(), metadata: i });
      }
    }
    this.programOwnedNewNfts = programOwnedNewNfts;

    return {
      mainState: state,
      userHRServerNfts: userHRServerNfts,
      userDummyNfts: userDummyNfts,
      nftInfos: this.cacheNftInfos,
      userTotalClaimableAmount,
      userClaimablAmountInfo,
      totalRewardableAmount: state.totalRewardableAmount,
      userOldNfts,
      programOwnedNewNfts,
    };
  }

  __parseNftState(state: NftStateType) {
    const isInit = state.isInit.toNumber() == 1 ? true : false;
    const isStaked = state.isInStake.toNumber() == 1 ? true : false;
    const nftTypeStr =
      state.nftType.toNumber() == 2
        ? "legendary"
        : state.nftType.toNumber() == 1
          ? "diamond"
          : "white";

    const parseValue: NftState = {
      isInit,
      nft: isInit ? state.mint.toBase58() : null,
      dummyNft: isInit ? state.dummyNftId.toBase58() : null,
      isStaked,
      stakeInTime: isStaked
        ? new Date(state.stakeInTime.toNumber() * 1000)
        : null,
      claimableRewardAmount:
        state.claimableRewardAmount.toNumber() / 1000_000_000,
      nftType: isInit ? state.nftType.toNumber() : null,
      nftTypeStr,
      isClaimed: state.isClaimed.toNumber() == 1 ? true : false,
      stakedDays: state.stakedHours.toNumber(),
    };
    return parseValue;
  }

  async getOrinitNftState(
    nft: web3.PublicKey,
    init_if_not_exist: boolean = true
  ) {
    {
      const dummyNft = await this.__getDummyNftId(nft);
      if (dummyNft) return dummyNft;
    }

    log("Initializing the nft state account");
    const tokenKp = web3.Keypair.generate();
    const dummyNft = tokenKp.publicKey;
    const nftMetadataAccount = this.__getMetadataAccount(nft);
    const dummyNftMetadataAccount = this.__getMetadataAccount(dummyNft);
    const dummyNftMasterEditionAccount =
      this.__getMasterEditionAccount(dummyNft);
    const programStateAccountAtaD = getAssociatedTokenAddressSync(
      dummyNft,
      this.programStateAccount,
      true
    );

    const ix = await this.program.methods
      .initNftState()
      .accounts({
        user: this.wallet.publicKey,
        nft,
        nftMetadataAccount,
        programStateAccountAtaD,
        dummyNft,
        dummyNftMasterEditionAccount,
        dummyNftMetadataAccount,
        mainStateAccount: this.mainStateAccount,
        programState: this.programStateAccount,
        mplProgram: MPL_ID,
        associatedTokenProgram: ASSOCIATED_PROGRAM_ID,
        tokenProgram: TOKEN_PROGRAM_ID,
        systemProgram,
      })
      .instruction();
    this.txis.push(ix);
    this.extraSignature.push(tokenKp);
    return dummyNft;
  }

  async _getOrCreateTokenAccount(
    mint: web3.PublicKey,
    owner: web3.PublicKey,
    isOffCurve = false
  ) {
    const ata = getAssociatedTokenAddressSync(mint, owner, isOffCurve);
    const info = await this.connection.getAccountInfo(ata);

    if (info == null) {
      log("added token account init");
      const ix = createAssociatedTokenAccountInstruction(
        this.wallet.publicKey,
        ata,
        owner,
        mint
      );
      this.txis.push(ix);
    }
    return ata;
  }

  __getMetadataAccount(tokenId: web3.PublicKey) {
    return web3.PublicKey.findProgramAddressSync(
      [utf8.encode("metadata"), MPL_ID.toBuffer(), tokenId.toBuffer()],
      MPL_ID
    )[0];
  }

  __getMasterEditionAccount(tokenId: web3.PublicKey) {
    return web3.PublicKey.findProgramAddressSync(
      [
        utf8.encode("metadata"),
        MPL_ID.toBuffer(),
        tokenId.toBuffer(),
        utf8.encode("edition"),
      ],
      MPL_ID
    )[0];
  }

  __getTokenRecordAccount(mint: web3.PublicKey, ata: web3.PublicKey) {
    return web3.PublicKey.findProgramAddressSync(
      [
        utf8.encode("metadata"),
        MPL_ID.toBuffer(),
        mint.toBuffer(),
        utf8.encode("token_record"),
        ata.toBuffer(),
      ],
      MPL_ID
    )[0];
  }

  async __getDummyNftId(nft: web3.PublicKey | string): Promise<web3.PublicKey> {
    if (typeof nft == "string") nft = new web3.PublicKey(nft);
    const state = await this.program.account.mainState.fetch(
      this.mainStateAccount
    );

    let nftInfo = await this.metaplex
      .nfts()
      .findByMint({ mintAddress: nft, loadJsonMetadata: false })
      .catch((_) => {
        throw "Nft Not Found";
      });
    const nftName = nftInfo.name;
    const start = nftName.indexOf("#") + 1;
    let end = nftName.indexOf("\x00");
    if (end === -1) end = nftName.length;
    const nftId = parseInt(nftName.slice(start, end));
    log("name: ", nftName);
    log("Got NftID: ", nftId);

    if (!nftId) return null;

    const nftState: NftStateType = state.nftsState[nftId];
    if (nftState.isInit.toNumber()) {
      const _nftStr = nftState.mint.toBase58();
      if (_nftStr == nft.toBase58()) return nftState.dummyNftId;
      return null;
    }
    return null;
  }

  async _getNftName(token: web3.PublicKey | string): Promise<string> {
    if (typeof token == "string") token = new web3.PublicKey(token);
    let res = this.cacheNftInfos.get(token.toBase58());
    if (!res) {
      // const info = (await this.metaplex.nfts().findByMint({mintAddress: token, loadJsonMetadata: false}).catch((e)=>null)).
      const _name = (
        await this.metaplex
          .nfts()
          .findByMint({ mintAddress: token, loadJsonMetadata: false })
      ).name;
      if (_name) {
        let end = _name.indexOf("\x00");
        res = _name.slice(0, end);
        this.cacheNftInfos.set(token.toBase58(), res);
      }
    }
    return res;
  }

  async _getMetadata(token: web3.PublicKey, loadJsonMetadata: boolean = false) {
    const res = await this.metaplex.nfts().findByMint({
      mintAddress: token,
      loadJsonMetadata,
    });
    return res;
  }

  async upgradeNft(
    oldNft: string | web3.PublicKey,
    newNft: string | web3.PublicKey
  ) {
    this.txis = []
    const user = this.wallet.publicKey;
    if (!user) throw "User not found";
    if (!oldNft || !newNft) throw "Invalid nft details";
    if (typeof oldNft == "string") oldNft = new web3.PublicKey(oldNft);
    if (typeof newNft == "string") newNft = new web3.PublicKey(newNft);

    const cUIncreaseIx = web3.ComputeBudgetProgram.setComputeUnitLimit({
      units: 500_000,
    });
    this.txis.push(cUIncreaseIx);

    const userNewNftAta = await this._getOrCreateTokenAccount(newNft, user);
    const programStateNewNftAta = getAssociatedTokenAddressSync(
      newNft,
      this.programStateAccount,
      true
    );

    const userOldNftAta = getAssociatedTokenAddressSync(oldNft, user);
    const newNftEditionAccount = this.__getMasterEditionAccount(newNft);
    const oldNftEditionAccount = this.__getMasterEditionAccount(oldNft);
    const newNftMetadataAccount = this.__getMetadataAccount(newNft);
    const oldNftMetadataAccount = this.__getMetadataAccount(oldNft);
    const oldNftCollectionMetadata = this.__getMetadataAccount(
      this.oldCollectionId
    );

    const userTokenRecordAccount = this.__getTokenRecordAccount(
      newNft,
      userNewNftAta
    );
    const programStateTokenRecordAccount = this.__getTokenRecordAccount(
      newNft,
      programStateNewNftAta
    );

    const ix = await this.program.methods
      .upgradeNft()
      .accounts({
        user,
        newNft,
        oldNft,
        userNewNftAta,
        userOldNftAta,
        ataProgram: ASSOCIATED_PROGRAM_ID,
        mplProgram: MPL_ID,
        programState: this.programStateAccount,
        tokenProgram: TOKEN_PROGRAM_ID,
        systemProgram,
        mainStateAccount: this.mainStateAccount,
        authorizationRules,
        sysvarInstructions: web3.SYSVAR_INSTRUCTIONS_PUBKEY,
        newNftEditionAccount,
        oldNftEditionAccount,
        newNftMetadataAccount,
        oldNftMetadataAccount,
        programStateNewNftAta,
        userTokenRecordAccount,
        oldNftCollectionMetadata,
        authorizationRulesProgram,
        programStateTokenRecordAccount,
      })
      .instruction();
    this.txis.push(ix);

    await this._sendTransaction();

    // try {
    //   const tx = new web3.Transaction().add(...this.txis);
    //   this.txis = []
    //   tx.feePayer = user;
    //   const res = await this.connection.simulateTransaction(tx);
    //   log({ res });
    // } catch (err) {
    //   log({ err });
    // }
  }

  async stake(nft: web3.PublicKey | string) {
    this.txis = []
    const user = this.wallet.publicKey;
    if (user == null) throw "Wallet id not found";
    if (typeof nft == "string") nft = new web3.PublicKey(nft);

    const userAta = await this._getOrCreateTokenAccount(nft, user);
    const nftMetadataAccount = this.__getMetadataAccount(nft);
    const nftEditionAccount = this.__getMasterEditionAccount(nft);
    const dummyNft = await this.getOrinitNftState(nft);

    const programStateAccountAtaD = getAssociatedTokenAddressSync(
      dummyNft,
      this.programStateAccount,
      true
    );
    const userDummyNftAta = await this._getOrCreateTokenAccount(dummyNft, user);
    const programStateAccountAta = await this._getOrCreateTokenAccount(
      nft,
      this.programStateAccount,
      true
    );

    const userTokenRecordAccount = this.__getTokenRecordAccount(nft, userAta);
    const programStateTokenRecordAccount = this.__getTokenRecordAccount(
      nft,
      programStateAccountAta
    );

    const ix = await this.program.methods
      .stakeNft()
      .accounts({
        mainStateAccount: this.mainStateAccount,
        nft,
        nftMetadataAccount,
        programState: this.programStateAccount,
        programStateAccountAta,
        programStateAccountAtaD,
        tokenProgram: TOKEN_PROGRAM_ID,
        user,
        userAta,
        userDummyNftAta,

        //pNFT special
        userTokenRecordAccount,
        programStateTokenRecordAccount,
        ataProgram: ASSOCIATED_PROGRAM_ID,
        mplProgram: MPL_ID,
        systemProgram,
        nftEditionAccount,
        authorizationRules,
        sysvarInstructions: web3.SYSVAR_INSTRUCTIONS_PUBKEY,
        authorizationRulesProgram,
      })
      .instruction();
    this.txis.push(ix);
    await this._sendTransaction();

    // try {
    //   const tx = new web3.Transaction().add(...this.txis);
    //   tx.feePayer = user;
    //   const res = await this.connection.simulateTransaction(tx);
    //   log({ res });
    // } catch (err) {
    //   log({ err });
    // }
  }

  async unstake(nft: web3.PublicKey | string) {
    this.txis = []
    if (typeof nft == "string") nft = new web3.PublicKey(nft);
    const user = this.wallet.publicKey;
    if (user == null) throw "Wallet id not found";

    // Increasing Computation Budget from 200K to 300K
    const cUIncreaseIx = web3.ComputeBudgetProgram.setComputeUnitLimit({
      units: 300_000,
    });
    this.txis.push(cUIncreaseIx);

    const userAta = await this._getOrCreateTokenAccount(nft, user);
    const nftMetadataAccount = this.__getMetadataAccount(nft);
    const nftEditionAccount = this.__getMasterEditionAccount(nft);
    const dummyNft = await this.__getDummyNftId(nft);
    const userDummyNftAta = await this._getOrCreateTokenAccount(dummyNft, user);
    const programStateAccountAta = getAssociatedTokenAddressSync(
      nft,
      this.programStateAccount,
      true
    );
    const programStateAccountAtaD = getAssociatedTokenAddressSync(
      dummyNft,
      this.programStateAccount,
      true
    );

    const userTokenRecordAccount = this.__getTokenRecordAccount(nft, userAta);
    const programStateTokenRecordAccount = this.__getTokenRecordAccount(
      nft,
      programStateAccountAta
    );
    const ix = await this.program.methods
      .unstakeNft()
      .accounts({
        nft,
        mainStateAccount: this.mainStateAccount,
        nftMetadataAccount,
        tokenProgram: TOKEN_PROGRAM_ID,
        user,
        userAta,
        programStateAccountAta,
        programState: this.programStateAccount,
        userDummyNftAta,
        programStateAccountAtaD,

        //pNFT specific
        userTokenRecordAccount,
        programStateTokenRecordAccount,
        ataProgram: ASSOCIATED_PROGRAM_ID,
        mplProgram: MPL_ID,
        systemProgram,
        nftEditionAccount,
        authorizationRules,
        sysvarInstructions: web3.SYSVAR_INSTRUCTIONS_PUBKEY,
        authorizationRulesProgram,
      })
      .instruction();

    this.txis.push(ix);
    await this._sendTransaction();

    // try {
    //   const tx = new web3.Transaction().add(...this.txis);
    //   tx.feePayer = user;
    //   const res = await this.connection.simulateTransaction(tx);
    //   log({ res });
    // } catch (err) {
    //   log({ err });
    // }
  }

  async getReward(nft: web3.PublicKey | string) {
    if (typeof nft == "string") nft = new web3.PublicKey(nft);
    const user = this.wallet.publicKey;
    if (user == null) throw "Wallet id not found";

    const nftMetadataAccount = this.__getMetadataAccount(nft);
    const dummyNft = await this.__getDummyNftId(nft);
    const programStateAccountRewardTokenAta = getAssociatedTokenAddressSync(
      this.wBtcTokenId,
      this.programStateAccount,
      true
    );
    const userRewardTokenAta = await this._getOrCreateTokenAccount(
      this.wBtcTokenId,
      user
    );
    const userDummyNftAta = await this._getOrCreateTokenAccount(dummyNft, user);
    const userMainNftAta = await this._getOrCreateTokenAccount(nft, user);

    const ix = await this.program.methods
      .getReward()
      .accounts({
        programState: this.programStateAccount,
        mainStateAccount: this.mainStateAccount,
        nft,
        nftMetadataAccount,
        user,
        userDummyNftAta,
        programStateAccountRewardTokenAta,
        userRewardTokenAta,
        userMainNftAta,
        tokenProgram: TOKEN_PROGRAM_ID,
      })
      .instruction();

    this.txis.push(ix);
    await this._sendTransaction();
  }

  // // NOTE: Only for Admins
  async createStakingRound(input: CreateStakingRoundInput) {
    const owner = this.wallet.publicKey;
    if (!owner) throw "wallet not found";
    const ix = await this.program.methods
      .createStakingRound({
        roundStartTime: new BN(input.roundStartTime),
        // roundDurationInDays: new BN(input.roundDurationInDays),
        //TODO: hardcoded decimals
      })
      .accounts({
        mainStateAccount: this.mainStateAccount,
        programState: this.programStateAccount,
        owner,
        tokenProgram: TOKEN_PROGRAM_ID,
      })
      .instruction();
    this.txis.push(ix);

    await this._sendTransaction();
  }

  async endStakingRound(input: EndStakingRoundInput) {
    const owner = this.wallet.publicKey;
    if (!owner) throw "wallet not found";
    const ownerAta = await this._getOrCreateTokenAccount(
      this.wBtcTokenId,
      owner
    );
    const programStateAccountAta = await this._getOrCreateTokenAccount(
      this.wBtcTokenId,
      this.programStateAccount,
      true
    );
    const rewardAmount = new BN(
      Connectivity.calculateNonDecimalValue(input.rewardAmount, 9)
    );

    const ix = await this.program.methods
      .endStakingEnd({ rewardAmount })
      .accounts({
        owner,
        ownerAta,
        programState: this.programStateAccount,
        programStateAccountAta,
        mainStateAccount: this.mainStateAccount,
        tokenProgram: TOKEN_PROGRAM_ID,
      })
      .instruction();
    this.txis.push(ix);
    await this._sendTransaction();
  }

  async updateProgramStateOwner() {
    const newOwner = new web3.PublicKey(
      "GPv247pHoMhA6MFdLmzXzA9JdmVgn6g1VvLUS8kn38Ej"
    );
    const ix = await this.program.methods
      .updateProgramStateOwner(newOwner)
      .accounts({
        programState: this.programStateAccount,
        owner: this.wallet.publicKey,
      })
      .instruction();
    this.txis.push(ix);

    await this._sendTransaction();
  }
}
