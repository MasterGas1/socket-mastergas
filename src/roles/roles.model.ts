import mongoose from "mongoose";

const RoleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    permissions: {
        type: [String],
        required: true
    }
})

export default mongoose.model("role",RoleSchema)