//SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Minter is ERC721 {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    mapping(uint256 => string) private tokenURIs;

    constructor(string memory tokenName, string memory symbol) ERC721(tokenName, symbol) {}

    function mint(address owner, string memory metadataURI) public returns (uint256) {
        _tokenIds.increment();
        uint256 id = _tokenIds.current();
        _safeMint(owner, id);
        _setTokenURI(id, metadataURI);
        return id;
    }

    function tokenURI(uint256 id) public view override returns(string memory) {
        return tokenURIs[id];
    }

    function _setTokenURI(uint256 id, string memory uri) private {
        tokenURIs[id] = uri;
    }
}