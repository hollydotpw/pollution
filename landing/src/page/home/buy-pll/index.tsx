import { useState, useCallback } from 'preact/hooks';

import ChevronLeftIcon from 'mdi-preact/ChevronLeftIcon';
import ChevronRightIcon from 'mdi-preact/ChevronRightIcon';

import canonical from 'constant/canonical';

import { PLL_TICKER } from 'constant/token';
import sel from 'pekoo/sel';
import styles from './styles.scss';
import Checkbox from './checkbox';

function useToggler(
  initalState = false,
): [boolean, () => void, (data: boolean) => void] {
  const [data, setData] = useState(initalState);

  const toggle = useCallback(() => setData((s) => !s), []);

  return [data, toggle, setData];
}

export default function BuyPll(): JSX.Element {
  const [dd, toggleDd] = useToggler();
  const [really, toggleReally] = useToggler();
  const [know, toggleKnow] = useToggler();

  return (
    <>
      <div className={styles.challenges}>
        <div className={styles.challenge}>
          <Checkbox checked={dd} onClick={toggleDd}>
            Have you done your due diligence?
          </Checkbox>
        </div>
        <div className={styles.challenge}>
          <Checkbox checked={really} onClick={toggleReally}>
            Really? Have you checked if all the claims are true?
          </Checkbox>
        </div>
        <div className={styles.challenge}>
          <Checkbox checked={know} onClick={toggleKnow}>
            I know that I am going to lose money and the market does not care
          </Checkbox>
        </div>
      </div>
      {dd && really && know ? (
        <div className={sel(styles.fixed, styles.genius)}>
          <div>
            WELL DONE, CLICK THE
            {' '}
            <b>BIG BUTTON</b>
            {' '}
            <br />
            AND BUY
            {' '}
            <b>
              $
              {PLL_TICKER}
            </b>
            {' '}
            NOW
          </div>
        </div>
      ) : (
        <div className={styles.fixed}>
          Well, we don&apos;t even care if you pass or not that test, you can
          buy
          {' '}
          <b>
            $
            {PLL_TICKER}
          </b>
          {' '}
          at
          {' '}
          <a href={canonical.pancakeswap} target=" _blank">
            Pancake Swap
          </a>
          . You can click the link or the big button to be redirected.
        </div>
      )}
      <div className={styles.buy_container}>
        <ChevronRightIcon className={styles.arrow} />
        <a
          className={styles.buy}
          href={canonical.pancakeswap}
          target="_blank"
          rel="noreferrer"
        >
          Buy
          {' '}
          <b>
            $
            {PLL_TICKER}
          </b>
        </a>
        <ChevronLeftIcon className={styles.arrow} />
      </div>
    </>
  );
}
