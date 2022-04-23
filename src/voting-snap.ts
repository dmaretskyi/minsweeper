import {
  Field,
  SmartContract,
  state,
  State,
  method,
  Permissions,
  Bool,
  Circuit,
  Poseidon,
  arrayProp,
  CircuitValue,
  isReady,
} from 'snarkyjs';

import { getNullifierData } from './voting-utils';

await isReady;

class MerklePath extends CircuitValue {
  @arrayProp(Field, 8) path: Field[];
  @arrayProp(Bool, 8) isLeft: Bool[];

  constructor(path: number[], isLeafOnTheLeft: boolean[]) {
    super();
    this.path = path.map(Field);
    this.isLeft = isLeafOnTheLeft.map(Bool);
  }

  calculateRoot(leaf: Field) {
    let hash = leaf;

    for (let i = 0; i < 8; ++i) {
      const left = Circuit.if(this.isLeft[i], hash, this.path[i]);
      const right = Circuit.if(this.isLeft[i], this.path[i], hash);
      hash = Poseidon.hash([left, right]);
    }

    return hash;
  }
}

export class Voting extends SmartContract {
  @state(Field) for = State<Field>();
  @state(Field) against = State<Field>();
  @state(Field) nullifierRoot = State<Field>();
  @state(Field) votingCardRoot = State<Field>();
  @state(Field) lastNullifier = State<Field>();

  // initialization
  deploy(args: any) {    
    super.deploy(args);

    this.self.update.permissions.setValue({
      ...Permissions.default()    });

    const {nullifierRoot, votingCardRoot} = args;

    this.for.set(Field(0));
    this.against.set(Field(0));
    this.nullifierRoot.set(nullifierRoot);
    this.votingCardRoot.set(votingCardRoot);
  }

  @method vote(
    vote: Bool,
    nullifier: Field,
    secret: Field,
    nullifierPath: MerklePath,
    votingCardPath: MerklePath
  ) {
    // votingCard = hash(nullifier, secret)
    const votingCard = Poseidon.hash([nullifier, secret]);

    // verify votingCardPath
    this.votingCardRoot.assertEquals(votingCardPath.calculateRoot(votingCard));

    // verify nullifierPath

    this.nullifierRoot.assertEquals(nullifierPath.calculateRoot(Field(0)));

    // nullify, i.e. calculate new nullifier tree

    this.nullifierRoot.set(nullifierPath.calculateRoot(Field(1)));

    // publish nullifier so that others can update merklePath

    this.lastNullifier.set(nullifier);

    // increase appropiate counter
    const forState = this.for.get();
    const againstState = this.against.get();

    // Update counters
    this.for.set(Circuit.if(vote, forState.add(1), forState));
    this.against.set(Circuit.if(vote, againstState, againstState.add(1)));
  }
}
