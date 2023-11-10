const pgp = require('pg-promise')();
const db = pgp(/* insert database connection string here */)

module.exports = {
    db,
    end: pgp.end
};