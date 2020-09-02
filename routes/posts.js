const express = require("express");
const router = express.Router();
const postController = require("../controllers/posts.js");
const auth = require("../middleware/auth.js")

// CREATE A NEW POST
router.post("/", postController.insertPost);

// DELETE EXISTING POST
router.delete("/:id", auth.auth, auth.isPostOwner, postController.deletePost);

// GET ALL EXISTING POSTS
router.get("/", auth.auth, postController.getPosts);

// GET SINGLE POST
router.get("/:id", auth.auth, postController.getPost);

// UPDATE EXISTING POST WITH TITLE AND CONTENT
router.patch("/:id", auth.auth, auth.isPostOwner, postController.updatePost);


module.exports = router;
