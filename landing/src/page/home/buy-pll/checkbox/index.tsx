import { ComponentChildren } from 'preact';

import sel from 'pekoo/sel';
import styles from './styles.scss';

type CheckboxProps = {
  readonly children: ComponentChildren;
  readonly checked: boolean;
  readonly onClick: () => void;
};

export default function Checkbox({
  children,
  checked,
  onClick,
}: CheckboxProps): JSX.Element {
  return (
    <div
      className={styles.checkbox_container}
      onClick={onClick}
      role="button"
      aria-hidden="true"
    >
      <div className={styles.checkbox}>
        <div className={sel(checked && styles.checkbox_open)} />
      </div>
      {children}
    </div>
  );
}
