import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { expect } from 'chai';
import { constants } from 'ethers';
import { ethers } from 'hardhat';
import { PollutionToken } from '@typechain-contracts';

import Deployment from './helpers/deployment';

describe('MinteableToken contract', () => {
  let alice: SignerWithAddress;
  let bob: SignerWithAddress;
  let craig: SignerWithAddress;
  let pollutionToken: PollutionToken;

  beforeEach(async () => {
    [alice, bob, craig] = await ethers.getSigners();
    pollutionToken = await Deployment.deployToken(alice);
  });

  it('should make the deployer be admin by default', async () => {
    const adminAddress = await pollutionToken.admin();
    expect(adminAddress).to.eq(alice.address);
  });

  it('should allow admins to change admin address', async () => {
    await pollutionToken.setAdmin(constants.AddressZero);
    const adminAddressFromContract = await pollutionToken.admin();
    expect(adminAddressFromContract).to.eq(constants.AddressZero);
  });

  it('should allow admins to change minter address', async () => {
    await pollutionToken.setMinter(constants.AddressZero);
    const adminAddressFromContract = await pollutionToken.minter();
    expect(adminAddressFromContract).to.eq(constants.AddressZero);
  });

  it('should revert if non-admins try to change admin address', async () => {
    const craigContract = pollutionToken.connect(craig);
    await expect(
      craigContract.setAdmin(constants.AddressZero),
    ).to.be.revertedWith('MinteableToken: not.admin');
  });

  it('should revert if non-admins try to change minter address', async () => {
    const craigContract = pollutionToken.connect(craig);
    await expect(
      craigContract.setMinter(constants.AddressZero),
    ).to.be.revertedWith('MinteableToken: not.admin');
  });

  it('should allow minters to mint', async () => {
    const mintAmount = 20;
    const aliceContract = pollutionToken.connect(alice);
    await aliceContract.setMinter(bob.address);

    const bobContract = pollutionToken.connect(bob);

    await expect(
      bobContract.mint(bob.address, mintAmount),
    ).to.not.be.revertedWith('MinteableToken: not.minter');
    expect(await bobContract.balanceOf(bob.address)).to.be.eq(mintAmount);
  });

  it('should revert if non-minters try to mint', async () => {
    await pollutionToken.setMinter(constants.AddressZero);

    const craigContract = pollutionToken.connect(craig);
    await expect(
      craigContract.mint(constants.AddressZero, 20),
    ).to.be.revertedWith('MinteableToken: not.minter');
  });
});
