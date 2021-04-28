# 프리티어 eslint 충돌 이슈

[https://velog.io/@yrnana/prettier%EC%99%80-eslint%EB%A5%BC-%EA%B5%AC%EB%B6%84%ED%95%B4%EC%84%9C-%EC%82%AC%EC%9A%A9%ED%95%98%EC%9E%90]
[https://roomedia.tistory.com/entry/%EC%9D%B4%EC%8A%88-9-Parsing-error-Unexpected-token-eslint]

# 앱에서 함수 호출

1. functions.https.onCall((data, context)=>{})
   data는 데이터가 담기고, context에는 사용자 인증 정보
   return은 json으로 던지면 됨. 비동기 작업 후, 프로미스로 반환 가능

# HTTP 요청을 통한 함수 호출

functions.https를 통해 HTTP 요청을 트리거 할 수 있음.

## HTTP 요청으로 함수 트리거

functions.https.onRequest((req, res) =>{})

- HTTP 함수가 올바르게 종료되는지 체크!! res.redirect(), res.send() 또는 res.end()로 HTTP 함수를 종료!! 과금 주의!

기존 Express 사용 가능
