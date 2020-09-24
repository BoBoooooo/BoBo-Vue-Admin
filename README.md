# BoBo's Vue Admin (☠ 9.19号 vue 3已经发布,正在尝试迁移中.. ☠)
本项目基于 [Vue CLI 4.x](https://cli.vuejs.org/config/) 构建。

在线演示地址 http://server.boboooooo.top:9999/

项目文档 https://github.com/BoBoooooo/BoBo-Vue-Admin/wiki/CrudTable-%E6%96%87%E6%A1%A3 

配套后端地址 https://github.com/BoBoooooo/NestJS-API-Server.git (还在初期阶段)


## 0、核心功能

* 基础三员管理(用户部门角色)

* 权限模块

* 表单设计器 (基于 (https://github.com/GavinZhuLei/vue-form-making) 开源版本代码进行二次开发重构,感谢大佬!如有侵权及时联系)
  * 新增附件组件
  * 文本组件
  * 按钮组件
  * 表格组件
  * 级联选择器
  * 富文本编辑器(Tinymce)
* 表格设计器 (基于表单设计json自动生成列表json,可视化配置)
* CrudTable组件 (结合表单表格设计器,传统单表crud一键完成开发,全靠配置,解放生产力)


## 1、开始使用
* 使用npm安装依赖包
```
npm i
```
* 开发环境编译启动及部署
```
npm start   
````

## 2、git commit lint规范
```
 参考angularJs标准提交规范
 输入git cz 提交
```

## 3、eslint规范

默认采用airbnb规范,规则详见 .eslintrc.js

## 4、内置装饰器
有些场景使用装饰器比在代码里面硬编码显得更简单，比如防抖节流，确认提示等等，当前框架内置了一小部分装饰器，更多装饰器正在完善中。

详见 @/decorator

``` javascript
使用方法 eq:

@confirm('请输入内容','提示')
confirmCallBack(){
  console.log('我是确认回调');
}
 
```

## 5、目录结构

```bash
├── public                     # public文件夹
│   └── index.html             # html模板
│   └── js                     # 公有js(一些插件直接引入html)
├── src                        # 源代码
│   ├── api                    # 所有请求
│   ├── assets                 # 主题 字体等静态资源
│   ├── components             # 全局公用组件
│   ├── icons                  # 项目所有 svg icons
│   ├── model                  # 自定义model
│   ├── plugins                # 插件(axios,element ui,echarts)等
│   ├── router                 # 路由
│   ├── store                  # 全局 store管理
│   ├── styles                 # 全局样式
│   ├── utils                  # 全局公用方法
│   ├── views                  # views 所有页面
│   ├── App.vue                # 入口页面
│   ├── main.ts                # 入口文件 加载组件 初始化等
│   └── permission.ts          # 权限管理
├── tests                      # 测试
├── .env.xxx                   # 环境变量配置(包含多种环境变量,详情见具体项目)
├── vue.config.js              # vue-cli 配置
├── commitlint.config.js       # git commit lint 配置文件
└── package.json               # package.json
```

## 6、TODO
1. 部分老页面按vue-class-component重构
2. 完善后端配套项目

## 7. 拉取代码时注意事项
```
提交时转换为LF，检出时不转换
git config --global core.autocrlf input
```
```
设置为区分大小写
git config core.ignorecase false
```

## 8、Git提交规范

## Git 提交规范

- 参考 [vue](https://github.com/vuejs/vue/blob/dev/.github/COMMIT_CONVENTION.md) 规范 ([Angular](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-angular))

  - `feat` 增加新功能
  - `fix` 修复问题/BUG
  - `style` 代码风格相关无影响运行结果的
  - `perf` 优化/性能提升
  - `refactor` 重构
  - `revert` 撤销修改
  - `test` 测试相关
  - `docs` 文档/注释
  - `chore` 依赖更新/脚手架配置修改等
  - `workflow` 工作流改进
  - `ci` 持续集成
  - `mod` 不确定分类的修改
  - `wip` 删除文件
## 0、 致谢
@ytyang <ie07@163.com> 

@GavinZhuLei
