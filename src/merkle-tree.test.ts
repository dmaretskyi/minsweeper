import { Field } from "snarkyjs"
import { MerkleTree, MerkleNode } from './merkle-tree'
import { expect } from 'chai'

describe('Merkle Tree', () => {
    const validatePath = (tree: MerkleTree, leaf: MerkleNode) => {
        
    }
    it.only('builds correct tree', () => {
        const fields = [Field(0), Field(1), Field(2)]
        const tree = new MerkleTree(fields)
        console.log(tree.validate(Field(0)));
        
    })
})