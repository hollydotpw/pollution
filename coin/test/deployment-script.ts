import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { expect } from 'chai';
import { ethers } from 'hardhat';

import { PollutionMine, PollutionToken } from '@typechain-contracts';
import Deployment from './helpers/deployment';

describe('Deployment script', () => {
  let pollutionToken: PollutionToken;
  let pollutionMine: PollutionMine;
  let alice: SignerWithAddress;

  before(async () => {
    [alice] = await ethers.getSigners();
    [pollutionToken, pollutionMine] = await Deployment.deploy(alice);
  });

  it('should have granted the roles', async () => {
    const adminAddress = await pollutionToken.admin();
    const minterAddress = await pollutionToken.minter();

    expect(adminAddress).to.eq(alice.address);
    expect(minterAddress).to.eq(pollutionMine.address);
  });
});
