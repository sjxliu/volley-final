import express from "express";
import mongoose from "mongoose";
import PostMessage from "../models/postMess.js";

const router = express.Router();


export const getPost = async (req, res) => { 
  const { id } = req.params;

  try {
      const post = await PostMessage.findById(id);
      
      res.status(200).json(post);
  } catch (error) {
      res.status(404).json({ message: error.message });
  }
}

export const getPosts = async (req, res) => {
  const { page } = req.query;
  try {
    const LIMIT = 12;
    const start = (Number(page) - 1) * LIMIT; // get start index of every page
    const total = await PostMessage.countDocuments({});

    const posts = await PostMessage.find()
      .sort({ _id: -1 })
      .limit(LIMIT)
      .skip(start);

    res
      .json({
        data: posts,
        currentPage: Number(page),
        numberOfPages: Math.ceil(total / LIMIT),
      });
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

//Query > /posts?page=1 page variable =1
//Params > /posts/123 > id = 123

export const getSearchedPosts = async (req, res) => {
  const { searchQuery } = req.query;
  try {
    const title = new RegExp(searchQuery, "i");

    const posts = await PostMessage.find({
      $or: [{ title }],
    });
    res.json({ data: posts });
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

export const createPost = async (req, res) => {
  const post = req.body;
  const newPost = new PostMessage({
    ...post,
    creator: req.userId,
    createdAt: new Date().toISOString(),
  });

  try {
    await newPost.save();

    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error });
  }
};

export const updatePost = async (req, res) => {
  const { id: _id } = req.params;
  const post = req.body;
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("Post does not exist, much like your skills");

  const updatedPost = await PostMessage.findByIdAndUpdate(
    _id,
    { ...post, _id },
    {
      new: true,
    }
  );
  res.json(updatedPost);
};

export const deletePost = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("Post does not exist, much like your skills");
  await PostMessage.findByIdAndRemove(id);
  console.log("DELETE");
  res.json({ message: "Post Cut successfully" });
};

export const supportPost = async (req, res) => {
  const { id } = req.params;

  if (!req.userId) return res.json({ message: "Sign in to interact" });
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("Post does not exist, much like your skills");

  const post = await PostMessage.findById(id);
  const index = post.likes.findIndex((id) => id === String(req.userId));

  if (index === -1) {
    post.likes.push(req.userId);
  } else {
    post.likes = post.likes.filter((id) => id !== String(req.userId));
  }
  //returns all likes besides current

  const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {
    new: true,
  });
  res.json(updatedPost);
};

export default router;