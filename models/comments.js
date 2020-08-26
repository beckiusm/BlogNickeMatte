module.exports = {
  getComments: function () {
    return new Promise(async (resolve, reject) => {
      try {
        const doc = await db.comments.find({});
        resolve(doc);
      } catch (error) {
        reject(error);
      }
    });
  },

  getCommentsById: function (userID) {
    return new Promise(async (resolve, reject) => {
      try {
        const doc = await db.comments.find({userID});
        resolve(doc);
      } catch (error) {
        reject(error);
      }
    })
  },

  getComment: function (id) {
    return new Promise(async (resolve, reject) => {
      try {
        const doc = await db.comments.find({_id: id});
        resolve(doc);
      } catch (error) {
        reject(error)
      }
    });
  },

  insertComment: function (userID, message, timestamp, postID) {
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

  updateComment: function (id, message, timestamp) {
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

  deleteComment: function (id) {
    return new Promise(async (resolve, reject) => {
      try {
        const post = await db.comments.remove({ _id: id });
        resolve(post);
      } catch (error) {
        reject(error);
      }
    });
  },
};
