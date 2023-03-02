import mongoose, { Schema } from "mongoose";

const CustomerSchema = new mongoose.Schema({
    rfc:{
        type: String,
        require: true,
        trim: true
    },
    taxResidence:{
        type: String,
        require: true,
        trim: true
    },
    addresses: [{
        type: Schema.Types.ObjectId,
        ref: 'address'
    }]
})

export default mongoose.model('customer', CustomerSchema);