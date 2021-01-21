// const express = require("express");
// const app = express();
// const cookie = require("cookie");

// app.get("/", (req, res) => {
//   //  req로 저장된 쿠키 꺼내는법.(문자열로 전달됨)
//   console.log(req.headers.cookie);

//   let cookies = {};
//   if (req.headers.cookie !== undefined) {
//     //  객체로 전달해줌
//     cookies = cookie.parse(req.headers.cookie);
//   }
//   //쿠키 전달 메소드. 쿠키는 한번 전달하면 남아있다. req header에
//   // 아래 쿠키는 세션쿠키 껏다 키면 사라짐.
//   res.setHeader("Set-Cookie", [
//     "type=ninja",
//     "language=javascript",
//     // 펄머넌트 쿠키 껏다켜도 살아있음. Max-Age는 얼마나 살아있냐. 초단위, Expires는 언제 죽냐!
//     `Permanet=cookies; Max-Age = ${30}`,
//     // https에서만 쿠키생성되는 시큐어
//     `Secure=Secure; Secure`,
//     // js눈에는 보이지 않음
//     `HttpOnly=httponly; HttpOnly`,
//     // 패스로 지정된 곳, 그 하위에서 살아있음
//     `Path=path; Path=/cookie`,
//     //저 앞에 무슨 서브 도메인이 있든 얘는 살아있음
//     `Domain=domain; Domain=o2.org`,
//   ]);
//   res.send("cookies");
// });

// app.listen(3000, () => {});
