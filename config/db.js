const mongoose = require('mongoose')
const session = require('express-session')
const dbUri = process.env.MONGO_URL
// const dbUri='mongodb+srv://Shohruh:349672@cluster0.pelmz.mongodb.net/apexedu?retryWrites=true&w=majority'
const MongoDBSession = require("connect-mongodb-session")(session);
const connectDB = async ()=>{
    const conn = await mongoose.connect(dbUri,{
        useNewUrlParser:true,
        useUnifiedTopology: true
    }); console.log(`MongoDB connected to ${conn.connection.host}`)
}
const store = MongoDBSession({
    uri:dbUri,
    collection:'mysession'
})

module.exports.connectDB = connectDB
module.exports.store = store
