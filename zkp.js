import {SignatureProofList, SystemParametersList, generateParamsList, keyToInt,proveSignatureList, verifySignatureList } from '@cloudflare/zkp-ecdsa';
import crypto from 'crypto';



// Message to be signed.
const msg = new TextEncoder().encode('kilroy was here');

// Generate a keypair for signing.
const keyPair = await crypto.subtle.generateKey(
    { name: 'ECDSA', namedCurve: 'P-256' },
    true,
    [ 'sign', 'verify'],
);

// Sign a message as usual.
const msgHash = new Uint8Array( crypto.subtle.digest('SHA-256', msg));
const signature = new Uint8Array(
     crypto.subtle.sign(
        { name: 'ECDSA', hash: 'SHA-256' },
        keyPair.privateKey, msg,
    )
);

// Add the public key to the list,
const testPubKey =  keyToInt(keyPair.publicKey);
const listKeys = [
    testPubKey, BigInt(4), BigInt(5), BigInt(6), BigInt(7), BigInt(8),
];

// Create a zero-knowledge proof of the signature.
const params = generateParamsList();
const proof =  proveSignatureList(
    params,
    msgHash,
    signature,
    keyPair.publicKey,
    0,
    listKeys
);

// Verify that zero-knowledge proof is valid.
const valid =  verifySignatureList(params, msgHash, listKeys, proof);
console.assert(valid)