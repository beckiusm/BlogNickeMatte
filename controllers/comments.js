const commentModel = require("../models/comments");
const ac = require('../app').ac;

exports.getComments = async (req, res) => {
  const permission = ac.can(req.user.role).readAny('comment');
  const permission2 = ac.can(req.user.role).readOwn('comment');
  console.log(permission.granted);
  try {
    if (permission.granted) {
      const comments = await commentModel.getComments();
      res.json(comments);
    } else if (permission2.granted) {
      const comments = await commentModel.getCommentsById(req.user._id);
      res.json(comments);
    } else {
      res.json({message: "please login to see comments"});
    }
  } catch (error) {
    res.json({ error: error.message });
  }
};

exports.getComment = async (req, res) => {
  const id = req.params.id;
  try {
    const comment = await commentModel.getComment(id);
    res.json(comment);
  } catch (error) {
    res.json({ error: error.message });
  }
};

exports.insertComment = async (req, res) => {
  const postID = req.params.id;
  const userID = req.user._id;
  const { message, timestamp } = req.body;
  try {
    const comment = await commentModel.insertComment(
      userID,
      message,
      timestamp,
      postID
    );
    res.json(comment).status(200);
  } catch (error) {
    res.json({ error: error.message }).status(500);
  }
};

exports.updateComment = async (req, res) => {
  const commentId = req.params.id;
  const { message, timestamp } = req.body;
  try {
    const comment = await commentModel.updateComment(
      commentId,
      message,
      timestamp
    );
    res.json({ message: "Number of updated comments: " + comment }).status(200);
  } catch (error) {
    res.json({ error: error.message }).status(500);
  }
};

exports.deleteComment = async (req, res) => {
  const commentId = req.params.id;
  try {
    const post = await commentModel.deleteComment(commentId);
    res.json({ message: "Number of deleted comments: " + post });
  } catch (error) {
    res.json({ error: error.message });
  }
};
