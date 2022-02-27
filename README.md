# setup-react-webpack

CRA(create-react-app) 없이 웹팩을 이용해 리액트 개발환경을 직접 설정해본다.

# 1. 폴더 초기화

## 1-1. init 명령어를 통해 `package.json`파일이 생성된다.

```
yarn init -y
```

# 1-2. 프로젝트에 필요한 폴더를 생성한다.

```
mkdir src public dist
```

- src: react를 위한 폴더
- public: 정적 html 폴더
- dist : 번들링한 결과물이 저장될 폴더

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

혹은 `webpack.config.js`에서 loader 설정시 함께 설정

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: "/node_modules/",
        loader: "babel-loader",
        options: {
          presets: [
            "@babel/env",
            ["@babel/preset-react", { runtime: "automatic" }],
          ],
        },
      },
    ],
  },
};
```

`runtime: "automatic"`

> JSX를 React.createElement로 변환하는 것이 이전 방식인데 React17 이후부터 자동으로 React를 가져오는 방식으로 변경되어서 React import가 생략 가능. 하지만 `@babel/preset-react`에서 이를 사용하기 위해서 `runtime :automatic` 옵션 설정해주어야 함.(기본은 `classic`)

# 4. 웹팩 관련 설치

- webpack: 모던 javascript 애플리케이션을 위한 정적 [모듈 번들러](#모듈-번들러)

- [필요 이유](https://joshua1988.github.io/webpack-guide/motivation/why-webpack.html#%EC%9B%B9%ED%8C%A9%EC%9D%98-%EB%93%B1%EC%9E%A5-%EB%B0%B0%EA%B2%BD)
- [기존 문제의 해결](https://joshua1988.github.io/webpack-guide/motivation/problem-to-solve.html)

## 4-1. 웹팩 설치

```
yarn add -D webpack webpack-cli webpack-dev-server
```

- webpack: 웹팩 핵심 패키지
- webpack-cli: 웹팩을 커맨드라인에서 사용할 수 있게 함.
- webpack-dev-server: 웹팩 개발 서버를 구동할 수 있게 함. 실시간 리로딩을 지원한다.

## 4-2. 로더 설치

- Loader: js, json 파일 외의 html, css, images 폰트 등의 파일을 모듈로 불러와 번들링 하기 위해 사용.

```
yarn add -D babel-loader style-loader css-loader
```

- babel-loader: JSX 및 ES6+ 문법을 변환.
- style-loader: 변환된 CSS파일은 `<style>` 태그로 삽입
- css-loader: .css 파일을 읽기위한 로더

## 4-3. 플러그인 설치

- Plugin: 웹팩 번들링 후 변환된 파일에 추가적인 기능을 더하기 위해 사용한다.

```
yarn add -D html-webpack-plugin clean-webpack-plugin
```

- html-webpack-plugin: 번들링된 css파일과 js파일을 html파일에 `link`, `script` 태그로 추가해주어야 할 때 이를 자동화하여 html 파일을 생성해준다.
- clean-webpack-plugion: 빌드된 결과물을 자동 정리하는 플러그인으로 이전 빌드 결과물을 제거한다.

# 5. 웹팩 설정

`webpack.config.js` 파일을 생성해 다음과 같이 작성한다.

## 5-1. mode & entry & output 설정

```js
const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "[name].js",
    publicPath: "/",
  },
};
```

### 5-2. modules - loader 설정

```js
...
module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: "/node_modules/",
        use: "babel-loader",
      },
    ],
  },
```

### 5-3. 플러그인 설정

```js
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
...
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({ template: "./public/index.html" }),
  ],
  ...
}
```

# 6. 실행 스크립트 작성

`package.json`

```
  "scripts": {
    "start": "webpack serve --mode development",
    "build": "webpack --mode production"
  }

