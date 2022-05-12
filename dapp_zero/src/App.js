import { useEffect } from 'react';
import { useState} from 'react';
import { ethers } from 'ethers';
import './App.css';
import contract from './contracts/contract.json';

const contractAddress = "0x1D78F9bD09b0224952B38d050e5FA443Db34f562";
const abi = contract;



function App() {

  const[currentAccount, setCurrentAccount] = useState(null);


  const checkWalletIsConnected = async() => {
    const {ethereum} = window;

    if(!ethereum){
      console.log("make sure you have metamask");
      return;
    }else{
      console.log("wallet exist")
    }

    const accounts = await ethereum.request({method: 'eth_accounts'});

    if (accounts.length!== 0){
      const account = account[0];
      console.log("found an authorized accout: ", account);
      setCurrentAccount(account);
    }else{
      console.log("no authorized account found");
    }

  }

  const connectWalletHandler = async() => {
    const {ethereum} = window;
    if(!ethereum){
      alert("please install metamask!")
    }
    try{
      const accounts = await ethereum.request({method: 'eth_requestAccounts'});
      console.log("Found an account! Address: ", accounts[0]);
      console.log(abi);
      setCurrentAccount(accounts[0]);
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const nftContract = new ethers.Contract(contractAddress, abi, signer);
    }catch(err){
      console.log(err)
    }


  }

  const connectWalletHandler2 = async() => {
    const {ethereum} = window;
    if(!ethereum){
      alert("please install metamask!")
    }
    try{
      const accounts = await ethereum.request({method: 'eth_requestAccounts'});
      console.log("Found an account! Address: ", accounts[0]);
      console.log(abi);
      setCurrentAccount(accounts[0]);
    }catch(err){
      console.log(err)
    }


  }

  const mintNftHandler = async () => {
    try{
      const {ethereum} = window;

      if(ethereum){
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const nftContract = new ethers.Contract(contractAddress, abi, signer);

        console.log("Initialize payment");
        let nftTxn = await nftContract.receive_amount_msgsender()
        console.log("Matic...please wait");
        await nftTxn.wait();

        console.log("Transaction executed  ${nftTxn.hash}");
      }else{
        console.log("ethereum object does not exist");
      }
    }catch (err){
      console.log(err);
    }

   }


  const connectWalletButton = () => {
    return (
      <button onClick={connectWalletHandler} className='cta-button connect-wallet-button'>
        Connect Wallet
      </button>
    )
  }

  const mintNftButton = () => {
    return (
      <button onClick={mintNftHandler} className='cta-button mint-nft-button'>
        Click here for MATIC
      </button>
    )
  }

  useEffect(() => {
    checkWalletIsConnected();
  }, [])

  return (
    <div className='main-app'>
      <h1>OTTIENI I TUOI MATIC</h1>
      <div>
        {currentAccount  ? mintNftButton() : connectWalletButton()}
      </div>
    </div>
  )
}

export default App;
