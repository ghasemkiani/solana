import { cutil } from "@ghasemkiani/base";
import { Obj } from "@ghasemkiani/base";
import { d } from "@ghasemkiani/decimal";

import { iwclient } from "./client.js";

class Account extends cutil.mixin(Obj, iwclient) {
  static {
    cutil.extend(this.prototype, {
      address: null,
    });
  }
  async toGetBalance$() {
    const account = this;
    const { client } = account;
    const { address } = account;
    return await client.toGetBalance$(address);
  }
  async toGetBalance_() {
    const account = this;
    const { client } = account;
    const { address } = account;
    return await client.toGetBalance_(address);
  }
  async toGetBalance() {
    const account = this;
    const { client } = account;
    const { address } = account;
    return await client.toGetBalance(address);
  }
  async toGetTokenAddressBalance$(tokenAddress) {
    const account = this;
    const { client } = account;
    const { address } = account;
    return await client.toGetTokenAddressBalance$(address, tokenAddress);
  }
  async toGetTokenAddressBalance_(tokenAddress) {
    const account = this;
    const { client } = account;
    const { address } = account;
    return await client.toGetTokenAddressBalance_(address, tokenAddress);
  }
  async toGetTokenAddressBalance(tokenAddress) {
    const account = this;
    const { client } = account;
    const { address } = account;
    return await client.toGetTokenAddressBalance(address, tokenAddress);
  }
  async toGetTokenBalance$(tokenId) {
    const account = this;
    const { client } = account;
    const { address } = account;
    return await client.toGetTokenBalance$(address, tokenId);
  }
  async toGetTokenBalance_(tokenId) {
    const account = this;
    const { client } = account;
    const { address } = account;
    return await client.toGetTokenBalance_(address, tokenId);
  }
  async toGetTokenBalance(tokenId) {
    const account = this;
    const { client } = account;
    const { address } = account;
    return await client.toGetTokenBalance(address, tokenId);
  }
}

export { Account };
