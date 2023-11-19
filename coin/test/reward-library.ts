import { expect } from 'chai';
import { ethers } from 'hardhat';
import { RewardMock } from '@typechain-contracts';

import readConst from './helpers/read-const';

const SUBSIDY_HALVING_INTERVAL = readConst('SUBSIDY_HALVING_INTERVAL');
const INITIAL_REWARD = readConst('INITIAL_REWARD');

const FIXTURES = [
  [ 0n, 50000000000000000000n ],
  [ 210000n, 25000000000000000000n ],
  [ 420000n, 12500000000000000000n ],
  [ 630000n, 6250000000000000000n ],
  [ 840000n, 3125000000000000000n ],
  [ 1050000n, 1562500000000000000n ],
  [ 1260000n, 781250000000000000n ],
  [ 1470000n, 390625000000000000n ],
  [ 1680000n, 195312500000000000n ],
  [ 1890000n, 97656250000000000n ],
  [ 2100000n, 48828125000000000n ],
  [ 2310000n, 24414062500000000n ],
  [ 2520000n, 12207031250000000n ],
  [ 2730000n, 6103515625000000n ],
  [ 2940000n, 3051757812500000n ],
  [ 3150000n, 1525878906250000n ],
  [ 3360000n, 762939453125000n ],
  [ 3570000n, 381469726562500n ],
  [ 3780000n, 190734863281250n ],
  [ 3990000n, 95367431640625n ],
  [ 4200000n, 47683715820312n ],
  [ 4410000n, 23841857910156n ],
  [ 4620000n, 11920928955078n ],
  [ 4830000n, 5960464477539n ],
  [ 5040000n, 2980232238769n ],
  [ 5250000n, 1490116119384n ],
  [ 5460000n, 745058059692n ],
  [ 5670000n, 372529029846n ],
  [ 5880000n, 186264514923n ],
  [ 6090000n, 93132257461n ],
  [ 6300000n, 46566128730n ],
  [ 6510000n, 23283064365n ],
  [ 6720000n, 11641532182n ],
  [ 6930000n, 5820766091n ],
  [ 7140000n, 2910383045n ],
  [ 7350000n, 1455191522n ],
  [ 7560000n, 727595761n ],
  [ 7770000n, 363797880n ],
  [ 7980000n, 181898940n ],
  [ 8190000n, 90949470n ],
  [ 8400000n, 45474735n ],
  [ 8610000n, 22737367n ],
  [ 8820000n, 11368683n ],
  [ 9030000n, 5684341n ],
  [ 9240000n, 2842170n ],
  [ 9450000n, 1421085n ],
  [ 9660000n, 710542n ],
  [ 9870000n, 355271n ],
  [ 10080000n, 177635n ],
  [ 10290000n, 88817n ],
  [ 10500000n, 44408n ],
  [ 10710000n, 22204n ],
  [ 10920000n, 11102n ],
  [ 11130000n, 5551n ],
  [ 11340000n, 2775n ],
  [ 11550000n, 1387n ],
  [ 11760000n, 693n ],
  [ 11970000n, 346n ],
  [ 12180000n, 173n ],
  [ 12390000n, 86n ],
  [ 12600000n, 43n ],
  [ 12810000n, 21n ],
  [ 13020000n, 10n ],
  [ 13230000n, 5n ],
  [ 13440000n, 2n ],
  [ 13650000n, 1n ],
  [ 13860000n, 0n ]
];

describe('Reward library contract', () => {
  let rewardMock: RewardMock;
  
  beforeEach(async () => {
    const [main] = await ethers.getSigners();
    const rewardMockFactory = await ethers.getContractFactory('RewardMock', main);

    rewardMock = await rewardMockFactory.deploy() as RewardMock;
  });

  describe('calculate', () => {
    it('should be the result identical with fixtures', async () => {
      for (const [blockNumber, reward] of FIXTURES) {
        const result = await rewardMock.calculate(blockNumber, INITIAL_REWARD, SUBSIDY_HALVING_INTERVAL);
        expect(result.toBigInt()).to.eq(reward);
      }
    });
  });
});
