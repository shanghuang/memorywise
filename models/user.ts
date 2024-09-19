import mongoose from "mongoose";


const UserSchema = new mongoose.Schema({

    name : String,
    birthday : String,
    gender : Number,
    nationality : String,
    privilege : Number,
    activity : Date,
    created : Date,
    email : String,
    password : String,
    tos : Number,
    native_language : [ 
        Number
    ],
    practice_language : [ 
        {
            id : Number,
            level : Number
        }
    ],
    email_verified : Boolean,
    tokens : [ 
        {
            token : String,
            created : Date
        }
    ],
    metadata : {
        suspend:Boolean,
    },
    country : String,
    city : String,
}, {collection:'user'} );

//var User = mongoose.model('user', UserSchema);
/*
const UserSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);*/

export default mongoose.models.User || mongoose.model("User", UserSchema);
