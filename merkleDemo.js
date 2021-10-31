const { MerkleTree } = require('merkletreejs')
const SHA256 = require('crypto-js/sha256')

const leaves = ['a', 'b', 'c'].map(x => SHA256(x))
const tree = new MerkleTree(leaves, SHA256)
const root = tree.getRoot().toString('hex')
const leaf = SHA256('a')
const proof = tree.getProof(leaf)
const t2 = JSON.stringify(tree);
const tree2 = JSON.parse(t2);
console.log(tree.toString());

console.log(tree.verify(proof, leaf, root)) // true

const badLeaves = ['a', 'x', 'c'].map(x => SHA256(x))
const badTree = new MerkleTree(badLeaves, SHA256)
const badLeaf = SHA256('x')
const badProof = tree2.getProof(badLeaf)
console.log(tree2.verify(badProof, leaf, root)) // false