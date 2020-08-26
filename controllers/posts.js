const postModel = require("../models/posts");

exports.getPosts = async (req, res) => {
  try {
    if (req.user.role === "admin") {
      const posts = await postModel.getPosts();
      res.json(posts);
    } else if (req.user.role === "user") {
      const posts = await postModel.getPostsById(req.user._id);
      res.json(posts);
    } else {
      res.json({message: "please login to see posts"});
    }
  } catch (error) {
    res.json({ error: error.message });
  }
};

exports.getPost = async (req, res) => {
  const id = req.params.id;
  try {
    const post = await postModel.getPost(id);
    res.json(post);
  } catch (error) {
    res.json({ error: error.message });
  }
};

exports.insertPost = async (req, res) => {
  const userID = req.user._id;
  const { title, content } = req.body;
  try {
    const post = await postModel.insertPost(userID, title, content);
    res.json(post);
  } catch (error) {
    res.json({ error: error.message });
  }
};

exports.deletePost = async (req, res) => {
  const postID = req.params.id;
  try {
    const post = await postModel.deletePost(postID);
    res.json({ message: "Number of deleted posts: " + post });
  } catch (error) {
    res.json({ error: error.message });
  }
};

exports.updatePost = async (req, res) => {
  const postID = req.params.id;
  const { title, content } = req.body;
  try {
    const post = await postModel.updatePost(postID, title, content);
    res.json({ message: "Number of updated posts: " + post });
  } catch (error) {
    res.json({ error: error.message });
  }
};
