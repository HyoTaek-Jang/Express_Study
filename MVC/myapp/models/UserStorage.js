//프로미시스를 붙이면 fs에 관련 내용은 프로미스를 반환함
// 어웨잇은 프로미스를 반환하는 애한테 붙여야함
const fs = require("fs");

class UserStorage {
  // # 붙이면 외부에서 못보게 은닉화 함
  static #users = JSON.parse(fs.readFileSync("./DB/MVC/users.json", "utf8"));

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

    fs.writeFileSync("./DB/MVC/users.json", JSON.stringify(users));

    return { result: "Success", msg: "굿" };
  }
}

module.exports = UserStorage;
