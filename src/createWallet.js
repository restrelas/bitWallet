const bip32 = require('bip32');
const bip39 = require('bip39');
const bitcoin = require('bitcoinjs-lib');

// bitcoin - main network - mainnet
// testnet - test network - testnet

const network = bitcoin.networks.testnet;

const path = `m/49'/1'/0'/0`;

// creating mnemonic words
let mnemonic = bip39.generateMnemonic();
const seed = bip39.mnemonicToSeedSync(mnemonic);

// creating wallet - root node
let root = bip32.fromSeed(seed, network);

// creating account - child node
let account = root.derivePath(path);
let node = account.derive(0).derive(0);

let btcAddress = bitcoin.payments.p2pkh({
  pubkey: node.publicKey, 
  network: network,
}).address;

console.log("Wallet generated");
console.log("Adress:", btcAddress);
// toWIF - Wallet Import Format - to be imported on a software wallet
console.log("Private key:", node.toWIF());
console.log("Seed:", mnemonic);
