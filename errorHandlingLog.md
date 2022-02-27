## You may need an appropriate loader to handle this file type

> `webpack.config.js`에서 `loader`를 설정하지 않아서 생긴 문제

## CleanWebpackPlugin is not defined

> `CleanWebpackPlugin`이 제대로 require 되지 않았을 때 에러 발생.
> CleanWebpackPlugin 3.0.0 이후부터 다음과 같이 require

```js
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
```

## Target container is not a DOM element.

> 1. `webpack.config.js`에서 `HtmlWebpackPlugin` template 경로가 제대로 지정되어 있는지 확인.
> 2. index.html에 `<div id="root"></div>`를 작성해주었는지 확인
