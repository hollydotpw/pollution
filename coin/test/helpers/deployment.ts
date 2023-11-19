import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';

import {
  PollutionMine,
  PollutionToken,
  PollutionMineMock,
  PollutionToken__factory,
  PollutionMine__factory,
  PollutionMineMock__factory,
} from '../../typechain-types';

type DeployOptions = Partial<{
  readonly grantMinterRole: boolean;
  readonly mock: boolean;
}>;

const DEFAULT_DEPLOY_OPTIONS: DeployOptions = { grantMinterRole: true };

export default class Deployment {
  public static deployToken(
    signer: SignerWithAddress,
  ): Promise<PollutionToken> {
    const factory = new PollutionToken__factory(signer);

    return factory.deploy();
  }

  private static async deployMine(
    signer: SignerWithAddress,
    pollutionToken: PollutionToken,
  ): Promise<PollutionMine> {
    const factory = new PollutionMine__factory(signer);

    return factory.deploy(pollutionToken.address);
  }

  private static async deployMineMock(
    signer: SignerWithAddress,
    pollutionToken: PollutionToken,
  ): Promise<PollutionMineMock> {
    const factory = new PollutionMineMock__factory(signer);

    return factory.deploy(pollutionToken.address);
  }

  static async grantMinterRole(
    pollutionToken: PollutionToken,
    pollutionMine: PollutionMine | PollutionMineMock,
  ) {
    const minter = await pollutionToken.minter();

    if (minter === pollutionMine.address) {
      return;
    }
    await pollutionToken.setMinter(pollutionMine.address);
  }

  public static async deploy<T = PollutionMine>(
    signer: SignerWithAddress,
    options: DeployOptions = {},
  ): Promise<[PollutionToken, T]> {
    const opts = { ...DEFAULT_DEPLOY_OPTIONS, ...options };

    const pollutionToken = await this.deployToken(signer);
    const pollutionMine = await this[
      opts.mock ? 'deployMineMock' : 'deployMine'
    ](signer, pollutionToken);

    if (opts.grantMinterRole) {
      await this.grantMinterRole(pollutionToken, pollutionMine);
    }

    return [pollutionToken, pollutionMine as any];
  }
}
