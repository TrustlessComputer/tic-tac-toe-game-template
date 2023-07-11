import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "hardhat-deploy";
import "@ericxstone/hardhat-blockscout-verify";
import "@openzeppelin/hardhat-upgrades";

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.19",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    nos: {
      url: "https://node.l2.trustless.computer/",
      accounts: {
        mnemonic: "<your mnemonic with funds>",
      },
      // issue: https://github.com/NomicFoundation/hardhat/issues/3136
      // workaround: https://github.com/NomicFoundation/hardhat/issues/2672#issuecomment-1167409582
      timeout: 100_000,
    },
  },
  namedAccounts: {
    deployer: 0,
    upgradeAddress:{
      default: 1, // here this will by default take the second account as feeCollector (so in the test this will be a different account than the deployer)
      1: '0x01e7663F7359698E2B1da534b478b71e4b0D50e9', // on the mainnet the feeCollector could be a multi sig
    }
  },
};

export default config;
