const db = require('../app').db;

module.exports = {

  getComments (db = db) {
    return new Promise(async (resolve, reject) => {
      try {
        const doc = await db.comments.find({});
        resolve(doc);
      } catch (error) {
        reject(error);
      }
    });
  },

  getComment (id, db = db) {
    return new Promise(async (resolve, reject) => {
      try {
        const doc = await db.comments.findOne({_id: id});
        resolve(doc);
      } catch (error) {
        reject(error)
      }
    });
  },

  insertComment (userID, message, timestamp, postID, db = db) {
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

  count (db = db) {
    return new Promise(async (resolve, reject) => {
      try {
        const count = await db.comments.find({})
        resolve(count.length);
      } catch (error) {
        reject(error);
      }
    })
  },

  owner (id, db = db) {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await db.users.findOne({_id: id})
        resolve(user);
      } catch (error) {
        reject(error);
      }
    })
  },

  search (query, db = db) {
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