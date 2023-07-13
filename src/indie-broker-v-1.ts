import { BigInt, log } from '@graphprotocol/graph-ts'
import {
  CompleteProjectSprint as CompleteProjectSprintEvent,
  DistributePayment as DistributePaymentEvent,
  OwnershipTransferred as OwnershipTransferredEvent,
  Paused as PausedEvent,
  ReassignProjectClient as ReassignProjectClientEvent,
  ReassignProjectLead as ReassignProjectLeadEvent,
  ReassignProjectSales as ReassignProjectSalesEvent,
  SendDeposit as SendDepositEvent,
  SetAllowedLead as SetAllowedLeadEvent,
  SetFee as SetFeeEvent,
  SetFeeRecipient as SetFeeRecipientEvent,
  SetIndividualTreasuryFee as SetIndividualTreasuryFeeEvent,
  SetMinMaxIndividualTreasuryFees as SetMinMaxIndividualTreasuryFeesEvent,
  StartProject as StartProjectEvent,
  Unpaused as UnpausedEvent,
  WithdrawFromProject as WithdrawFromProjectEvent
} from "../generated/IndieBrokerV1/IndieBrokerV1"
import {
  CompleteProjectSprint,
  DistributePayment,
  OwnershipTransferred,
  Paused,
  PaymentSummary,
  Quarter,
  ReassignProjectClient,
  ReassignProjectLead,
  ReassignProjectSales,
  SendDeposit,
  SetAllowedLead,
  SetFee,
  SetFeeRecipient,
  SetIndividualTreasuryFee,
  SetMinMaxIndividualTreasuryFees,
  StartProject,
  Unpaused,
  Week,
  WithdrawFromProject
} from "../generated/schema"
import { firstDayOfWeek, formatDate, getWeekOfYear, lastDayOfWeek } from './dates'
import { usdcToUsd } from './currency'

