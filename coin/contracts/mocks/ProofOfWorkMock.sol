//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.12;

import "../mine/utils/ProofOfWork.sol";

contract ProofOfWorkMock {
    function calculateDifficulty(
        uint256 currentTimestamp,
        uint256 parentTimestamp,
        uint256 parentDifficulty,
        uint8 maximumDivisorConstant,
        uint32 durationLimitConstant
    ) public pure returns (uint256) {
        return
            ProofOfWork.calculateDifficulty(
                currentTimestamp,
                parentTimestamp,
                parentDifficulty,
                maximumDivisorConstant,
                durationLimitConstant
            );
    }

    function difficultyToTarget(uint256 difficulty)
        public
        pure
        returns (uint256)
    {
        return ProofOfWork.difficultyToTarget(difficulty);
    }

    function verifyTarget(uint256 hash, uint256 target)
        public
        pure
        returns (bool)
    {
        return ProofOfWork.verifyTarget(hash, target);
    }

    function verifyDifficulty(uint256 hash, uint256 difficulty)
        public
        pure
        returns (bool)
    {
        return ProofOfWork.verifyDifficulty(hash, difficulty);
    }

    function computeHash(bytes memory data) public pure returns (bytes32) {
        return ProofOfWork.computeHash(data);
    }
}
