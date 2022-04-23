import { Field, Poseidon } from 'snarkyjs';

export function getNullifierData(nullifier: Field): {unusedNullifier: Field, usedNullifier: Field}{
    const unusedNullifier = Poseidon.hash([Field(0), nullifier]);
    const usedNullifier = Poseidon.hash([Field(1), nullifier]);

    return {unusedNullifier, usedNullifier}
}