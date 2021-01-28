const UserStorage = require("./UserStorage");

class User {
  constructor(body) {
    this.body = body;
  }

  login() {
    const users = UserStorage.getInfo(this.body.id);
    if (users.id) {
      if (users.id === this.body.id && users.password === this.body.password)
        return { result: "Success" };
      else return { result: "fail", msg: "잘못된 비밀번호" };
    } else return { result: "fail", msg: "존재하지 않는 아이디입니다" };
    /*
    if (users.id.includes(this.body.id)) {
    const idx = users.id.indexOf(this.body.id);
    if (users.password[idx] == this.body.password) {
        console.log(true);
        return { result: "Success" };
    } else return { result: "fail" };
    } else {
    console.log(false);
    return { result: "fail" };
    }
    */
  }

  register() {}
}

module.exports = User;
