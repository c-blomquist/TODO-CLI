const pgp = require('pg-promise')();
const db = pgp('postgres://postgres:data101@localhost/todo')

module.exports = {
    db,
    end: pgp.end
};