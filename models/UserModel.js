import mongoose from 'mongoose'


const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        require: true, 
    },
    email:{
        type: String,
        require: true,
        unique: [true, "Email id already exists"],
 
    },
    password:{
        type: String,
        require: true
    },
    tc:{
        type: Boolean,
        require: true
    },
})


const User = mongoose.model('User', UserSchema)

export default User;