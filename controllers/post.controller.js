import errorHandler from "../utils/errorHandler.js";
import postModel from "../models/Post.models.js";

export const createNewPost = async (req, res, next) => {
    const { title, body, active, location } = req.body;
    try {
        if (!req.user) {
            return next(new errorHandler("please login to create post !", 404));
        }

        const createdBy = req.user._id;

        const newPost = await postModel.create({
            title,
            body,
            createdBy,
            active,
            location
        });

        res.status(201).json({
            message: 'Post created successfully!',
            post: newPost,
        });
    } catch (err) {
        next(err);
    }
}


export const getPost = async (req, res, next) => {
    const { postId } = req.params;
    try {
        const post = await postModel.findById(postId)

        if (!post) {
            return next(new errorHandler('Post not found', 404));
        }

        if (post.createdBy.toString() !== req.user._id.toString()) {
            return next(new errorHandler("you can't access it !", 403));
        }
        return res.status(200).json(post);

    } catch (err) {
        next(err);
    }
}
export const editPost = async (req, res, next) => {
    const { title, body, active, location, password } = req.body;
    const { postId } = req.params;
    try {
        const post = await postModel.findById(postId)

        if (!post) {
            return next(new errorHandler('Post not found', 404));
        }

        if (post.createdBy.toString() !== req.user._id.toString()) {
            return next(new errorHandler("you can edit only your post !", 403));
        }


        const updatedFields = {};

        if (title) updatedFields.title = title;
        if (body) updatedFields.body = body;
        if (active) updatedFields.active = active;
        if (location) updatedFields.location = location;

        if (password) {
            updatedFields.password = await bcrypt.hash(password, 10);
        }


        await postModel.updateOne({ _id: post._id }, { $set: updatedFields });

        const updatedDetails = await postModel.findById(post._id).select('-password');

        res.status(200).json({
            message: 'User details updated successfully',
            user: updatedDetails,
        })

    } catch (err) {
        next(err);
    }
}
export const deletePost = async (req, res, next) => {
    const { postId } = req.params;
    const { user } = req;
    try {
        const post = await postModel.findById(postId);


        if (post.createdBy.toString() !== user._id.toString()) {
            return next(new errorHandler(`you can't delete the post..`))
        }

        await post.deleteOne();

        return res.status(200).json({
            message: "post deleted successfully !",
            post
        })
    } catch (err) {
        next(err);
    }
}



export const getPostsByLocation = async (req, res, next) => {
    try {
        const { latitude, longitude } = req.query;


        const lat = parseFloat(latitude);
        const lon = parseFloat(longitude);


        if (isNaN(lat) || isNaN(lon)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid latitude or longitude',
            });
        }

        const postsAtLocation = await postModel.find({
            location: {
                type: 'Point',
                coordinates: [lon, lat],
            },
        });

        res.status(200).json({
            success: true,
            posts: postsAtLocation,
        });
    } catch (error) {
        next(error);
    }
};


