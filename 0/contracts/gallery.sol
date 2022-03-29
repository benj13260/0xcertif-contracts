// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Gallery is ERC721, ERC721URIStorage, Ownable {

    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    // Mapping from token ID to the physical holder address
    mapping(uint256 => address) private _holder;

    uint256 private _royalties;
    address private _royaltiesAddr;

    constructor(string memory name_, string memory symbol_
    //,uint256 royalties_, address royaltiesAddr_
    )
        ERC721(name_, symbol_) {
       // _royalties = royalties_;
       // _royaltiesAddr = royaltiesAddr_;
    }

    event TransferHolder(
        address indexed from,
        address indexed to,
        uint256 indexed tokenId
    );


    function holder(uint256 tokenId) public view virtual returns (address) {
        require(
            _exists(tokenId),
            "ERC721: approved query for nonexistent token"
        );
        return _holder[tokenId];
    }


    function transferHolder(address to, uint256 tokenId) public onlyOwner {
        require(_exists(tokenId), "ERC721: token not minted");

        address owner = ERC721.ownerOf(tokenId);

        require(
            owner != address(0),
            "ERC721: owner query for nonexistent token"
        );
        require(to != address(0), "ERC721: address to null");
        require(
            to == owner || to == this.owner(),
            "ERC721: address is not token owner or contract owner"
        );
        address old = _holder[tokenId];
        _holder[tokenId] = to;

        // Emit event
        emit TransferHolder(old, to, tokenId);

        //TODO V2
        // from the owner owner(tokenId) or the contract owner (address(this))
        // to always the owner owner(tokenId)
    }


    function royaltyInfo(
        uint256 _tokenId,
        uint256 _salePrice
    ) external view returns (
        address receiver,
        uint256 royaltyAmount
    ){
        require(_tokenId > 0,"Token not null");
        require(this.owner() == _royaltiesAddr, "Owner different from royalties address");
        if (_salePrice > 0){
            return  (_royaltiesAddr, (_salePrice * _royalties) / 10000);
        }
    }

    function safeMint(address to, string memory uri) public onlyOwner {
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current(); // Get new token ID

        _holder[newItemId] = to;  // Set the holder
        _safeMint(to, newItemId);
        _setTokenURI(newItemId, uri);
    }

    // The following functions are overrides required by Solidity.

    function _burn(uint256 tokenId)
        internal
        override(ERC721, ERC721URIStorage)
    {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }
}
