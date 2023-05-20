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
import { Connectivity, NftInfo, EditionNfts, TransactionType } from './connectivity';

require('@solana/wallet-adapter-react-ui/styles.css');

const log = console.log;
let isInit = false;

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
    const [tokenAmount, setTokenAmount] = useState(0)
    const connectivity = new Connectivity(wallet)
    const [nfts, setNfts] = useState<NftInfo>(null);
    const [update, setUpdate] = useState(true)
    const [userState, setUserState] = useState({
        burnCount: 0,
        currentValidation: null,
        isRewardable: false
    })

    const m1EditionNfts = nfts?.m1EditionNfts?.length == null ? 0 : nfts.m1EditionNfts.length;
    const m2EditionNfts = nfts?.m2EditionNfts?.length == null ? 0 : nfts.m2EditionNfts.length;
    const m3EditionNfts = nfts?.m3EditionNfts?.length == null ? 0 : nfts.m3EditionNfts.length;

    const b1Require = 1;
    const b2Require = 4;
    const b3Require = 8;

    useEffect(() => {
        const user = wallet.publicKey;
        if (user != null) connectivity.__getUserStateInfo(user).then(setUserState).catch(() => {
            log("Seting default")
            setUserState({
                burnCount: 0,
                currentValidation: null,
                isRewardable: false
            })
        })

        if (!isInit) {
            connectivity._getEditionNfts().then((value) => setNfts(value))
            // isInit = true
        }
    }, [wallet.publicKey, update])

    log("nfts: ", nfts)
    log("UserState: ", userState)

    return <>
        <div className="app">
            <WalletMultiButton />
            <button onClick={async () => {
                // await connectivity._createNft();

                //NOTE : 32LKHoKh6R5JMqcAAWXsYPRszRNuciB89mB7K9bBmAev 
                // send: ABqntxbQLuwenbiJR8euJm2aKeNjsjfdem4pUm9C9o1J
                // await connectivity.__sendNftToProgram("");
            }}>Click</button>

            <button disabled={userState?.isRewardable != true} onClick={async () => {
                await connectivity.getRewardNft(new web3.PublicKey("ABqntxbQLuwenbiJR8euJm2aKeNjsjfdem4pUm9C9o1J"), TransactionType.Normal);
            }}>Get Reward</button>

            <center>
                <div style={{ display: 'flex' }}>

                    <div style={{ display: 'block', padding: '20px', margin: '10px' }}>
                        <h4>Require {b1Require} | Available : {m1EditionNfts}</h4>
                        <button disabled={b1Require > m1EditionNfts} onClick={async () => {
                            await connectivity.burn(nfts.m1EditionNfts.slice(0, b1Require))
                            //NOTE: need reload or refresh page
                        }} >Burn#1</button>
                    </div>

                    <div style={{ display: 'block', padding: '20px', margin: '10px' }}>
                        <h4>Require {b2Require} | Available : {m2EditionNfts}</h4>
                        <button disabled={b2Require > m2EditionNfts} onClick={async () => {
                            await connectivity.burn(nfts.m2EditionNfts.slice(0, b2Require))
                            //NOTE: need reload or refresh page
                        }} >Burn#2</button>
                    </div>

                    <div style={{ display: 'block', padding: '20px', margin: '10px' }}>
                        <h4>Require {b3Require} | Available : {m3EditionNfts}</h4>
                        <button disabled={false} onClick={async () => {
                            // const input = x
                            await connectivity.burn(nfts?.m3EditionNfts?.slice(0, b3Require))
                            // await connectivity.burn(nfts?.m3EditionNfts)
                            //NOTE: need reload or refresh page
                        }} >Burn#3</button>
                    </div>
                </div>
            </center>

        </div>
    </>
}

export default App;
