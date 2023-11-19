import CubeOutlineIcon from 'mdi-preact/CubeOutlineIcon';
import ClockTimeFiveOutlineIcon from 'mdi-preact/ClockTimeFiveOutlineIcon';
import CurrencyUsdIcon from 'mdi-preact/CurrencyUsdIcon';
import ExpansionCardVariantIcon from 'mdi-preact/ExpansionCardVariantIcon';
// import PickaxeIcon from 'mdi-preact/PickaxeIcon';
import PoundIcon from 'mdi-preact/PoundIcon';
import { ago } from 'pekoo/ago';

import { bigint2float, calculateRewards } from 'constant/reward';
import { Block as TBlock } from 'helper/mine-contract';
import styles from './styles.scss';

/*

        <a href="dsad" className={styles.align}>
          <PickaxeIcon /> view miner
        </a>
*/

type BlockProps = {
  readonly block: TBlock & { readonly number: bigint };
};

export default function Block({ block }: BlockProps): JSX.Element {
  const rewards = calculateRewards(block.number);

  return (
    <div className={styles.block}>
      <div className={styles.header}>
        <div className={styles.align}>
          <CubeOutlineIcon />
          {' '}
          {block.hash}
        </div>
      </div>
      <div className={styles.info}>
        <div className={styles.number}>
          <PoundIcon />
          {' '}
          {block.number.toLocaleString()}
        </div>
        <div className={styles.both}>
          <div className={styles.row}>
            <div className={styles.reward}>
              <div className={styles.r}>
                <CurrencyUsdIcon />
                PLL
              </div>
              {' '}
              :
              {' '}
              {bigint2float(rewards.pll).toLocaleString()}
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.align}>
              <ClockTimeFiveOutlineIcon />
              {' '}
              {ago(new Date(Number(block.timestamp) * 1000), new Date())}
            </div>
            <div className={styles.align}>
              <ExpansionCardVariantIcon />
              {' '}
              {block.difficulty.toLocaleString()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
