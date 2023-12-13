import mongoose from "mongoose";

const db = async() => {
    try{
       
        const dataBaseName = process.env.NODE_ENV === "test"
        ?process.env.DB_NAME_TEST
        :process.env.DB_NAME

        //Set strictquery in mongoose
        mongoose.set('strictQuery', true);
        //Connection databse
        await mongoose.connect(
            `mongodb+srv://${process.env.USER_DB}:${process.env.PASSWORD_DB}@${process.env.CLUSTER}.pzvdy2j.mongodb.net/${dataBaseName}`
        )

        console.log('Database online')

    }catch(error){
        console.log(error)
        process.exit(1)
    }
}

export default db;