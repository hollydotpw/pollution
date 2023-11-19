//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.12;

uint256 constant MAX_DIFFICULTY_TARGET = 2**256 - 1;

library ProofOfWork {
    function calculateDifficulty(
        uint256 currentTimestamp,
        uint256 parentTimestamp,
        uint256 parentDifficulty,
        uint8 maximumDivisor,
        uint32 durationLimit
    ) internal pure returns (uint256) {
        uint256 delta = currentTimestamp - parentTimestamp;

        if (parentDifficulty < maximumDivisor) {
            return maximumDivisor;
        }

        uint256 quotient = parentDifficulty / maximumDivisor;

        if (durationLimit > delta) {
            return parentDifficulty + quotient;
        } else if (durationLimit < delta) {
            return parentDifficulty - quotient;
        }

        return parentDifficulty;
    }

    function difficultyToTarget(uint256 difficulty)
        internal
        pure
        returns (uint256)
    {
        return MAX_DIFFICULTY_TARGET / difficulty;
    }

    function verifyTarget(uint256 hash, uint256 target)
        internal
        pure
        returns (bool)
    {
        return hash < target;
    }

    function verifyDifficulty(uint256 hash, uint256 difficulty)
        internal
        pure
        returns (bool)
    {
        uint256 target = difficultyToTarget(difficulty);

        return verifyTarget(hash, target);
    }

    function computeHash(bytes memory data) internal pure returns (bytes32) {
        return keccak256(data);
    }
}
