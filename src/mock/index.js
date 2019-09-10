import Mock from "mockjs";

//模拟圆形进度条数据
Mock.mock("api/Roundprogress", "get", {
  code: 200,
  msg: "success",
  "data|3": [{ money: "@natural(1000, 100000)", speed: "@natural(1, 100)" }]
});

//模拟城市数据
Mock.mock("api/cityData", "get", {
  code: 200,
  msg: "success",
  "data|30": [{ city: "@city()", count: "@natural(1, 100)" }]
});
//模拟城市颜色列表
Mock.mock("api/cityColor", "get", {
  code: 200,
  msg: "success",
  "data|30": ["@color()"]
});
// 模拟汇报人
Mock.mock("api/ReportData", "get", {
  code: 200,
  msg: "success",
  "data|20": [{  label: "@cname()" }]
});
