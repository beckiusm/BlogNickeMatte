const express = require('express')();
const chai = require('chai');
chai.should();
const postModel = require("../models/posts");
const db2 = require("./database/test").db2;


describe('Postmodel', () => {
    it('count all documents in db', async () => {
        const doc = await postModel.getPosts(db2);

        const res = await postModel.count(db2);

        res.should.equal(doc.length);
    })

    it('owner id should equal post user id', async () => {
        const doc = await postModel.getPost("y9VGLIf2ALH8jHkv", db2);
        //console.log(doc);
        const res = await postModel.owner(doc.userID, db2);
        //console.log(res);
        res._id.should.equal(doc.userID);
    })

    it('nånting search', async () => {
        const query = /test/i;
        const res = await postModel.search({$or: [{title: query}, {content: query}]}, db2);
        res.should.be.a('array');
        for (let post of res) {
            
            post.should.satisfy( () => {
                return query.test(post.title) || query.test(post.content);
            });
        }
    })
})