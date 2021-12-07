[이 링크를 통해 작동을 확인해보실 수 있습니다.](https://seonjakim.github.io/Albums/)

jpg, png, jpeg, gif 파일을 올릴 경우 url로 변경되어 화면에 보여지게 됩니다.

# install

`npm install` 후 `npm run start`를 실행하면 개발모드로 확인하실 수 있습니다.

# 설정

- Framework : React
- CSS preprocessor : styled-components
- Bundler : Webpack
- Complier : Babel

# Issue

![](https://images.velog.io/images/seonja/post/de13f80c-5390-4d65-adde-39b2d793b269/Screen%20Shot%202021-12-07%20at%2018.20.45.png)

[이슈는 이 링크를 통해 확인해보실 수 있습니다.](https://github.com/seonjakim/Albums/issues?q=is%3Aissue+is%3Aclosed)

작업단위를 나누고 이슈를 발급하여 작업하였습니다. 내용을 조금은 더 디테일하게 쓰지 못한 점이 아쉬웠습니다.

# CRUD

새로운 앨범을 생성하거나 편집할 때, 페이지를 전환하는 것도 고민하였지만 기능 자체가 단순하여 모두 모달창을 이용하여 작업하였습니다.

![](https://images.velog.io/images/seonja/post/7c0cccc1-e7ad-42c5-9402-c688bd6777ce/Screen%20Shot%202021-12-07%20at%2018.44.45.png)

albums 정보를 변경하는 기능은 재사용할 수 있도록 /components/Library.js 파일로 분리하여 작성하였습니다.

# 느낀점

모달을 버튼만 있는 모달, 메세지와 버튼이 함께 있는 모달, 다른 정보들이 필요한 모달 등 동일한 특성들을 분류해 여러곳에서 사용할 수 있도록 분리를 고민해보았지만 현재 필요한 정도에서는 코드양이 적어지거나 더 효율적이지는 않을 것이라고 판단하여 ModalBackground(/components/modals/ModalBackground.js)만 분리했습니다.

서버와 통신하는 fetch의 경우도 공통적으로 사용하는 함수로 분리를 고민했지만 해당 프로젝트에서는 한번만 사용하기때문에 따로 분리하지는 않았습니다.

```javascript
const fetchData = async (url, endpoint) => {
  const res = await fetch(`${url}/${endpoint}`)
  return res.json()
}
```

대략적으로 이렇게 분리할 경우 차후 axios를 사용한다거나 에러발생과 관련된 로직 추가시 유용할 것이라고 생각합니다.
