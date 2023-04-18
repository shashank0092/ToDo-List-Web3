const hre=require("hardhat");



const main=async()=>{
  const TaskContract=await hre.ethers.getContractFactory("TaskContract");
  const tasks=await TaskContract.deploy();
  await tasks.deployed();
  console.log("Task Contract Deployed To->",tasks.address);
}

const runMain=async()=>{
  try{
    await main()
    process.exit(0)
  }
  catch(err){
    console.log(err);
    print.exit(1)
  }
}

runMain();