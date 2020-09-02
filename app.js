

const express = require("express");
const app = express();
const { v4: uuidv4 } = require("uuid");

bodyParser = require("body-parser");

// support parsing of application/json type post data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// router
const postsRoute = require("./routes/posts");
const commentsRoute = require("./routes/comments");
const userRoute = require("./routes/user");

app.use("/posts", postsRoute);
app.use("/comments", commentsRoute);
app.use("/user", userRoute);

app.listen(3000, () => {
  console.log("Listen on port 3000");
});

