import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import {} from 'web3'
import { ConnectionProvider, WalletProvider, useWallet } from '@solana/wallet-adapter-react';
import { WalletModalProvider, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import {
    PhantomWalletAdapter,
    SolflareWalletAdapter,
    SolletWalletAdapter,
} from '@solana/wallet-adapter-wallets';
import { clusterApiUrl } from '@solana/web3.js';
import { useMemo } from 'react';
import './App.css';
import { Connectivity, StakingDuration } from './connectivity';

require('@solana/wallet-adapter-react-ui/styles.css');
const log = console.log;

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
    const wallet = useWallet();
    const connectivity = new Connectivity(wallet);

    return <>
        <WalletMultiButton />
        <hr />

        <button onClick={async () => {
            // const nftId = "GUsCm9d5SGukDbNDMsW7h6pjLoAQYnxWaL5AtGr4s8Hc";
            const nftId = "E2AUeWVJYYPNUxwkYRcqeES7ffQQMk6B3VMcqxHSfFo7";
            // const nftId = "B1kjLp3eRCkXM68N19hFUVr278UFv1ZCXyXPFdzVb3ya";
            await connectivity.stake(nftId, StakingDuration.STAKING_FOR_45_DAYS)
        }}>Stake</button>

        <button onClick={async () => {
            const nftId = "GUsCm9d5SGukDbNDMsW7h6pjLoAQYnxWaL5AtGr4s8Hc";
            await connectivity.unstake(nftId)
        }}>Unstake</button>

        <button onClick={async () => {
            const nftId = "B1kjLp3eRCkXM68N19hFUVr278UFv1ZCXyXPFdzVb3ya";
            await connectivity.sellNft(nftId, 0.035);
        }}>sell nft</button>


        <button onClick={async () => {
            const nftId = "GUsCm9d5SGukDbNDMsW7h6pjLoAQYnxWaL5AtGr4s8Hc";
            // const nftId = "E2AUeWVJYYPNUxwkYRcqeES7ffQQMk6B3VMcqxHSfFo7";
            // const nftId = "B1kjLp3eRCkXM68N19hFUVr278UFv1ZCXyXPFdzVb3ya";
            // let mainState = await connectivity.__getMainStateInfo();
            // log("mainState: ", mainState)
            // let userState = await connectivity.__getUserStateInfo(wallet.publicKey);
            // log("userState: ", userState)
            let nftStakeState = await connectivity.__getNftStateInfo(nftId);
            log("nftStakeState: ", nftStakeState)
        }}>getStateInfo</button>

        <button onClick={async () => {
            const signature = await connectivity.payFeeForReward();
            // "4thWBv3Fuiwib5VtUfhXWqiBr8zWjBvDUYaewViq6wQqDT61Ctfo2YyzGCPFAHiFRb3qK3Z5zWPCD5Bqmfc5gWdM"
        }}>Pay Fee </button>

        <button onClick={async () => {
            const res = await connectivity.getStakedNftsInfo();
            // const res = await connectivity.getUserNftsInfo();
            // const res = await connectivity.getNftOnMarketPlace();
            log("stakedNFTs: ", res);
        }}>Get Nft Info</button>

        <button onClick={async () => {
            const sign = "4thWBv3Fuiwib5VtUfhXWqiBr8zWjBvDUYaewViq6wQqDT61Ctfo2YyzGCPFAHiFRb3qK3Z5zWPCD5Bqmfc5gWdM"
            await connectivity.verifySignature(sign);

        }}> Signature Verification</button >


    </>
}

export default App;