```

`webpack serve` = `webpack-dev-server`

- production(배포) 모드 : 로드 시간을 줄이기 위해 번들 최소화, 가벼운 소스맵 및 애셋 최적화에 초점을 맞춤
- development(개발) 모드 : 개발 생산성을 높이기 위한 모드. 버그발생 위험이 있는 코드를 미리 경고해주는 검증 코드도 포함되어 있다.

# 7. 개발 시에 자주 사용하는 설정

## 7-1. resolve 옵션

```js
resolve: {
  extensions: ['.js', '.jsx'],
  alias: {
    Utilities: path.resolve(__dirname, 'src/utilities/'), //import Utility from 'Utilities/utility'; 사용 가능
  },
}
```

#### extensions

> 웹팩이 모듈을 처리하는 방식을 설정하며 앞에서 부터 차례대로 파일을 해석한다. 이 설정을 통해 import시 확장자를 생략할 수 있다.(설정해주지 않고 .jsx 파일을 확장자 없이 import시 오류 발생)

#### alias

> 특정 경로에 별칭을 지정하여 사용할 수 있다.

## 7-2. devtool 옵션

#### 소스맵 설정

**Source Map** : 배포용으로 빌드한 파일과 원본 파일을 연결시켜주는 기능으로, 에러가 발생한 배포용 파일의 특정 부분이 원본에서 어느 부분인지 확인이 가능하다.

```js
module.exports = {
  devtool: "cheap-eval-source-map",
};
```

## 7-3. devServer 옵션

```js
module.exports = {
  ...
  devServer: {
    hot: true,
    open: true,
    historyApiFallback: true,
  }
}
```

### 서버 실행 시 자동으로 브라우저 열기 - open : true

`devServer` option에 작성하는 내용들은 `package.json` `scripts`에 옵션으로 추가하여 사용할 수도 있다.`"start": "webpack serve --open"`

### 주소창에 url 직접 입력시/새로고침 시 404 에러 문제 - historyApiFallback : true

**historyApiFallback**

> History API 또는 react-router 사용시 설정해 놓은 url 이외의 경로로 접속했을 때에도 index.html을 제공할지 결정하는 옵션

### 웹팩으로 빌드한 결과물 실시간으로 반영 - hot : true

**HMR(Hot Module Replacement)**

> 새로고침 없이 웹팩으로 빌드한 결과물이 실시간으로 반영될 수 있게 도와주는 설정

### 프록시 설정 - CORS 에러 해결

```js
module.exports = {
  ...
  devServer: {
    proxy: {
       '/api': {
        target: 'domain.com',
        changeOrigin: true
      }
    }
  }
};
```

위와 같이 설정하면 API 요청시 `domain.com` 주소에서는 같은 도메인에서 온 요청으로 인식하여 CORS 에러가 나지 않음.

## 7-4. 플러그인

### 환경 변수와 같은 전역 변수 사용 - DefinePlugin

```js
const webpack = require("webpack");

module.exports = {
  //...
  plugins: [
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": '"production"',
    }),
    /* EnviromentPlugin을 사용해도 됨.
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development' 
    })
    */
  ],
};
```

### CSS 파일 분리 - MiniCssExtractPlugin

CSS 파일을 별도로 분리하하여 번들링하는 플러그인으로 큰 사이즈의 애플리케이션의 경우 사용하면 좋고 배포 시에 사용한다.
(style-loader는 css파일을 읽어 `<style>`로 만들어 `<head>` 태그에 삽입하는 js 코드를 생성하는데 이러한 css파일이 많을 경우 js 파일도 크기가 늘어날 수밖에 없음. => css 파일을 별도로 분리하여 번들링하는 것이 좋음
\*style-loader와 함께 사용 불가)

## 7-5. module 옵션

```js
module: {
  rules: [
    {
      test: /\.(png|svg|jpg|jpeg|gif)$/i,
      type: "asset/resource",
    },
    {
      test: /\.(woff|woff2|eot|ttf|otf)$/i,
      type: "asset/resource",
    },
  ];
}
```

`type: "asset/resoure"` : asset을 별도의 파일로 내보내는 모듈
용량이 비교적 작은 svg 파일은 inline으로 번들에 포함시키는 것이 좋음
`type : "asset/inline"`

## 7-5. 그 외 플러그인

- 자바스크립트 번들 사이즈를 줄이는 uglity(코드 난독화) 플러그인 : terser-webpack-plugin
- 이미지 파일 최적화 플러그인 : image-minimizer-webpack-plugin
- 미디어 쿼리 플러그인 : media-query-plugin
  > 모바일/PC에서 각각 필요한 미디어 쿼리 코드만 추출해 비동기로 로드
- CSS 최적화 플러그인 : css-minimazier-webpack-plugin

# 용어 정리

- #### preset
  > plugin들을 모아놓은 bundle
- #### polyfill
  > 브라우저에서 지원하지 않는 기능을 지원 가능하도록 작성한 코드를 말하며, transfile만으로 해결할 수 없는 기능을 구현한 코드이다.
- #### 모듈 번들러
  > 웹 애플리케이션을 구성하는 자원(HTML,CSS,Javascript,Images 등) 각각을 모두 모듈로 보고 이를 조합하여 병합된 하나의 결과물을 만드는 도구

# 참고자료

- [React Docs](https://ko.reactjs.org/docs/getting-started.html)
- [ReactDOM Docs](https://ko.reactjs.org/docs/react-dom.html)
- [Babel Docs](https://babeljs.io/docs/en/)
- [stack overflow - When to use babel.config.js and .babelrc](https://stackoverflow.com/questions/60288375/when-to-use-babel-config-js-and-babelrc)
- [웹팩 핸드북](https://joshua1988.github.io/webpack-guide/webpack/what-is-webpack.html#%EB%AA%A8%EB%93%88%EC%9D%B4%EB%9E%80)
