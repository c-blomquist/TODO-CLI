const pgp = require("pg-promise")();
const jsonData = require("./credentials.json");

const db = pgp({
  connectionString: `postgres://${jsonData.username}:${jsonData.password}@${jsonData.host}:5432/${jsonData.database}`,
  ssl: { rejectUnauthorized: false }
});

module.exports = {
  db,
  end: pgp.end,
};
