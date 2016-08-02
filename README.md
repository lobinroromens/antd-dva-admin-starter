# antd-dva-admin-starter
这是一个简单的基于[dva](https://github.com/dvajs/dva) [antd](https://github.com/ant-design/ant-design) 的管理系统demo，实现的登录注销及基本的CURD操作


> - [dva 入门：手把手教你用写应用](https://github.com/sorrycc/blog/issues/8)
- [dva 简介](https://github.com/dvajs/dva/issues/1)
- [React + Redux 最佳实践](https://github.com/sorrycc/blog/issues/1) (dva 基于此封装)
- [subscription 及其适用场景](https://github.com/dvajs/dva/issues/3#issuecomment-229250708)
- [支付宝前端应用架构的发展和选择: 从 roof 到 redux 再到 dva](https://github.com/sorrycc/blog/issues/6)

- run npm start
- build npm run build
<iframe id="embed_dom" name="embed_dom" frameborder="0" style="border:1px solid #000;display:block;width:600px; height:320px;" src="https://www.processon.com/embed/579ffdace4b0e645bc7a1c57"></iframe>
## 前言
react作为一个mvc里面的View层它相对于angular及Vue等框架而言有很多痛点，其中state的管理、组件之间通信异步操作的处理都是烦人的事情，参考了很多资料目前比较好的架构组合是react+redux+react-router+redux-saga（或者redux-thunk），由于redux或者redux-saga都是三方库不是真正的框架所以在组织代码的时候回显得杂乱，添加一个功能需要修改不同文件夹里面的文件，这样不利于代码的组织。这个时候dva出来的，他是对上面几个库的二次封装，很happy的看到这个库，对于里面的概念也相对很好理解，相对于之前的架构而言代码组织更加清晰，代码干净明了。基本实现了mvc架构。

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
model层主要处理逻辑及数据（服务器数据及state），其实的namespace是对model的标识，state就是redux里面的initState，reducer就是redux里面的reducer，reducer用于操作state，subscriptions字面上的意思是订阅及添加一个监听器，比如router的变化KEYBORD事件监听等，effects为redux-saga里面的概念用于处理异步操作提供call，put等方法来进行异步处理。
## 实例（以登录为例）
### 1、添加model
  - 在model文件夹下面添加一个user.js文件（登录属于用户管理模块）
   ```javascript
  import { call, put } from 'dva/effects';//
  import {login} from '../services/user';
  import { Router, Route, hashHistory } from 'dva/router';
  export default {

    namespace: 'user',

    state: {
      logining:false,
      uid:'',
      userName:'test',
      password:'test',
      token:'token',
      isLogined:false
    },
    //添加路由监听
    subscriptions: [
      function(dispatch) {
        hashHistory.listen(location => {
          if (location.pathname === '/loginout') {
            dispatch({
              type: 'user/loginout'
            });
          }
        });
      },
    ],
    reducers: {
      //正在登录时的reducer
      ['user/login'](state, action) {
        return { ...state, logining:true};
      },
      //登录成功时的reducer
      ['user/login/success'](state,action){
        //将token存放在localStoreage
        localStorage.token = action.payload.token;
        return {...state,logining:false,...action.payload}
      },
      //登录失败时的reducer
      ['user/login/failure'](state,action){
        return {...state,logining:false,...action.payload}
      }
    },
    effects: {
      //登录做的处理
      *['user/login']({state,payload}) {
        //发起一个login的ajax并把返回的结果存储在data里
        const { data } = yield call(login,payload);
        //返回的结果标识成功执行登录成功的reducer更新state
        if (data.success) {
          yield put({
            type: 'user/login/success',
            payload:{
              token:data.data.token,
              uid:data.data.uid,
              userName:data.data.username,
              isLogined:true
            }
          });
          //路由重定向到根目录
          yield call(hashHistory.push, {
          pathname: '/',
        });
        }
        if (!data.success) {
          yield put({
            type:'user/login/failure',
            payload:{
              logining:false
            }
          })
        }
      },
    }

  }

  ```
  - 在components的user目录下建立login.js
  使用antd快速搞定
  - 在routes下面建立一个Login.js
```javascript
...
const handleSubmit = function({userName,password}){
  dispatch({
      type: 'user/login',
      payload: {
        userName:userName,
        password:password
      }
    });
}
...
return(
  <Login submit={handleSubmit} />
  )
...
function mapStateToProps({ user }) {
  return {user};
}
export default connect(mapStateToProps)(Login);

链接完成后Login就可以访问user model里面的state以及effects来进行和服务器的交互以及操作state，state
