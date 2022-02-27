const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin"); //index.html 파일을 dist 폴더에 index_bundle.js 파일과 함께 자동으로 생성
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/index.js", //웹팩을 실행할 대상 파일. 배열/객체 형태로 여러 개의 entry 지정도 가능(다중 페이지 App 개발 시)
  output: {
    // 웹팩의 결과물에 대한 정보 설정
    path: path.resolve(__dirname, "./dist"),
    filename: "[name].js", // 여러 개의 entry 포인트를 사용할 때 각각의 번들 파일이 entry 포인트 이름으로 만들어지도록 함.
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, //인식할 파일의 포맷 지정
        exclude: "/node_modules/", //로더에서 제외할 파일 설정
        loader: "babel-loader", // 적용할 loader가 1개 => loader: "babel-loader", 2개 이상 => use: ["babel-loader", "~"]
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"], // 오른쪽에서 왼쪽으로 loader가 실행된다.
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({ template: "./public/index.html" }), // index.html 파일 경로 재지정. 기본적으로 build시 dist 폴더에 index.html 파일이 생성되는데 이를 public/index.html로 옮긴 후 파일 경로를 수정해주어야 함. 이 때 html 파일 내의 script 태그는 제거한다.
  ],
  devServer: {
    port: 3000,
  },
};
