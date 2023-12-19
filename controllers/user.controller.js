import errorHandler from "../utils/errorHandler.js";
import userModel from "../models/User.model.js";
import sendCookie from "../utils/sendCookie.js";
import postModel from "../models/Post.models.js";

export const register = async (req, res, next) => {
    const { name, username, password } = req.body;
    try {
        const user = await userModel.findOne({ username });

        if (user) {
            return next(new errorHandler("username already taken !", 404));
        }

        let newUser = await userModel.create({
            name,
            username,
            password,
        })
        newUser = await userModel.findById(newUser._id).select('-password');

        res.status(200).json({
            message: "register sucessfully !",
            newUser
        })

    } catch (err) {
        next(err);
    }
}


export const login = async (req, res, next) => {
    const { username, password } = req.body;
    try {
        const user = await userModel.findOne({ username });
        if (!user) {
            return next(new errorHandler("user does not exists !", 404));
        }

        let passMatch = await user.comparePassword(password);
        if (!passMatch) {
            return next(new errorHandler("Invalid credentials", 401));
        }

        sendCookie(user, res, 200);
    } catch (err) {
        next(err);
    }
}




export const dashboard = async (req, res, next) => {
    try {
        const createdBy = req.user._id;

        if (!createdBy) {
            return next(new errorHandler("please login first !", 403));
        }

        const activeCount = await postModel.countDocuments({ createdBy, active: true });

        const inactiveCount = await postModel.countDocuments({ createdBy, active: false });

        res.status(200).json({
            success: true,
            activePosts: activeCount,
            inactivePosts: inactiveCount,
        });
    }
    catch (err) {
        next(err);
    }

}
