import { useEffect, useState } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";

import _get from "lodash/get";
import _forEach from "lodash/forEach";

import { Connectivity } from "./connectivity";

import "./Staking.css";
import Header from "./Header";

const Upgrade = () => {
  const wallet = useWallet();
  const { connection } = useConnection();
  const connectivity = new Connectivity(wallet, connection);

  const [txStatus, setTxStatus] = useState<string>("");

  const [oldNFTs, setOldNFTs] = useState({});
  const [unStakedNFTs, setUnStakedNFTs] = useState([]);
  const [NFTInfo, setNFTInfo] = useState({});

  const [loadingState, setLoadingState] = useState(false);

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
    setLoadingState(true);
    const state = await connectivity.__getMainStateInfo();

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

    const nftNames = Array.from(
      state.nftInfos ||
        new Map<
          string,
          {
            name: string;
            image: string;
          }
        >()
    ).map(([nft, nftInfo]) => ({ nft, name: nftInfo?.name }));

    const nftImages = Array.from(
      state.nftInfos ||
        new Map<
          string,
          {
            name: string;
            image: string;
          }
        >()
    ).map(([nft, nftInfo]) => ({ nft, name: nftInfo?.image }));

    _forEach(nftNames, function (row) {
      _NFTInfo[row.nft] = { ..._NFTInfo[row.nft], name: row.name };
    });

    _forEach(nftImages, function (row) {
      _NFTInfo[row.nft]["image"] = row.name;
    });

    setNFTInfo(_NFTInfo);

    setUnStakedNFTs(Array.from(state.userHRServerNfts));

    const USNfts = {};
    const OldNfts = setToObj(state.userOldNfts || new Set());
    _forEach(OldNfts, (ON, KY) => {
      USNfts[KY] = ON.nft;
    });

    setOldNFTs(USNfts);

    setLoadingState(false);
  };

  //Basically this function should take two nft address(oldNft and newNft)
  const upgradeNft = async () => {
    try {
      const state = await connectivity.__getMainStateInfo();

      const NewNfts = setToObj(state.programOwnedNewNfts || new Set());
      const newNft = _get(NewNfts, selectedNFT.nftId, {})?.nft;
      const oldNft = selectedNFT.selected;

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
      <Header />
      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <div className="mint-page-panel text-center">
                <h2 className="text-center content-title">UPGRADE YOUR HASH</h2>

                <span
                  className="text-center content-title-sub my-3"
                  style={{ wordBreak: "break-all" }}
                  dangerouslySetInnerHTML={{ __html: txStatus }}
                ></span>
              </div>
            </div>
          </div>

          <div className="row justify-content-around text-white text-center mt-5">
            <div className="col-md-6 col-sm-12 mb-3">
              <span className="text-center content-title-sub">
                AVAILABLE TO UPGRADE
              </span>
              <div id="OldTokenList" className="row box1 mt-3 mb-3">
                {loadingState ? <span>Loading...</span> : (
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
                        <div
                          className="box1-small3 mb-2 green-check-btn"
                          style={{
                            backgroundImage: `url(${NFTInfo[nft]?.image})`,
                            backgroundSize: "cover",
                            backgroundRepeat: "no-repeat",
                          }}
                        >
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
                )}
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

            <div className="col-md-6 col-sm-12 mb-3">
              <span className="text-center content-title-sub">
                ALREADY UPGRADED
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
                      <div className="box1-small3 mb-2 green-check-btn" style={{
                            backgroundImage: `url(${NFTInfo[nft]?.image})`,
                            backgroundSize: "cover",
                            backgroundRepeat: "no-repeat",
                          }}>
                        {selectedNFT.selected === nft && (
                          <img
                            className="green-check "
                            src={require("./assets/check1.png")}
                            alt="Header"
                          />
                        )}
                      </div>
                      <span>{NFTInfo[nft]?.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Upgrade;
