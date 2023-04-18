import Navbar from "@/components/Navbr";
import Tasklist from "@/components/Tasklist";
import { useEffect, useState } from "react";
import { ethers } from "ethers"
import InsatllMetaMask from "@/components/InsatllMetamask";
import address from "../constants/adress"
import abi from "../constants/TaskContract.json"

const Home = () => {

  const [walletAddress, setWalletAddress] = useState(null);
  const [walletAmount, setWalletAmount] = useState(null)
  const[contract,setContract]=useState(null);

  const handleAccountChange=(...arg)=>{
    console.log("account changed");
    console.log(arg[0])
  }
  

  if(typeof window!=="undefined"){
   try{
    window.ethereum.on('accountsChanged',()=>{
      window.location.reload()
     })
   }
   catch(err){
    console.log(err);
   }
  }
  else{
    
    
  }


  

  useEffect(() => {

    const connectWallet = async () => {
      const Address = await window.ethereum.request({
        method: 'eth_requestAccounts'
      })
  
      setWalletAddress(Address[0]);
  
  
      const Amount = await window.ethereum.request({
        method: 'eth_getBalance',
        params: [Address[0], 'latest']
      })
  
      const amountInEther = await ethers.utils.formatEther(Amount);
      setWalletAmount(amountInEther);
  
     
    }
    connectWallet()    
  },[walletAddress,walletAmount])

  useEffect(()=>{
    const fetchContract=async()=>{
      
      const provider=await new ethers.providers.Web3Provider(window.ethereum);
      const signer=await provider.getSigner()
      const contractFetched=await new ethers.Contract(address,abi.abi,signer);
      await setContract(contractFetched);
    }

    fetchContract()
  },[])
  return (
    <>
      <div className="h-[100vh] bg-blue-300 msm:w-[100vw] " >
        {
          walletAddress == null ? (
           <InsatllMetaMask/>
          ) : (
            <div className="absolute overflow-scroll overflow-x-hidden  top-10 md:w-1/2 md:h-[90vh] md:left-96 rounded-3xl bg-blue-800 msm:left-8 msm:h-[91vh] msm:w-80  " >
              <Navbar />
              <Tasklist walletAddress={walletAddress} walletAmount={walletAmount} contract={contract} />
            </div>
          )
        }
      </div>


    </>
  )
}

export default Home;