import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt, Bytes } from "@graphprotocol/graph-ts"
import {
  AdminChanged,
  Approval,
  BeaconUpgraded,
  Claimed,
  DefaultWithholdingPercentageChanged,
  ETHWithdrawn,
  Initialized,
  MemberStatusActive,
  MemberStatusInactive,
  MemberStatusResigned,
  MemberStatusTerminated,
  MemberWithholdingPercentageChanged,
  MembershipMerkleRootChanged,
  OwnershipRenounced,
  OwnershipTransferred,
  Paused,
  RoleAdminChanged,
  RoleGranted,
  RoleRevoked,
  SeasonalDividend,
  SeasonalMemberClaimedDividend,
  SeasonalMemberDividend,
  TerminatedMemberDividendsReturnedToTreasury,
  Transfer,
  TreasuryAddressChanged,
  USDCWithdrawn,
  Unpaused,
  Upgraded,
  WithholdingAddressChanged
} from "../generated/IndieToken/IndieToken"

export function createAdminChangedEvent(
  previousAdmin: Address,
  newAdmin: Address
): AdminChanged {
  let adminChangedEvent = changetype<AdminChanged>(newMockEvent())

  adminChangedEvent.parameters = new Array()

  adminChangedEvent.parameters.push(
    new ethereum.EventParam(
      "previousAdmin",
      ethereum.Value.fromAddress(previousAdmin)
    )
  )
  adminChangedEvent.parameters.push(
    new ethereum.EventParam("newAdmin", ethereum.Value.fromAddress(newAdmin))
  )

  return adminChangedEvent
}

export function createApprovalEvent(
  owner: Address,
  spender: Address,
  value: BigInt
): Approval {
  let approvalEvent = changetype<Approval>(newMockEvent())

  approvalEvent.parameters = new Array()

  approvalEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  approvalEvent.parameters.push(
    new ethereum.EventParam("spender", ethereum.Value.fromAddress(spender))
  )
  approvalEvent.parameters.push(
    new ethereum.EventParam("value", ethereum.Value.fromUnsignedBigInt(value))
  )

  return approvalEvent
}

export function createBeaconUpgradedEvent(beacon: Address): BeaconUpgraded {
  let beaconUpgradedEvent = changetype<BeaconUpgraded>(newMockEvent())

  beaconUpgradedEvent.parameters = new Array()

  beaconUpgradedEvent.parameters.push(
    new ethereum.EventParam("beacon", ethereum.Value.fromAddress(beacon))
  )

  return beaconUpgradedEvent
}

export function createClaimedEvent(
  recipient: Address,
  amount: BigInt
): Claimed {
  let claimedEvent = changetype<Claimed>(newMockEvent())

  claimedEvent.parameters = new Array()

  claimedEvent.parameters.push(
    new ethereum.EventParam("recipient", ethereum.Value.fromAddress(recipient))
  )
  claimedEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return claimedEvent
}

export function createDefaultWithholdingPercentageChangedEvent(
  previousPercentage: BigInt,
  percentage: BigInt
): DefaultWithholdingPercentageChanged {
  let defaultWithholdingPercentageChangedEvent = changetype<
    DefaultWithholdingPercentageChanged
  >(newMockEvent())

  defaultWithholdingPercentageChangedEvent.parameters = new Array()

  defaultWithholdingPercentageChangedEvent.parameters.push(
    new ethereum.EventParam(
      "previousPercentage",
      ethereum.Value.fromUnsignedBigInt(previousPercentage)
    )
  )
  defaultWithholdingPercentageChangedEvent.parameters.push(
    new ethereum.EventParam(
      "percentage",
      ethereum.Value.fromUnsignedBigInt(percentage)
    )
  )

  return defaultWithholdingPercentageChangedEvent
}

export function createETHWithdrawnEvent(
  recipient: Address,
  amount: BigInt
): ETHWithdrawn {
  let ethWithdrawnEvent = changetype<ETHWithdrawn>(newMockEvent())

  ethWithdrawnEvent.parameters = new Array()

  ethWithdrawnEvent.parameters.push(
    new ethereum.EventParam("recipient", ethereum.Value.fromAddress(recipient))
  )
  ethWithdrawnEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return ethWithdrawnEvent
}

