import { useEffect, useState } from 'preact/hooks';

import { fetchCurrentBlockAndBlockCount } from 'helper/mine-contract';

type Stats = {
  loading: boolean;
  difficulty: string;
  blockNumber: string;
  halvings: string;
};

export default function useStats(): Stats {
  const [stats, setStats] = useState({
    loading: true,
    difficulty: '0',
    blockNumber: '0',
    halvings: '0',
  });

  useEffect(() => {
    async function load() {
      const [blockCount, currentBlock] = await fetchCurrentBlockAndBlockCount();

      const halvings = blockCount / 100000n;

      setStats({
        loading: false,
        halvings: halvings.toLocaleString(),
        difficulty: currentBlock.difficulty.toLocaleString(),
        blockNumber: blockCount.toLocaleString(),
      });
    }

    load();
  }, []);

  return stats;
}
