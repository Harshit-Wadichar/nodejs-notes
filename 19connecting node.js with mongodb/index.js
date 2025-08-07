const express = require("express");
const fs = require("fs");
const app = express();
const mongoose = require("mongoose");

const port = 8000;

//connection
mongoose
  .connect("mongodb://127.0.0.1:27017/youtube-app-1")
  .then(() => {
    return console.log("connected to the database");
  })
  .catch((err) => {
    return console.log(err);
  });

//schema
const userSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    job_title: {
      type: String,
    },
    gender: {
      type: String,
    },
  },
  { timestamps: true }
);

//model
const user = mongoose.model("user", userSchema);

// Middleware to parse url-encoded data and JSON
app.use(express.urlencoded({ extended: false }));
app.use((req, res, next) => {
  fs.appendFile(
    "log.txt",
    `${Date.now()}: ${req.method} ${req.path} \n`,
    (req, res) => {
      next();
    }
  );
});

app.get("/users", async (req, res) => {
  const allDbUsers = await user.find({});
  const html = `
     <UL>
     ${allDbUsers
       .map((user) => {
         return `<li>${user.first_name} - ${user.email}</li>`;
       })
       .join("")}
     </UL>`;
  res.send(html);
});

app.get("/api/users", async (req, res) => {
  const allDbUsers = await user.find({});
  console.log(req.headers); //to see the request headers
  res.setHeader("X-created-by", "Harshit"); //to set the response headers
  // alwasys use X- before the header name for custom headers
  res.json(allDbUsers);
});

app
  .route("/api/users/:id")
  .get(async (req, res) => {
    const User = await user.findById(req.params.id);
    if (!user) {
      res.status(404).json({ status: "failed", message: "User not found" });
    }
    res.send(User);
  })
  .patch(async (req, resp) => {
    //to edit the user with id
    User = await user.findByIdAndUpdate(req.params.id,{
      last_name: "changd",
    })
    return resp.json({ result: "success" });
  })
  .delete(async (req, resp) => {
    //to delete the user with id
    const User = await user.findByIdAndDelete(req.params.id);
    console.log(User);
    return resp.json({ result: "success" });
  });

app.post("/api/users", async (req, res) => {
  // Creating new user
  const body = req.body;
  if (
    !body.first_name ||
    !body.last_name ||
    !body.email ||
    !body ||
    !body.gender ||
    !body.job_title
  ) {
    return res
      .status(400)
      .json({ status: "failed", message: "Please provide all the details" });
  }
  const result = await user.create({
    first_name: body.first_name,
    last_name: body.last_name,
    email: body.email,
    gender: body.gender,
    job_title: body.job_title,
  });

  console.log("result:", result);

  return res.status(201).json({ msg: "success" });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
