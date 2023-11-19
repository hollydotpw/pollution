import { ComponentChildren } from 'preact';

import sel from 'pekoo/sel';
import SvgUnpad from 'component/svg-unpad';
import useToggler from 'hook/toggler';

import ChevronDownIcon from 'mdi-preact/ChevronDownIcon';
import styles from './styles.scss';

type FaqItemProps = {
  readonly q: string;
  readonly children: ComponentChildren;
};

export default function FaqItem({ q, children }: FaqItemProps): JSX.Element {
  const [open, toggleOpen] = useToggler();

  return (
    <div className={sel(styles.item, open && styles.item_open)}>
      <div
        className={styles.q}
        onClick={toggleOpen}
        role="button"
        aria-hidden="true"
      >
        <span>{q}</span>
        {' '}
        <SvgUnpad component={ChevronDownIcon} />
      </div>
      <div className={styles.a}>
        {children}
        <div className={styles.spacer} />
      </div>
    </div>
  );
}
