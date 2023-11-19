//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.12;

interface IMine {
    event BlockMined(uint256 blockIndex);

    struct Block {
        uint256 timestamp;
        uint256 difficulty;
        bytes32 hash;
        address recipient;
    }

    function mine(bytes32 nonce, address recipient) external;

    function getBlockCount() external view returns (uint256);

    function getCurrentBlock() external view returns (Block memory);

    function getBlock(uint256 index) external view returns (Block memory);

    function getBlockMulti(uint256[] memory indices)
        external
        view
        returns (Block[] memory);
}
