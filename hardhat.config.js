require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

const API_KEY=process.env.API_KEY;
const METAMASK_ADDRESS=process.env.METAMASK_ADDRESS;
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",
  networks:{
    sepolia:{
      url:API_KEY,
      accounts:[METAMASK_ADDRESS]
    }
  },
};
