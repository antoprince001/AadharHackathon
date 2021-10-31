const spamcheck = require('spam-detection');
jsonTest = {
    prover : '13434',
    verifier : '12332',
    timestamp : '12345677'
}
const ans = spamcheck.detect('hello how are you') // invoke detect method

console.log(ans); // ham

const result = spamcheck.getResults('hello how are you')

console.log(result); // [ { label: 'ham', value: 0.01866475233309404 },
                       // { label: 'spam', value: 0.0030509691313711416 } ]