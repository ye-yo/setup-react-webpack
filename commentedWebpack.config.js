const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/index.js", //웹팩을 실행할 대상 파일. 배열/객체 형태로 여러 개의 entry 지정도 가능(다중 페이지 App 개발 시)
  output: {
    // 웹팩의 결과물에 대한 정보 설정
    path: path.resolve(__dirname, "./dist"),
    filename: "[name].js", // 여러 개의 entry 포인트를 사용할 때 각각의 번들 파일이 entry 포인트 이름으로 만들어지도록 함.
  },
};
