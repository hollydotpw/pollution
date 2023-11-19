//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.12;

import "hardhat/console.sol";

import "@openzeppelin/contracts/access/Ownable.sol";
import "./mine/utils/Reward.sol";
import "./mine/interfaces/IMinteableToken.sol";
import "./mine/Mine.sol";
import "./Constants.sol";

contract PollutionMine is Mine {
    IMinteableToken private _pollutionToken;

    constructor(address pollutionToken) Mine(DURATION_LIMIT, MAXIMUM_DIVISOR) {
        _pollutionToken = IMinteableToken(pollutionToken);

        _setBlock(
            INITIAL_BLOCK_INDEX,
            block.timestamp,
            INITIAL_DIFFICULTY,
            GENESIS_BLOCK_HASH,
            msg.sender
        );
    }

    function getBlock(uint256 index)
        public
        view
        override
        returns (Block memory)
    {
        require(index >= INITIAL_BLOCK_INDEX, "PollutionMine: developer.block");

        return Mine.getBlock(index);
    }

    function _beforeBlockAdded(uint256 blockCount, address recipient)
        internal
        virtual
        override
    {
        uint256 reward = Reward.calculate(
            blockCount + 1,
            INITIAL_REWARD,
            SUBSIDY_HALVING_INTERVAL
        );

        _pollutionToken.mint(recipient, reward);
    }
}
