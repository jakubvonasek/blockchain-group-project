// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

// Import necessary OpenZeppelin contracts
import "@openzeppelin/contracts@4.4.0/security/ReentrancyGuard.sol";
import "./token.sol";

contract DutchAuction is ReentrancyGuard {
    // Variables
    V4Coin public token;
    address payable public seller;
    uint256 public startingPrice;
    uint256 public reservePrice;
    uint256 public duration;
    uint256 public startAt;
    uint256 public endAt;
    uint256 public totalTokens;
    uint256 public tokensSold;
    bool public auctionEnded;

    mapping(address => uint256) public bids;

    // Events
    event BidPlaced(address indexed bidder, uint256 amount, uint256 tokensPurchased);
    event AuctionEnded(uint256 totalTokensSold, uint256 clearingPrice);

    // Constructor
    constructor(
        address _tokenAddress,
        uint256 _startingPrice,
        uint256 _reservePrice,
        uint256 _duration,
        uint256 _totalTokens
    ) {
        require(_startingPrice > _reservePrice, "Starting price must be greater than reserve price");
        token = V4Coin(_tokenAddress);
        seller = payable(msg.sender);
        startingPrice = _startingPrice;
        reservePrice = _reservePrice;
        duration = _duration;
        startAt = block.timestamp;
        endAt = startAt + duration;
        totalTokens = _totalTokens;
    }

    // Function to get current price
    function getCurrentPrice() public view returns (uint256) {
        if (block.timestamp >= endAt) {
            return reservePrice;
        } else {
            uint256 elapsed = block.timestamp - startAt;
            uint256 priceDecay = ((startingPrice - reservePrice) * elapsed) / duration;
            return startingPrice - priceDecay;
        }
    }

    // Function to place a bid
    function bid() public payable nonReentrant {
        require(block.timestamp >= startAt && block.timestamp <= endAt, "Auction not active");
        require(!auctionEnded, "Auction has ended");
        uint256 price = getCurrentPrice();
        uint256 tokensToPurchase = (msg.value * (10 ** 18)) / price; // Adjust for decimals
        require(tokensSold + tokensToPurchase <= totalTokens, "Not enough tokens left");

        bids[msg.sender] += msg.value;
        tokensSold += tokensToPurchase;

        // Transfer tokens to bidder
        token.transfer(msg.sender, tokensToPurchase);

        emit BidPlaced(msg.sender, msg.value, tokensToPurchase);

        // End auction if all tokens sold
        if (tokensSold == totalTokens) {
            auctionEnded = true;
            emit AuctionEnded(tokensSold, price);
            finalizeAuction();
        }
    }

    // Function to end the auction manually after duration
    function endAuction() public nonReentrant {
        require(block.timestamp >= endAt, "Auction duration not yet passed");
        require(!auctionEnded, "Auction already ended");
        auctionEnded = true;
        uint256 price = getCurrentPrice();
        emit AuctionEnded(tokensSold, price);
        finalizeAuction();
    }

    // Function to finalize the auction
    function finalizeAuction() internal {
        // Transfer the Ether to the seller
        seller.transfer(address(this).balance);

        // Burn unsold tokens
        uint256 unsoldTokens = totalTokens - tokensSold;
        if (unsoldTokens > 0) {
            token.burn(unsoldTokens);
        }
    }
}