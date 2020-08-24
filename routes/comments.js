const express = require("express");
const router = express.Router();
const commentController = require("../controllers/comments.js");


// GET ALL EXISTING POSTS
router.get("/comments", commentController.getComments);

// GET SINGLE POST
router.get("comment/:id", commentController.getComment);

// CREATE A NEW COMMENT TO A SPECIFIC POST
router.post("/post/:id/comment", commentController.insertComment);

// UPDATE A EXISTING COMMENT TO A SPECIFIC POST
router.put("/comment/:id", commentController.updateComment);

// DELETE A EXISTING COMMENT TO A SPECIFIC POST
router.delete("/comment/:id", commentController.deleteComment);

module.exports = router;