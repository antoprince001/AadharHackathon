const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose')
const app = express();
const webpush = require("web-push");
const PORT = process.env.PORT || 5001;
const { IsolationForest } = require('isolation-forest');

const { MONGOURI } = require("./keys")
// const snarkjs = require("snarkjs");
// const fs = require("fs");

app.use(cors());
app.use(express.json());


// async function run() {
//     const { proof, publicSignals } = await snarkjs.groth16.fullProve({a: 10, b: 21}, "circuit.wasm", "circuit_final.zkey");

//     console.log("Proof: ");
//     console.log(JSON.stringify(proof, null, 1));

//     const vKey = JSON.parse(fs.readFileSync("verification_key.json"));

//     const res = await snarkjs.groth16.verify(vKey, publicSignals, proof);

//     if (res === true) {
//         console.log("Verification OK");
//     } else {
//         console.log("Invalid proof");
//     }

// }

// run().then(() => {
//     process.exit(0);
// });

app.get('/',(req,res)=>{
    //run();
    res.send('ZK service');
})

const publicVapidKey ="BILoU2Xka86C7qfvtCwTCCq2v-a6pLSgfovINRNkpOT3lnly7mz2pNObxDT6SIUV0mOndR9akd2eoueQk20l4rc";
const privateVapidKey = "R7ID8vJ2hmD_K7PKz27YCqowVrYtw-tzwdFpyQ8YbkI";

webpush.setVapidDetails("mailto: antoprince001@gmail.com",publicVapidKey,privateVapidKey);

app.post("/subscribe", (req, res) => {
    const { subscription, title, message } = req.body;
    const payload = JSON.stringify({ title, message });
    
    webpush.sendNotification(subscription, payload)
    .catch((err) => console.error("err", err));
    
    res.status(200).json({ success: true });
});

app.get("/anomalyDetection", (req, res) => {
    const { subscription, title, message } = req.query;
    const payload = JSON.stringify({ title, message });
    
    webpush.sendNotification(subscription, payload)
    .catch((err) => console.error("err", err));
    
    res.status(200).json({ success: true });
});



mongoose.connect(MONGOURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

mongoose.connection.on('connected', ()=>{
    console.log("DB connected");
})

mongoose.connection.on('error', (err) =>{
    console.log(err);
})


// require('./models/user')
// require('./models/merkle')

// app.use(require('./routes/user'))
// app.use(require('./routes/merkle'))

app.listen(PORT, () =>{
    console.log("server running");
})