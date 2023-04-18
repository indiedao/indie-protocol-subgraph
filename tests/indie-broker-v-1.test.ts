import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { BigInt, Address } from "@graphprotocol/graph-ts"
import { CompleteProjectSprint } from "../generated/schema"
import { CompleteProjectSprint as CompleteProjectSprintEvent } from "../generated/IndieBrokerV1/IndieBrokerV1"
import { handleCompleteProjectSprint } from "../src/indie-broker-v-1"
import { createCompleteProjectSprintEvent } from "./indie-broker-v-1-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let projectId = BigInt.fromI32(234)
    let sprintId = BigInt.fromI32(234)
    let totalAmount = BigInt.fromI32(234)
    let newCompleteProjectSprintEvent = createCompleteProjectSprintEvent(
      projectId,
      sprintId,
      totalAmount
    )
    handleCompleteProjectSprint(newCompleteProjectSprintEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("CompleteProjectSprint created and stored", () => {
    assert.entityCount("CompleteProjectSprint", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "CompleteProjectSprint",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "projectId",
      "234"
    )
    assert.fieldEquals(
      "CompleteProjectSprint",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "sprintId",
      "234"
    )
    assert.fieldEquals(
      "CompleteProjectSprint",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "totalAmount",
      "234"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
