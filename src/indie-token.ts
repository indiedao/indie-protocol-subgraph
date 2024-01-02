import {
  Claimed as ClaimedEvent,
  IndieToken,
  MemberStatusActive as MemberStatusActiveEvent,
  MemberStatusInactive as MemberStatusInactiveEvent,
  MemberStatusResigned as MemberStatusResignedEvent,
  MemberStatusTerminated as MemberStatusTerminatedEvent,
  SeasonalDividend as SeasonalDividendEvent,
  SeasonalMemberClaimedDividend as SeasonalMemberClaimedDividendEvent,
  SeasonalMemberDividend as SeasonalMemberDividendEvent,
  Transfer as TransferEvent,
} from "../generated/IndieToken/IndieToken";
import {
  SeasonalDividend,
  SeasonalMemberClaimedDividend,
  SeasonalMemberDividend,
  TokenSupply,
  IndieMemberCount,
  DividendProfit,
} from "../generated/schema";
import { BigInt } from "@graphprotocol/graph-ts";
import {
  findOrCreateQuarterFromTimestamp,
  findOrCreatePreviousQuarter,
  getSeasonIdByQuarterId,
} from "./quarter";
import { usdcToDecimal, usdcToUsd } from "./currency";

export function handleTransfer(event: TransferEvent): void {
  _updateTokenSupply(event);
}

export function _updateIndieMemberCount(timestamp: BigInt): void {
  _updateTotalMemberCount();
  _updateQuarterlyIndieMemberCount(timestamp);
}

export function handleClaimed(event: ClaimedEvent): void {
  let entity = _getOrCreateIndieMemberCount("MEMBER_COUNT_STATS");

  entity.claimed = entity.claimed.plus(BigInt.fromI32(1));
  entity.save();

  _updateQuarterlyIndieMemberCount(event.block.timestamp);
}

export function handleMemberStatusResigned(
  event: MemberStatusResignedEvent
): void {
  let entity = _getOrCreateIndieMemberCount("MEMBER_COUNT_STATS");

  entity.active = entity.active.minus(BigInt.fromI32(1));
  entity.resigned = entity.resigned.plus(BigInt.fromI32(1));
  entity.save();

  _updateQuarterlyIndieMemberCount(event.block.timestamp);
}

export function handleMemberStatusTerminated(
  event: MemberStatusTerminatedEvent
): void {
  let entity = _getOrCreateIndieMemberCount("MEMBER_COUNT_STATS");

  entity.active = entity.active.minus(BigInt.fromI32(1));
  entity.terminated = entity.terminated.plus(BigInt.fromI32(1));
  entity.save();

  _updateQuarterlyIndieMemberCount(event.block.timestamp);
}

//Assumes resigned + terminated members are active when removed
export function handleMemberStatusActive(event: MemberStatusActiveEvent): void {
  let entity = _getOrCreateIndieMemberCount("MEMBER_COUNT_STATS");

  entity.active = entity.active.plus(BigInt.fromI32(1));
  entity.save();

  _updateQuarterlyIndieMemberCount(event.block.timestamp);
}

export function handleMemberStatusInactive(
  event: MemberStatusInactiveEvent
): void {
  let entity = _getOrCreateIndieMemberCount("MEMBER_COUNT_STATS");

  entity.active = entity.active.minus(BigInt.fromI32(1));
  entity.inactive = entity.total.minus(entity.active);
  entity.save();

  _updateQuarterlyIndieMemberCount(event.block.timestamp);
}

function _updateTotalMemberCount(): void {
  let entity = _getOrCreateIndieMemberCount("MEMBER_COUNT_STATS");

  entity.total = entity.claimed.minus(entity.terminated).minus(entity.resigned);
  entity.save();
}

function _getOrCreateIndieMemberCount(entityId: string): IndieMemberCount {
  let entity = IndieMemberCount.load(entityId);
  if (entity == null) {
    entity = new IndieMemberCount(entityId);
    entity.total = BigInt.fromI32(0);
    entity.terminated = BigInt.fromI32(0);
    entity.resigned = BigInt.fromI32(0);
    entity.claimed = BigInt.fromI32(0);
    entity.active = BigInt.fromI32(0);
    entity.inactive = BigInt.fromI32(0);
  }
  return entity as IndieMemberCount;
}

