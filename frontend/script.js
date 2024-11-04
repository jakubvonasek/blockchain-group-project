const auctionAddress = '0x79ae7CB4cd329E23F88A255AE3069B63e726D042'; // Replace with your contract address
const coinAddress = '0xD9490404faCa063084b44c0d632934aE57776b89'

const auctionAbi = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_tokenAddress",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_startingPrice",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_reservePrice",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_duration",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_totalTokens",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "totalTokensSold",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "clearingPrice",
				"type": "uint256"
			}
		],
		"name": "AuctionEnded",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "bidder",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "tokensPurchased",
				"type": "uint256"
			}
		],
		"name": "BidPlaced",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "auctionEnded",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "bid",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "bids",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "duration",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "endAt",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "endAuction",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getCurrentPrice",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getDuration",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getEndAt",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getReservePrice",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getStartTime",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getStartingPrice",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "reservePrice",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "seller",
		"outputs": [
			{
				"internalType": "address payable",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "startAt",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "startingPrice",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "token",
		"outputs": [
			{
				"internalType": "contract V4Coin",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "tokensSold",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalTokens",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]; // Replace with the contract ABI

const coinAbi = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "Paused",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "Unpaused",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			}
		],
		"name": "allowance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "burn",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "burnFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "decimals",
		"outputs": [
			{
				"internalType": "uint8",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "subtractedValue",
				"type": "uint256"
			}
		],
		"name": "decreaseAllowance",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "addedValue",
				"type": "uint256"
			}
		],
		"name": "increaseAllowance",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "mint",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "pause",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "paused",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "renounceOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalSupply",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "recipient",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "transfer",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "sender",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "recipient",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "unpause",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]
// const provider = new ethers.providers.Web3Provider(window.ethereum);

let selectedSigner;
let startTime = 0;
let startingPrice = 0;
let reservePrice = 0;
let duration = 0;

// script.js

// Check if ethers.js is loaded
if (typeof ethers !== 'undefined') {
  console.log('ethers.js is loaded successfully');
} else {
  console.error('ethers.js is not loaded');
}

// Your existing code here


const provider = new ethers.providers.JsonRpcProvider('http://127.0.0.1:7545');

console.log("Passed provider");

let contract;
let coinContract;
let priceHistory = [];
let timestampHistory = [];
let eventListenersInitialized = false;
let auctionEnded = false;
let updateInterval;


async function initializeCoinContract() {
  const signer = provider.getSigner();
  coinContract = new ethers.Contract(coinAddress, coinAbi, signer);
  
  console.log("LOG - coin contract initialized");
}

initializeCoinContract();


async function initializeContract() {
	const signer = provider.getSigner();
	contract = new ethers.Contract(auctionAddress, auctionAbi, signer);
	auctionEnded = await contract.auctionEnded();
	
	if (!eventListenersInitialized) {
		// Initialize event listeners only once
		contract.on('BidPlaced', (bidder, amount, tokensPurchased, event) => {
			(async () => {
				try {
					// Fetch the block to get the timestamp
					const block = await provider.getBlock(event.blockNumber);
					const time = new Date(block.timestamp * 1000).toLocaleString();
					
					// Update the bids list with all necessary information
					updateBidsList(bidder, amount, tokensPurchased, time);
				} catch (error) {
					console.error("ERROR - Failed to fetch block timestamp:", error);
				}
			})();
		});
		eventListenersInitialized = true; // Mark listeners as initialized
	}
	
	startTime = await contract.getStartTime();
	startingPrice = parseInt((await contract.getStartingPrice()).toString());
	reservePrice = parseInt((await contract.getReservePrice()).toString());
	duration = parseFloat(await contract.getDuration());
	await updateAuctionDetails();
	updateInterval = setInterval(updateAuctionDetails, 10000); // Update every second
	coinContract.transfer(auctionAddress, 500);
	console.log("LOG - contract initialized");
}

