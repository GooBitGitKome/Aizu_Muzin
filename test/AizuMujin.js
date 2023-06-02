const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("AizuMujin contract", function () {
  it("token mint test", async function () {
    const [signer, add] = await ethers.getSigners();
    
    const Token = await ethers.getContractFactory("AizuMujin");

    const hardhatToken = await Token.deploy();
    expect(await hardhatToken.connect(signer).transfer(add ,hardhatToken.totalSupply));
    return {add};
  });
  it("transfer test", async function () {
    const [signer, add] = await ethers.getSigners();
    const Token = await ethers.getContractFactory("AizuMujin");
    const hardhatToken = await Token.deploy(signer.address);

    console.log("transfer");
    //const test = await hardhatToken.sendAllTokens(signer.address);
    expect();
  });
});