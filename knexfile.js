// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

const commonConfig = {
  client: "sqlite3",
  useNullAsDefault: true,
  migrations: {
    directory: "./data/migrations",
  },
  seeds: {
    directory: "./data/seeds",
  },
  pool: {
    afterCreate: (conn, done) => {
      conn.run("PRAGMA foreign_keys = ON", done);
    },
  },
};

module.exports = {
  development: {
    ...commonConfig,
    connection: {
      filename: "./data/project.sqlite3",
    },
  },

  test: {
    ...commonConfig,
    connection: {
      filename: "./data/test.sqlite3",
    },
  },
};
