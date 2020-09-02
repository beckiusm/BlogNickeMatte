const express = require('express')();
const chai = require('chai');
chai.should();
const commentModel = require("../models/comments");
const db2 = require("./database/test").db2;

describe('Comment model', () => {
    it('count all documents in db', async () => {
        const doc = await commentModel.getComments(db2);

        const res = await commentModel.count(db2);

        res.should.equal(doc.length);
    })

    it('owner id should equal comment user id', async () => {
        const doc = await commentModel.getComment("sJX2i37YkpOdEi68", db2);
        //console.log(doc);
        const res = await commentModel.owner(doc.userID, db2);
        //console.log(res);
        res._id.should.equal(doc.userID);
    })

    it('should match search query', async () => {
        const res = await commentModel.search(/test/i, db2);
        res.should.be.a('array');
        for (let comment of res) {
            comment.message.should.match(/test/i);
        }
    })
})