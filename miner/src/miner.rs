use crate::proof_of_work;

use rand::random;
use std::{sync::Arc, thread};
use web3::types::{Address, U256};
use crossbeam_utils::atomic::AtomicCell;

use tiny_keccak::{Hasher, Keccak};

fn hash(nonce: [u8; 32], reward_recipient: Address, parent_hash: [u8; 32]) -> [u8; 32] {
  let mut hasher = Keccak::v256();
  let mut output = [0u8; 32];
  hasher.update(&nonce);
  hasher.update(reward_recipient.as_fixed_bytes());
  hasher.update(&parent_hash);
  hasher.finalize(&mut output);

  output
}

pub fn work(
  difficulty: U256,
  parent_hash: [u8; 32],
  reward_recipient: Address,
  thread_count: u16,
) -> ([u8; 32], [u8; 32]) {
  let result = Arc::new(AtomicCell::new(None));

  let threads: Vec<_> = (0..thread_count)
    .map(|_| {
      let result = result.clone();

      thread::spawn(move || loop {
        if result.load().is_some() {
          return;
        }
        let nonce = random();
        let hashed = hash(nonce, reward_recipient, parent_hash);
        let valid = proof_of_work::verify_difficulty(hashed.into(), difficulty);

        if valid {
          result.store(Some((hashed, nonce)))
        }
      })
    })
    .collect();

  for thread in threads {
    thread.join().expect("thread died");
  }

  let output = result.load().unwrap();
  output
}
