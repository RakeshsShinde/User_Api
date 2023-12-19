import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
const { Schema } = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'please enter name']
    },
    username: {
        type: String,
        required: [true, 'please enter username '],
        minlength: [6, ' Username should  more than 6 character'],
    },
    password: {
        type: String,
        required: [true, 'please enter password '],
        minlength: [6, 'password length should be 6']
    },
}, { timestamps: true })


userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
})

userSchema.methods.comparePassword = async function (enterpassword) {
    return await bcrypt.compare(enterpassword, this.password);
}

userSchema.methods.generateToken = async function () {
    return await jwt.sign({ id: this._id }, process.env.SECRET_KEY, { expiresIn: '2d' })
}

const userModel = mongoose.model('User', userSchema);
export default userModel;