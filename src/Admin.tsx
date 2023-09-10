import { useState } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

import { Connectivity, CreateStakingRoundInput } from "./connectivity";

import "./Staking.css";

const Admin = () => {
  const wallet = useWallet();
  const { connection } = useConnection();
  const connectivity = new Connectivity(wallet, connection);
  const [rewardAmount, setRewardAmount] = useState("");

  return (
    <div id="wrapper">
      <section className="header">
        <div className="container-fluid">
          <div className="row header-row">
            <div className="col-sm-3 text-center">
              {/* <Link className="text-white" to="/upgrade">
                Upgrade
              </Link>
              <Link className="ms-2 text-white" to="/">
                Stake
              </Link> */}
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

      <section className="d-flex flex-column align-items-center mx-auto">
        <div className="w-30">
          <button
            className="btn box-btn"
            onClick={async () => {
              try {
                const res = await connectivity.__getMainStateInfo();
                console.log("res: ", res);
              } catch (error) {
                console.log(error);
              }
            }}
          >
            Get Full State
          </button>
        </div>

        <div className="d-flex flex-column w-30">
          <button
            className="btn box-btn"
            style={{ margin: "15px" }}
            onClick={async () => {
              try {
                const input: CreateStakingRoundInput = {
                  roundStartTime: Math.trunc(Date.now() / 1000),
                };
                console.log("input", input);
                await connectivity.createStakingRound(input);
              } catch (error) {
                console.log(error);
              }
            }}
          >
            Create Staking Round
          </button>
        </div>

        <div className="w-30 mb-2 ms-2 ">
          <div className="input-group">
            <input
              className="form-control"
              value={rewardAmount}
              onChange={(e) => setRewardAmount(e.target.value)}
              placeholder="Enter Reward Amount"
            />
            <button
              type="button"
              className="btn btn-outline-secondary bg-white fw-bolder text-black"
              onClick={async () => {
                try {
                  await connectivity.endStakingRound({
                    rewardAmount: Number(rewardAmount),
                  });
                } catch (error) {
                  console.log(error);
                }
                // await connectivity.updateProgramStateOwner();

                // const id = await connectivity.__getDummyNftId(nft);
                // log("Dummy nftID: ",id.toBase58())
              }}
            >
              End Staking Round
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Admin;
