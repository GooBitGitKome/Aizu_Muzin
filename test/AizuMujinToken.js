const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("AizuMujin Token contract", function () {
  it("Deployment should assign the total supply of tokens to the owner", async function () {
    const [owner] = await ethers.getSigners();

    const Token = await ethers.getContractFactory("AizuMujinToken");

    const hardhatToken = await Token.deploy();

    //[ISSUE]the addresses must be exported as json file to make miss fewer when contract is re-deployed
    //now we have to change the addresses with our hands, annoying
    const ownerBalance = await hardhatToken.balanceOf(owner.address);
    expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);
  });
});