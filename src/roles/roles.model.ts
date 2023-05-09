import mongoose from "mongoose";

const RoleSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    }
})

export default mongoose.model("Role",RoleSchema)