import { BigInt } from "@graphprotocol/graph-ts";

export function usdcToUsd(usdc: BigInt): string {
  if (usdc.isZero()) {
    return "0.00";
  }

  let usdcString = usdc.toString();
  while (usdcString.length < 7) {
    usdcString = "0" + usdcString;
  }

  return `${usdcString.slice(0, -6)}.${usdcString.slice(-6, -4)}`;
}
