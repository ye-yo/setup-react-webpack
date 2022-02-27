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

# 3. 바벨 설치 및 설정

## 3-1. 바벨 설치

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

## 3-2. 바벨 설정

바벨 적용시 사용할 preset 옵션을 지정해 주기위해 config 파일을 작성한다.
바벨에 대한 설정은 `.babelrc`, `babel.config.json` 혹은 `package.json` 파일이나, webpack과 함께 사용할 경우 `webpack.config.js` 파일에서도 가능하다.

- **.babelrc** : `.babelrc.json`의 별칭. 프로젝트의 일부분(파일/디렉토리)에서만 적용되는 구성이 있을 경우에 적합.(ex: babel을 적용하고 싶지 않은 타사 라이브러리가 있을 경우)
- **babel.config.json** : 단일 babel config를 사용하는 프로젝트에서 여러 패키지 디렉토리가 있는 경우 유용. (ex: `node_modules` 사용 시)

\*`.js` 파일 확장자 사용 시 babel config API가 노출되며 이는 캐싱과 관련해 복잡성을 증가시켜 대부분 파일 확장자를 `.json` 하는 것이 좋다고 한다.

`babel.config.json`

```json
{
  "presets": ["@babel/preset-env", "@babel/preset-react"]
}
```

# 용어 정리

- #### preset
  > plugin들을 모아놓은 bundle
- #### polyfill
  > 브라우저에서 지원하지 않는 기능을 지원 가능하도록 작성한 코드를 말하며, transfile만으로 해결할 수 없는 기능을 구현한 코드이다.

# 참고자료

- [React Docs](https://ko.reactjs.org/docs/getting-started.html)
- [ReactDOM Docs](https://ko.reactjs.org/docs/react-dom.html)
- [Babel Docs](https://babeljs.io/docs/en/)
- [stack overflow - When to use babel.config.js and .babelrc](https://stackoverflow.com/questions/60288375/when-to-use-babel-config-js-and-babelrc)
