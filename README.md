# setup-react-webpack

CRA(create-react-app) 없이 웹팩을 이용해 리액트 개발환경을 직접 설정해본다.

# 1. 폴더 초기화

```
yarn init -y
```

# 2. 리액트 설치

- **React DOM** : React 코드와 DOM을 연결하기 위한 메서드를 제공(ex:`ReactDOM.render()`).
  React.v0.14 부터 React와 분리되었다.(`react-native`처럼 dom이 필요하지 않은 환경을 위해서)
- [React Docs](https://ko.reactjs.org/docs/getting-started.html)
- [ReactDOM Docs](https://ko.reactjs.org/docs/react-dom.html)

```
yarn add react react-dom
```

# 3. 바벨 설치

- **Babel** : javascript 트랜스파일러.
- 사용 목적❔ : 최신 자바스크립트를 구 버전의 브라우저에서 사용할 수 있게 하기 위해서
- 기능 : ES6로 작성된 코드를 ES5로 변환시켜준다.
- [Babel Docs](https://babeljs.io/docs/en/)

```
yarn add -D @babel/core @babel/preset-react @babel/preset-env
```

\*바벨은 빌드 시에만 필요하기 때문에 모두 개발의존성(devDependencies)으로 설치한다(`-D` 옵션)

- @babel/core : 바벨의 핵심 패키지
- @babel/preset-env: ES6이상의 문법으로 작성된 코드를 ES5 문법의 코드로 변환해주는 규칙들을 모아놓은 [preset](#preset)이며 브라우저 [폴리필](#polyfill)을 제공한다.
- @babel/preset-react : react를 위한 플러그인을 모아둔 preset이며 JSX 문법을 사용할 수 있게 해준다.

# 용어 정리

- #### preset
  > plugin들을 모아놓은 bundle
- #### polyfill
  > 브라우저에서 지원하지 않는 기능을 지원 가능하도록 작성한 코드를 말하며, transfile만으로 해결할 수 없는 기능을 구현한 코드이다.
