import { useEffect, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

import _get from "lodash/get";
import _forEach from "lodash/forEach";

import { Connectivity } from "./connectivity";

import { Link } from "react-router-dom";

import "./Staking.css";
import { web3 } from "@project-serum/anchor";

const Upgrade = () => {
  const wallet = useWallet();
  // const connection = useConnection().connection; //NOTE: use this instance for deployment.
  const connection = new web3.Connection("https://solana-mainnet.g.alchemy.com/v2/wIrht2sL4LtKqalszbh4BmhWfmyAmjmm")
  const connectivity = new Connectivity(wallet, connection);

  const [txStatus, setTxStatus] = useState<string>("");

  const [oldNFTs, setOldNFTs] = useState({});
  const [unStakedNFTs, setUnStakedNFTs] = useState([]);
  const [NFTInfo, setNFTInfo] = useState({});

  const [selectedNFT, setSelectedNFT] = useState({
    selected: "",
    active: "",
    nftId: -1,
  });

  const setToObj = (set) => {
    const outputObject = {};

    for (const item of set) {
      // Convert the item to a string for use as a key in the object
      // const key = String(item);
      outputObject[item[0]] = item[1];
    }

    return outputObject;
  };

  const fetchNfts = async () => {
    const dummyNftMaps = [];
    const _NFTInfo = {};

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
      }
    );

    const nftNames = Array.from(state.nftInfos || new Map()).map(
      ([nft, name]) => ({ nft, name })
    );

    _forEach(nftNames, function(row) {
      _NFTInfo[row.nft] = { ..._NFTInfo[row.nft], name: row.name };
    });

    setNFTInfo(_NFTInfo);

    setUnStakedNFTs(Array.from(state.userHRServerNfts));

    const USNfts = {};
    const OldNfts = setToObj(state.userOldNfts || new Set());
    _forEach(OldNfts, (ON, KY) => {
      USNfts[KY] = ON.nft;
    });

    setOldNFTs(USNfts);
  };

  //Basically this function should take two nft address(oldNft and newNft)
  const upgradeNft = async () => {
    try {
      const state = await connectivity.__getMainStateInfo();

      const NewNfts = setToObj(state.programOwnedNewNfts || new Set());
      const newNft = _get(NewNfts, selectedNFT.nftId, {})?.nft;
      const oldNft = selectedNFT.selected;

      console.log("params", oldNft, newNft);

      if (oldNft && newNft) {
        setTxStatus("Confirm Transaction on wallet.");

        let hash = await connectivity.upgradeNft(oldNft, newNft);

        setTxStatus(
          `Processing upgrage, <a target="_blank" href="https://explorer.solana.com/tx/${hash}?cluster=devnet">Check here</a>`
        );

        setTimeout(() => {
          setTxStatus("Upgrage Processed");
        }, 2000);
      } else {
        setTxStatus("Something went wrong!");
      }
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
      <section className="header">
        <div className="container-fluid">
          <div className="row header-row">
            <div className="col-sm-3 text-center">
              <Link className="text-white" to="/">
                Stake
              </Link>
              <Link className="ms-2 text-white" to="/admin">
                Admin
              </Link>
              {/* <button
                className="btn box-btn"
                onClick={async () => await upgradeNft()}
              >
                Upgrade NFT
              </button> */}
            </div>
            <div className="col-sm-6 text-center">
              <img
                className="logo-img"
                src={require("./assets/logohrs5.png")}
                alt="Header"
              />
            </div>
            <div className="col-sm-3 text-center">
              <WalletMultiButton />
            </div>
          </div>
        </div>
      </section>

      <section className="content">
        <div
          className="container-fluid"
          style={{ paddingRight: "10%", paddingLeft: "10%" }}
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

          <div className="row justify-content-around text-white text-center">
            <div className="col-4 mb-3">
              <span className="text-center content-title-sub">
                AVAILABLE TO UPGRADE
              </span>
              <div id="OldTokenList" className="row box1 mt-3 mb-3">
                <div className="row">
                  {Object.keys(oldNFTs).map((nftId) => {
                    const nft = oldNFTs[nftId];

                    return (
                      <div
                        key={nft}
                        onClick={() => {
                          setSelectedNFT({
                            selected: nft,
                            active: "old",
                            nftId: Number(nftId),
                          });
                        }}
                        className="col-4 text-center"
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
                        <span>#{nftId}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div>
                <p>
                  Select the NFT you <br />
                  would like to Upgrade
                </p>

                <button
                  disabled={
                    selectedNFT.selected === "" || selectedNFT.active !== "old"
                  }
                  className="btn box-btn me-2"
                  id="stakeBtn"
                  onClick={() => upgradeNft()}
                >
                  UPGRADE
                </button>
              </div>
            </div>

            <div className="col-4 mb-3">
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
                      className="col-4 text-center"
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

export default Upgrade;
