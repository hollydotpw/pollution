import floatfy from 'pekoo/floatfy';
import { PLL_INITIAL_REWARD, SUBSIDY_HALVING_INTERVAL } from './token';

export function calculateReward(
  blockIndex: bigint,
  initialReward: bigint,
  subsidyHalvingInterval: bigint,
): bigint {
  const halvings = blockIndex / subsidyHalvingInterval;

  let subsidy = initialReward * 10n ** 18n;
  // eslint-disable-next-line
  subsidy >>= halvings;

  return subsidy;
}

export function calculateRewards(blockCount: bigint): {
  readonly pll: bigint;
} {
  const reward = calculateReward(
    blockCount,
    PLL_INITIAL_REWARD,
    SUBSIDY_HALVING_INTERVAL,
  );

  return {
    pll: reward,
  };
}

export function bigint2float(number: bigint): number {
  return Number(floatfy(number, 18n));
}
