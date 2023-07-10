const { ethers, upgrades } = require("hardhat");

async function main() {
  const V1contract = await ethers.getContractFactory("TicTacToe");
  console.log("Deploying TicTacToe...");
  const v1contract = await upgrades.deployProxy(V1contract, [30, 10000000000], {
    initializer: "initialvalue",
  });
  await v1contract.deployed();
  console.log("TicTacToe Contract deployed to:", v1contract.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});