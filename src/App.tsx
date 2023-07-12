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
import { Connectivity, CreateStakingRoundInput } from './connectivity';

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
  const nft = new web3.PublicKey("AsYSP3768d74eaF9uVFQ1DXNdm3xY5x7FJUmLH5nQD7B") // White
  // const nft = new web3.PublicKey("CjGDsVqhN1tPvkrosZ3pExAkQcM4XTBZK3no6xLcJA7V") // White
  // const nft = new web3.PublicKey("FuJfTTWEbapSxQ3Q847aNsCqNBGbqK38uRM8KAnmZe1y") // Diamond
  // const nft = new web3.PublicKey("GMrM9Y2KvSzmiquxT7xdNt5rdDM2h6xA82m5xVTxGC5C") // Diamond 
  // const nft = new web3.PublicKey("5oone1oqCBdPHvxsoEdTffiWWGf9GJHU4LFfSYSxQ24f") // Legendary
  // const nft = new web3.PublicKey("Ap9F4Z38hcmVuEvCAdfp3WxkPDRXm1N3N9BMsHmLNyVv") // Legendary

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

    <button onClick={async () => {
      let res = await connectivity.getReward(nft);
    }}>
      Get Reward
    </button>

    <hr></hr>

    <button onClick={async () => {
      const res = await connectivity.__getMainStateInfo()
      log("res: ", res)

    }}>Get Full State</button>

    <br></br>
    <br></br>
    <hr></hr>
    <h4>Admin Calls</h4>
    <br></br>

    <button onClick={async () => {
      const input: CreateStakingRoundInput = {
        rewardAmount: 0.1,
        //TODO Start time can be upcoming time and we can not it make sure the time in Seconds not in miliSeconds
        roundStartTime: Math.trunc(Date.now() / 1000),
        roundDurationInDays: 1,
      }
      await connectivity.createStakingRound(input);
    }}>Create Staking Round</button>


    <button onClick={async () => {
      await connectivity.calculateRewardAndDistribute();
      // await connectivity.updateProgramStateOwner();

      // const id = await connectivity.__getDummyNftId(nft);
      // log("Dummy nftID: ",id.toBase58())

    }}>Calculate and Distribute the Reward</button>

  </>
}

export default App;
