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
import { Connectivity, NftInfo, EditionNfts } from './connectivity';

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
            <WalletProvider wallets={wallets}>
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
    const [update, setUpdate] = useState(false)

    const c1Nfts = nfts?.c1Nfts?.length == null ? 0 : nfts.c1Nfts.length;
    const c2Nfts = nfts?.c2Nfts?.length == null ? 0 : nfts.c2Nfts.length;
    const c3Nfts = nfts?.c3Nfts?.length == null ? 0 : nfts.c3Nfts.length;

    const b1Require = 1;
    const b2Require = 4;
    const b3Require = 8;

    useEffect(() => {
        connectivity._getCollectionNft().then((value) => setNfts(value))
    }, [wallet.publicKey, update])

    log("nfts: ", nfts)



    return <>
        <div className="app">
            <WalletMultiButton />
            <button onClick={async () => {
                await connectivity._createNft();

                // await connectivity._getMetadata(connectivity.nft1)

                // await connectivity._getMetadata(new web3.PublicKey("tr8DtKTKsda3d8QVQssHGJ3VgdwD2drJUCcBxz5SAu7")) 
                // await connectivity._getMetadata(new web3.PublicKey("9juFNds5YraQJd88yU2x9uT9jxCD8KYwA5AMtFjABEkJ")) 

            }}>Click</button>

            <center>

                <div style={{ display: 'flex' }}>

                    <div style={{ display: 'block', padding: '20px', margin: '10px' }}>
                        <h4>Require {b1Require} | Available : {c1Nfts}</h4>
                        <button disabled={b1Require > c1Nfts} onClick={async () => {
                            await connectivity.burn(nfts.c1Nfts.slice(0, b1Require), connectivity.collectionNft1)
                            //NOTE: need reload or refresh page
                        }} >Burn#1</button>
                    </div>

                    <div style={{ display: 'block', padding: '20px', margin: '10px' }}>
                        <h4>Require {b2Require} | Available : {c2Nfts}</h4>
                        <button disabled={b2Require > c2Nfts} onClick={async () => {
                            await connectivity.burn(nfts.c2Nfts.slice(0, b2Require), connectivity.collectionNft2)
                            //NOTE: need reload or refresh page
                        }} >Burn#2</button>
                    </div>

                    <div style={{ display: 'block', padding: '20px', margin: '10px' }}>
                        <h4>Require {b3Require} | Available : {c3Nfts}</h4>
                        <button disabled={b3Require > c3Nfts} onClick={async () => {
                            await connectivity.burn(nfts.c3Nfts.slice(0, b3Require), connectivity.collectionNft3)
                            //NOTE: need reload or refresh page
                        }} >Burn#3</button>
                    </div>


                </div>
            </center>

        </div>
    </>
}

export default App;
