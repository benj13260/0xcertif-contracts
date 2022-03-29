// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { Signer } from "ethers";
import { ethers } from "hardhat";

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const provider = new ethers.providers.JsonRpcProvider("https://api.avax-test.network/ext/bc/C/rpc",43113)
  let s : Signer  = new ethers.Wallet("8a0acf2c375a6064a758ea853ebd276f2fde578d97e9e84f83e222c1829c014d",provider)
  
  // Certif
  /*
  console.log("owner: "+ await s.getAddress());
  const Certif = await ethers.getContractFactory("Certif",s);
  const c = await Certif.deploy('jem','JEMB') //.deploy("Hello, Hardhat!");
  */

  // Token Creator
/*  
  const cf = await ethers.getContractFactory("TokenCreator",s);
  const c = await cf.deploy();
*/

  // Galleries
  const cf = await ethers.getContractFactory("Galleries");
  const c = await cf.deploy();

  await c.deployed();
  
  console.log("Certif deployed to:", c.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
