mod block;
mod miner;
mod proof_of_work;

use block::Block;
extern crate clap;
use clap::Parser;

use ethcontract::{secret::PrivateKey, transaction::Account};
use std::{thread, time};
use web3::types::{Address, U256};

ethcontract::contract!(
  "./static/PollutionMine.json",
  contract = Mine
);

fn floatfy(wei: U256, base_length: usize) -> String {
  let base: U256 = U256::exp10(base_length);

  let (whole, fraction) = wei.div_mod(base);

  let mut fraction_str: String = fraction.to_string();

  while fraction_str.len() < base_length {
    fraction_str = format!("0{}", fraction_str);
  }

  let fration_result: String = if fraction_str == "0" {
    "".into()
  } else {
    format!(".{}", fraction_str)
  };

  return [whole.to_string(), fration_result].concat();
}

#[derive(Parser, Debug)]

#[command(name = "Miner", version = "0.0.1", author = "magical <contact@magical.sh>")]
struct Opts {
  /// Address of the smart contract
  #[arg(
    short,
    long,
    default_value = "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9"
  )]
  contract_address: Address,

  /// Thread count
  #[arg(short, long, default_value = "4")]
  threads: u16,

  /// Address that will receive the reward
  #[arg(short, long)]
  reward_recipient_address: Address,

  /// Account private key that will run the mine function on the smart contract
  #[arg(
    short,
    long,
  )]
  sender_private_key: String,

  /// Web3 Provider
  #[arg(short, long)]
  web3_provider: String,
}

fn seconds_since_epoch() -> U256 {
  let start = time::SystemTime::now();
  let since_the_epoch = start.duration_since(time::UNIX_EPOCH).unwrap();

  return since_the_epoch.as_secs().into();
}

fn wait() {
  println!("waiting 2 seconds for next iteration");
  thread::sleep(time::Duration::from_secs(2));
}

async fn run(opts: Opts) {
  let private_key_result = PrivateKey::from_hex_str(opts.sender_private_key);

  if private_key_result.is_err() {
    println!("Invalid private key");

    return;
  }

  let private_key = private_key_result.unwrap();

  let transport_result = web3::transports::Http::new(&opts.web3_provider);

  if transport_result.is_err() {
    println!("Invalid web3 provider");

    return;
  }

  let web3 = web3::Web3::new(transport_result.unwrap());

  let contract = Mine::at(&web3, opts.contract_address);

  loop {
    let parent_block_result = contract.get_current_block().call().await;
    if parent_block_result.is_err() {
      println!("Couldn't get parent block info");
      wait();
      continue;
    }

    let parent_block: Block = parent_block_result.unwrap().into();

    let current_difficulty = proof_of_work::calculate_difficulty(
      seconds_since_epoch(),
      parent_block.timestamp,
      parent_block.difficulty,
    );

    println!("Mining at {}...", current_difficulty);

    let (output, nonce) = miner::work(
      current_difficulty,
      parent_block.hash,
      opts.reward_recipient_address,
      opts.threads,
    );

    println!("Hash found!");
    println!(
      "hash={}, difficulty={}",
      hex::encode(output),
      parent_block.difficulty,
    );

    let mine_result = contract
      .mine(ethcontract::Bytes(nonce), opts.reward_recipient_address)
      .from(Account::Offline(private_key.clone(), None))
      .send()
      .await;

    if mine_result.is_err() {
      println!(
        "The hash couldn't be mined! probably someone mined it faster than you {}",
        mine_result.unwrap_err()
      );
      wait();

      continue;
    }

    println!("Reward claimed!");

    let gas_price_result = web3.eth().gas_price().await;
    if gas_price_result.is_err() {
      println!("Couldn't get gas price");
      wait();
      continue;
    }

    let transport_result = mine_result.unwrap();
    let receipt = transport_result.as_receipt().unwrap();
    let gas_used = receipt.gas_used.unwrap();

    println!(
      "gas_used={}, cost={}",
      gas_used,
      floatfy(gas_used * gas_price_result.unwrap(), 18)
    );
  }
}

#[tokio::main]
async fn main() {
  let opts: Opts = Opts::parse();

  run(opts).await
}
