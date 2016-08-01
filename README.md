# antd-dva-admin-starter
这是一个简单的基于antd dva的管理系统demo，实现的登录注销及基本的CURD操作
## 目录结构

- mock 模拟数据文件夹
- dist 编译产出文件
- src 源文件目录
  - components 组件文件，stateless无状态组件view层
  - models 模型文件件，类似于mvc框架里面的m
  - routes 路由入口文件(里面有controler及connet连接model方法)
  - services 异步ajax请求返回数据，用于和服务器交互
  - tests 单元测试文件，mocha
  - utils 工具函数脚步，比如ajax封装，时间处理、加密解密等
  - config.js webApp配置文件，包括api接口前缀等
  - index.html 静态文件入口
  - index.less 全局样式less文件
  - router.js 路由配置文件

## 开发基本流程
- 1、设计model对于小型项目而言一个model对应一个功能模块，比如用户模块就添加一个usermodel用户相关的model都在这里面，对于大型项目可以适当的拆分model
- 2、设计View层及comppnents并确定需要的数据及action
- 3、设计controler层及routes，用connect把model和View链接起来，把action及渲染View需要的数据通过props传入view及components里面
## model详解
model层主要处理逻辑及数据（服务器数据及state），其实的namespace是对model的标识，state就是redux里面的initState，reducer就是redux里面的reducer，reducer用于操作state，subscriptions字面上的意思是订阅及添加一个监听器，比如router的变化keyborder事件监听等，effects为redux-saga里面的概念用于处理异步操作提供call，put等方法来进行异步处理。
