import { Address } from "@graphprotocol/graph-ts";
import { IndieBrokerV1 } from "../generated/IndieBrokerV1/IndieBrokerV1";

export class IndieBrokerV1Context {
    contract: IndieBrokerV1;
    
    constructor(address: Address) {
        this.contract = IndieBrokerV1.bind(address);
    }
}