export function createInitializedEvent(version: i32): Initialized {
  let initializedEvent = changetype<Initialized>(newMockEvent())

  initializedEvent.parameters = new Array()

  initializedEvent.parameters.push(
    new ethereum.EventParam(
      "version",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(version))
    )
  )

  return initializedEvent
}

export function createMemberStatusActiveEvent(
  memberAddress: Address
): MemberStatusActive {
  let memberStatusActiveEvent = changetype<MemberStatusActive>(newMockEvent())

  memberStatusActiveEvent.parameters = new Array()

  memberStatusActiveEvent.parameters.push(
    new ethereum.EventParam(
      "memberAddress",
      ethereum.Value.fromAddress(memberAddress)
    )
  )

  return memberStatusActiveEvent
}

export function createMemberStatusInactiveEvent(
  memberAddress: Address
): MemberStatusInactive {
  let memberStatusInactiveEvent = changetype<MemberStatusInactive>(
    newMockEvent()
  )

  memberStatusInactiveEvent.parameters = new Array()

  memberStatusInactiveEvent.parameters.push(
    new ethereum.EventParam(
      "memberAddress",
      ethereum.Value.fromAddress(memberAddress)
    )
  )

  return memberStatusInactiveEvent
}

export function createMemberStatusResignedEvent(
  memberAddress: Address
): MemberStatusResigned {
  let memberStatusResignedEvent = changetype<MemberStatusResigned>(
    newMockEvent()
  )

  memberStatusResignedEvent.parameters = new Array()

  memberStatusResignedEvent.parameters.push(
    new ethereum.EventParam(
      "memberAddress",
      ethereum.Value.fromAddress(memberAddress)
    )
  )

  return memberStatusResignedEvent
}

export function createMemberStatusTerminatedEvent(
  memberAddress: Address
): MemberStatusTerminated {
  let memberStatusTerminatedEvent = changetype<MemberStatusTerminated>(
    newMockEvent()
  )

  memberStatusTerminatedEvent.parameters = new Array()

  memberStatusTerminatedEvent.parameters.push(
    new ethereum.EventParam(
      "memberAddress",
      ethereum.Value.fromAddress(memberAddress)
    )
  )

  return memberStatusTerminatedEvent
}

export function createMemberWithholdingPercentageChangedEvent(
  memberAddress: Address,
  percentage: BigInt
): MemberWithholdingPercentageChanged {
  let memberWithholdingPercentageChangedEvent = changetype<
    MemberWithholdingPercentageChanged
  >(newMockEvent())

  memberWithholdingPercentageChangedEvent.parameters = new Array()

  memberWithholdingPercentageChangedEvent.parameters.push(
    new ethereum.EventParam(
      "memberAddress",
      ethereum.Value.fromAddress(memberAddress)
    )
  )
  memberWithholdingPercentageChangedEvent.parameters.push(
    new ethereum.EventParam(
      "percentage",
      ethereum.Value.fromUnsignedBigInt(percentage)
    )
  )

  return memberWithholdingPercentageChangedEvent
}

export function createMembershipMerkleRootChangedEvent(
  previousMerkleRoot: Bytes,
  merkleRoot: Bytes
): MembershipMerkleRootChanged {
  let membershipMerkleRootChangedEvent = changetype<
    MembershipMerkleRootChanged
  >(newMockEvent())

  membershipMerkleRootChangedEvent.parameters = new Array()

  membershipMerkleRootChangedEvent.parameters.push(
    new ethereum.EventParam(
      "previousMerkleRoot",
      ethereum.Value.fromFixedBytes(previousMerkleRoot)
    )
  )
  membershipMerkleRootChangedEvent.parameters.push(
    new ethereum.EventParam(
      "merkleRoot",
      ethereum.Value.fromFixedBytes(merkleRoot)
    )
  )

  return membershipMerkleRootChangedEvent
}

