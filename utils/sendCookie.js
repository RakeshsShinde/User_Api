import userModel from "../models/User.model.js";
const sendCookie = async (user = {}, res, statusCode) => {
    const token = await user.generateToken();

    const options = {
        expires: new Date(
            Date.now() + 2 * 24 * 60 * 60 * 1000
        ),
        httpOnly: true
    }
    user = await userModel.findById(user._id).select('-password');      //display user without password 
    res.status(statusCode)
        .cookie('token', token, options)
        .json({
            message: 'Successfully logged in!',
            user,
            token
        });
}

export default sendCookie;