import { BigInt } from '@graphprotocol/graph-ts'
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
  PaymentStats,
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
  WithdrawFromProject
} from "../generated/schema"

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

  const allTimePaymentStats = _findOrCreatePaymentStats("allTime")
  allTimePaymentStats.totalAmountSum = allTimePaymentStats.totalAmountSum.plus(
    entity.totalAmount
  )
  allTimePaymentStats.payeeAmountSum = allTimePaymentStats.payeeAmountSum.plus(
    entity.payeeAmount
  )
  allTimePaymentStats.treasuryAmountSum = allTimePaymentStats.treasuryAmountSum.plus(
    entity.treasuryAmount
  )
  allTimePaymentStats.leadAmountSum = allTimePaymentStats.leadAmountSum.plus(
    entity.leadAmount
  )
  allTimePaymentStats.salesAmountSum = allTimePaymentStats.salesAmountSum.plus(
    entity.salesAmount
  )
  allTimePaymentStats.cashVestingAmountSum = allTimePaymentStats.cashVestingAmountSum.plus(
    entity.cashVestingAmount
  )
  allTimePaymentStats.save()


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

function _findOrCreatePaymentStats(
  id: string
): PaymentStats {
  let entity = PaymentStats.load(id)
  if (entity == null) {
    entity = new PaymentStats(id)
    entity.totalAmountSum = BigInt.zero()
    entity.payeeAmountSum = BigInt.zero()
    entity.treasuryAmountSum = BigInt.zero()
    entity.leadAmountSum = BigInt.zero()
    entity.salesAmountSum = BigInt.zero()
    entity.cashVestingAmountSum = BigInt.zero() 
  }
  return entity
}