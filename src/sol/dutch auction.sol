// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

// Import necessary OpenZeppelin contracts
import "@openzeppelin/contracts@4.4.0/security/ReentrancyGuard.sol";
import "./v4coin.sol";

// Import Hardhat's console for debugging
// Note: This import is only available during development with Hardhat.
// Remove or comment out this line before deploying to production.
import "hardhat/console.sol";

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

        // Console log constructor parameters
        console.log("DutchAuction initialized with the following parameters:");
        console.log("Token Address:", _tokenAddress);
        console.log("Starting Price:", _startingPrice);
        console.log("Reserve Price:", _reservePrice);
        console.log("Duration (seconds):", _duration);
        console.log("Total Tokens:", _totalTokens);
        console.log("Auction Start Time:", startAt);
        console.log("Auction End Time:", endAt);
    }

    // Function to get current price
    function getCurrentPrice() public view returns (uint256) {
        console.log("current price function called");
        uint256 currentTime = block.timestamp;
        uint256 currentPrice;

        if (currentTime >= endAt) {
            currentPrice = reservePrice;
        } else {
            uint256 elapsed = currentTime - startAt;
            uint256 priceDecay = ((startingPrice - reservePrice) * elapsed) / duration;
            currentPrice = startingPrice - priceDecay;
        }

        // Console log current price calculation
        console.log("getCurrentPrice called at time:", currentTime);
        console.log("Elapsed Time:", currentTime - startAt);
        console.log("Current Price:", currentPrice);

        return currentPrice;
    }

    // Function to place a bid
    function bid() public payable nonReentrant {
        console.log("bid function called");
        require(block.timestamp >= startAt && block.timestamp <= endAt, "Auction not active");
        console.log("auction active");
        require(!auctionEnded, "Auction has ended");
        console.log("auction has not ended yet");
        uint256 price = getCurrentPrice();
        console.log("LOG - msg value: ",msg.value);
        console.log("LOG - current price: ",price);
        uint256 tokensToPurchase = ((msg.value) / price); // Adjust for decimals
        console.log("LOG - ",tokensSold + tokensToPurchase, "<=",totalTokens);
        require(tokensSold + tokensToPurchase <= totalTokens, "Not enough tokens left");
        console.log("enough tokens");

        bids[msg.sender] += msg.value;
        tokensSold += tokensToPurchase;

        // Transfer tokens to bidder
        console.log("LOG - transfering",tokensToPurchase,"tokens to bidder");
        bool success = token.transfer(msg.sender, tokensToPurchase);
        console.log("LOG success check: ", success);
        require(success, "Token transfer failed");
        console.log("token transfer success");

        // Console log bid details
        console.log("Bid placed by:", msg.sender);
        console.log("Bid Amount (ETH):", msg.value);
        console.log("Tokens Purchased:", tokensToPurchase);
        console.log("Total Tokens Sold:", tokensSold);

        emit BidPlaced(msg.sender, msg.value, tokensToPurchase);

        // End auction if all tokens sold
        if (tokensSold == totalTokens) {
            auctionEnded = true;
            console.log("All tokens sold. Auction ended at price:", price);
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

        // Console log auction ending
        console.log("Auction manually ended.");
        console.log("Total Tokens Sold:", tokensSold);
        console.log("Clearing Price:", price);

        emit AuctionEnded(tokensSold, price);
        finalizeAuction();
    }

    // Function to finalize the auction
    function finalizeAuction() internal {
        // Transfer the Ether to the seller
        uint256 contractBalance = address(this).balance;
        seller.transfer(contractBalance);

        // Console log transfer details
        console.log("Transferred", contractBalance, "wei to seller:", seller);

        // Burn unsold tokens
        uint256 unsoldTokens = totalTokens - tokensSold;
        if (unsoldTokens > 0) {
            token.burn(unsoldTokens);

            // Console log token burn
            console.log("Burned unsold tokens:", unsoldTokens);
        } else {
            console.log("No unsold tokens to burn.");
        }
    }
}
