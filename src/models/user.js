const mongoose= require("mongoose");
const {Schema} = mongoose;

const userSchema= new Schema({
    firstName:{
        type:String,
        required:true,
        minLength:4,
        maxLength:50,
    },
    lastName:{
        type:String,
    },
    emailId:{
        type:String,
        required:true,
        unique:true,
        trim:true,
    },
    password:{
        type:String,
        required:true,
        unique:true,
    },
    age:{
        type:Number,
        min:18,
    },
    gender:{
        type:String,
        enum:['male','female','other'],
    },
    skills:{
        type:[String]
    },
    about:{
        type:String,
        default:"this is a default about description of user"
    },
    photoUrl:{
        type:String,
        default:"https://res.cloudinary.com/jerrick/image/upload/d_642250b563292b35f27461a7.png,f_jpg,q_auto,w_720/67344c856c473c001d68c10d.png"
    }
}, { timestamps: true});

const User = mongoose.model("User",userSchema);
module.exports= User;