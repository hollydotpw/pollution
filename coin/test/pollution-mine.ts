import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { expect } from 'chai';
import { constants } from 'ethers';
import { ethers } from 'hardhat';
import { PollutionMine, PollutionMineMock, PollutionToken } from '@typechain-contracts';

import Deployment from './helpers/deployment';
import readConst from './helpers/read-const';


const INITIAL_BLOCK_INDEX = readConst('INITIAL_BLOCK_INDEX');
const INITIAL_DIFFICULTY = readConst('INITIAL_DIFFICULTY');
const GENESIS_BLOCK_HASH = readConst('GENESIS_BLOCK_HASH');
const SUBSIDY_HALVING_INTERVAL = readConst('SUBSIDY_HALVING_INTERVAL');
const INITIAL_REWARD = readConst('INITIAL_REWARD');

enum DifficultyMode {
  Default = 0,
  False = 1,
  True = 2,
};

describe('PollutionMine contract', () => {
  let alice: SignerWithAddress;
  let bob: SignerWithAddress;
  let craig: SignerWithAddress;
  let pollutionToken: PollutionToken;
  let pollutionMine: PollutionMine;
  let pollutionTokenMock: PollutionToken;
  let pollutionMineMock: PollutionMineMock;
  
  beforeEach(async () => {
    [alice, bob, craig] = await ethers.getSigners();
    [pollutionToken, pollutionMine] = await Deployment.deploy(alice);
    [pollutionTokenMock, pollutionMineMock] = await Deployment.deploy(alice, { mock: true });
  });

  function assertGenesisBlockConstants(difficulty: bigint, recipient: string, hash: bigint) {
    expect(difficulty).to.be.eq(INITIAL_DIFFICULTY);
    expect(recipient).to.be.eq(alice.address);
    expect(hash).to.be.eq(GENESIS_BLOCK_HASH);
  }

  it('should start with the initial block index constant', async () => {
    const blockCount = await pollutionMine.getBlockCount();

    expect(blockCount.toBigInt()).to.be.eq(INITIAL_BLOCK_INDEX + 1n);
  });

  it('should the current block be the genesis block', async () => {
    const block = await pollutionMine.getCurrentBlock();

    assertGenesisBlockConstants(
      block.difficulty.toBigInt(),
      block.recipient,
      BigInt(block.hash),
    );
  });
  
  it('should get block by index', async () => {
    const block = await pollutionMine.getBlock(INITIAL_BLOCK_INDEX);

    assertGenesisBlockConstants(
      block.difficulty.toBigInt(),
      block.recipient,
      BigInt(block.hash),
    );
  });
  
  it('should change difficulty', async () => {
    async function assetDifficultyMode(difficultyMode: DifficultyMode) {
      await pollutionMineMock.setDifficultyMode(difficultyMode);
      const expected = await pollutionMineMock.getDifficultyMode();
      expect(expected).to.be.eq(difficultyMode);
    }

    await assetDifficultyMode(DifficultyMode.Default);
    await assetDifficultyMode(DifficultyMode.True);
    await assetDifficultyMode(DifficultyMode.False);
  });
  
  it('should add a new block and give the reward to the miner', async () => {
    await pollutionMineMock.setDifficultyMode(DifficultyMode.True);
    const blockCountBefore = await pollutionMineMock.getBlockCount();

    await pollutionMineMock.mine(new Uint8Array(32), bob.address);
    const balance = await pollutionTokenMock.balanceOf(bob.address);
    expect(balance.toBigInt()).to.be.eq(INITIAL_REWARD);

    const blockCountAfter = await pollutionMineMock.getBlockCount();
    expect(blockCountAfter.toBigInt()).to.be.eq(blockCountBefore.toBigInt() + 1n);

    const currentBlock = await pollutionMineMock.getCurrentBlock();
    expect(currentBlock.recipient).to.be.eq(bob.address);
  });
  
  it('should get blocks in bulk', async () => {
    await pollutionMineMock.setDifficultyMode(DifficultyMode.True);
    const nums = [1, 2, 3, 4, 5];
    const addresses = nums.map(i => `0x${i}000000000000000000000000000000000000000`)

    for (const address of addresses) {
      await pollutionMineMock.mine(new Uint8Array(32), address); 
    }

    const blocksIndices = nums.map(num => BigInt(num) + INITIAL_BLOCK_INDEX);
    const blocks = await pollutionMineMock.getBlockMulti(blocksIndices);

    for (const i in addresses) {
      expect(blocks[i].recipient).to.be.eq(addresses[i])
    }
  });
});
