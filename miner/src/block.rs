use web3::types::{Address, U256};

type BlockTuple = (U256, U256, ethcontract::Bytes<[u8; 32]>, Address);

pub struct Block {
  pub timestamp: U256,
  pub difficulty: U256,
  pub hash: [u8; 32],
  pub reward_recipient: Address,
}

impl From<BlockTuple> for Block {
  fn from((timestamp, difficulty, hash, reward_recipient): BlockTuple) -> Self {
    Block {
      timestamp,
      difficulty,
      hash: hash.0,
      reward_recipient,
    }
  }
}
