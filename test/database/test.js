var Datastore2 = require("nedb-promise");
db2 = {};
db2.comments = new Datastore2({ filename: __dirname + "/testComments.db", autoload: true });
db2.users = new Datastore2({ filename: __dirname + "/testUsers.db", autoload: true });
db2.posts = new Datastore2({ filename: __dirname + "/testPosts.db", autoload: true });

exports.db2 = db2;