//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.12;

library Reward {
    function calculate(
        uint256 blockIndex,
        uint256 initialReward,
        uint256 subsidyHalvingInterval
    ) internal pure returns (uint256) {
        uint256 halvings = blockIndex / subsidyHalvingInterval;

        initialReward >>= halvings;

        return initialReward;
    }
}
