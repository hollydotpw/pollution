//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.12;

import "../mine/utils/Reward.sol";

contract RewardMock {
    function calculate(
        uint256 blockIndex,
        uint256 initialReward,
        uint256 subsidyHalvingInterval
    ) public pure returns (uint256) {
        return
            Reward.calculate(blockIndex, initialReward, subsidyHalvingInterval);
    }
}
