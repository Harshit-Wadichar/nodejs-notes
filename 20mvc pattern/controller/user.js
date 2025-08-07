const User = require("../models/user");

async function handleGetAllUsers(req, res) {
  try {
    const allDbUsers = await User.find({});
    return res.json(allDbUsers);
  } catch (error) {
    return res.status(500).json({ 
      status: "error", 
      message: "Internal server error" 
    });
  }
}

async function handleGetUserById(req, res) {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ 
        status: "failed", 
        message: "User not found" 
      });
    }
    return res.json(user);
  } catch (error) {
    return res.status(500).json({ 
      status: "error", 
      message: "Internal server error" 
    });
  }
}

async function handleUpdateUserById(req, res) {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { last_name: "changed" },
      { new: true } // Return updated document
    );
    if (!updatedUser) {
      return res.status(404).json({ 
        status: "failed", 
        message: "User not found" 
      });
    }
    return res.json({ 
      status: "success", 
      user: updatedUser 
    });
  } catch (error) {
    return res.status(500).json({ 
      status: "error", 
      message: "Internal server error" 
    });
  }
}

async function handleDeleteUserById(req, res) {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ 
        status: "failed", 
        message: "User not found" 
      });
    }
    return res.json({ 
      status: "success", 
      deletedUser 
    });
  } catch (error) {
    return res.status(500).json({ 
      status: "error", 
      message: "Internal server error" 
    });
  }
}

async function handleCreateNewUser(req, res) {
  try {
    const body = req.body;
    if (
      !body.first_name ||
      !body.last_name ||
      !body.email ||
      !body.gender ||
      !body.job_title
    ) {
      return res.status(400).json({ 
        status: "failed", 
        message: "All fields are required" 
      });
    }

    const result = await User.create({
      first_name: body.first_name,
      last_name: body.last_name,
      email: body.email,
      gender: body.gender,
      job_title: body.job_title,
    });

    return res.status(201).json({ 
      status: "success", 
      id: result._id 
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ 
        status: "failed", 
        message: "Email already exists" 
      });
    }
    return res.status(500).json({ 
      status: "error", 
      message: "Internal server error" 
    });
  }
}

module.exports = {
  handleGetAllUsers,
  handleGetUserById,
  handleUpdateUserById,
  handleDeleteUserById,
  handleCreateNewUser,
};