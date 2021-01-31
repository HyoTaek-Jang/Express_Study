//프로미시스를 붙이면 fs에 관련 내용은 프로미스를 반환함
// 어웨잇은 프로미스를 반환하는 애한테 붙여야함
const fs = require("fs");
const db = require("../config/db");

class UserStorage {
  static getInfo(data) {
    return new Promise((resolve, reject) => {
      const query = "SELECT id, psword FROM users WHERE id = ?";
      db.query(query, [data], (err, data) => {
        if (err) reject(`${err}`);
        resolve(data[0]);
      });
    });
  }

  static setUser(data) {
    return new Promise((resolve, reject) => {
      const query = "INSERT INTO users (id, name, psword) VALUES(?,?,?)";
      db.query(query, [data.id, data.name, data.password], (err) => {
        if (err) reject(`${err}`);
        resolve({ result: "Success", msg: "굿" });
      });
    });
  }
}

module.exports = UserStorage;
