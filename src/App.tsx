import { web3 } from '@project-serum/anchor';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { ConnectionProvider, WalletProvider, useWallet } from '@solana/wallet-adapter-react';
import { WalletModalProvider, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import {
    PhantomWalletAdapter,
    SolflareWalletAdapter,
    SolletWalletAdapter,
} from '@solana/wallet-adapter-wallets';
import { clusterApiUrl } from '@solana/web3.js';
import { useEffect, useMemo, useState } from 'react';
import { Connectivity, NftInfo, EditionNfts, MasterEditionNftsInfo, TransactionType } from './connectivity';
import './App.css'
import axios from "axios"

require('@solana/wallet-adapter-react-ui/styles.css');

const userApi = axios.create({ baseURL: "https://node-api-service-3imv474m7a-uc.a.run.app/api/" })
const log = console.log;
let isInit = false;

interface UserData {
    waddress: string,
    signature: string,
    claimed: string,
    time: Date
}

function App() {
    const solNetwork = WalletAdapterNetwork.Devnet;
    const endpoint = useMemo(() => clusterApiUrl(solNetwork), [solNetwork]);

    const wallets = useMemo(
        () => [
            new SolflareWalletAdapter(),
            new PhantomWalletAdapter(),
            new SolletWalletAdapter(),
        ],
        [solNetwork]
    );

    return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} autoConnect={true}>
                <WalletModalProvider>
                    <Content />
                </WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    );
}

