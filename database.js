const pgp = require("pg-promise")();
const jsonData = require("./credentials.json");
// console.log(`postgres://${jsonData.username}:${jsonData.password}@${jsonData.host}:5432/${jsonData.database}`);

const config = {
  connectionString: `postgres://${jsonData.username}:${jsonData.password}@${jsonData.host}:5432/${jsonData.database}`,
  max: 30,
  ssl: { rejectUnauthorized: false },
};
const db = pgp({
  connectionString: `postgres://${jsonData.username}:${jsonData.password}@${jsonData.host}:5432/${jsonData.database}`,
  max: 30,
  ssl: { rejectUnauthorized: false },
});

module.exports = {
  db,
  end: pgp.end,
};
