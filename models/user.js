module.exports = {
    createUser: function (username, password) {
        return new Promise(async (resolve, reject) => {
            try {
              const doc = await db.users.insert({username, password});
              resolve(doc);
            } catch (error) {
              reject(error);
            }
          });
        },
    loginUser: function (username) {
        return new Promise(async (resolve, reject) => {
            try {
                const doc = await db.users.find({username: username});
                resolve(doc);
            } catch (error) {
                reject(error);
            }
        })
    }
    

};