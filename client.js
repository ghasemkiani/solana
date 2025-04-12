import { generateKeyPairSigner } from "@solana/web3.js";
import { clusterApiUrl, Connection } from "@solana/web3.js";

import { cutil } from "@ghasemkiani/base";
import { Obj } from "@ghasemkiani/base";
import { d } from "@ghasemkiani/decimal";

const signer = await generateKeyPairSigner();
console.log("address: ", signer.address);

class Client extends Obj {
  static {
    cutil.extend(this.prototype, {
      provider: null,
      network: "mainnet-beta",
      commitment: "confirmed", // processed|confirmed|finalized
      _url: null,
    });
  }
  get url() {
		if (cutil.na(this._url)) {
			this._url = clusterApiUrl(this.network);
		}
		return this._url;
	}
	set url(url) {
		this._url = url;
	}
  get connection() {
		if (cutil.na(this._connection)) {
			this._connection = new Connection(this.url, this.commitment);
		}
		return this._connection;
	}
	set connection(connection) {
		this._connection = connection;
	}
  static {
    cutil.extend(this.prototype, {
      contracts: {
        "SOL": "So11111111111111111111111111111111111111112",
        "mSOL": "mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So",
        "W": "85VBFQZC9TZkfaptBWjvUw7YbZjy52A6mjtPGjstQAmQ",
        "USDC": "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
        "USDT": "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB",
        "BTC": "DgXyWTdZtEsambXDUaoK8prHTLa2afkdN4V1V8YvMPj5",
        "RAY": "4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R",
        "TRUMP": "6p6xgHyF7AeE6TZkSmFsko444wqoP15icUSqi2jfGiPN",
        "MELANIA": "FUAfBo2jgks6gB4Z4LfZkqSZgzNucisEHqnNebaRxM1P",
        "BARRON": "2Ubidk13H1yjdig8PDfiLWGUnpFwhyrwdczsjM51aoK3",
        "PENGU": "2zMMhcVQEXDtdE6vsFS7S7D5oUodfJHE8vd1gnBouauv",
        "PDOGE": "3CvQPN2bSAVeroh9DLVT42wynjByUapvLPj3maJg6AyB",
        "FARTCOIN": "9BB6NFEcjBCtnNLFko2FqVQBq8HHM13kCyYcdQbgpump",
        "CHILLGUY": "HvpPbDim5n5C25osc2krBbAvXFe3c7a7uU2P8d1EbmdF",
        "PAXG": "C6oFsE8nXRDThzrMEQ5SxaNFGKoyyfWDDVPw37JKvPTe",
        "TRX": "GbbesPbaYh5uiAZSYNXTc7w9jty1rpg3P9L4JeN4LkKc",
        "JUP": "JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN",
      },
    });
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

export { Client };

// https://solana.com/developers/cookbook/wallets/create-keypair
// https://github.com/anza-xyz/solana-web3.js
// https://solana-labs.github.io/solana-web3.js/classes/Connection.html