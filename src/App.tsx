import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import { clusterApiUrl } from "@solana/web3.js";
import { useMemo } from "react";
import "./App.css";
// import Content from "./Content";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Upgrade from "./Upgrade";
import Admin from "./Admin";
import Stake from "./Stake";

require("@solana/wallet-adapter-react-ui/styles.css");

function App() {
  // const solNetwork = WalletAdapterNetwork.Devnet;
  const solNetwork = WalletAdapterNetwork.Mainnet;
  const endpoint = useMemo(() => clusterApiUrl(solNetwork), [solNetwork]);

  const wallets = useMemo(
    () => [
      new SolflareWalletAdapter(),
      new PhantomWalletAdapter(),
    ],
    // eslint-disable-next-line
    [solNetwork]
  );

  return (
    <ConnectionProvider endpoint={"https://solana-mainnet.g.alchemy.com/v2/wIrht2sL4LtKqalszbh4BmhWfmyAmjmm"}>
      {/*<ConnectionProvider endpoint={endpoint}>*/}
      <WalletProvider wallets={wallets} autoConnect={true}>
        <WalletModalProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" Component={() => <Stake />} />
              <Route path="/upgrade" Component={() => <Upgrade />} />
              <Route path="/admin" Component={() => <Admin />} />
            </Routes>
          </BrowserRouter>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}

export default App;
