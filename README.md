# 학습기록

### 21년 1월 10일

- express : 노드js 위에서 돌아가는 웹프레임워크(자주 사용하는 기능을 편리하게 만듬)
- 콘솔에 npm install express --save 하면됨
- post로 받을 땐, app.post
- req.params -> 주소에 들어오는 값을 읽을 수 있음. 받는 페이지 패스 분석시. :pageId 하면 여기에 들어오는 값을 params에서 찾을 수 있음
- 라우팅에 편리함을 줌
- 미들웨어 : 남이 만든 거 쓰는거
- 미들웨어의 일종인 바디파서
- 데이터 압축을 통해 네트워크 전송을 효율적으로 compression이라는 미들웨어가 있음
- 사용자정의 미들웨어
- use를 쓰면 모든 요청에서 미들웨어를 다 사용해서 낭비임. 그래서 get을 쓰는 요청에만 미들웨어를 사용함.
- 이야 우리가 만든 모든건 다 미들웨어였어!
- 에러 다루는 2가지 방법 메인코드 맨아래!

### 21년 1월 11일

- 라우터 쪼개기 파일로! 사용할땐 app.use("~", 라우터)! 상단에 리콰이어하고! 롸우터 js에선 롸우터 객체 만들고 거기에 get post! 마지막에 모듈로 보내고!
- 보안! https쓰고 helmet! 미들웨어! 걍 키셈 알아서 보호해줌 약간 압축하는 친구처럼 ㅇㅇ
- 쿠키 : 누가 사용하는지 식별하는 것. 인증에 핵심임.
  app.use(helmet());
- nsp 미들웨어 보안을 체크해주는 모듈.
- 콘솔에서 nsp check 쓰면 체크해줌
- express generator 기본 시작부분을 알아서 만들어줌. 미들웨어임
- 원하는 폴더에서 콘솔에서 express myapp 치면 그 폴더에 만들어줌. 안내에 따라 미들웨어 깔고 서버 구동은 npm start

- pug로 html을 생산적으로 만들 수 있음. 템플릿 엔진임

### 21년 1월 17일

- 쿠키를 활용한 로그인 기능 구현

### 21년 1월 24일

### 이벤트 루프

- 코드가 호출 스택에 의해서 쭉쭉 쌓임. 비동기는 백그라운드로 옮겨지고
- 호출 스택이랑 백그라운드가 같이 실행되고 있음
- 만약 백그라운드가 끝나고 콜백 함수를 부를때, 호출 스택이 어나니머스까지 비어있어야함.
- 긍까 백그라운드가 끝나면 테스트 큐로 옮겨지고, 어나니머스까지 비면 큐에서 꺼내고 스택으로 옮겨서 실행함
- 근데 테스트큐에 셋타임아웃이랑 프로미스 댄이 있으면, then이 우선순위라서 먼저 호출 스택으로 감.
- 백그라운드은 운영체제나, c++ 이라서 멀티스래드로 넘어감

### 변수

- var : 함수스코프
- let const : 블록스코프

## 21년 1월 27일

### mvc 적용해보기

### view 분리

- express에서 app.set("views", paht); 하면 view 랜더할때 자동으로 기본경로가 path가 됨.
- 뷰를 나누고 res.render로 화면 띄워주기!

### 컨트롤러 분리

- 컨트롤러 분리해주기. ctrl 폴더를 만들고 우리가 get이나 post할떄 (req,res)=>{} 이부분이 컨트롤러 부분이라 때서 분리해주고, 리콰이어해서 가져다 씀
- 라우터는 요청을 연결만 해주고 실제 기능을 하는건 컨트롤러 즉 우리가 떈 부분
- 그리고 컨트롤러를 그냥 home 이렇게 쓰는게 아니라 output.home 이런식으로 더욱 명확하게 표현해야함.

### package.json

```
  "scripts": {
  "start": "pm2 start ./bin/www --watch"
},
```

- 에서 스타트에 우리가 값을 입력하고 다음부터 npm start하면 저 명령어가 실행됨!

### git

- 노드 모듈은 올리지말고 패키지 제이슨은 꼭 올려야함
- 이그노어에서 \*\*~ 하면 모든 곳에서 ~가 이그노어됨
- 깃에서 제공하는 이그노어 탬플릿도 있음

- 프론트에서 동작하는 js는 정적경로로 스태틱 사용하고 public/java~에서 냅둬서 사용

- html에 js 넣을때 스크립트 소스 넣고 defer 넣으면 페이지 실행되고 js 실행됨

### fetch

