// 2_deploy_contracts.js
const V4Coin = artifacts.require("V4Coin");
const DutchAuction = artifacts.require("DutchAuction");

module.exports = function (deployer) {
    // Deploy V4Coin without parameters
    deployer.deploy(V4Coin)
        .then(async (v4CoinInstance) => {
            const v4CoinAddress = v4CoinInstance.address;

            // Deploy DutchAuction with parameters
            const startingPrice = 1000;
            const reservePrice = 100;
            const auctionDuration = 12000; // Duration in seconds
            const decrementAmount = 500;

            await deployer.deploy(
                DutchAuction,
                v4CoinAddress,
                startingPrice,
                reservePrice,
                auctionDuration,
                decrementAmount
            );
        });
};
