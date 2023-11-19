import { RouteComponentProps } from 'wouter-preact';
import styles from './styles.scss';

export default function NotFound(_: RouteComponentProps): JSX.Element {
  return <div className={styles.nothing}>nothing to see here</div>;
}
