//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.12;

interface IMinteableToken {
    function mint(address recipient, uint256 reward) external;
}
