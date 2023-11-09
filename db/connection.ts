import mongoose from "mongoose";

const db = async() => {
    try{
       
        //Set strictquery in mongoose
        mongoose.set('strictQuery', true);

        //Connection databse
        await mongoose.connect(
            `mongodb+srv://${process.env.USER_DB}:${process.env.PASSWORD_DB}@${process.env.CLUSTER}.pzvdy2j.mongodb.net/${process.env.DB_NAME}`
        )

        console.log('Database online')

    }catch(error){
        console.log(error)
        process.exit(1)
    }
}

export default db;