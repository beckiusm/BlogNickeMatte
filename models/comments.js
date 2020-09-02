const db = require('../database/db').db;

module.exports = {

  getComments () {
    return new Promise(async (resolve, reject) => {
      try {
        const doc = await db.comments.find({});
        resolve(doc);
      } catch (error) {
        reject(error);
      }
    });
  },

  getComment (id) {
    return new Promise(async (resolve, reject) => {
      try {
        const doc = await db.comments.findOne({_id: id});
        resolve(doc);
      } catch (error) {
        reject(error)
      }
    });
  },

  insertComment (userID, message, timestamp, postID) {
    return new Promise(async (resolve, reject) => {
      try {
        const doc = await db.comments.insert({
          userID,
          message,
          timestamp,
          postID,
        });
        resolve(doc);
      } catch (error) {
        reject(error);
      }
    });
  },

  updateComment (id, message, timestamp) {
    return new Promise(async (resolve, reject) => {
      try {
        const doc = await db.comments.update(
          { _id: id },
          {
            $set: {
              message: message,
              timestamp: timestamp,
            },
          },
          {}
        );
        resolve(doc);
      } catch {
        reject(error);
      }
    });
  },

  deleteComment (id) {
    return new Promise(async (resolve, reject) => {
      try {
        const post = await db.comments.remove({ _id: id });
        resolve(post);
      } catch (error) {
        reject(error);
      }
    });
  },

  count () {
    return new Promise(async (resolve, reject) => {
      try {
        const count = await db.comments.find({})
        resolve(count.length);
      } catch (error) {
        reject(error);
      }
    })
  },

  owner (id) {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await db.users.findOne({_id: id})
        resolve(user);
      } catch (error) {
        reject(error);
      }
    })
  },

  search (query) {
    return new Promise(async (resolve, reject) => {
      try {
        const comments = await db.comments.find({message: query})
        //console.log(comments);
        resolve(comments);
      } catch (error) {
        reject(error);
      }
    })
  },
};