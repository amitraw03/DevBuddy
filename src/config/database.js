
const mongoose= require("mongoose");

const connectDB = async()=>{
    await mongoose.connect("mongodb+srv://rawatamit302003:tHzZwVImxgX98Ct0@devbuddy.mnloyiz.mongodb.net/?retryWrites=true&w=majority&appName=DevBuddy");
};

module.exports ={
    connectDB
};


