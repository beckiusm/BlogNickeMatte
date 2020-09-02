const db = require('../app').db;

module.exports = {
  getPosts: function (db = db) {
    return new Promise(async (resolve, reject) => {
      try {
        const doc = await db.posts.find({});
        resolve(doc);
      } catch (error) {
        reject(error);
      }
    });
  },

  getPost: function (id, db = db) {
    return new Promise(async (resolve, reject) => {
      try {
        const doc = await db.posts.findOne({_id: id});
        resolve(doc);
      } catch (error) {
        reject(error)
      }
    });
  },

  insertPost: function (userID, title, content, db = db) {
    return new Promise(async (resolve, reject) => {
      try {
        const post = await db.posts.insert({ userID, title, content });
        resolve(post);
      } catch (error) {
        reject(error);
      }
    });
  },

  deletePost: function (id) {
    return new Promise(async (resolve, reject) => {
      try {
        const post = await db.posts.remove({ _id: id });
        resolve(post);
      } catch (error) {
        reject(error);
      }
    });
  },

  updatePost: function (id, title, content) {
    return new Promise(async (resolve, reject) => {
      try {
        const post = await db.posts.update({ _id: id }, { title, content }, {});
        resolve(post);
      } catch (error) {
        reject(error);
      }
    });
  },

  count (db = db) {
    return new Promise(async (resolve, reject) => {
      try {
        const count = await db.posts.find({});
        resolve(count.length);
      } catch (error) {
        reject(error);
      }
    })
  },

  owner (id, db = db) {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await db.users.findOne({_id: id});
        resolve(user);
      } catch (error) {
        reject(error);
      }
    })
  },

  search (query, db = db) {
    return new Promise(async (resolve, reject) => {
      try {
        const posts = await db.posts.find(query);
        //console.log(comments);
        resolve(posts);
      } catch (error) {
        reject(error);
      }
    })
  },
};
