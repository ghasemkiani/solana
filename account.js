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
}

export { Account };