const Content = () => {
    let wallet = useWallet();
    const connectivity = new Connectivity(wallet)
    const [masterEditionNftsInfo, setMasterEditionNftsInfo] = useState<MasterEditionNftsInfo>([]);
    const [nfts, setNfts] = useState<NftInfo>(null);
    const [update, setUpdate] = useState(true)
    const [userState, setUserState] = useState({
        burnCount: 0,
        currentValidation: null,
        isRewardable: false
    })

    const [userData, setUserData] = useState<UserData[]>([])
    const availableM1EditionNfts = nfts?.m1EditionNfts?.length == null ? 0 : nfts.m1EditionNfts.length;
    const availableM2EditionNfts = nfts?.m2EditionNfts?.length == null ? 0 : nfts.m2EditionNfts.length;
    const availableM3EditionNfts = nfts?.m3EditionNfts?.length == null ? 0 : nfts.m3EditionNfts.length;

    const b1Require = 1;
    const b2Require = 4;
    const b3Require = 8;

    let cardBtnText = userState.isRewardable ? "Claim" : "Burn";

    async function getAndSetUserData() {
        const res = await userApi.get('/user')
        const data = res.data;
        if (data == null) return
        setUserData(data.slice(0, 4))
    }

    const createLink = (address: string, prefix: string) => <a target='none' href={`https://solscan.io/${prefix}/${address}?cluster=devnet`}>{`${address.slice(0, 5)}...${address.slice(address.length - 6, address.length)}`}</a>

    useEffect(() => {
        const user = wallet.publicKey;
        connectivity._getMasterEditionNftInfo().then(setMasterEditionNftsInfo).catch(() => { setMasterEditionNftsInfo([]) })
        if (user != null) {
            getAndSetUserData()
            connectivity.__getUserStateInfo(user).then(setUserState).catch(() => {
                log("Seting default")
                setUserState({
                    burnCount: 0,
                    currentValidation: null,
                    isRewardable: false
                })
            })
        }


        if (!isInit) {
            connectivity._getEditionNfts().then((value) => setNfts(value))
            // isInit = true
        }
    }, [wallet.publicKey, update])

    log("nfts: ", nfts)
    log("UserState: ", userState)

    async function handle(nfts: EditionNfts) {
        if (userState?.isRewardable) {
            const rewardNft = new web3.PublicKey("51JtpRg2A8uHfWCnFxhDVqWuxkyJH7E2CcZDffMjGp5x")
            const signature = await connectivity.getRewardNft(rewardNft, TransactionType.Normal)
            if (signature == null) throw "Tx maybe fail"

            const postRequest = {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
            }

            userApi.post("/user",
                JSON.stringify({
                    waddress: connectivity?.wallet?.publicKey?.toBase58(),
                    claimed: rewardNft?.toBase58(),
                    signature
                })
                , postRequest
            ).then((res) => {
                log("post Res: ", res)
                getAndSetUserData()
            }).catch((e) => { log("Failed to send require") })

        } else {
            await connectivity.burn(nfts);
            Connectivity.sleep(15_000).then(async (e) => {
                const state = await connectivity.__getUserStateInfo(connectivity.wallet.publicKey)
                setUserState(state)
            })

            alert('Claim will available in few second')
        }
    }

    return <>
        <div className="navbar">
            <ul>
                <li><a href="#">
                    <WalletMultiButton />
                </a>
                </li>

                {/* ? For Testing purpose */}
                <button onClick={async () => {
                    await connectivity.__sendNftToProgram("51JtpRg2A8uHfWCnFxhDVqWuxkyJH7E2CcZDffMjGp5x")
                    // await connectivity._createNft()
                }}>ReSend</button>
            </ul>
        </div>

        <div className="title">
            <h1>IgniteSwap</h1>
        </div>

        <div className="powered-by">
            <p>Powered by YourCompany</p>
        </div>

        <div className="description">
            <p>This is a description about the title.</p>
        </div>


        <div className="row">
            <div className="card">
                <img src="image1.jpg" alt="Image 1" />
                <div className="card-column">
                    <div className='card-row'>
                        <p>Golden Tickets</p>
                        <div className="card-info">
                            <span>Require 1 edition NFT Burn to get Reward</span>
                            <p className='toolTip'>i</p>
                        </div>
                    </div>
                    <button disabled={
                        userState.currentValidation == null ? availableM1EditionNfts < b1Require :
                            !userState.isRewardable ? availableM1EditionNfts < b1Require : userState.currentValidation != 0
                    } onClick={async () => { await handle(nfts.m1EditionNfts.slice(0, b1Require)) }}
                    >{cardBtnText}</button>
                </div>
            </div>

            <div className="card">
                <img src="image2.jpg" alt="Image 2" />
                <div className="card-column">
                    <div className='card-row'>
                        <p>OG Status</p>
                        <div className="card-info">
                            <span>Require 4 edition NFTs Burn to get Reward</span>
                            <p className='toolTip'>i</p>
                        </div>
                    </div>
                    <button disabled={
                        userState.currentValidation == null ? availableM2EditionNfts < b2Require :
                            !userState.isRewardable ? availableM2EditionNfts < b2Require : userState.currentValidation != 1
                    } onClick={async () => { await handle(nfts.m2EditionNfts.slice(0, b2Require)) }}
                    >{cardBtnText}</button>
                </div>
            </div>

            <div className="card">
                <img src="image3.jpg" alt="Image 3" />
                <div className="card-column">
                    <div className='card-row'>
                        <p>Edition Claim</p>
                        <div className="card-info">
                            <span>Require 8 edition NFTs Burn to get Reward</span>
                            <p className='toolTip'>i</p>
                        </div>
                    </div>
                    <button disabled={
                        userState.currentValidation == null ? availableM3EditionNfts < b3Require :
                            !userState.isRewardable ? availableM3EditionNfts < b3Require : userState.currentValidation != 2
                    } onClick={async () => { await handle(nfts.m3EditionNfts.slice(0, b3Require)) }}
                    >{cardBtnText}</button>
                </div>
            </div>
        </div>

        <div className="small-title">
            <h2>Activity</h2>
        </div>
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Wallet Address</th>
                        <th>Edition Claimed</th>
                        <th>Transaction Signature</th>
                        <th>Time</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        userData.map((e) => {
                            return <tr>
                                <td>{createLink(e?.waddress, "account")}</td>
                                <td>{createLink(e?.claimed, "token")}</td>
                                <td>{createLink(e?.signature, "tx")}</td>
                                <td>{e?.time.toString()}</td>
                            </tr>
                        })
                    }
                </tbody>
            </table>
        </div>

        <hr></hr>
        <div className="small-title">
            <h2>States</h2>
        </div>

        <div className='card-row'>
            {masterEditionNftsInfo.map((e) => {
                return <div className="card-container">
                    <div className="card">
                        <img src={e?.image} alt="Image 4" />
                        <div className="card-column">
                            <div className='card-row'>
                                <p>{e?.name}</p>
                                <div className="card-info">
                                    <a href={e.link} className="card-link" target='none'>Scan</a>
                                </div>
                            </div>
                            <div className="card-description">
                                <p>Total Supply: {e?.totalSupply}</p>
                                <p>Circulating Supply: {e?.currentSupply}</p>
                            </div>
                        </div>
                    </div>
                </div>
            })}

        </div>

    </>
}

export default App;
