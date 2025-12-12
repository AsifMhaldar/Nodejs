require('dotenv').config();
const mongoose = require('mongoose');

const mongodbURL = process.env.MONGODB;


mongoose.connect(mongodbURL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    tls: true,
});

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