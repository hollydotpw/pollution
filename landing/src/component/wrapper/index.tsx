import { ComponentChildren } from 'preact';
import sel from 'pekoo/sel';
import styles from './styles.scss';

type WrapperProps = {
  readonly children: ComponentChildren;
  readonly className?: string;
  readonly center?: boolean;
  readonly headerPadding?: boolean;
};

export default function Wrapper({
  children,
  className,
  headerPadding,
  center,
}: WrapperProps): JSX.Element {
  return (
    <div
      className={sel(
        styles.wrapper,
        center && styles.center,
        headerPadding && styles.headerPadding,
        className,
      )}
    >
      {children}
    </div>
  );
}
