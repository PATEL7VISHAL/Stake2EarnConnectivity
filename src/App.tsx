import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { web3 } from '@project-serum/anchor'
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
import { Connectivity } from './connectivity';

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
    // const nft = new web3.PublicKey("5H6Tv8eDa6YrPF3Chsub36a65nF2fqRNAxQyxCC8QqCm")
    // const nft = new web3.PublicKey("D8HDemUwpZZgVhmcEF95kuYZEsDzXs2NJJERtLb11xox")
    const nft = new web3.PublicKey("8FsThUQoJDXe7dG5EzmU3hDHTmttq81xt8TfYjRvwwRH")

    return <>
        <WalletMultiButton />
        <hr />
        <button onClick={async () => {
            let res = await connectivity.stake(nft);
        }}>
            Stake
        </button>

        <button onClick={async () => {
            let res = await connectivity.unstake(nft);
        }}>
            Unstake
        </button>

    </>
}

export default App;