function _updateTokenSupply(event: TransferEvent): void {
  let tokenSupply = TokenSupply.load("TOTAL_SUPPLY");

  if (tokenSupply == null) {
    tokenSupply = new TokenSupply("TOTAL_SUPPLY");
    tokenSupply.totalSupply = BigInt.fromI32(0);
  }

  let value = event.params.value;
  tokenSupply.totalSupply =
    event.params.from.toHexString() ==
    "0x0000000000000000000000000000000000000000"
      ? tokenSupply.totalSupply.plus(value)
      : tokenSupply.totalSupply.minus(value);

  tokenSupply.save();

  let currentQuarter = findOrCreateQuarterFromTimestamp(event.block.timestamp);
  currentQuarter.tokenSupply = tokenSupply.totalSupply;
  currentQuarter.save();
}

function _updateQuarterlyIndieMemberCount(timestamp: BigInt): void {
  let currentQuarter = findOrCreateQuarterFromTimestamp(timestamp);

  let currentIndieMemberCount = _getOrCreateIndieMemberCount(
    "MEMBER_COUNT_STATS"
  );

  let entity = IndieMemberCount.load(currentQuarter.id);
  if (entity == null) {
    entity = new IndieMemberCount(currentQuarter.id);
  }
  entity.inactive = currentIndieMemberCount.inactive;
  entity.terminated = currentIndieMemberCount.terminated;
  entity.resigned = currentIndieMemberCount.resigned;
  entity.total = currentIndieMemberCount.total;
  entity.active = currentIndieMemberCount.active;
  entity.claimed = currentIndieMemberCount.claimed;
  entity.save();

  currentQuarter.indieMemberCount = entity.id;
  currentQuarter.save();
}

function _updateQuarterlyDividend(
  event: SeasonalDividendEvent
): void {
  let currentQuarter = findOrCreateQuarterFromTimestamp(event.block.timestamp);
  let currentSeason = getSeasonIdByQuarterId(currentQuarter.id);
  let previousQuarter = findOrCreatePreviousQuarter(currentQuarter.id);

  if (currentSeason == BigInt.fromI32(0)) {
    return;
  }

  let contract = IndieToken.bind(event.address);
  let dividends = contract.dividendsBySeason(currentSeason);

  let entity = DividendProfit.load(previousQuarter.id);
  if (entity == null) {
    entity = new DividendProfit(previousQuarter.id);
  }

  let currentIndieMemberCount = _getOrCreateIndieMemberCount(
    "MEMBER_COUNT_STATS"
  );

  if (currentIndieMemberCount.total.isZero()) {
    entity.averageDividendSum = BigInt.fromI32(0);
    entity.averageDividendUsd = usdcToUsd(BigInt.fromI32(0));
  } else {
    entity.averageDividendSum = dividends.div(currentIndieMemberCount.total);
    entity.averageDividendUsd = usdcToUsd(
      dividends.div(currentIndieMemberCount.total)
    );
  }
  entity.netProfitSum = dividends;
  entity.netProfitUsd = usdcToUsd(dividends);

  if (currentQuarter.tokenSupply.isZero()) {
    entity.dividendPerIndieSum = BigInt.fromI32(0);
    entity.dividendPerIndieUsd = usdcToDecimal(BigInt.fromI32(0),BigInt.fromI32(6));
  } else {
    let tokenSupplyFormatted = currentQuarter.tokenSupply.div(
      BigInt.fromI32(10).pow(18)
    );

    entity.dividendPerIndieSum = dividends.div(tokenSupplyFormatted);
    entity.dividendPerIndieUsd = usdcToDecimal(dividends.div(tokenSupplyFormatted),BigInt.fromI32(6));
  }

  entity.save();

  previousQuarter.dividendProfit = entity.id;
  previousQuarter.save();
}

export function handleSeasonalDividend(event: SeasonalDividendEvent): void {
  let entity = new SeasonalDividend(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.seasonId = event.params.seasonId;
  entity.totalDividend = event.params.totalDividend;
  entity.totalWithholding = event.params.totalWithholding;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();

  _updateIndieMemberCount(event.block.timestamp)
  _updateQuarterlyDividend(event)
}

export function handleSeasonalMemberClaimedDividend(
  event: SeasonalMemberClaimedDividendEvent
): void {
  let entity = new SeasonalMemberClaimedDividend(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.seasonId = event.params.seasonId;
  entity.memberAddress = event.params.memberAddress;
  entity.netDividend = event.params.netDividend;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleSeasonalMemberDividend(
  event: SeasonalMemberDividendEvent
): void {
  let entity = new SeasonalMemberDividend(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.seasonId = event.params.seasonId;
  entity.memberAddress = event.params.memberAddress;
  entity.netDividend = event.params.netDividend;
  entity.withholding = event.params.withholding;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}
