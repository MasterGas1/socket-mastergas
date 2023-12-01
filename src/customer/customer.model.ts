import mongoose, { Schema } from "mongoose";
import mongoose_delete from 'mongoose-delete';

import { customerProps } from '../interfaces/customer.interface';

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

CustomerSchema.plugin(mongoose_delete, {overrideMethods: 'all'})

export default mongoose.model<customerProps>('customer', CustomerSchema);