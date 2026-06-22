/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex("users").truncate();
  await knex("users").insert([
    { username: "ahmet", email: "ahmet@gmail.com" },
    { username: "ayse", email: "ayse@gmail.com" },
  ]);
};
