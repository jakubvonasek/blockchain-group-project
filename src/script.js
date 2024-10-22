const contractAddress = '0x1D13C7f6eb7F672c63cCF46E1CC32Ab7aFD7a320'; // Replace with your contract address
const abi = [
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
      "name": "bid",
      "outputs": [],
      "stateMutability": "payable",
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

// const provider = new ethers.providers.Web3Provider(window.ethereum);


const web3 = new Web3(Web3.givenProvider);
const contract = new web3.eth.Contract(abi,contractAddress);


console.log("hovno");
// let contract;
let priceHistory = [];


async function initializeContract() {
  const signer = provider.getSigner();
  contract = new ethers.Contract(contractAddress, abi, signer);

  // Initialize event listeners
  contract.on('BidPlaced', (bidder, amount, tokens) => {
    updateBidsList(bidder, amount, tokens);
  });

  await updateAuctionDetails();
  setInterval(updateAuctionDetails, 10000); // Update every 10 seconds
  console.log("LOG - contract initalized");
}

async function updateAuctionDetails() {
  const currentPrice = await contract.getCurrentPrice();
  const totalTokens = await contract.totalTokens();
  const tokensSold = await contract.tokensSold();
  const endAt = await contract.endAt();

  document.getElementById('currentPrice').innerText = ethers.utils.formatEther(currentPrice);
  document.getElementById('totalTokens').innerText = totalTokens.toString();
  document.getElementById('tokensSold').innerText = tokensSold.toString();
  updateTimeRemaining(endAt);

  priceHistory.push(ethers.utils.formatEther(currentPrice));
  updatePriceChart();
  console.log("LOG - auction details updated");
}

function updateTimeRemaining(endAt) {
  const currentTime = Math.floor(Date.now() / 1000);
  const timeRemaining = endAt - currentTime;
  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;
  document.getElementById('timeRemaining').innerText = `${minutes}m ${seconds}s`;
  console.log("LOG - time remaining updated");
}

async function placeBid() {
  const bidAmount = document.getElementById('bidAmount').value;
  const signer = provider.getSigner();
  await signer.sendTransaction({
    to: contractAddress,
    value: ethers.utils.parseEther(bidAmount)
  });
  console.log("LOG - bid placed")
}

function updateBidsList(bidder, amount, tokens) {
  const bidsList = document.getElementById('bidsList');
  const listItem = document.createElement('li');
  listItem.innerText = `Bidder: ${bidder}, Amount: ${ethers.utils.formatEther(amount)} ETH, Tokens: ${tokens}`;
  bidsList.appendChild(listItem);
  console.log("LOG - bid list updated")
}

function updatePriceChart() {
  const ctx = document.getElementById('priceChart').getContext('2d');
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: Array(priceHistory.length).fill('').map((_, i) => i + 1),
      datasets: [{
        label: 'Price Over Time',
        data: priceHistory,
        borderColor: 'rgba(75, 192, 192, 1)',
        fill: false
      }]
    },
    options: {
      scales: {
        x: { title: { display: true, text: 'Time (Updates)' } },
        y: { title: { display: true, text: 'Price (ETH)' } }
      }
    }
  });
  console.log("LOG - price chart updated")
}

document.getElementById('placeBid').addEventListener('click', placeBid);
window.addEventListener('load', initializeContract);
