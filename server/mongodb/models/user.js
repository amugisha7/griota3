import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    phoneNumber: {type: String, required: true},
    loanApplication: [{type: mongoose.Schema.Types.ObjectId, ref: 'Application'}]
})

const UserModel = mongoose.model('User', UserSchema);

export default UserModel; 