import { BigInt } from "@graphprotocol/graph-ts";

function formatCurrency(usdc: BigInt, decimal: BigInt): Array<string> {
  if (usdc.isZero()) {
    return ["0", "00"];
  }

  let usdcString = usdc.toString();
  while (usdcString.length < 7) {
    usdcString = "0" + usdcString;
  }

  let decimalPlaceNumber = decimal.toI32();
  let integerPart = usdcString.slice(0, -decimalPlaceNumber);
  let decimalPart = usdcString.slice(-decimalPlaceNumber);

  return [integerPart, decimalPart];
}

export function usdcToUsd(usdc: BigInt): string {
  let formattedCurrency = formatCurrency(usdc, BigInt.fromI32(6));
  let integerPart = formattedCurrency[0];
  let decimalPart = formattedCurrency[1];
  return `${integerPart}.${decimalPart.slice(0, 2)}`;
}

export function usdcToDecimal(usdc: BigInt, decimal: BigInt): string {
  let formattedCurrency = formatCurrency(usdc, decimal);
  let integerPart = formattedCurrency[0];
  let decimalPart = formattedCurrency[1];
  return `${integerPart}.${decimalPart}`;
}