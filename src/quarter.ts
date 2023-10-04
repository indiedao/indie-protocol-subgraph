import { Quarter } from "../generated/schema";
import { BigInt } from "@graphprotocol/graph-ts";

export function _findOrCreateQuarter(year: i32, quarter: i32): Quarter {
  // log.info('_findOrCreateQuarter | year: {}; quarter: {}', [year.toString(), quarter.toString()])
  const quarterId = `${year}_${quarter}`;
  let entity = Quarter.load(quarterId);
  if (entity == null) {
    entity = new Quarter(quarterId);
    entity.quarter = quarter;
    entity.year = year;
    entity.tokenSupply = BigInt.fromI32(0)
  }
  return entity;
}

export function _findOrCreateQuarterFromTimestamp(timestamp: BigInt): Quarter {
  // log.info('_findOrCreateQuarterFromTimestamp | timestamp: {}', [timestamp.toString()])
  const timestampAsNumber = timestamp.toI64();
  const timestampInMilliseconds = timestampAsNumber * 1000;
  const timestampAsDate = new Date(timestampInMilliseconds);
  const year = timestampAsDate.getUTCFullYear();
  const month = timestampAsDate.getUTCMonth();
  const quarter = _getQuarterFromMonth(month);

  return _findOrCreateQuarter(year, quarter);
}

export function _getQuarterFromMonth(month: i32): i32 {
  // log.info('_getQuarterFromMonth | month: {}', [month.toString()])
  if (month <= 2) {
    return 1;
  } else if (month <= 5) {
    return 2;
  } else if (month <= 8) {
    return 3;
  } else {
    return 4;
  }
}

export function getSeasonIdByQuarterId(quarterId: string): BigInt {
  const quarterIdParts = quarterId.split("_");
  const year = parseInt(quarterIdParts[0]);
  const quarter = parseInt(quarterIdParts[1]);
  const baseYear = 2023;
  const baseQuarter = 2;

  if (year < baseYear || (year === baseYear && quarter < baseQuarter)) {
    return BigInt.fromI32(0)
  }

  let season: i32 = (i32(year) - baseYear) * 4 + i32(quarter) - baseQuarter;

  return BigInt.fromI32(season)
}
