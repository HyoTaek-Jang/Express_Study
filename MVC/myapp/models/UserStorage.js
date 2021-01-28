"use strict";

const { map } = require("../app");

class UserStorage {
  // # 붙이면 외부에서 못보게 은닉화 함
  static #users = {
    name: ["a", "b", "c"],
    id: ["taek", "asdf", "df"],
    password: ["123", "31331", "12313"],
  };

  // 파라미터에 ... 표시하면 가변인자가 들어옴 리스트로
  static getUsers(...fields) {
    const users = this.#users;
    const newUsers = fields.reduce((newUsers, field) => {
      if (users.hasOwnProperty(field)) {
        newUsers[field] = users[field];
      }
      return newUsers;
    }, {});
    return newUsers;
  }

  static getInfo(data) {
    const users = this.#users;
    // 값 없으면 -1
    const idx = this.#users.id.indexOf(data);
    const userInfo = Object.keys(users).reduce((newUsers, key) => {
      //   값없으면 undefined
      newUsers[key] = users[key][idx];
      return newUsers;
    }, {});
    return userInfo;
  }

  static setUser(data) {
    const users = this.#users;
    if (users.id.includes(data.id)) return { result: "fail", msg: "중복아디" };
    if (!(data.password == data["confirm-password"]))
      return { result: "fail", msg: "비번다름" };
    Object.keys(users).map((key) => {
      users[key].push(data[key]);
    });
    this.#users = users;
    console.log(this.#users);
    return { result: "Success", msg: "굿" };
  }
}

module.exports = UserStorage;
