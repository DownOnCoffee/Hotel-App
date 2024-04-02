import mongoose from 'mongoose';
import dotenv from "dotenv";

dotenv.config();
const db=mongoose.connection;
const a=mongoose.connect(process.env.MONGO_DB_URL);

db.on('connected', () => {
    console.log('Connection with mongodb sucessful!');
  });

db.on('error',()=>{
    console.log("error in connecting to MongoDb");
})

export default db;