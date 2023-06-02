// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const { ethers } = require("hardhat");

async function main() {
  //const [deployer] = await ethers.getSigners();
  
  const AizuMujinToken = await ethers.getContractFactory("AizuMujinToken");
  const aizuMujinToken = await AizuMujinToken.deploy();

  const AizuMujin = await ethers.getContractFactory('AizuMujin');
  const aizuMujin = await AizuMujin.deploy(aizuMujinToken.address);



  console.log("Contracts deployed:");
  console.log("AizuMujin address:", aizuMujin.address);
  console.log("AizuMujinToken address:", aizuMujinToken.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});