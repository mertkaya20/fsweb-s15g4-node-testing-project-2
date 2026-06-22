const db = require("../../data/db-config");

const getAll = () => {
  return db("users");
};

const getById = (id) => {
  return db("users").where("id", id).first();
};

const add = async (user) => {
  // {name: 'mert', email: 'asd@gmail.com'}
  const [id] = await db("users").insert(user);

  return getById(id);
};

module.exports = { getAll, getById, add };
