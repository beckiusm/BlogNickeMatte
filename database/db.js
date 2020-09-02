require('dotenv').config();
const Datastore = require("nedb-promise");
db = {};

switch (process.env.ENVIRONMENT) {
    case 'dev':
        db.posts = new Datastore({ filename: __dirname + "/posts.db", autoload: true });
        db.comments = new Datastore({ filename: __dirname + "/comments.db", autoload: true });
        db.users = new Datastore({ filename: __dirname + "/users.db", autoload: true });
        break;
    case 'test':
        db.comments = new Datastore({ filename: __dirname + "/testComments.db", autoload: true });
        db.users = new Datastore({ filename: __dirname + "/testUsers.db", autoload: true });
        db.posts = new Datastore({ filename: __dirname + "/testPosts.db", autoload: true });
        break;
}

exports.db = db;