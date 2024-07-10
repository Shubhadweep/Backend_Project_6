const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    userName:{
        type: String,
        required: true
    },
    city:{
        type: String,
        required: true
    },
    email:{
        type: String,
        require:true
    }
},{
    timestamps: true,
    versionKey:false
})

const customerDataModel = new mongoose.model("UserData",userSchema);
module.exports = customerDataModel;