```
js에서
fetch("/login",{
  method : "POST",
  headers : {
    "Content-Type" : "application/json",
  },
  body : JSON.stringify(data)
}).then((res)=>res.json()).then((res)=>location.href ="/")
```

- 이거로 저 링크로 데이터를 보낼 수 있음.
- location.href 로 링크이동 가능

### 바디파서

- express 안에 들어있음 걍 req.body 쓰면됨

## 21년 1월 28일

### 뷰와 컨트롤러의 통신

1. form 서밋
2. 에이젝스 통신

- 1번에 경우 반환값을 못받는 단점이 있음. 단순히 리다이랙션이나 데이터 처리하고 페이지 새로 띄울거면 ㄱㅊ. 로그인 경우 ㅇㅇ
- 2번은 데이터 통신이후 반환으로 뭔가 뷰에서 변화가 일어날때!

```
    $("#loginForm").submit((e) => {
  $.ajax({
    url: $("#loginForm").attr("action"),
    type: "POST",
    dataType: "json",
    data: $("#loginForm").serialize(),
    success: (data) => {
      alert(data.result);
      location.href = "/";
    },
  });
});
```

- 이걸 보면 제이쿼리로 ajax를 호출함. 근데 언제하냐? form에 id를 걸어서 submit할때~
- dataType은 내가 서버에서 받을 데이터가 뭔지 ㅇㅇ
- data는 form에다가 serialize해서 넘겨주면 깔꼼하게 바디 파서로 나옴
- 컨트롤러에서 데이터 처리하고 반환을 하는 방법이 res.json res.send가 있는데
- object를 인자면 res.json이고 , string이면 res.send가 남

### 모델 만들기 개쩜

- models에 이씀
- 스태틱하게 만듬.

```
  // # 붙이면 외부에서 못보게 은닉화 함
  static #users = {
    id: ["taek", "asdf", "df"],
    password: ["123", "31331", "12313"],
    name: ["a", "b", "c"],
  };

  // 파라미터에 ... 표시하면 가변인자가 들어옴 리스트로
  static getUsers(...fields) {
    const users = this.#users;
    // 필드는 필드즈 순회
    const newUsers = fields.reduce((newUsers, field) => {
      if (users.hasOwnProperty(field)) {
        newUsers[field] = users[field];
      }
      // 리턴하면 다시 뉴유저스로 들어감
      return newUsers;
      // 중괄호는 처음 뉴유저스 초기값, 없으면 필드즈의 첫번재 값
    }, {});
    return newUsers;
  }
```

### 로그인최적화

- 모델에 유저라는 파일을 만들고 클래스를 활용해서, 유저에 데이터를 넣어주고 거기서 로그인 이것저것하고 반환값 던져주는...
- 유저에서 유저스토리지를 사용해서 info를 가져오고 ...
- 와 그냥 개쩜 뭔가 난 따라했지만 코드 좋은듯

### 오픈소스 ui

- 코드팬!
- 카피라이트 확인 잘해야함

### 깃 버전 관리

- git tag 잘 사용하기
- 압축파일로 쓸 수도 있고 관리하기 편함 ㅇㅇ

### aws korean만들기... 안전한 db세팅.. 우리밋 구독..

### 만들고 꼭 인바운드 설정해주기 그래야지 접속이 된당

## 21년 1월 30일

- config 폴더는 프로젝트의 민간한 설정이 들어있음 예를 들면 db
- WAS와 웹서버 차이
  - WAS는 데이터를 가공해서 넘기고, 웹서버는 날 것 그대로 넘김

## 21년 1월 31일

- 노드js 프로젝트를 위한 환경변수 셋팅
- 환경변수는 os에 변수를 등록
- os전반에 걸쳐 모두에게 적용되는 변수
- dotenv로 모듈로 관리함
- 개발은 팀으로 하는데 운영체제가 다 다름. 그래서 dotenv로 다른 os라도 환경변수 동일하게 등록하고 가져올 수 있음
- 폴더에 .env라는 파일 생성 이름은 통일
- 접근은 process.env.~~로 함
- 보안!! 그래서 .env는 깃헙에 안올림
- 노드 자동으로 .env 이그노어임

### 로그

- morgan

```
const accesssLogStream = fs.createWriteStream(`${__dirname}/log/access.log`, {
  flags: "a",
}); <- 이 친구는 따로 모듈로 빼서 관리함.
app.use(logger("dev", { stream: accesssLogStream }));
```

### form 이중 호출 문제 해결

- form submit의 기본적인 get과 js에서 ajax로인한 post가 동시에 발생하여 정상작동을 안함
- preventDefault()를 활용하여 문제해결! 야호! 우리밋 최고
