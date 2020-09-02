const express = require('express')();
const chai = require('chai');
chai.should();
const commentModel = require("../models/comments");
const userModel = require("../models/user");
const postModel = require("../models/posts");
const db = require('../database/db').db;

function randString() {
    return Math.random().toString(20).substr(2, 6);
}
function randNumber() {
    return Math.floor(Math.random() * 6) + 1;
}

describe('Comment model', () => {
    beforeEach(() => {
      db.comments.remove({}, {multi: true});
      db.users.remove({}, {multi: true});
    })
    it('count all comments in db', async () => {
        // arrange
        const user = await userModel.createUser(randString(), randString());
        const post = await postModel.insertPost(user._id, randString(), randString);
        for (let i = randNumber(); i < 10; i++) {
            await commentModel.insertComment(user._id, randString(), Date.now(), post._id);
        }
        let comments = await commentModel.getComments();
        let count = await commentModel.count();
        comments.length.should.equal(count);
    })

    it('owner id should equal comment user id', async () => {
        // arrange
        const user = await userModel.createUser(randString(), randString());
        const post = await postModel.insertPost(user._id, randString(), randString);
        const comment = await commentModel.insertComment(user._id, randString(), Date.now(), post._id);
        const doc = await commentModel.getComment(comment._id, db);
        const owner = await commentModel.owner(doc.userID, db);

        owner._id.should.equal(doc.userID);
    })

    it('should match search query', async () => {
        const query = /test/i;
        const user = await userModel.createUser(randString(), randString());
        const post = await postModel.insertPost(user._id, randString(), randString);
        for (let i = randNumber(); i < 10; i++) {
            await commentModel.insertComment(user._id, randString(), Date.now(), post._id);
        }
        const res = await commentModel.search(query);
        res.should.be.a('array');
        for (let comment of res) {
            comment.message.should.match(query);
        }
    })
})