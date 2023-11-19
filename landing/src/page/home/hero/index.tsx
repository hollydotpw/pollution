import { useEffect, useState } from 'preact/hooks';
import ChevronDownIcon from 'mdi-preact/ChevronDownIcon';
import RedditIcon from 'mdi-preact/RedditIcon';
import DiscordIcon from 'mdi-preact/DiscordIcon';
import GithubIcon from 'mdi-preact/GithubIcon';
import sel from 'pekoo/sel';

import useStats from 'hook/stats';

import canonical from 'constant/canonical';
import style from './style.scss';

function randomMotd() {
  const motds = [
    'the earth will cry',
    "we don't care",
    'only idiots care',
    'get back the power',
    'the earth is crying',
    'pollution is good',
    'the halving will happend',
    'ready to halv?',
    "it's too late to stop",
    'pow works',
    'the supply is fixed',
  ];

  return motds[Math.floor(Math.random() * motds.length)];
}

function Motd() {
  const [motd, setMotd] = useState(randomMotd());

  useEffect(() => {
    const id = setInterval(() => {
      const el = document.getElementById('motd');
      // console.log(el.style.webkitAnimation);
      el.style.animation = 'none';
      // eslint-disable-next-line
      el.offsetHeight;
      el.style.animation = '';
      setMotd(randomMotd());
    }, 2000);

    return () => clearInterval(id);
  }, []);

  return (
    <div className={sel(style.motd, style.hide_mobile)}>
      <div className={style.typewriter} id="motd" alt={motd}>
        {motd}
      </div>
    </div>
  );
}

function Loading() {
  return (
    <div className={style.loading}>
      <div>0</div>
      <div>0</div>
      <div>0</div>
      <div>0</div>
      <div>0</div>
    </div>
  );
}

export default function Hero(): JSX.Element {
  const {
    halvings, difficulty, blockNumber, loading,
  } = useStats();

  return (
    <div className={style.hero}>
      <div className={style.content}>
        <div className={sel(style.show_mobile, style.motd_mobile)}>
          Pollution?
          {' '}
          <br />
          yes
        </div>
        <Motd />
        <div className={style.stats}>
          <div>
            <div className={style.title}>halvings</div>
            <div className={style.value}>
              {loading ? <Loading /> : halvings}
            </div>
          </div>
          <div>
            <div className={style.title}>difficulty</div>
            <div className={style.value}>
              {loading ? <Loading /> : difficulty}
            </div>
          </div>
          <div>
            <div className={style.title}>block number</div>
            <div className={style.value}>
              {loading ? <Loading /> : blockNumber}
            </div>
          </div>
        </div>
      </div>

      <div className={style.social}>
        <a
          href={canonical.discord}
          alt="Discord"
          target="_blank"
          rel="noreferrer"
        >
          <DiscordIcon />
        </a>
        <a
          href={canonical.repository}
          alt="Github"
          target="_blank"
          rel="noreferrer"
        >
          <GithubIcon />
        </a>
      </div>

      <div className={style.mouse}>
        <ChevronDownIcon />
      </div>
    </div>
  );
}
/*

        <div className={style.stats}>
          <div>
            <div className={style.title}>price</div>
            <div className={style.value}>$1 USD</div>
          </div>
          <div className={style.hide_mobile}>
            <div className={style.title}>market cap</div>
            <div className={style.value}>$1 USD</div>
          </div>
        </div> */