export function handleCompleteProjectSprint(
  event: CompleteProjectSprintEvent
): void {
  let entity = new CompleteProjectSprint(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.projectId = event.params.projectId
  entity.sprintId = event.params.sprintId
  entity.totalAmount = event.params.totalAmount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleDistributePayment(event: DistributePaymentEvent): void {
  let entity = new DistributePayment(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )

  entity.payee = event.params.payee
  entity.projectId = event.params.projectId
  entity.totalAmount = event.params.totalAmount
  entity.payeeAmount = event.params.payeeAmount
  entity.treasuryAmount = event.params.treasuryAmount
  entity.leadAmount = event.params.leadAmount
  entity.salesAmount = event.params.salesAmount
  entity.cashVestingAmount = event.params.cashVestingAmount
  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  // Update all-time summary
  _updatePaymentSummary("allTime", entity)

  // Update quarter summary
  const quarter = _findOrCreateQuarterFromTimestamp(event.block.timestamp)
  const quarterPaymentSummary = _updatePaymentSummary(quarter.id, entity)
  quarter.paymentSummary = quarterPaymentSummary.id
  quarter.save()

  // Update week summary
  const week = _findOrCreateWeekFromTimestamp(event.block.timestamp, quarter)
  const weekPaymentSummary = _updatePaymentSummary(week.id, entity)
  week.paymentSummary = weekPaymentSummary.id
  week.save()

  entity.save()
}

export function handleOwnershipTransferred(
  event: OwnershipTransferredEvent
): void {
  let entity = new OwnershipTransferred(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.previousOwner = event.params.previousOwner
  entity.newOwner = event.params.newOwner

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handlePaused(event: PausedEvent): void {
  let entity = new Paused(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.account = event.params.account

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleReassignProjectClient(
  event: ReassignProjectClientEvent
): void {
  let entity = new ReassignProjectClient(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.projectId = event.params.projectId
  entity.newClientAddress = event.params.newClientAddress

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleReassignProjectLead(
  event: ReassignProjectLeadEvent
): void {
  let entity = new ReassignProjectLead(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.projectId = event.params.projectId
  entity.newLeadAddress = event.params.newLeadAddress

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleReassignProjectSales(
  event: ReassignProjectSalesEvent
): void {
  let entity = new ReassignProjectSales(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.projectId = event.params.projectId
  entity.newSalesAddress = event.params.newSalesAddress

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleSendDeposit(event: SendDepositEvent): void {
  let entity = new SendDeposit(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.projectId = event.params.projectId
  entity.sender = event.params.sender
  entity.amount = event.params.amount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleSetAllowedLead(event: SetAllowedLeadEvent): void {
  let entity = new SetAllowedLead(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.addr = event.params.addr
  entity.allowed = event.params.allowed

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleSetFee(event: SetFeeEvent): void {
  let entity = new SetFee(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.f = event.params.f
  entity.fee = event.params.fee

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleSetFeeRecipient(event: SetFeeRecipientEvent): void {
  let entity = new SetFeeRecipient(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.f = event.params.f
  entity.recipient = event.params.recipient

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleSetIndividualTreasuryFee(
  event: SetIndividualTreasuryFeeEvent
): void {
  let entity = new SetIndividualTreasuryFee(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.addr = event.params.addr
  entity.fee = event.params.fee

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleSetMinMaxIndividualTreasuryFees(
  event: SetMinMaxIndividualTreasuryFeesEvent
): void {
  let entity = new SetMinMaxIndividualTreasuryFees(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.minFee = event.params.minFee
  entity.maxFee = event.params.maxFee

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleStartProject(event: StartProjectEvent): void {
  let entity = new StartProject(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.projectId = event.params.projectId
  entity.leadAddress = event.params.leadAddress
  entity.clientAddress = event.params.clientAddress
  entity.salesAddress = event.params.salesAddress

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleUnpaused(event: UnpausedEvent): void {
  let entity = new Unpaused(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.account = event.params.account

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleWithdrawFromProject(
  event: WithdrawFromProjectEvent
): void {
  let entity = new WithdrawFromProject(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.projectId = event.params.projectId
  entity.amount = event.params.amount
  entity.recipient = event.params.recipient

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

function _findOrCreatePaymentSummary(
  id: string
): PaymentSummary {
  let entity = PaymentSummary.load(id)
  if (entity == null) {
    entity = new PaymentSummary(id)
    entity.totalAmountSum = BigInt.zero()
    entity.payeeAmountSum = BigInt.zero()
    entity.treasuryAmountSum = BigInt.zero()
    entity.leadAmountSum = BigInt.zero()
    entity.salesAmountSum = BigInt.zero()
    entity.cashVestingAmountSum = BigInt.zero() 
  }
  return entity
}

function _findOrCreateQuarter(year: i32, quarter: i32): Quarter {
  // log.info('_findOrCreateQuarter | year: {}; quarter: {}', [year.toString(), quarter.toString()])
  const quarterId = `${year}_${quarter}`
  let entity = Quarter.load(quarterId)
  if (entity == null) {
    entity = new Quarter(quarterId)
    entity.quarter = quarter
    entity.year = year
  }
  return entity
}

function _findOrCreateQuarterFromTimestamp(timestamp: BigInt): Quarter {
  // log.info('_findOrCreateQuarterFromTimestamp | timestamp: {}', [timestamp.toString()])
  const timestampAsNumber = timestamp.toI64()
  const timestampInMilliseconds = timestampAsNumber * 1000
  const timestampAsDate = new Date(timestampInMilliseconds)
  const year = timestampAsDate.getUTCFullYear()
  const month = timestampAsDate.getUTCMonth()
  const quarter = _getQuarterFromMonth(month)

  return _findOrCreateQuarter(year, quarter)
}

function _getQuarterFromMonth (month: i32): i32 {
  // log.info('_getQuarterFromMonth | month: {}', [month.toString()])
  if (month <= 2) {
    return 1
  } else if (month <= 5) {
    return 2
  } else if (month <= 8) {
    return 3
  } else {
    return 4
  }
}

function _findOrCreateWeekFromTimestamp(timestamp: BigInt, quarter: Quarter): Week {
  log.info('_findOrCreateWeekFromTimestamp | timestamp: {}', [timestamp.toString()])
  const timestampAsNumber = timestamp.toI64()
  const timestampInMilliseconds = timestampAsNumber * 1000
  const timestampAsDate = new Date(timestampInMilliseconds)
  const year = timestampAsDate.getUTCFullYear()
  const week = getWeekOfYear(timestampAsDate)

  const weekId = `${year}_${week}`
  let entity = Week.load(weekId)
  if (entity == null) {
    const startDate = firstDayOfWeek(timestampAsDate)
    const endDate = lastDayOfWeek(timestampAsDate)
    entity = new Week(weekId)
    entity.week = week
    entity.year = year
    entity.startDate = formatDate(startDate)
    entity.endDate = formatDate(endDate)
    entity.quarter = quarter.id
  }
  return entity

}

function _updatePaymentSummary(id: string, payment: DistributePayment): PaymentSummary {
  log.info('_updatePaymentSummary | id: {}', [id.toString()])
  const summary = _findOrCreatePaymentSummary(id)
  summary.totalAmountSum = summary.totalAmountSum.plus(
    payment.totalAmount
  )
  summary.totalAmountSumUsd = usdcToUsd(summary.totalAmountSum)

  summary.payeeAmountSum = summary.payeeAmountSum.plus(
    payment.payeeAmount
  )
  summary.payeeAmountSumUsd = usdcToUsd(summary.payeeAmountSum)

  summary.treasuryAmountSum = summary.treasuryAmountSum.plus(
    payment.treasuryAmount
  )
  summary.treasuryAmountSumUsd = usdcToUsd(summary.treasuryAmountSum)

  summary.leadAmountSum = summary.leadAmountSum.plus(
    payment.leadAmount
  )
  summary.leadAmountSumUsd = usdcToUsd(summary.leadAmountSum)

  summary.salesAmountSum = summary.salesAmountSum.plus(
    payment.salesAmount
  )
  summary.salesAmountSumUsd = usdcToUsd(summary.salesAmountSum)

  summary.cashVestingAmountSum = summary.cashVestingAmountSum.plus(
    payment.cashVestingAmount
  )
  summary.cashVestingAmountSumUsd = usdcToUsd(summary.cashVestingAmountSum)

  summary.save()

  return summary
}