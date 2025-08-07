const express = require("express");
const app = express();
const { connectMongoDb } = require("./connection");

const { logReqRes } = require("./middleware");

const userRouter = require("./routes/user");

const port = 8000;

//connection
connectMongoDb("mongodb://127.0.0.1:27017/youtube-app-1", {useNewUrlParser: true,
  useUnifiedTopology: true,})
  .then(() => {
    return console.log("connected to the database");
  })
  .catch((err) => {
    return console.log(err);
  });

// Middleware to parse url-encoded data and JSON
app.use(express.urlencoded({ extended: false }));
app.use(logReqRes("log.txt"));

//routes
app.use("/api/users", userRouter);

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
