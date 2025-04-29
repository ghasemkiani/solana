import * as Kit from "@solana/kit";

import { cutil } from "@ghasemkiani/base";
import { Obj } from "@ghasemkiani/base";
import { d } from "@ghasemkiani/decimal";

class Client extends Obj {
  static {
    cutil.extend(this.prototype, {
      provider: null,
      // network: "mainnet-beta",
      network: "mainnet",
      defaultUrl: "https://api.mainnet-beta.solana.com",
      commitment: "confirmed", // processed|confirmed|finalized
      _url: null,
      _rpc: null,
      decimals: 9,
      contracts: {
        SOL: "So11111111111111111111111111111111111111112",
        mSOL: "mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So",
        W: "85VBFQZC9TZkfaptBWjvUw7YbZjy52A6mjtPGjstQAmQ",
        USDC: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
        USDT: "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB",
        BTC: "DgXyWTdZtEsambXDUaoK8prHTLa2afkdN4V1V8YvMPj5",
        RAY: "4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R",
        TRUMP: "6p6xgHyF7AeE6TZkSmFsko444wqoP15icUSqi2jfGiPN",
        MELANIA: "FUAfBo2jgks6gB4Z4LfZkqSZgzNucisEHqnNebaRxM1P",
        BARRON: "2Ubidk13H1yjdig8PDfiLWGUnpFwhyrwdczsjM51aoK3",
        PENGU: "2zMMhcVQEXDtdE6vsFS7S7D5oUodfJHE8vd1gnBouauv",
        PDOGE: "3CvQPN2bSAVeroh9DLVT42wynjByUapvLPj3maJg6AyB",
        FARTCOIN: "9BB6NFEcjBCtnNLFko2FqVQBq8HHM13kCyYcdQbgpump",
        CHILLGUY: "HvpPbDim5n5C25osc2krBbAvXFe3c7a7uU2P8d1EbmdF",
        PAXG: "C6oFsE8nXRDThzrMEQ5SxaNFGKoyyfWDDVPw37JKvPTe",
        TRX: "GbbesPbaYh5uiAZSYNXTc7w9jty1rpg3P9L4JeN4LkKc",
        JUP: "JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN",
      },
    });
  }
  get url() {
    if (cutil.na(this._url)) {
      this._url = this.defaultUrl;
    }
    return this._url;
  }
  set url(url) {
    this._url = url;
  }
  get rpc() {
    if (cutil.na(this._rpc)) {
      this._rpc = Kit.createSolanaRpc(this.url);
    }
    return this._rpc;
  }
  set rpc(rpc) {
    this._rpc = rpc;
  }
  async toGetBalance$(address) {
    const client = this;
    const { value } = await rpc.getBalance(Kit.address(address)).send();
    return d(value);
  }
  async toGetBalance_(address) {
    const client = this;
    const balance$ = await client.toGetBalance$(address);
    return balance$.toFixed(0);
  }
  async toGetBalance(address) {
    const client = this;
    let { decimals } = client;
    const balance$ = await client.toGetBalance$(address);
    return balance$.mul(10 ** -decimals).toNumber();
  }
  async toGenerateKeyPairSigner() {
    return await Key.generateKeyPairSigner();
  }
}

const iwclient = {
  provider: null,
  get client() {
    if (cutil.na(this._client)) {
      let { provider } = this;
      this._client = new Client({ provider });
    }
    return this._client;
  },
  set client(client) {
    this._client = client;
  },
};

export { Client, iwclient };

// https://solana.com/developers/cookbook/wallets/create-keypair
// https://github.com/anza-xyz/solana-web3.js
// https://solana-labs.github.io/solana-web3.js/classes/Connection.html
// https://github.com/anza-xyz/kit
// https://solana.com/docs/references/clusters
