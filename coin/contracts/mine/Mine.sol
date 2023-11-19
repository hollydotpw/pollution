//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.12;

import "@openzeppelin/contracts/utils/introspection/ERC165.sol";

import "./utils/ProofOfWork.sol";
import "./interfaces/IMine.sol";

abstract contract Mine is IMine, ERC165 {
    uint32 private _durationLimit;
    uint8 private _maximumDivisor;
    uint256 private _currentBlockIndex = 0;
    mapping(uint256 => Block) private _blocks;

    constructor(uint32 durationLimit, uint8 maximumDivisor) {
        require(maximumDivisor >= 2, "Mine: maximum.divisor.low");
        _durationLimit = durationLimit;
        _maximumDivisor = maximumDivisor;
    }

    function getBlock(uint256 index)
        public
        view
        virtual
        override
        returns (Block memory)
    {
        require(_blocks[index].timestamp != 0, "Mine: invalid.block");

        return _blocks[index];
    }

    function getBlockCount() public view virtual override returns (uint256) {
        return _currentBlockIndex + 1;
    }

    function getCurrentBlock()
        public
        view
        virtual
        override
        returns (Block memory)
    {
        return getBlock(_currentBlockIndex);
    }

    function getBlockMulti(uint256[] memory indices)
        external
        view
        virtual
        override
        returns (Block[] memory)
    {
        Block[] memory result = new Block[](indices.length);

        for (uint256 i = 0; i < indices.length; i++) {
            result[i] = getBlock(indices[i]);
        }

        return result;
    }

    function mine(bytes32 nonce, address recipient) public virtual override {
        require(recipient != address(0), "Mine: invalid.address");

        Block memory parentBlock = _blocks[_currentBlockIndex];

        bytes32 blockHash = ProofOfWork.computeHash(
            bytes.concat(nonce, bytes20(recipient), parentBlock.hash)
        );

        uint256 blockDifficulty = ProofOfWork.calculateDifficulty(
            block.timestamp,
            parentBlock.timestamp,
            parentBlock.difficulty,
            _maximumDivisor,
            _durationLimit
        );

        require(
            _verifyDifficulty(blockHash, blockDifficulty),
            "Mine: target.not.reached"
        );

        _addBlock(block.timestamp, blockDifficulty, blockHash, recipient);
    }

    function _verifyDifficulty(bytes32 hash, uint256 difficulty)
        internal
        virtual
        returns (bool)
    {
        return ProofOfWork.verifyDifficulty(uint256(hash), difficulty);
    }

    function _beforeBlockAdded(uint256 blockCount, address recipient)
        internal
        virtual
    {}

    function _addBlock(
        uint256 timestamp,
        uint256 difficulty,
        bytes32 hash,
        address recipient
    ) internal {
        uint256 nextIndex = _currentBlockIndex + 1;

        _beforeBlockAdded(nextIndex, recipient);
        _setBlock(nextIndex, timestamp, difficulty, hash, recipient);
    }

    function _setBlock(
        uint256 nextIndex,
        uint256 timestamp,
        uint256 difficulty,
        bytes32 hash,
        address recipient
    ) internal {
        _currentBlockIndex = nextIndex;
        _blocks[_currentBlockIndex] = Block(
            timestamp,
            difficulty,
            hash,
            recipient
        );

        emit BlockMined(_currentBlockIndex);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        virtual
        override
        returns (bool)
    {
        return
            super.supportsInterface(interfaceId) ||
            interfaceId == type(IMine).interfaceId;
    }
}
