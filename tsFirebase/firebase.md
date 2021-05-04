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

cors 미들웨어

# 일정에 따라 함수 실행

[https://firebase.google.com/docs/functions/schedule-functions?authuser=1]
functions.pubsub.schedule().onRun()

# 백그라운드 함수 트리거

onWrite는 모든 변화 ㅇㅇ!
에뮬레이터에서도 확인 가능하네 개쩐다 진짜!!

# Ts 모듈 익스포트

[https://velog.io/@jkzombie/Typescript-%EC%9D%B5%ED%9E%88%EA%B8%B0-lib]
해결법
[https://pewww.tistory.com/26]

# 데이터 추가

기존 문서 병합

```
const cityRef = db.collection('cities').doc('BJ');

const res = await cityRef.set({
  capital: true
}, { merge: true });
```

문서 추가

```
await db.collection('cities').doc('new-city-id').set(data);
```

ID 자동생성 : add()

```
const res = await db.collection('cities').add({
  name: 'Tokyo',
  country: 'Japan'
});

console.log('Added document with ID: ', res.id);
```

참조 후 사용하기 doc() -> set()

```
const newCityRef = db.collection('cities').doc();

// Later...
const res = await newCityRef.set({
  // ...
});
```

업데이트 update()

```
const cityRef = db.collection('cities').doc('DC');

// Set the 'capital' field of the city
const res = await cityRef.update({capital: true});
```

타임스탬프

```
// Get the `FieldValue` object
const FieldValue = admin.firestore.FieldValue;

// Create a document reference
const docRef = db.collection('objects').doc('some-id');

// Update the timestamp field with the value from the server
const res = await docRef.update({
  timestamp: FieldValue.serverTimestamp()
});
```

중첩된 객체 필드 접근

```
const initialData = {
  name: 'Frank',
  age: 12,
  favorites: {
    food: 'Pizza',
    color: 'Blue',
    subject: 'recess'
  }
};

// ...
const res = await db.collection('users').doc('Frank').update({
  age: 13,
  'favorites.color': 'Red'
});
```

작업하고 다음 작업하기 then!

```
db.collection("users").doc("frank").set({
  name: "Frank",
  favorites: {
    food: "Pizza",
    color: "Blue",
    subject: "Recess"
  },
  age: 12
}).then(function() {
  console.log("Frank created");
});
```

배열 요소 업데이트

문서에 배열 필드가 포함되어 있으면 arrayUnion() 및 arrayRemove()를 사용해 요소를 추가하거나 삭제할 수 있습니다. arrayUnion()은 배열에 없는 요소만 추가하고, arrayRemove()는 제공된 각 요소의 모든 인스턴스를 삭제합니다.

```
const admin = require('firebase-admin');
// ...
const washingtonRef = db.collection('cities').doc('DC');

// Atomically add a new region to the "regions" array field.
const unionRes = await washingtonRef.update({
  regions: admin.firestore.FieldValue.arrayUnion('greater_virginia')
});
// Atomically remove a region from the "regions" array field.
const removeRes = await washingtonRef.update({
  regions: admin.firestore.FieldValue.arrayRemove('east_coast')
});
```

```
const admin = require('firebase-admin');
// ...
const washingtonRef = db.collection('cities').doc('DC');

// Atomically increment the population of the city by 50.
const res = await washingtonRef.update({
  population: admin.firestore.FieldValue.increment(50)
});
```
