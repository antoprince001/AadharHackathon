const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types
const userSchema = new mongoose.Schema({
    uidHash:{
        type: String,
        required: true
    },
    cooldown : {
        type : Date,
    },
    

    
})

mongoose.model("User", userSchema);