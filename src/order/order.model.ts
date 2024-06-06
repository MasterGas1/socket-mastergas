import mongoose from "mongoose";

    const OderSchema = new mongoose.Schema({
        serviceId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Service',
            required: true
        },
        installerUserId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'installer',
            required: true
        },
        customerUserId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
            required: true
        },
        price: {
            type: Number,
        },
        state: {
            type: String,
            enum: ['finished', 'proccess', 'on te way'],
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    })

    export default mongoose.model('Order', OderSchema)