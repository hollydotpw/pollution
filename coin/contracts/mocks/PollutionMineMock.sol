//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.12;

import "../PollutionMine.sol";

contract PollutionMineMock is PollutionMine {
    enum DifficultyMode {
        Default,
        False,
        True
    }

    DifficultyMode private _difficultyMode = DifficultyMode.Default;

    constructor(address pollutionToken) PollutionMine(pollutionToken) {}

    function getDifficultyMode() public view returns (DifficultyMode) {
        return _difficultyMode;
    }

    function setDifficultyMode(DifficultyMode difficultyMode) public {
        _difficultyMode = difficultyMode;
    }

    function skipBlocks(uint256 index) public {
        _setBlock(
            index,
            block.timestamp,
            INITIAL_DIFFICULTY,
            GENESIS_BLOCK_HASH,
            msg.sender
        );
    }

    function _verifyDifficulty(bytes32 hash, uint256 difficulty)
        internal
        virtual
        override
        returns (bool)
    {
        if (
            _difficultyMode == DifficultyMode.True ||
            _difficultyMode == DifficultyMode.False
        ) {
            return _difficultyMode == DifficultyMode.True;
        }

        return ProofOfWork.verifyDifficulty(uint256(hash), difficulty);
    }
}
