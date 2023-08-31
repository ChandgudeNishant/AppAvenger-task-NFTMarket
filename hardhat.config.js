require("@nomiclabs/hardhat-waffle");
const fs = require("fs")
const privateKey = process.env.REACT_APP_PRIVATE_KEY;;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  networks:{
    hardhat:{
      chainId: 1337
    },
    polygon_mumbai: {
      url: 'https://polygon-mumbai.infura.io/v3/ac2bb441cbe6484298cb45b82d8d7ef3',
      accounts:[privateKey]
    },
    mainnet: {
      url: 'https://polygon-mainnet.infura.io/v3/1660d50a58f74781bac77bd662f582c2',
      accounts:[privateKey]
    }, 
  },
  solidity: "0.8.4",
};
