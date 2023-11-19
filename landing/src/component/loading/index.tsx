import styles from './styles.scss';

export default function Loading(): JSX.Element {
  return (
    <div className={styles.loading}>
      <div>0</div>
      <div>0</div>
      <div>0</div>
      <div>0</div>
      <div>0</div>
    </div>
  );
}
