import { newMockEvent } from "matchstick-as"
import { ethereum, BigInt, Address } from "@graphprotocol/graph-ts"
import {
  CompleteProjectSprint,
  DistributePayment,
  OwnershipTransferred,
  Paused,
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
} from "../generated/IndieBrokerV1/IndieBrokerV1"

export function createCompleteProjectSprintEvent(
  projectId: BigInt,
  sprintId: BigInt,
  totalAmount: BigInt
): CompleteProjectSprint {
  let completeProjectSprintEvent = changetype<CompleteProjectSprint>(
    newMockEvent()
  )

  completeProjectSprintEvent.parameters = new Array()

  completeProjectSprintEvent.parameters.push(
    new ethereum.EventParam(
      "projectId",
      ethereum.Value.fromUnsignedBigInt(projectId)
    )
  )
  completeProjectSprintEvent.parameters.push(
    new ethereum.EventParam(
      "sprintId",
      ethereum.Value.fromUnsignedBigInt(sprintId)
    )
  )
  completeProjectSprintEvent.parameters.push(
    new ethereum.EventParam(
      "totalAmount",
      ethereum.Value.fromUnsignedBigInt(totalAmount)
    )
  )

  return completeProjectSprintEvent
}

export function createDistributePaymentEvent(
  payee: Address,
  projectId: BigInt,
  totalAmount: BigInt,
  payeeAmount: BigInt,
  treasuryAmount: BigInt,
  leadAmount: BigInt,
  salesAmount: BigInt,
  cashVestingAmount: BigInt
): DistributePayment {
  let distributePaymentEvent = changetype<DistributePayment>(newMockEvent())

  distributePaymentEvent.parameters = new Array()

  distributePaymentEvent.parameters.push(
    new ethereum.EventParam("payee", ethereum.Value.fromAddress(payee))
  )
  distributePaymentEvent.parameters.push(
    new ethereum.EventParam(
      "projectId",
      ethereum.Value.fromUnsignedBigInt(projectId)
    )
  )
  distributePaymentEvent.parameters.push(
    new ethereum.EventParam(
      "totalAmount",
      ethereum.Value.fromUnsignedBigInt(totalAmount)
    )
  )
  distributePaymentEvent.parameters.push(
    new ethereum.EventParam(
      "payeeAmount",
      ethereum.Value.fromUnsignedBigInt(payeeAmount)
    )
  )
  distributePaymentEvent.parameters.push(
    new ethereum.EventParam(
      "treasuryAmount",
      ethereum.Value.fromUnsignedBigInt(treasuryAmount)
    )
  )
  distributePaymentEvent.parameters.push(
    new ethereum.EventParam(
      "leadAmount",
      ethereum.Value.fromUnsignedBigInt(leadAmount)
    )
  )
  distributePaymentEvent.parameters.push(
    new ethereum.EventParam(
      "salesAmount",
      ethereum.Value.fromUnsignedBigInt(salesAmount)
    )
  )
  distributePaymentEvent.parameters.push(
    new ethereum.EventParam(
      "cashVestingAmount",
      ethereum.Value.fromUnsignedBigInt(cashVestingAmount)
    )
  )

  return distributePaymentEvent
}

export function createOwnershipTransferredEvent(
  previousOwner: Address,
  newOwner: Address
): OwnershipTransferred {
  let ownershipTransferredEvent = changetype<OwnershipTransferred>(
    newMockEvent()
  )

  ownershipTransferredEvent.parameters = new Array()

  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam(
      "previousOwner",
      ethereum.Value.fromAddress(previousOwner)
    )
  )
  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )

  return ownershipTransferredEvent
}

export function createPausedEvent(account: Address): Paused {
  let pausedEvent = changetype<Paused>(newMockEvent())

  pausedEvent.parameters = new Array()

  pausedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )

  return pausedEvent
}

export function createReassignProjectClientEvent(
  projectId: BigInt,
  newClientAddress: Address
): ReassignProjectClient {
  let reassignProjectClientEvent = changetype<ReassignProjectClient>(
    newMockEvent()
  )

  reassignProjectClientEvent.parameters = new Array()

  reassignProjectClientEvent.parameters.push(
    new ethereum.EventParam(
      "projectId",
      ethereum.Value.fromUnsignedBigInt(projectId)
    )
  )
  reassignProjectClientEvent.parameters.push(
    new ethereum.EventParam(
      "newClientAddress",
      ethereum.Value.fromAddress(newClientAddress)
    )
  )

  return reassignProjectClientEvent
}

export function createReassignProjectLeadEvent(
  projectId: BigInt,
  newLeadAddress: Address
): ReassignProjectLead {
  let reassignProjectLeadEvent = changetype<ReassignProjectLead>(newMockEvent())

  reassignProjectLeadEvent.parameters = new Array()

  reassignProjectLeadEvent.parameters.push(
    new ethereum.EventParam(
      "projectId",
      ethereum.Value.fromUnsignedBigInt(projectId)
    )
  )
  reassignProjectLeadEvent.parameters.push(
    new ethereum.EventParam(
      "newLeadAddress",
      ethereum.Value.fromAddress(newLeadAddress)
    )
  )

  return reassignProjectLeadEvent
}

export function createReassignProjectSalesEvent(
  projectId: BigInt,
  newSalesAddress: Address
): ReassignProjectSales {
  let reassignProjectSalesEvent = changetype<ReassignProjectSales>(
    newMockEvent()
  )

  reassignProjectSalesEvent.parameters = new Array()

  reassignProjectSalesEvent.parameters.push(
    new ethereum.EventParam(
      "projectId",
      ethereum.Value.fromUnsignedBigInt(projectId)
    )
  )
  reassignProjectSalesEvent.parameters.push(
    new ethereum.EventParam(
      "newSalesAddress",
      ethereum.Value.fromAddress(newSalesAddress)
    )
  )

  return reassignProjectSalesEvent
}

