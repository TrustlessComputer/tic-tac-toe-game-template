const { ethers, upgrades } = require("hardhat");

async function main() {
  const V1contract = await ethers.getContractFactory("TicTacToe");
  console.log("Deploying TicTacToe...");
  const v1contract = await upgrades.deployProxy(V1contract, [30, 10000000000], {
    initializer: 'initialize(uint256,uint256)',
  });
  await v1contract.waitForDeployment();
  console.log("TicTacToe Contract deployed to:", await v1contract.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});