import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { expect } from 'chai';
import { ethers } from 'hardhat';
import { PollutionToken } from '@typechain-contracts';

import readConst from './helpers/read-const';
import Deployment from './helpers/deployment';

const SUPPLY_CAP = readConst('SUPPLY_CAP');
const DEVELOPER_TOKENS = readConst('DEVELOPER_TOKENS');

describe('PollutionToken contract', () => {
  let alice: SignerWithAddress;
  let pollutionToken: PollutionToken;

  beforeEach(async () => {
    [alice] = await ethers.getSigners();
    pollutionToken = await Deployment.deployToken(alice);
  });

  it('should have the defined supply cap', async () => {
    const supplyCap = await pollutionToken.cap();

    expect(supplyCap.toBigInt()).to.eq(SUPPLY_CAP);
  });

  it('should give the developer tokens to the deployer', async () => {
    const aliceBalance = await pollutionToken.balanceOf(alice.address);

    expect(aliceBalance.toBigInt()).to.eq(DEVELOPER_TOKENS);
  });
});
