import mongoose from 'mongoose';
const { Schema } = mongoose;

const postSchema = new Schema({
    title: {
        type: String,
        required: [true, 'please enter title']
    },
    body: {
        type: String,
        required: [true, 'please enter post body']
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    active: {
        type: Boolean,
        default: true,
    },
    location: {
        type: {
            type: String,
            enum: ['Point'],
            required: true,
            default: 'Point',
        },
        coordinates: {
            type: [Number],
            required: [true, "please enter co-ordinate"],
        },
    },

}, { timestamps: true })


const postModel = mongoose.model('Post', postSchema);
export default postModel;