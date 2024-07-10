const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    Order_Id:{
        type: String,
        require:true
    },
    customer_Id:{
        type: Schema.Types.ObjectId,
        ref: "UserData"
    },
    
},{
    timestamps: true,
    versionKey:false
})

const orderDataModel = new mongoose.model("OrderDetails",orderSchema);
module.exports = orderDataModel;