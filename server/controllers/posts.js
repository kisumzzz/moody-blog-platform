import PostMessage from "../models/postMessage.js";
import mongoose from "mongoose";
import { ADDRGETNETWORKPARAMS } from "dns";

// get posts
export const getPosts = async (req, res) => {
    try {
        const postMessages = await PostMessage.find();
        console.log(postMessages);

        res.status(200).json(postMessages);
    } catch (err) {
        res.status(500).json(err)
    }
}

export const createPost = async (req, res) => {
    const body = req.body;

    const newPost = new PostMessage(body);
    try {
        await newPost.save()

        res.status(200).json(newPost)
    } catch (err) {
        res.status(500).json(err)
    }
}

export const updatePost = async (req, res) => {
    const { id: _id } = req.params;
    const post = req.body;

    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("No post with that id");
 
    const updatedPost =  await PostMessage.findById(_id, post, { new: true });
    res.status(200).json(updatedPost);

}

export const deletePost = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("No post with that id");

    await PostMessage.findByIdAndRemove(id);
    res.json({ message: "Post has been deleted sucessfully."})

}

export const likePost = async (req, res) => {
    const { id } = req.params;

    if (!req.userId) return res.json({ message: "Unauthenticated"})

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("No post with that id");

    const post = await PostMessage.findById(id);

    const index = post.likes.findIndex((id) => id === String(req.userId))
    if (index === -1) {
        // like the post
        post.likes.push(req.userId)
    } else {
        //dislike
        post.likes = post.likes.filter(id => id !== String(req.userId))
    }

    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });

    res.json(updatedPost)
}