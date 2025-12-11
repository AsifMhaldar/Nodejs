// mongodb+srv://asifmhaldar84_db_user:Ugo99gVyeDDKjnEF@nodejs.ff751ld.mongodb.net/


const mongoose = require('mongoose');

const mongodbURL = process.env.MONGODB;


mongoose.connect(mongodbURL);

const db = mongoose.connection;

db.on("connected", () => {
    console.log("Connected to MongoDB server");
})

db.on("error", (err) => {
    console.log("MongoDB connection error", err);
})

db.on("disconnected", ()=>{
    console.log("MongoDB disconnected");
})

module.exports = db;