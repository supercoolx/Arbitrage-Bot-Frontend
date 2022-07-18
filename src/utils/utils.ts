import BN from "bignumber.js";
import { BaseToken } from "./types";

export const toPrintable = (amount: string | BN, token: BaseToken) => new BN(amount).div(new BN(10).pow(token.decimals)).toFixed(4) + ' ' + token.symbol;