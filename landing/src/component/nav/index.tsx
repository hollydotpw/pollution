import { Link } from 'wouter-preact';

import { PLL_TICKER } from 'constant/token';
import styles from './styles.scss';

type NavProps = {
  readonly onClick?: () => void;
};

export default function Nav({ onClick }: NavProps): JSX.Element {
  return (
    <ul>
      <li>
        <a href="/#about" onClick={onClick}>
          About
        </a>
      </li>
      <li>
        <a href="/#tokenomics" onClick={onClick}>
          Tokenomics
        </a>
      </li>

      <li>
        <a href="/#roadmap" onClick={onClick}>
          Roadmap
        </a>
      </li>

      <li>
        <Link href="/block-explorer" onClick={onClick}>
          Block Explorer
        </Link>
      </li>

      <li>
        <a href="#buy-pll" onClick={onClick}>
          <div className={styles.buy}>
            Buy
            {' '}
            <b>
              $
              {PLL_TICKER}
            </b>
          </div>
        </a>
      </li>
    </ul>
  );
}
