import styles from './styles.scss';

type IPhrase = {
  readonly title: string;
  readonly description: string;
  readonly required: number;
};

const pharses: IPhrase[] = [
  {
    title: 'Audit',
    description: 'First of all, we need to sure that our smart contract is secure, that\'s why are contracting a team to audit it.',
    required: 5_000,
  },
  {
    title: 'Pool protocol',
    description: 'We don\'t have a pool protocol yet, miners can\'t unionize to mine together. We think that it can be decentralized but research it is need to be done, if we can\'t make it we will make a centralized one.',
    required: 10_000,
  },
  {
    title: 'New mines',
    description:
      'Why do we have to settle for a single mine? We can make anything mineable and create more pollution.',
    required: 50_000,
  },
  {
    title: 'Radioheads NFT',
    description:
      'Sure, we can make art of the habitats of our new polluted world.',
    required: 100_000,
  },
  {
    title: 'Final phase',
    description: 'The community will decide next roadmap of Pollution.',
    required: 200_000,
  },
];
const goal = 50_000;
const current = 10_000;

const percentage = (current * 100) / goal;

export default function Roadmap(): JSX.Element {
  return (
    <div className={styles.roadmap}>
      <div className={styles.progress}>
        <div className={styles.counter}>
          {percentage}
          %
        </div>
        <div
          className={styles.progress_inside}
          style={{ height: `${percentage}%` }}
        />
      </div>
      <div className={styles.phrases}>
        {pharses.map((pharse, i) => (
          <div className={styles.phrase} key={pharse.title}>
            <div className={styles.title}>{pharse.title}</div>
            <div className={styles.required}>
              {(pharses[i - 1]?.required || 0).toLocaleString()}
              {' '}
              -
              {(pharse.required).toLocaleString()}
            </div>
            <div className={styles.description}>{pharse.description}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
