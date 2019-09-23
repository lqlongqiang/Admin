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
  "data|20": [{ label: "@cname()" }]
});
//模拟调查问卷数据
Mock.mock("api/Investigation", "get", {
  code: 200,
  msg: "success",
  "data|30": [
    {
      questionnaireTitle: "@cword(2,4)",
      questionnaireDescription: "@cword(2,5)",
      Creationtime: "@date('yyyy-MM-dd')",
      Deadline: "@date('yyyy-MM-dd')",
      "Questionnairetopics|1": ["已发布", "未发布", "已截止"],
      "website|1": ["百度", "掘金", "豆瓣", "Github"]
    }
  ]
});
//模拟通讯录数据
Mock.mock("api/MailList", "get", {
  code: 200,
  msg: "success",
  "data|200": [
    {
      id: "@increment(1)", //从1开始自增
      name: "@cname", //随机生成的名字
      Headcolor: "@color()", //随机生成颜色
      phone: /^1([38]\d|5[0-35-9]|7[3678])\d{8}$/, //随机生成电话
      tel: /\d{3}-\d{8}|\d{4}-\d{7}/, //随机生成座机
      email: /[1-9]\d{7,10}@(qq|163|gmail)\.com/, //随机生成邮箱
      QQ: /[1-9][0-9]{4,14}/,
      "sex|1": ["男", "女"], //随机生成一个性别
      "department|1": [
        "成都分公司",
        "北京分公司",
        "上海分公司",
        "哈尔滨公司",
        "微易",
        "郑州公司",
        "测试部门",
        "财务部",
        "地州区",
        "盒马项目组",
        "成都区",
        "贵州区",
        "电商部",
        "综合管理部",
        "全民营销项目组",
        "单团部",
        "新销售业务部",
        "欧洲组",
        "中东非组",
        "票务组",
        "外联部",
        "西南总经理办公室",
        "市场营销部",
        "单团计调部",
        "票务部",
        "南亚计调部",
        "欧洲散拼计调部",
        "签证部",
        "东南亚事业部",
        "产品组",
        "途牛组",
        "携程组",
        "其他电商组",
        "资料组",
        "运营支持组",
        "京津组",
        "河北组",
        "太原公司",
        "内蒙古组"
      ], //随机生成一个部门
      "position|1": ["经理", "主管", "员工", "实习生"], //随机生成一个职位
      "tag|0-3": [
        {
          text: "@cword(2,4)",
          colortext: "@color()"
        }
      ]
    }
  ]
});
// 模拟offer管理数据

Mock.mock("api/Offer", "get", {
  code: 200,
  msg: "success",
  "data|200": [
    {
      id: "@increment(1)", //从1开始自增
      name: "@cname", //随机生成的名字
      phone: /^1([38]\d|5[0-35-9]|7[3678])\d{8}$/, //随机生成电话
      tel: /\d{3}-\d{8}|\d{4}-\d{7}/, //随机生成座机
      email: /[1-9]\d{7,10}@(qq|163|gmail)\.com/, //随机生成邮箱
      QQ: /[1-9][0-9]{4,11}/,
      "sex|1": ["男", "女"], //随机生成一个性别
      "department|1": [
        "成都分公司",
        "北京分公司",
        "上海分公司",
        "哈尔滨公司",
        "微易",
        "郑州公司",
        "测试部门",
        "财务部",
        "地州区",
        "盒马项目组",
        "成都区",
        "贵州区",
        "电商部",
        "综合管理部",
        "全民营销项目组",
        "单团部",
        "新销售业务部",
        "欧洲组",
        "中东非组",
        "票务组",
        "外联部",
        "西南总经理办公室",
        "市场营销部",
        "单团计调部",
        "票务部",
        "南亚计调部",
        "欧洲散拼计调部",
        "签证部",
        "东南亚事业部",
        "产品组",
        "途牛组",
        "携程组",
        "其他电商组",
        "资料组",
        "运营支持组",
        "京津组",
        "河北组",
        "太原公司",
        "内蒙古组"
      ], //随机生成一个部门
      "position|1": ["经理", "主管", "员工", "实习生"], //随机生成一个职位
      Nativeplace: "@city(true)", //随机生成一个省市
      "Maritalstatus|1": ["未婚", "已婚"], //随机生成未婚还是已婚
      Document: "@cword(2,4)", //随机生成证件类型
      DocumentNumber: /[1-9][0-9]{18}/, //随机生成的证件号码
      birthday: "@date('yyyy-MM-dd')", //随机生成出生日期
      "Approvalstatus|1": ["待发", "已发", "已接受", "已拒绝", "已入职"], //随机生成一个
      age: "@natural(18, 60)", //随机生成一个年龄
      "Education|1": [
        "初中",
        "高中",
        "大专",
        "本科",
        "硕士",
        "博士",
        "博士以上"
      ], //随机生成一个
      Entrytime: "@date('yyyy-MM-dd')", //随机生成一个入职时间
      Famousrace: "@cword(2,5)", //随机生成一个民族
      Workingplace: "@city()" //随机生成一个上班的城市
    }
  ]
});

//模拟人员信息数据

Mock.mock("api/Personnel", "get", {
  code: 200,
  msg: "success",
  "data|200": [
    {
      name: "@cname", //随机生成的名字
      Jobnumber: "@natural(1000,9999)", //随机生成工号
      mechanism: "区域中心", //机构中心
      "department|1": [
        "成都分公司",
        "北京分公司",
        "上海分公司",
        "哈尔滨公司",
        "微易",
        "郑州公司",
        "测试部门",
        "财务部",
        "地州区",
        "盒马项目组",
        "成都区",
        "贵州区",
        "电商部",
        "综合管理部",
        "全民营销项目组",
        "单团部",
        "新销售业务部",
        "欧洲组",
        "中东非组",
        "票务组",
        "外联部",
        "西南总经理办公室",
        "市场营销部",
        "单团计调部",
        "票务部",
        "南亚计调部",
        "欧洲散拼计调部",
        "签证部",
        "东南亚事业部",
        "产品组",
        "途牛组",
        "携程组",
        "其他电商组",
        "资料组",
        "运营支持组",
        "京津组",
        "河北组",
        "太原公司",
        "内蒙古组"
      ], //随机生成一个部门
      startTime: "@date('yyyy-MM-dd')", //随机生成一个入职开始时间
      endTime: "@date('yyyy-MM-dd')", //随机生成一个入职结束时间
      "position|1": ["经理", "主管", "员工", "实习生"], //随机生成一个职位
      "Approvalstatus|1": ["审批通过", "审批未通过", "审批中"] //随机生成一个状态
    }
  ]
});
// 模拟薪酬管理数据

Mock.mock("api/Payment", "get", {
  code: 200,
  msg: "success",
  "data|3": [
    {
      Salary: "@cword(2,5)", //随机生成薪资构成
      Planned: "@natural(0,1000000)", //随机生成计划支出
      Actualed: "@natural(0,1000000)", //随机生成实际支出
      LastmonthPlanned: "@natural(0,1000000)", //随机生成上月计划支出
      LastmonthActualed: "@natural(0,1000000)" //随机生成上月实际支出
    }
  ]
});
