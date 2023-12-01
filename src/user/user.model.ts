import mongoose, {Schema} from 'mongoose';
import mongoose_delete from 'mongoose-delete'

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    picture: {
        type: String,
        default: "https://res.cloudinary.com/dnesdnfxy/image/upload/v1700172676/mastergas23/users/nrtsecwphzvysmcddswx.png",
        trim: true
    },
    createdAt:{
        type: Date,
        default: Date.now()
    },
    status: {
        type: String,
        enum: ["pedding","approved","denied"]
    },
    role_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Role"
    },
    customer_id: {
        type: Schema.Types.ObjectId,
        ref: "customer"
    }
})

UserSchema.plugin(mongoose_delete, {overrideMethods: 'all'})

export default mongoose.model('user', UserSchema);