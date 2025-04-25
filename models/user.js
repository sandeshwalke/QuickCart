import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    id:{ type : String, required:true},
    name: { type : String, required:true},
    email: { type : String, unique:true},
    imageUrl: {type : String, required:true},
    cartItems: {type:Object, default: {}}
}, {minimize:false})

const User = mongoose.model.user || mongoose.model('user',userSchema)

export default User