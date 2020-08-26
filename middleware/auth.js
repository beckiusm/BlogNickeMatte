const jwt = require('jsonwebtoken');
const secret = "secret"
const commentModel = require("../models/comments");
const postModel = require("../models/posts");
const ac = require('../app').ac;

function auth(req, res, next) {
    if(!req.headers.authorization) {
     return res.sendStatus(403)
    }
    const token = req.headers.authorization.replace('Bearer ', '');
    try {
      const payload = jwt.verify(token, secret)
      req.user = payload
      next()
    } catch (error) {
        console.log(error)
      res.sendStatus(403)
    }
}

async function isCommentOwner(req, res, next) {
  const comment = await commentModel.getComment(req.params.id)
  const permission = ac.can(req.user.role).updateAny('comment');
  if (permission.granted || comment[0].userID == req.user._id) {
    next();
  } else {
    res.sendStatus(401);
  }
  
}

async function isPostOwner(req, res, next) {
  const post = await postModel.getPost(req.params.id)
  const permission = ac.can(req.user.role).updateAny('comment');
  if (permission.granted || post[0].userID == req.user._id) {
    next();
  } else {
    res.sendStatus(401);
  }
  
}
module.exports = {isPostOwner, isCommentOwner, auth}