export function createSendDepositEvent(
  projectId: BigInt,
  sender: Address,
  amount: BigInt
): SendDeposit {
  let sendDepositEvent = changetype<SendDeposit>(newMockEvent())

  sendDepositEvent.parameters = new Array()

  sendDepositEvent.parameters.push(
    new ethereum.EventParam(
      "projectId",
      ethereum.Value.fromUnsignedBigInt(projectId)
    )
  )
  sendDepositEvent.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  )
  sendDepositEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return sendDepositEvent
}

export function createSetAllowedLeadEvent(
  addr: Address,
  allowed: boolean
): SetAllowedLead {
  let setAllowedLeadEvent = changetype<SetAllowedLead>(newMockEvent())

  setAllowedLeadEvent.parameters = new Array()

  setAllowedLeadEvent.parameters.push(
    new ethereum.EventParam("addr", ethereum.Value.fromAddress(addr))
  )
  setAllowedLeadEvent.parameters.push(
    new ethereum.EventParam("allowed", ethereum.Value.fromBoolean(allowed))
  )

  return setAllowedLeadEvent
}

export function createSetFeeEvent(f: i32, fee: BigInt): SetFee {
  let setFeeEvent = changetype<SetFee>(newMockEvent())

  setFeeEvent.parameters = new Array()

  setFeeEvent.parameters.push(
    new ethereum.EventParam(
      "f",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(f))
    )
  )
  setFeeEvent.parameters.push(
    new ethereum.EventParam("fee", ethereum.Value.fromUnsignedBigInt(fee))
  )

  return setFeeEvent
}

export function createSetFeeRecipientEvent(
  f: i32,
  recipient: Address
): SetFeeRecipient {
  let setFeeRecipientEvent = changetype<SetFeeRecipient>(newMockEvent())

  setFeeRecipientEvent.parameters = new Array()

  setFeeRecipientEvent.parameters.push(
    new ethereum.EventParam(
      "f",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(f))
    )
  )
  setFeeRecipientEvent.parameters.push(
    new ethereum.EventParam("recipient", ethereum.Value.fromAddress(recipient))
  )

  return setFeeRecipientEvent
}

export function createSetIndividualTreasuryFeeEvent(
  addr: Address,
  fee: BigInt
): SetIndividualTreasuryFee {
  let setIndividualTreasuryFeeEvent = changetype<SetIndividualTreasuryFee>(
    newMockEvent()
  )

  setIndividualTreasuryFeeEvent.parameters = new Array()

  setIndividualTreasuryFeeEvent.parameters.push(
    new ethereum.EventParam("addr", ethereum.Value.fromAddress(addr))
  )
  setIndividualTreasuryFeeEvent.parameters.push(
    new ethereum.EventParam("fee", ethereum.Value.fromUnsignedBigInt(fee))
  )

  return setIndividualTreasuryFeeEvent
}

export function createSetMinMaxIndividualTreasuryFeesEvent(
  minFee: BigInt,
  maxFee: BigInt
): SetMinMaxIndividualTreasuryFees {
  let setMinMaxIndividualTreasuryFeesEvent = changetype<
    SetMinMaxIndividualTreasuryFees
  >(newMockEvent())

  setMinMaxIndividualTreasuryFeesEvent.parameters = new Array()

  setMinMaxIndividualTreasuryFeesEvent.parameters.push(
    new ethereum.EventParam("minFee", ethereum.Value.fromUnsignedBigInt(minFee))
  )
  setMinMaxIndividualTreasuryFeesEvent.parameters.push(
    new ethereum.EventParam("maxFee", ethereum.Value.fromUnsignedBigInt(maxFee))
  )

  return setMinMaxIndividualTreasuryFeesEvent
}

export function createStartProjectEvent(
  projectId: BigInt,
  leadAddress: Address,
  clientAddress: Address,
  salesAddress: Address
): StartProject {
  let startProjectEvent = changetype<StartProject>(newMockEvent())

  startProjectEvent.parameters = new Array()

  startProjectEvent.parameters.push(
    new ethereum.EventParam(
      "projectId",
      ethereum.Value.fromUnsignedBigInt(projectId)
    )
  )
  startProjectEvent.parameters.push(
    new ethereum.EventParam(
      "leadAddress",
      ethereum.Value.fromAddress(leadAddress)
    )
  )
  startProjectEvent.parameters.push(
    new ethereum.EventParam(
      "clientAddress",
      ethereum.Value.fromAddress(clientAddress)
    )
  )
  startProjectEvent.parameters.push(
    new ethereum.EventParam(
      "salesAddress",
      ethereum.Value.fromAddress(salesAddress)
    )
  )

  return startProjectEvent
}

export function createUnpausedEvent(account: Address): Unpaused {
  let unpausedEvent = changetype<Unpaused>(newMockEvent())

  unpausedEvent.parameters = new Array()

  unpausedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )

  return unpausedEvent
}

export function createWithdrawFromProjectEvent(
  projectId: BigInt,
  amount: BigInt,
  recipient: Address
): WithdrawFromProject {
  let withdrawFromProjectEvent = changetype<WithdrawFromProject>(newMockEvent())

  withdrawFromProjectEvent.parameters = new Array()

  withdrawFromProjectEvent.parameters.push(
    new ethereum.EventParam(
      "projectId",
      ethereum.Value.fromUnsignedBigInt(projectId)
    )
  )
  withdrawFromProjectEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )
  withdrawFromProjectEvent.parameters.push(
    new ethereum.EventParam("recipient", ethereum.Value.fromAddress(recipient))
  )

  return withdrawFromProjectEvent
}
