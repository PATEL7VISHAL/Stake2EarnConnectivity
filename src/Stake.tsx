import { useEffect, useState } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";

import _get from "lodash/get";
import _forEach from "lodash/forEach";

import { Connectivity } from "./connectivity";

import "./Staking.css";
import Header from "./Header";

const Stake = () => {
  const wallet = useWallet();
  const { connection } = useConnection();
  const connectivity = new Connectivity(wallet, connection);

  const [txStatus, setTxStatus] = useState<string>("");

  const [stakedNFTs, setStakedNFTs] = useState([]);
  const [unStakedNFTs, setUnStakedNFTs] = useState([]);
  const [claimedNFTs, setClaimedNFTs] = useState([]);
  const [NFTInfo, setNFTInfo] = useState({});
  const [stats, setStats] = useState({
    totalRewardableAmount: 0,
    userTotalClaimableAmount: 0,
  });

  const [selectedNFT, setSelectedNFT] = useState({
    selected: "",
    active: "",
    nftId: -1,
  });

  // const shortAddress = (address = "") => {
  //   return `${address.slice(0, 3)}..${address.slice(-3)}`;
  // };

  const fetchNfts = async () => {
    const dummyNftMaps = [];
    const _NFTInfo = {};
    const _claimedNFTs = [];

    const state = await connectivity.__getMainStateInfo();

    console.log("state", state);

    Object.keys(_get(state, "mainState.nftsState", {}) || []).forEach(
      async (index) => {
        const _nft = _get(state, `mainState.nftsState.${index}`, {});

        _NFTInfo[_nft.nft] = {
          ..._NFTInfo[_nft.nft],
          claimableRewardAmount: _nft.claimableRewardAmount,
        };

        dummyNftMaps[_nft.dummyNft] = _nft.nft;

        if (_nft.isClaimed === true) {
          _claimedNFTs.push(_nft.nft);
        }
      }
    );

    const nftNames = Array.from(state.nftInfos || new Map()).map(
      ([nft, name]) => ({ nft, name })
    );

    _forEach(nftNames, function(row) {
      _NFTInfo[row.nft] = { ..._NFTInfo[row.nft], name: row.name };
    });

    setStats({
      totalRewardableAmount: state.totalRewardableAmount,
      userTotalClaimableAmount: state.userTotalClaimableAmount,
    });

    setClaimedNFTs(_claimedNFTs);
    setNFTInfo(_NFTInfo);

    setStakedNFTs(
      Array.from(state.userDummyNfts).map((dn) => dummyNftMaps[dn])
    );
    setUnStakedNFTs(Array.from(state.userHRServerNfts));
  };

  const stake = async () => {
    try {
      setTxStatus("Confirm Transaction on wallet.");

      let hash = await connectivity.stake(selectedNFT.selected);

      setTxStatus(
        `Processing Staking, <a target="_blank" href="https://explorer.solana.com/tx/${hash}?cluster=devnet">Check here</a>`
      );

      setTimeout(() => {
        setTxStatus("Staking Processed");
      }, 2000);
    } catch (error) {
      setTxStatus(error?.message);
    }
  };

  const unStake = async () => {
    try {
      setTxStatus("Confirm Transaction on wallet.");

      let hash = await connectivity.unstake(selectedNFT.selected);

      setTxStatus(
        `Processing UnStaking, <a target="_blank" href="https://explorer.solana.com/tx/${hash}?cluster=devnet">Check here</a>`
      );

      setTimeout(() => {
        setTxStatus("UnStaking Processed");
      }, 2000);
    } catch (error) {
      setTxStatus(error?.message);
    }
  };

  const getReward = async () => {
    try {
      setTxStatus("Confirm Transaction on wallet.");

      let hash = await connectivity.getReward(selectedNFT.selected);

      setTxStatus(
        `Processing Reward, <a target="_blank" href="https://explorer.solana.com/tx/${hash}?cluster=devnet">Check here</a>`
      );

      setTimeout(() => {
        setTxStatus("Reward Processed");
      }, 2000);
    } catch (error) {
      setTxStatus(error?.message);
    }
  };

  useEffect(() => {
    if (wallet.connected) {
      fetchNfts();
    }

    // eslint-disable-next-line
  }, [wallet.connected, wallet.publicKey]);

  return (
    <div id="wrapper">
      <Header />

      <section className="content">
        <div
          className="container-fluid"
          // style={{ paddingRight: "10%", paddingLeft: "10%" }}
        >
          <div className="row">
            <div className="col-md-12">
              <div className="mint-page-panel text-center">
                <h2 className="text-center content-title">STAKE YOUR NDR</h2>
                <span className="text-center content-title-sub">
                  REWARDS MULTIPLIER
                </span>
                <span className="text-center content-title-sub">
                  1-2 NFT = NO BONUS
                </span>
                <span className="text-center content-title-sub">
                  3-5 NFT = 5% BONUS
                </span>
                <span className="text-center content-title-sub">
                  5+ NFT = 10% BONUS
                </span>
                <span
                  className="text-center content-title-sub my-3"
                  style={{ wordBreak: "break-all" }}
                  dangerouslySetInnerHTML={{ __html: txStatus }}
                ></span>
              </div>
            </div>
          </div>

          <div className="row text-white text-center">
            <div className="col-md-4 col-sm-12 mb-3">
              <span className="text-center content-title-sub">
                AVAILABLE TO STAKE
              </span>
              <div id="unStackedTokenList" className="row box1 mt-3 mb-3">
                <div className="row">
                  {unStakedNFTs.map((nft) => (
                    <div
                      key={nft}
                      onClick={() =>
                        setSelectedNFT({
                          selected: nft,
                          active: "unstaked",
                          nftId: -1,
                        })
                      }
                      className="col-md-4 col-sm-12 text-center"
                    >
                      <div className="box1-small3 mb-2 green-check-btn">
                        {selectedNFT.selected === nft && (
                          <img
                            className="green-check "
                            src={require("./assets/check1.png")}
                            alt="Header"
                          />
                        )}
                      </div>
                      <span>{NFTInfo[nft].name}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <p>
                  Select the NFT you <br />
                  would like to Stake
                </p>
                <button
                  className="btn box-btn"
                  id="appoveBtn"
                  style={{ display: "none" }}
                  data-toggle="modal"
                  data-target="#approveBackdrop"
                >
                  SET APPROVE FOR ALL
                </button>
                <button
                  disabled={
                    selectedNFT.selected === "" ||
                    selectedNFT.active !== "unstaked"
                  }
                  className="btn box-btn"
                  id="stakeBtn"
                  onClick={() => stake()}
                >
                  STAKE
                </button>
              </div>
            </div>

            <div className="col-md-4 col-sm-12 col-sm-12 mb-3">
              <span className="text-center content-title-sub">STAKED NFT</span>
              <div id="stackedTokenList" className="row box1 mt-3 mb-3 pb-0">
                <div className="row">
                  {stakedNFTs.map((nft) => (
                    <div
                      key={nft}
                      onClick={() =>
                        setSelectedNFT({
                          selected: nft,
                          active: "staked",
                          nftId: -1,
                        })
                      }
                      className="col-md-4 col-sm-12 col-sm-12 text-center"
                    >
                      <div className="box1-small3 mb-2 green-check-btn">
                        {selectedNFT.selected === nft && (
                          <img
                            className="green-check "
                            src={require("./assets/check1.png")}
                            alt="Header"
                          />
                        )}
                      </div>
                      <span>{NFTInfo[nft].name}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <p>
                  Select the NFT you
                  <br />
                  would like to Unstake
                </p>
                <button
                  disabled={
                    selectedNFT.selected === "" ||
                    selectedNFT.active !== "staked"
                  }
                  className="btn box-btn"
                  onClick={() => unStake()}
                >
                  UNSTAKE
                </button>
              </div>
            </div>

            <div className="col-md-4 col-sm-12 col-sm-12 mb-3">
              <span className="text-center content-title-sub">
                $TOKEN SUMMARY
              </span>
              <div className="box1 mt-3 mb-3 box3">
                <div className="box-summary">
                  <span>Total Rewardable</span>
                  <span>{stats.totalRewardableAmount.toFixed(4)}</span>
                </div>
                <div className="box-summary">
                  <span>Total Claimable Amount</span>
                  <span>{stats.userTotalClaimableAmount.toFixed(4)}</span>
                </div>
                <div className="box-summary">
                  <span>Claimable Reward Amount</span>
                  <span>
                    {_get(
                      NFTInfo,
                      `${selectedNFT.selected}.claimableRewardAmount`,
                      "-"
                    )}
                  </span>
                </div>
              </div>
              <div>
                <p>
                  Click below to claim your $TOKEN
                  <br />
                  (there will be a small gas fee)
                </p>
                <button
                  disabled={
                    selectedNFT.selected === "" ||
                    claimedNFTs.indexOf(selectedNFT.selected) > -1
                  }
                  onClick={() => getReward()}
                  className="btn box-btn"
                >
                  CLAIM
                </button>
              </div>
            </div>
          </div>

          <div className="row text-center mt-5">
            <div className="col-md-12">
              <p className="text-center text-white">
                <strong>
                  NOTE: STAKING FREEZES YOUR NFT FOR 30 DAYS MINIMUM
                </strong>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Stake;
