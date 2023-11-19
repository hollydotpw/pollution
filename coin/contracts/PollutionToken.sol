//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.12;

import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Capped.sol";

import "./mine/MinteableToken.sol";
import "./Constants.sol";

contract PollutionToken is ERC20Capped, MinteableToken {
    constructor() ERC20("Pollution", "PLL") ERC20Capped(SUPPLY_CAP) {
        ERC20._mint(_msgSender(), DEVELOPER_TOKENS);
    }

    function _doMint(address to, uint256 amount) internal override {
        _mint(to, amount);
    }
}