export function createOwnershipRenouncedEvent(
  previousOwner: Address
): OwnershipRenounced {
  let ownershipRenouncedEvent = changetype<OwnershipRenounced>(newMockEvent())

  ownershipRenouncedEvent.parameters = new Array()

  ownershipRenouncedEvent.parameters.push(
    new ethereum.EventParam(
      "previousOwner",
      ethereum.Value.fromAddress(previousOwner)
    )
  )

  return ownershipRenouncedEvent
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

export function createRoleAdminChangedEvent(
  role: Bytes,
  previousAdminRole: Bytes,
  newAdminRole: Bytes
): RoleAdminChanged {
  let roleAdminChangedEvent = changetype<RoleAdminChanged>(newMockEvent())

  roleAdminChangedEvent.parameters = new Array()

  roleAdminChangedEvent.parameters.push(
    new ethereum.EventParam("role", ethereum.Value.fromFixedBytes(role))
  )
  roleAdminChangedEvent.parameters.push(
    new ethereum.EventParam(
      "previousAdminRole",
      ethereum.Value.fromFixedBytes(previousAdminRole)
    )
  )
  roleAdminChangedEvent.parameters.push(
    new ethereum.EventParam(
      "newAdminRole",
      ethereum.Value.fromFixedBytes(newAdminRole)
    )
  )

  return roleAdminChangedEvent
}

export function createRoleGrantedEvent(
  role: Bytes,
  account: Address,
  sender: Address
): RoleGranted {
  let roleGrantedEvent = changetype<RoleGranted>(newMockEvent())

  roleGrantedEvent.parameters = new Array()

  roleGrantedEvent.parameters.push(
    new ethereum.EventParam("role", ethereum.Value.fromFixedBytes(role))
  )
  roleGrantedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )
  roleGrantedEvent.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  )

  return roleGrantedEvent
}

export function createRoleRevokedEvent(
  role: Bytes,
  account: Address,
  sender: Address
): RoleRevoked {
  let roleRevokedEvent = changetype<RoleRevoked>(newMockEvent())

  roleRevokedEvent.parameters = new Array()

  roleRevokedEvent.parameters.push(
    new ethereum.EventParam("role", ethereum.Value.fromFixedBytes(role))
  )
  roleRevokedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )
  roleRevokedEvent.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  )

  return roleRevokedEvent
}

export function createSeasonalDividendEvent(
  seasonId: BigInt,
  totalDividend: BigInt,
  totalWithholding: BigInt
): SeasonalDividend {
  let seasonalDividendEvent = changetype<SeasonalDividend>(newMockEvent())

  seasonalDividendEvent.parameters = new Array()

  seasonalDividendEvent.parameters.push(
    new ethereum.EventParam(
      "seasonId",
      ethereum.Value.fromUnsignedBigInt(seasonId)
    )
  )
  seasonalDividendEvent.parameters.push(
    new ethereum.EventParam(
      "totalDividend",
      ethereum.Value.fromUnsignedBigInt(totalDividend)
    )
  )
  seasonalDividendEvent.parameters.push(
    new ethereum.EventParam(
      "totalWithholding",
      ethereum.Value.fromUnsignedBigInt(totalWithholding)
    )
  )

  return seasonalDividendEvent
}

export function createSeasonalMemberClaimedDividendEvent(
  seasonId: BigInt,
  memberAddress: Address,
  netDividend: BigInt
): SeasonalMemberClaimedDividend {
  let seasonalMemberClaimedDividendEvent = changetype<
    SeasonalMemberClaimedDividend
  >(newMockEvent())

  seasonalMemberClaimedDividendEvent.parameters = new Array()

  seasonalMemberClaimedDividendEvent.parameters.push(
    new ethereum.EventParam(
      "seasonId",
      ethereum.Value.fromUnsignedBigInt(seasonId)
    )
  )
  seasonalMemberClaimedDividendEvent.parameters.push(
    new ethereum.EventParam(
      "memberAddress",
      ethereum.Value.fromAddress(memberAddress)
    )
  )
  seasonalMemberClaimedDividendEvent.parameters.push(
    new ethereum.EventParam(
      "netDividend",
      ethereum.Value.fromUnsignedBigInt(netDividend)
    )
  )

  return seasonalMemberClaimedDividendEvent
}

export function createSeasonalMemberDividendEvent(
  seasonId: BigInt,
  memberAddress: Address,
  netDividend: BigInt,
  withholding: BigInt
): SeasonalMemberDividend {
  let seasonalMemberDividendEvent = changetype<SeasonalMemberDividend>(
    newMockEvent()
  )

  seasonalMemberDividendEvent.parameters = new Array()

  seasonalMemberDividendEvent.parameters.push(
    new ethereum.EventParam(
      "seasonId",
      ethereum.Value.fromUnsignedBigInt(seasonId)
    )
  )
  seasonalMemberDividendEvent.parameters.push(
    new ethereum.EventParam(
      "memberAddress",
      ethereum.Value.fromAddress(memberAddress)
    )
  )
  seasonalMemberDividendEvent.parameters.push(
    new ethereum.EventParam(
      "netDividend",
      ethereum.Value.fromUnsignedBigInt(netDividend)
    )
  )
  seasonalMemberDividendEvent.parameters.push(
    new ethereum.EventParam(
      "withholding",
      ethereum.Value.fromUnsignedBigInt(withholding)
    )
  )

  return seasonalMemberDividendEvent
}

