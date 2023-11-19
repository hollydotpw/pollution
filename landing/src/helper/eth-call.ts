import { batchEthCall as _batchEthCall, EthCall } from 'pekoo/eth-call';
import address from 'constant/address';

export default function batchEthCall(data: EthCall[]) {
  return _batchEthCall(address.rpc, data);
}
