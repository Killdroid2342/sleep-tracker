const bcrypt = require('bcrypt');
const { getDbConn } = require('../util');
require('dotenv').config();

const createUser = async (username, password) => {
  const conn = getDbConn();
  conn.query(
    'INSERT INTO sleeptracker_users (username, password) VALUES (?,?)',
    [username, password]
  );
  conn.end();
};
const hashPassword = async (password, saltRounds) => {
  const res = bcrypt.hashSync(password, saltRounds);
  return res;
};
const isUserExists = async (username) => {
  const conn = getDbConn();
  const res = conn
    .promise()
    .query('SELECT * FROM sleeptracker_users WHERE username = ?', [username])
    .then(([rows, fields]) => {
      if (rows.length > 0) {
        return rows[0];
      } else {
        return false;
      }
    });
  conn.end();
  return res;
};
async function comparePassswords(passwords, hash) {
  return bcrypt.compareSync(passwords, hash);
}
const deleteUser = async (username) => {
  const conn = getDbConn();
  conn.query('DELETE FROM sleeptracker_users WHERE username = ?', [username]);
  conn.end();
};

module.exports = {
  createUser,
  hashPassword,
  isUserExists,
  comparePassswords,
  deleteUser,
};