export function createTerminatedMemberDividendsReturnedToTreasuryEvent(
  memberAddress: Address,
  amount: BigInt
): TerminatedMemberDividendsReturnedToTreasury {
  let terminatedMemberDividendsReturnedToTreasuryEvent = changetype<
    TerminatedMemberDividendsReturnedToTreasury
  >(newMockEvent())

  terminatedMemberDividendsReturnedToTreasuryEvent.parameters = new Array()

  terminatedMemberDividendsReturnedToTreasuryEvent.parameters.push(
    new ethereum.EventParam(
      "memberAddress",
      ethereum.Value.fromAddress(memberAddress)
    )
  )
  terminatedMemberDividendsReturnedToTreasuryEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return terminatedMemberDividendsReturnedToTreasuryEvent
}

export function createTransferEvent(
  from: Address,
  to: Address,
  value: BigInt
): Transfer {
  let transferEvent = changetype<Transfer>(newMockEvent())

  transferEvent.parameters = new Array()

  transferEvent.parameters.push(
    new ethereum.EventParam("from", ethereum.Value.fromAddress(from))
  )
  transferEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  )
  transferEvent.parameters.push(
    new ethereum.EventParam("value", ethereum.Value.fromUnsignedBigInt(value))
  )

  return transferEvent
}

export function createTreasuryAddressChangedEvent(
  previousAddress: Address,
  newAddress: Address
): TreasuryAddressChanged {
  let treasuryAddressChangedEvent = changetype<TreasuryAddressChanged>(
    newMockEvent()
  )

  treasuryAddressChangedEvent.parameters = new Array()

  treasuryAddressChangedEvent.parameters.push(
    new ethereum.EventParam(
      "previousAddress",
      ethereum.Value.fromAddress(previousAddress)
    )
  )
  treasuryAddressChangedEvent.parameters.push(
    new ethereum.EventParam(
      "newAddress",
      ethereum.Value.fromAddress(newAddress)
    )
  )

  return treasuryAddressChangedEvent
}

export function createUSDCWithdrawnEvent(
  recipient: Address,
  amount: BigInt
): USDCWithdrawn {
  let usdcWithdrawnEvent = changetype<USDCWithdrawn>(newMockEvent())

  usdcWithdrawnEvent.parameters = new Array()

  usdcWithdrawnEvent.parameters.push(
    new ethereum.EventParam("recipient", ethereum.Value.fromAddress(recipient))
  )
  usdcWithdrawnEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return usdcWithdrawnEvent
}

export function createUnpausedEvent(account: Address): Unpaused {
  let unpausedEvent = changetype<Unpaused>(newMockEvent())

  unpausedEvent.parameters = new Array()

  unpausedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )

  return unpausedEvent
}

export function createUpgradedEvent(implementation: Address): Upgraded {
  let upgradedEvent = changetype<Upgraded>(newMockEvent())

  upgradedEvent.parameters = new Array()

  upgradedEvent.parameters.push(
    new ethereum.EventParam(
      "implementation",
      ethereum.Value.fromAddress(implementation)
    )
  )

  return upgradedEvent
}

export function createWithholdingAddressChangedEvent(
  previousAddress: Address,
  newAddress: Address
): WithholdingAddressChanged {
  let withholdingAddressChangedEvent = changetype<WithholdingAddressChanged>(
    newMockEvent()
  )

  withholdingAddressChangedEvent.parameters = new Array()

  withholdingAddressChangedEvent.parameters.push(
    new ethereum.EventParam(
      "previousAddress",
      ethereum.Value.fromAddress(previousAddress)
    )
  )
  withholdingAddressChangedEvent.parameters.push(
    new ethereum.EventParam(
      "newAddress",
      ethereum.Value.fromAddress(newAddress)
    )
  )

  return withholdingAddressChangedEvent
}
