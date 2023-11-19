import styles from './styles.scss';

export default function BackedBy(): JSX.Element {
  return (
    <div className={styles.backed}>
      <div className={styles.fraction}>
        <div className={styles.pad}>
          <div className={styles.variable}>gas cost</div>
          <div className={styles.plus}>+</div>
          <div className={styles.variable}>electricy cost</div>
        </div>
        <div className={styles.variable}>current reward</div>
      </div>
      <div className={styles.plus}>+</div>
      <div className={styles.variable}>you</div>
      <div className={styles.plus}>=</div>
      <div className={styles.variable}>price</div>
    </div>
  );
}