function getCurrentPrice() {
	let currentPrice;
	let elapsed;
	let priceDecay;
	let endAt;

	const currentTime = (Date.now() / 1000).toString();
	console.log("Current time", currentTime);

	if (currentTime >= parseInt(startTime) + parseInt(duration)) {
		currentPrice = parseInt(reservePrice);
	} else {
		elapsed = currentTime - startTime;
		priceDecay = ((startingPrice - reservePrice) * elapsed) / duration;
		currentPrice = Math.ceil(startingPrice - priceDecay);
	}

	console.log("HOVNOS")
	console.log("LOG - current time:", currentTime);
	console.log("LOG - start time:", startTime);
	console.log("LOG - duration:", duration);
	console.log("LOG - start + duration:", startTime + duration);
	
	return currentPrice;
}

// Function to choose an account based on index
async function chooseAccountByIndex(index) {
  try {
    const accounts = await provider.listAccounts(); // Retrieves all available accounts
    if (index < 0 || index >= accounts.length) {
      throw new Error("Index out of bounds for available accounts");
    }

    const accountAddress = accounts[index];
    selectedSigner = provider.getSigner(accountAddress); // Set the signer to the chosen account
    console.log(`LOG - Account selected at index ${index}: ${accountAddress}`);
  } catch (error) {
    console.error("ERROR - Failed to select account:", error);
  }
}

async function updateAuctionDetails() {
    auctionEnded = await contract.auctionEnded();

    if (auctionEnded) {
        // Clear the update interval when auction ends
        clearInterval(updateInterval); // Stop the interval
        document.getElementById('timeRemaining').innerText = "Auction Ended";
        console.log("LOG - Auction ended, updates stopped.");
        return; // Exit the function to prevent further updates
    }

    console.log("LOG - Auction ended:", auctionEnded);

    const currentPrice = getCurrentPrice();
    const totalTokens = await contract.totalTokens();
    const tokensSold = await contract.tokensSold();
    const endAt = await contract.endAt();

    const coinDbg = await coinContract.balanceOf(auctionAddress);
    console.log("LOG - coin current price:", currentPrice.toString());

    document.getElementById('currentPrice').innerText = currentPrice.toString();
    document.getElementById('totalTokens').innerText = totalTokens.toString();
    document.getElementById('tokensSold').innerText = tokensSold.toString();
    // document.getElementById('debugVariable').innerText = coinDbg.toString();

    updateTimeRemaining(endAt);

    // Store current price and timestamp
    priceHistory.push(ethers.utils.formatEther(currentPrice));
    timestampHistory.push(new Date().toLocaleTimeString());

    // Save to localStorage
    localStorage.setItem('priceHistory', JSON.stringify(priceHistory));
    localStorage.setItem('timestampHistory', JSON.stringify(timestampHistory));

    updatePriceChart();
    console.log("LOG - auction details updated before end");
}
  function updateTimeRemaining(endAt) {
	const currentTime = Math.floor(Date.now() / 1000);
	const timeRemaining = endAt - currentTime;
  
	if (timeRemaining <= 0) {
	  document.getElementById('timeRemaining').innerText = "Auction Ended";
	  document.getElementById('tokensSold').innerText = contract.tokensSold();
	  return; // Exit the function if auction is ended
	}
  
	const minutes = Math.floor(timeRemaining / 60);
	const seconds = timeRemaining % 60;
	document.getElementById('timeRemaining').innerText = `${minutes}m ${seconds}s`;
	console.log("LOG - time remaining updated");
  }
  
  // Modify the interval to store it in a variable so it can be cleared
  //let updateInterval;


async function getIndexByAddress(address) {
  try {
    const accounts = await provider.listAccounts(); // Retrieve all accounts from the provider
    const index = accounts.findIndex(account => account.toLowerCase() === address.toLowerCase()); // Match by address

    if (index === -1) {
      throw new Error("Address not found among available accounts.");
    }

    console.log(`LOG - Account address ${address} is at index ${index}`);
    return index;
  } catch (error) {
    console.error("ERROR - Failed to get index by address:", error);
    return null;
  }
}


