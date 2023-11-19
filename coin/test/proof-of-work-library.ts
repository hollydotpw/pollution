import { expect } from 'chai';
import { constants } from 'ethers';
import { ethers } from 'hardhat';
import { ProofOfWorkMock } from '@typechain-contracts';
import readConst from './helpers/read-const';

const DURATION_LIMIT: bigint = readConst('DURATION_LIMIT');
const MAXIMUM_DIVISOR: bigint = readConst('MAXIMUM_DIVISOR');
const PARENT_TIMESTAMP: bigint = 1629604477n;
const PARENT_DIFFICULTY: bigint = 1000n;

describe('ProofOfWork library contract', () => {
  let proofOfWorkMock: ProofOfWorkMock;
  
  beforeEach(async () => {
    const [main] = await ethers.getSigners();
    const proofOfWorkMockFactory = await ethers.getContractFactory('ProofOfWorkMock', main);

    proofOfWorkMock = await proofOfWorkMockFactory.deploy() as ProofOfWorkMock;
  });


  async function calculateDifficulty(
    currentTimestamp: bigint,
    parentTimestamp: bigint,
    parentDifficulty: bigint,
    maximumDivisorConstant: bigint = MAXIMUM_DIVISOR,
    dureationLimitConstant: bigint = DURATION_LIMIT,
  ): Promise<bigint> {
    const result = await proofOfWorkMock.calculateDifficulty(
      currentTimestamp,
      parentTimestamp,
      parentDifficulty,
      maximumDivisorConstant,
      dureationLimitConstant,
    );

    return result.toBigInt();
  }
  
  describe('calculateDifficulty', () => {
    it('should raise difficulty if delta is higher than duartion limit constant', async () => {
      const result = await calculateDifficulty(
        PARENT_TIMESTAMP + DURATION_LIMIT + 1n,
        PARENT_TIMESTAMP,
        PARENT_DIFFICULTY
      );

      expect(result).to.be.eq(975n);
    });

    it('should lower difficulty if delta is lower than duartion limit constant', async () => {
      const result = await calculateDifficulty(
        PARENT_TIMESTAMP + 1n,
        PARENT_TIMESTAMP,
        PARENT_DIFFICULTY
      );

      expect(result).to.be.eq(1025n);
    });

    it('should keep the difficulty if delta is equal limit constant', async () => {
      const result = await calculateDifficulty(
        PARENT_TIMESTAMP + DURATION_LIMIT,
        PARENT_TIMESTAMP,
        PARENT_DIFFICULTY
      );

      expect(result).to.be.eq(PARENT_DIFFICULTY);
    });

    it('should fallback to max divisor constant if parent difficulty is lower than max divisor constant', async () => {
      const result = await calculateDifficulty(
        PARENT_TIMESTAMP + DURATION_LIMIT + 1n,
        PARENT_TIMESTAMP,
        10n,
        MAXIMUM_DIVISOR,
        DURATION_LIMIT,
      );
  
      expect(result).to.be.eq(MAXIMUM_DIVISOR);
    });
  });

  describe('computeHash', () => {
    it('should be a keccak256 hash', async () => {
      const result = await proofOfWorkMock.computeHash(new Uint8Array());

      expect(result).to.be.eq('0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470');
    });
  });

  describe('difficultyToTarget', () => {
    it('should generate a target from a difficulty', async () => {
      // TODO: ???
      const result = await proofOfWorkMock.difficultyToTarget(1000n);

      expect(result).to.be.eq('0x4189374bc6a7ef9db22d0e5604189374bc6a7ef9db22d0e5604189374bc6a7');
    });

    it('should be max uint256', async () => {
      const result = await proofOfWorkMock.difficultyToTarget(1n);

      expect(result).to.be.eq(constants.MaxUint256);
    });
  });


  describe('verifyTarget', () => {
    it('should return true if hash is lower than target', async () => {
      const result = await proofOfWorkMock.verifyTarget(10n, 15n);

      expect(result).to.be.eq(true);
    });

    it('should return false if hash is higher than target', async () => {
      const result = await proofOfWorkMock.verifyTarget(15n, 10n);

      expect(result).to.be.eq(false);
    });
  });


  describe('verifyDifficulty', () => {
    it('should return true if hash is lower than target', async () => {
      const result = await proofOfWorkMock.verifyDifficulty(0n, 10n);

      expect(result).to.be.eq(true);
    });

    it('should return false if hash is higher than target', async () => {
      const difficulty = 10n;

      const target = await proofOfWorkMock.difficultyToTarget(difficulty);
      const result = await proofOfWorkMock.verifyDifficulty(target.toBigInt() + 1n, difficulty);

      expect(result).to.be.eq(false);
    });
  });
});
