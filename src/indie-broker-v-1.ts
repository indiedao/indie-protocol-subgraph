import { BigInt, log } from '@graphprotocol/graph-ts'
import {
  CompleteProjectSprint as CompleteProjectSprintEvent,
  DistributePayment as DistributePaymentEvent,
  IndieBrokerV1,
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
  AddressPaymentSummary,
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
import { IndieBrokerV1Context } from './IndieBrokerV1Context'
import { _findOrCreateQuarterFromTimestamp } from './quarter'

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

  const context = new IndieBrokerV1Context(event.address)

  // Update all-time summary
  _updatePaymentSummary(context, "allTime", entity)

  // Update quarter summary
  const quarter = _findOrCreateQuarterFromTimestamp(event.block.timestamp)
  const quarterPaymentSummary = _updatePaymentSummary(context, quarter.id, entity)
  quarter.paymentSummary = quarterPaymentSummary.id
  quarter.save()

  // Update week summary
  const week = _findOrCreateWeekFromTimestamp(event.block.timestamp, quarter)
  const weekPaymentSummary = _updatePaymentSummary(context, week.id, entity)
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
    entity.totalAmountSumUsd = "0.00"
    entity.payeeAmountSum = BigInt.zero()
    entity.payeeAmountSumUsd = "0.00"
    entity.treasuryAmountSum = BigInt.zero()
    entity.treasuryAmountSumUsd = "0.00"
    entity.leadAmountSum = BigInt.zero()
    entity.leadAmountSumUsd = "0.00"
    entity.salesAmountSum = BigInt.zero()
    entity.salesAmountSumUsd = "0.00"
    entity.cashVestingAmountSum = BigInt.zero() 
    entity.cashVestingAmountSumUsd = "0.00"
    entity.addressPaymentSummaries = []
  }
  return entity
}

function _findOrCreateAddressPaymentSummary(address: string, paymentSummaryId: string): AddressPaymentSummary {
  let id = `${paymentSummaryId}_${address}`
  let entity = AddressPaymentSummary.load(id)
  if (entity == null) {
    entity = new AddressPaymentSummary(id)
    entity.address = address
    entity.paymentSummary = paymentSummaryId
    entity.totalAmountSum = BigInt.zero()
    entity.totalAmountSumUsd = "0.00"
    entity.payeeAmountSum = BigInt.zero()
    entity.payeeAmountSumUsd = "0.00"
    entity.leadAmountSum = BigInt.zero()
    entity.leadAmountSumUsd = "0.00"
    entity.salesAmountSum = BigInt.zero()
    entity.salesAmountSumUsd = "0.00"
    entity.cashVestingAmountSum = BigInt.zero()
    entity.cashVestingAmountSumUsd = "0.00"
    entity.takeHomeAmountSum = BigInt.zero()
    entity.takeHomeAmountSumUsd = "0.00"
  }
  return entity
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

function _updatePaymentSummary(context: IndieBrokerV1Context, id: string, payment: DistributePayment): PaymentSummary {
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

  // payee address summary
  let payeeAddressSummary = _findOrCreateAddressPaymentSummary(payment.payee.toHexString(), summary.id)

  // update payee address summary
  payeeAddressSummary.totalAmountSum = payeeAddressSummary.totalAmountSum.plus(payment.totalAmount)
  payeeAddressSummary.totalAmountSumUsd = usdcToUsd(payeeAddressSummary.totalAmountSum)
  payeeAddressSummary.payeeAmountSum = payeeAddressSummary.payeeAmountSum.plus(payment.payeeAmount)
  payeeAddressSummary.payeeAmountSumUsd = usdcToUsd(payeeAddressSummary.payeeAmountSum)
  payeeAddressSummary.cashVestingAmountSum = payeeAddressSummary.cashVestingAmountSum.plus(payment.cashVestingAmount)
  payeeAddressSummary.cashVestingAmountSumUsd = usdcToUsd(payeeAddressSummary.cashVestingAmountSum)
  payeeAddressSummary.takeHomeAmountSum = payeeAddressSummary.takeHomeAmountSum.plus(payment.payeeAmount)
  payeeAddressSummary.takeHomeAmountSumUsd = usdcToUsd(payeeAddressSummary.takeHomeAmountSum)
  payeeAddressSummary.save()

  // update lead address summary
  const leadAddress = context.contract.projects(payment.projectId).getLeadAddress()
  const leadAddressSummary = _findOrCreateAddressPaymentSummary(leadAddress.toHexString(), summary.id)
  leadAddressSummary.leadAmountSum = leadAddressSummary.leadAmountSum.plus(payment.leadAmount)
  leadAddressSummary.leadAmountSumUsd = usdcToUsd(leadAddressSummary.leadAmountSum)
  leadAddressSummary.takeHomeAmountSum = leadAddressSummary.takeHomeAmountSum.plus(payment.leadAmount)
  leadAddressSummary.takeHomeAmountSumUsd = usdcToUsd(leadAddressSummary.takeHomeAmountSum)
  leadAddressSummary.save()

  // update sales address summary
  const salesAddress = context.contract.projects(payment.projectId).getSalesAddress()
  const salesAddressSummary = _findOrCreateAddressPaymentSummary(salesAddress.toHexString(), summary.id)
  salesAddressSummary.salesAmountSum = salesAddressSummary.salesAmountSum.plus(payment.salesAmount)
  salesAddressSummary.salesAmountSumUsd = usdcToUsd(salesAddressSummary.salesAmountSum)
  salesAddressSummary.takeHomeAmountSum = salesAddressSummary.takeHomeAmountSum.plus(payment.salesAmount)
  salesAddressSummary.takeHomeAmountSumUsd = usdcToUsd(salesAddressSummary.takeHomeAmountSum)
  salesAddressSummary.save()

  let addressPaymentSummaries = summary.addressPaymentSummaries
  addressPaymentSummaries.push(payeeAddressSummary.id)
  addressPaymentSummaries.push(leadAddressSummary.id)
  addressPaymentSummaries.push(salesAddressSummary.id)
  summary.addressPaymentSummaries = addressPaymentSummaries

  summary.save()

  return summary
}