import chunk from 'pekoo/chunk';
import zeroPad from 'pekoo/zero-pad';
import removeZeroPrefix from 'pekoo/remove-zero-prefix';

import address from 'constant/address';
import ethCall from 'helper/eth-call';
import abify from 'pekoo/evm-abify';

const methods = {
  getBlockCount: {
    to: address.pollutionMine,
    data: '0xcc0bd62e', // getBlockCount()
  },
  getCurrentBlock: {
    to: address.pollutionMine,
    data: '0x672d5d3b', // getCurrentBlock()
  },
};

function parseBlockCount(result: string): bigint {
  return BigInt(result);
}

export type Block = {
  readonly timestamp: bigint;
  readonly difficulty: bigint;
  readonly hash: string;
  readonly recipient: string;
};

function parseBlock(result: string): Block {
  const [timestampRaw, difficultyRaw, hash, recipient] = chunk(
    removeZeroPrefix(result),
    64,
  );

  return {
    timestamp: BigInt(`0x${timestampRaw}`),
    difficulty: BigInt(`0x${difficultyRaw}`),
    hash,
    recipient,
  };
}

export async function getBlockMulti(indices: bigint[]): Promise<Block[]> {
  const method = '9a1824f9'; // getBlockMulti(uint256[])
  const args = abify(0x20, indices.length, ...indices);
  const [data] = await ethCall([
    {
      to: address.pollutionMine,
      data: `0x${method}${args}`,
    },
  ]);

  return chunk(data.result.slice(2 + 64 * 2), 64 * 4).map(parseBlock);
}

export async function getBlockCount(): Promise<bigint> {
  const [blockCount] = await ethCall([methods.getBlockCount]);

  return parseBlockCount(blockCount.result);
}

export async function fetchCurrentBlockAndBlockCount(): Promise<
[bigint, Block]
> {
  const [blockCount, currentBlock] = await ethCall([
    methods.getBlockCount,
    methods.getCurrentBlock,
  ]);

  return [parseBlockCount(blockCount.result), parseBlock(currentBlock.result)];
}
