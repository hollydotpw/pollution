import dotenv from 'dotenv';
import { task } from 'hardhat/config';
import '@openzeppelin/hardhat-upgrades';
import '@typechain/hardhat';
import '@nomiclabs/hardhat-waffle';
import '@nomiclabs/hardhat-ethers';
import 'hardhat-abi-exporter';
import 'hardhat-gas-reporter';
import 'hardhat-tracer';
import { HardhatUserConfig } from 'hardhat/types';

dotenv.config();

task('accounts', 'Prints the list of accounts', async (args, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address, (await account.getBalance()).toBigInt());
  }
});

const mnemonic = process.env.MASTER_PRIVATE_KEY;

const config: HardhatUserConfig = {
  networks: {
    hardhat: {
      initialDate: '2021-05-16T22:37:47.645Z',
    },
    ...(mnemonic ? {
      mumbai: {
        url: 'https://rpc-mumbai.maticvigil.com',
        chainId: 80001,
        accounts: { mnemonic },
      },
    } : {}),
  },
  solidity: {
    version: '0.8.12',
    settings: {
      optimizer: {
        enabled: true,
        runs: 30000,
      },
    },
  },
  gasReporter: {
    currency: 'USD',
  },
};

export default config;
