import { RouteComponentProps } from 'wouter-preact';
import { useCallback, useEffect, useState } from 'preact/hooks';
import Wrapper from 'component/wrapper';

import { getBlockMulti, getBlockCount } from 'helper/mine-contract';
import { INITIAL_BLOCK_INDEX } from 'constant/token';

import Waypoint from 'component/waypoint';
import Loading from 'component/loading';
import Block from './block';

import styles from './styles.scss';

async function fetchBlocks(page: number, itemsPerPage: number) {
  const blockCount = await getBlockCount();
  const pivot = page * itemsPerPage;

  const blockIndices = [...Array(itemsPerPage)]
    .map((_, i) => blockCount - BigInt(i) - BigInt(pivot))
    .filter(
      (blockIndex) => blockIndex < blockCount && blockIndex >= INITIAL_BLOCK_INDEX,
    );

  if (!blockIndices.length) {
    return [];
  }

  const blocks = await getBlockMulti(blockIndices);

  return blocks.map((block, i) => ({
    ...block,
    number: blockIndices[i],
  }));
}

export default function BlockExplorer(_: RouteComponentProps): JSX.Element {
  const [data, setData] = useState({
    loading: false,
    loaded: true,
    page: 0,
    blocks: [],
  });

  const load = useCallback(async () => {
    if (data.loading) {
      return;
    }

    setData((_data) => ({ ..._data, loading: true }));

    const blocks = await fetchBlocks(data.page, 10);

    setData((_data) => ({
      blocks: [..._data.blocks, ...blocks],
      page: _data.page + 1,
      loading: false,
      loaded: true,
    }));
  }, [data.page, data.loading]);

  useEffect(() => {
    load();
  }, []); // eslint-disable-line

  return (
    <Wrapper center headerPadding>
      {data.blocks.map((block) => (
        <Block block={block} />
      ))}
      {data.loading && (
        <div className={styles.loading}>
          <Loading />
        </div>
      )}
      {!data.loading && <Waypoint onEnter={load} />}
    </Wrapper>
  );
}