async function placeBid() {
  console.log("LOG - placeBid function called");
  
  // Get the bid amount from input
  const bidAmount = document.getElementById('bidAmount').value;
  const bidAccount = document.getElementById('bidAccount').value;
  
  console.log("LOG - bidAmount retrieved:", bidAmount);
  console.log("LOG - bidAccount retrieved:", bidAccount);
  // Check if provider and signer are accessible
  if (!provider) {
    console.error("ERROR - Provider is not defined");
    return;
  }
  
  const index = await getIndexByAddress(bidAccount);
  if (index !== null) {
    console.log(`Account index is: ${index}`);
    await chooseAccountByIndex(index); // Optionally select the account based on index
  } else {
    console.log('Unable to choose account');
  }

  try {
    // Attempt to call the `bid` function
    console.log("LOG - attempting to place bid via contract...");

    const contractWithSigner = contract.connect(selectedSigner);

    const tx = await contractWithSigner.bid({
      value: bidAmount,
      //gasLimit: ethers.utils.hexlify(100000) // Set a manual gas limit
    });
      
    console.log("LOG - Transaction successful, tx:", tx);
  } catch (error) {
    console.error("ERROR - Transaction failed:", error);
  }
}

function updateBidsList(bidder, amount, tokensPurchased, time) {
	const bidsList = document.getElementById('bidsList');
  
	// Create a new table row
	const row = document.createElement('tr');
  
	// Create and append the Account ID cell
	const accountCell = document.createElement('td');
	accountCell.textContent = bidder;
	row.appendChild(accountCell);
  
	// Create and append the Bid Amount cell
	const amountCell = document.createElement('td');
	amountCell.textContent = amount.toString();
	row.appendChild(amountCell);
  
	// Create and append the Tokens Purchased cell
	const tokensCell = document.createElement('td');
	tokensCell.textContent = tokensPurchased.toString();
	row.appendChild(tokensCell);
  
	// Create and append the Time cell
	const timeCell = document.createElement('td');
	timeCell.textContent = time;
	row.appendChild(timeCell);
  
	// Append the row to the table body
	bidsList.appendChild(row);
  
	console.log("LOG - bid list updated");
  }

  function updatePriceChart() {
    const ctx = document.getElementById('priceChart').getContext('2d');
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: timestampHistory, // Use timestampHistory for x-axis labels
        datasets: [{
          label: 'Price Over Time',
          data: priceHistory.map(price => price * Math.pow(10, 18)), // Multiply each price by 10^16
          borderColor: 'rgba(75, 192, 192, 1)',
          fill: false
        }]
      },
      options: {
        scales: {
          x: {
            title: { display: true, text: 'Time' },
            ticks: { autoSkip: true, maxTicksLimit: 10 } // Adjust to limit the number of displayed timestamps
          },
          y: { title: { display: true, text: 'Price (Wei)' } }
        }
      }
    });
    console.log("LOG - price chart updated");
}

document.getElementById('placeBid').addEventListener('click', placeBid);

// This function sets the interval to update the auction details every second
window.addEventListener('load', () => {
    // Load saved data from localStorage
    const savedPriceHistory = localStorage.getItem('priceHistory');
    const savedTimestampHistory = localStorage.getItem('timestampHistory');

    if (savedPriceHistory && savedTimestampHistory) {
        priceHistory = JSON.parse(savedPriceHistory);
        timestampHistory = JSON.parse(savedTimestampHistory);
    } else {
        // Initialize with empty arrays if no data is saved
        priceHistory = [];
        timestampHistory = [];
    }

    initializeContract();
    updateInterval = setInterval(updateAuctionDetails, 1000); // Update every second
});