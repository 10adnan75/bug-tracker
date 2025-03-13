import mongoose from "mongoose";
import Bug from "../models/bug.model.js";

export const getBugs = async (req, res) => {
    try {
        const bugs = await Bug.find({});
        res.status(200).json({ success: true, data: bugs });
    } catch (error) {
        console.log("Error in fetching all the bugs: ", error.message);
        res.status(500).json({ success: false, message: "Internal Server Error! (0 open Bugs)" })
    }
}

export const openBug = async (req, res) => {
    const bug = req.body;

    if (!bug.id || !bug.stat || !bug.img || !bug.desc) {
        return res.status(400).json({ success: false, message: "Please provide all the required fields!" });
    }

    const newBug = new Bug(bug);

    try {
        await newBug.save();
        res.status(201).json({ success: true, data: newBug });
    } catch (error) {
        console.error("Error in opening a new Bug: ", error.message);
        res.status(500).json({ success: false, message: "Internal Server Error! (Failed to open Bug)" });
    }
}

export const updateBug = async (req, res) => {
    const { id } = req.params;
    const bug = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Internal Server Error! (Invalid Bug id)" });
    }

    try {
        const updatedBug = await Bug.findByIdAndUpdate(id, bug, { new: true });
        res.status(200).json({ success: true, data: updatedBug });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error! (Bug not found)" });
    }
}

export const closeBug = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Internal Server Error! (Invalid Bug id)" });
    }

    try {
        await Bug.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Bug closed!" });
    } catch (error) {
        console.log("Error in closing the bug: ", error.message);
        res.status(500).json({ success: false, message: "Internal Server Error! (Bug not found)" });
    }
}