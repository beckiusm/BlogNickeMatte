const express = require("express");
const router = express.Router();
const postController = require("../controllers/posts.js");


// CREATE A NEW POST
router.post("/post", postController.insertPost);

// DELETE EXISTING POST
router.delete("/post/:id", postController.deletePost);

// GET ALL EXISTING POSTS
router.get("/posts", postController.getPosts);

// GET SINGLE POST
router.get("post/:id", postController.getPost);

// UPDATE EXISTING POST WITH TITLE AND CONTENT
router.put("/post/:id", postController.updatePost);


module.exports = router;
