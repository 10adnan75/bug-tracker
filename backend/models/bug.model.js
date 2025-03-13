import mongoose from "mongoose";

const bugSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    stat: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const Bug = mongoose.model("Bug", bugSchema);

export default Bug;