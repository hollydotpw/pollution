//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.12;

uint256 constant SUPPLY_CAP = 20999999999999999994540000; // real bitcoin supply, not the 21m bullshit
uint256 constant DEVELOPER_TOKENS = 2000000000000000000000000; // 2000000 * 1 ether
bytes32 constant GENESIS_BLOCK_HASH = 0xdb9277e2d779540e95a08fffe19e9dc9d3dd3f3c04ddc8cfd6f86ca985bd5754; // sha256("magical.sh")
uint32 constant SUBSIDY_HALVING_INTERVAL = 210000;
uint32 constant DURATION_LIMIT = 600; // 10 minutes
uint8 constant MAXIMUM_DIVISOR = 40;
uint256 constant INITIAL_REWARD = 50000000000000000000;
uint256 constant INITIAL_BLOCK_INDEX = 40000; // 39999
uint256 constant INITIAL_DIFFICULTY = 100;
