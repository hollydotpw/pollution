import { Link } from 'wouter-preact';
import { useState, useCallback } from 'preact/hooks';

import sel from 'pekoo/sel';

import MenuIcon from 'mdi-preact/MenuIcon';
import CloseIcon from 'mdi-preact/CloseIcon';

import Nav from 'component/nav';

import styles from './styles.scss';

export default function Header(): JSX.Element {
  const [tabOpen, setTabOpen] = useState(false);
  const toggleTabs = useCallback(() => setTabOpen((_) => !_), []);

  return (
    <>
      {tabOpen && (
        <div className={sel(styles.tabs, styles.tabs_mobile)}>
          <Nav onClick={toggleTabs} />
        </div>
      )}
      <header className={styles.header}>
        <Link href="/">
          <img src="/img/logo.svg" className={styles.logo} alt="logo" />
        </Link>

        <div
          className={styles.tabs_btn}
          onClick={toggleTabs}
          role="button"
          aria-hidden="true"
        >
          {tabOpen ? <CloseIcon /> : <MenuIcon />}
        </div>

        <div className={styles.tabs}>
          <Nav />
        </div>
      </header>
    </>
  );
}
