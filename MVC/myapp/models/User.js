const UserStorage = require("./UserStorage");

class User {
  constructor(body) {
    this.body = body;
  }

  async login() {
    const { id, psword } = await UserStorage.getInfo(this.body.id);
    console.log(id, psword);
    try {
      if (id) {
        if (id === this.body.id && psword === this.body.password)
          return { result: "Success" };
        return { result: "fail", msg: "잘못된 비밀번호" };
      }
    } catch (error) {
      return { result: "fail", msg: "존재하지 않는 아이디입니다" };
    }
  }

  async register() {
    try {
      return await UserStorage.setUser(this.body);
    } catch (error) {
      return { result: "fail", msg: "회원가입 실패입니다" };
    }
  }
}

module.exports = User;
