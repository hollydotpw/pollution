use lazy_static::lazy_static;
use web3::types::U256;

lazy_static! {
  static ref DURATION_LIMIT: U256 = (10 * 60).into();
  static ref MAXIMUN_DIVISOR: U256 = 40.into();
  static ref MAX_DIFFICULTY_TARGET: U256 = U256::max_value();
}

pub fn calculate_difficulty(
  current_timestamp: U256,
  parent_timestamp: U256,
  parent_difficulty: U256,
) -> U256 {
  if current_timestamp < parent_timestamp {
    return parent_difficulty;
  }

  let delta: U256 = current_timestamp - parent_timestamp;

  if parent_difficulty < *MAXIMUN_DIVISOR {
    return *MAXIMUN_DIVISOR;
  }

  let quotient = parent_difficulty / *MAXIMUN_DIVISOR;

  if *DURATION_LIMIT > delta {
    return parent_difficulty + quotient;
  } else if *DURATION_LIMIT < delta {
    return parent_difficulty - quotient;
  }

  return parent_difficulty;
}

pub fn difficulty_to_target(difficulty: U256) -> U256 {
  return *MAX_DIFFICULTY_TARGET / difficulty;
}

pub fn verify_target(hash: U256, target: U256) -> bool {
  return hash < target;
}

pub fn verify_difficulty(hash: U256, difficulty: U256) -> bool {
  let target = difficulty_to_target(difficulty);

  return verify_target(hash, target);
}
