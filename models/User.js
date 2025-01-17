import mongoose, { Schema } from "mongoose";
const {schema, model} = mongoose;

const UserSchema = new Schema({
    email: {type: String, required:true},
    name: {type: String},
    username: {type: String},
    profilepic: {type: String},
    coverpic: {type: String},
    razorpayid: {type: String},
    razorpaysecret: {type: String},
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now}, 
});


export default mongoose.models.User || model("User", UserSchema);