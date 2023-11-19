import { batchEthCall as _batchEthCall, EthCall } from 'pekoo/eth-call';
import floatfy from 'pekoo/floatfy';
import chunk from 'pekoo/chunk';
import hex2bigint from 'pekoo/hex2bigint';
import abify from 'pekoo/abify';

function batchEthCall(data: EthCall[]) {
  return _batchEthCall('https://bsc-dataseed.binance.org/', data);
}

export default async function getAmountsOut(
  count = 10n ** 18n,
  token0 = '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c',
  token1 = '0xe9e7cea3dedca5984780bafc599bd69add087d56',
): Promise<void> {
  const unisawpRouter = '0x10ed43c718714eb63d5aa57b78b54704e256024e';
  const method = '0xd06ca61f';
  const args = abify(count, 40, 2, token0, token1);

  const [data] = await batchEthCall([
    {
      to: unisawpRouter,
      data: `${method}${args}`,
    },
  ]);

  const [, , amount, total] = chunk(data.result.slice(2), 64);
  console.log(floatfy(hex2bigint(amount), 18n));
  console.log(floatfy(hex2bigint(total), 18n));
}
