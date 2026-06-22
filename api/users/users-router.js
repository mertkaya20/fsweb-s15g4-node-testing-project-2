const express = require("express");
const UsersModel = require("./users-model");

const usersRouter = express.Router();

usersRouter.get("/", async (req, res) => {
  try {
    const users = await UsersModel.getAll();

    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

usersRouter.get("/:id", async (req, res) => {
  try {
    const user = await UsersModel.getById(req.params.id);

    if (!user) {
      return res
        .status(404)
        .json({ message: "Geçerli bir kullanıcı id'si girin" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

usersRouter.post("/", async (req, res) => {
  try {
    if (!req.body || !req.body.username || !req.body.email) {
      return res.status(400).json({ message: "Lütfen tüm alanları doldurun" });
    }

    const createdUser = await UsersModel.add(req.body);
    res.status(201).json(createdUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = usersRouter;
