const express = require('express')();
const chai = require('chai');
chai.should();
const userModel = require("../models/user");
const postModel = require("../models/posts");
const db = require('../database/db').db;

function randString() {
    return Math.random().toString(20).substr(2, 6);
}
function randNumber() {
    return Math.floor(Math.random() * 6) + 1;
}

describe('Post model', () => {
    beforeEach(() => {
      db.posts.remove({}, {multi: true});
      db.users.remove({}, {multi: true});
    })
    it('count all documents in db', async () => {
        // arrange
        const user = await userModel.createUser(randString(), randString());
        for (let i = randNumber(); i < 10; i++) {
            await postModel.insertPost(user._id, randString(), randString);
        }
        // act
        let comments = await postModel.getPosts();
        let count = await postModel.count();
        // assert
        comments.length.should.equal(count);
    })

    it('owner id should equal post user id', async () => {
        // arrange
        const user = await userModel.createUser(randString(), randString());
        const post = await postModel.insertPost(user._id, randString(), randString);
        // act
        const doc = await postModel.getPost(post._id);
        const owner = await postModel.owner(doc.userID);
        // assert
        owner._id.should.equal(doc.userID);
    })

    it('should match search query', async () => {
        // arrange
        const query = /test/i;
        const user = await userModel.createUser(randString(), randString());
        for (let i = randNumber(); i < 10; i++) {
            await postModel.insertPost(user._id, 'test', 'test');
        }
        // act
        const posts = await postModel.search(query);
        // assert
        posts.should.be.a('array');
        for (let post of posts) {
            post.should.satisfy( () => {
                return query.test(post.title) || query.test(post.content);
            });
        }
    })
})