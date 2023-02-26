import mongoose , { Schema, Document, Model, Types } from 'mongoose';
import passPortLocalMongoose from "passport-local-mongoose";
export interface IUser extends Document {
     email:string;
     name:string;
     password: string;
}

const UserSchema:Schema = new Schema({
    name: {
        type:String,
        required: true,
        maxLength: 20
    },
    email: {
        type:String,
        requried: true,
        unique: true
    },
    password: {
        type:String,
        required: true,
        minLength: 8
    }
})
export interface IUserDocument extends IUser, Document { }
export interface IUserModel extends Model<IUserDocument> {};
///Export the mongoose plugin for the to inject passport module.
export default mongoose.model<IUserDocument>("User", UserSchema);
