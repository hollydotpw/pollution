import { ComponentChildren } from 'preact';

import styles from './styles.scss';

type SectionProps = {
  readonly id: string;
  readonly title: string;
  readonly children?: ComponentChildren;
};

export default function Section({
  id,
  title,
  children,
}: SectionProps): JSX.Element {
  return (
    <section className={styles.section} id={id}>
      <h1 className={styles.title}>{title}</h1>
      {children}
    </section>
  );
}

Section.defaultProps = {
  children: null,
};
