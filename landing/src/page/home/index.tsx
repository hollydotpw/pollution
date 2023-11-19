import { RouteComponentProps } from 'wouter-preact';
import {
  PLL_INITIAL_REWARD,
  PLL_SUPLLY,
  SUBSIDY_HALVING_INTERVAL,
  PLL_OWN_SUPLLY,
  PLL_TICKER,
} from 'constant/token';

import canonical from 'constant/canonical';
import address from 'constant/address';

import Wrapper from 'component/wrapper';
import styles from './styles.scss';

import Hero from './hero';
import Section from './section';
import FaqItem from './faq-item';
import Roadmap from './roadmap';
import BuyPll from './buy-pll';
import BackedBy from './backed-by';

export default function Home(_: RouteComponentProps): JSX.Element {
  return (
    <>
      <Hero />
      <Wrapper center className={styles.main}>
        <Section id="about" title="About">
          <p>
            Pollution is an ERC-20 token minted by solving proof-of-work
            challenges. It also uses the same bitcoin variables, the supply is
            fixed and the reward is halved every time that the subsidy interval
            is reached.
          </p>
          <p>
            It&apos;s called Pollution since we use proof-of-work to back the
            value of the token rather than as part for consensus algorithm.
          </p>
          <p><b>This is just a POC, don't take it seriously.</b></p>
        </Section>
        <Section id="backed-by" title="Backed By">
          <p>
            The value of Pollution is backed by 4 things: the
            {' '}
            <i>gas cost</i>
            {' '}
            of
            calling the mine method, the
            {' '}
            <i>electricy cost</i>
            {' '}
            of solving the
            proof-of-work challenge, all divided by the
            {' '}
            <i>current reward</i>
            {' '}
            and of course, plus what
            {' '}
            <i>you</i>
            {' '}
            think is the fair value.
          </p>

          <BackedBy />
        </Section>
        <Section id="what-the-messiah-said" title="What the Messiah said">
          <p>
            We all know Satoshi Nakamoto created bitcoin, but we didn&apos;t
            listen to him, the top cryptocurrencies are switching to
            proof-of-stake to only accomplice the stupidity of science
            illiterate people who believe that cryptocurrencies are one of the
            biggest sources of pollution.
          </p>
          <div className={styles.cite}>
            <div className={styles.wrapper}>
              <div className={styles.text}>
                {`"If a cryptocurrency does not use proof-of-work it's not a
              real cryptocurrency"`}
              </div>
              <div className={styles.satoshi}>- Satoshi Nakamoto</div>
            </div>
          </div>
          <p>Did you really think that he said that? Are you retarded?</p>
        </Section>
        <Section id="tokenomics" title="Tokenomics">
          <p>Here is a table with all you need to know about our token:</p>

          <div className={styles.tokenomics_container}>
            <div className={styles.tokenomics}>
              <div className={styles.info}>
                <div>Ticker</div>
                <div>Total supply</div>
                <div>Initial reward</div>
                <div>Halving blocks</div>
                <div>Halving time</div>
                <div>Algorithm</div>
                <div>Standard</div>
                <div>Blockchain</div>
              </div>
              <div>
                <div>
                  <b>
                    $
                    {PLL_TICKER}
                  </b>
                </div>
                <div>{PLL_SUPLLY.toLocaleString()}</div>
                <div>{PLL_INITIAL_REWARD.toLocaleString()}</div>
                <div>{SUBSIDY_HALVING_INTERVAL.toLocaleString()}</div>
                <div>10 minutes</div>
                <div>KECCAK256</div>
                <div>ERC-20</div>
                <div>Polygon</div>
              </div>
            </div>
          </div>
        </Section>
        <Section id="roadmap" title="Roadmap">
          <p>
            Our roadmap is tied on how much money we make selling our
            {' '}
            <b>
              $
              {PLL_TICKER}
            </b>
            {' '}
            tokens (we own
            {' '}
            {PLL_OWN_SUPLLY.toLocaleString()}
            % of the supply).
          </p>
          <Roadmap />
        </Section>
        <Section id="faq" title="Frequently asked questions">
          <p>All the shit you need to know.</p>
          <div className={styles.faq}>
            <FaqItem q="Are you going to pull the rug?">
              To be fair, we are currenly &quot;pulling the rug&quot;, We own
              {' '}
              {PLL_OWN_SUPLLY.toLocaleString()}
              % of the supply and we are
              currently selling it to pay for the hosting, domain, audit, smart
              contract deployment, hookers and cocaine. We don&apos;t plan on
              miting or mining more. We also have control over the mint method
              of the smart contract (we plan to loss the privileges after the
              audit).
            </FaqItem>
            <FaqItem q="Where is the whitepaper?">
              This website also works as the whitepaper, all the caracteristic
              of this token are explained here, if you want even more
              information you should look at the
              {' '}
              <a href={canonical.repository} target="_blank" rel="noreferrer">
                source code
              </a>
              .
            </FaqItem>
            <FaqItem q="Who is behind Pollution?">
              A new startup called Magical. Not registered legally yet nor plan
              to.
            </FaqItem>
            <FaqItem q="How to mine?">
              <p>
                Our current miner currently in an alpha phase, and remember that
                we don&apos;t have a pool protocol yet, so you are competing
                versus all the miners. It&apos;s like solo mining bitcoin, we
                predict that the dificulty will be low for a long time, so
                don&apos;t be lazy and take advantage of it.
              </p>
              <p>
                You can find the instructions about how to build the miner at
                our
                {' '}
                <a href={canonical.miner} target=" _blank">
                  source code
                </a>
                {' '}
                repository.
              </p>
            </FaqItem>
            <FaqItem q="How to contact the staff?">
              We currently discord (
              <a href={canonical.discord} target="_blank" rel="noreferrer">
                {canonical.discord}
              </a>
              ) and our email
              {' '}
              <a href={canonical.mailto} target="_blank" rel="noreferrer">
                contact@magical.sh
              </a>
              . You can contact us there.
            </FaqItem>
            <FaqItem q="Is this a scam?">
              No, feel free to read the source code and verify the deployed
              bytecode.
            </FaqItem>
          </div>
        </Section>
        <Section id="buy-pll" title={`Buy $${PLL_TICKER}`}>
          <p>Let&apos;s check if you are not an stupid investor.</p>
          <BuyPll />
        </Section>
        <Section id="addresses" title="Addresses">
          <p>
            These are the address where Pollution&apos;s smart contracts are
            deployed on Polygon:
          </p>
          <div className={styles.list}>
            <div>
              <div className={styles.title}>Pollution Token (ERC-20)</div>
              <div className={styles.address}>{address.pollutionToken}</div>
            </div>
            <div>
              <div className={styles.title}>Pollution Mine (MG-01)</div>
              <div className={styles.address}>{address.pollutionMine}</div>
            </div>
          </div>
        </Section>
      </Wrapper>
      <footer className={styles.footer}>
        <a href="https://magical.sh" target=" _blank" rel="noreferrer">
          developed by magical
        </a>
      </footer>
    </>
  );
}
