import { BigInt } from '@graphprotocol/graph-ts'

// Format number to 2 decimal places
export function usdcToUsd(usdc: BigInt): string {
    const usdcString = usdc.toString()
    return `${usdcString.slice(0, -6)}.${usdcString.slice(-6, -4)}`
}