//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.12;

import "./interfaces/IMinteableToken.sol";

abstract contract MinteableToken is IMinteableToken {
    address public minter;
    address public admin;

    constructor() {
        admin = msg.sender;
        minter = msg.sender;
    }

    function _doMint(address recipient, uint256 reward) internal virtual;

    function mint(address recipient, uint256 reward)
        public
        override
        onlyMinter
    {
        _doMint(recipient, reward);
    }

    function setMinter(address minterAddress) public onlyAdmin {
        minter = minterAddress;
    }

    function setAdmin(address adminAddress) public onlyAdmin {
        admin = adminAddress;
    }

    modifier onlyMinter() {
        require(msg.sender == minter, "MinteableToken: not.minter");

        _;
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "MinteableToken: not.admin");

        _;
    }
}
