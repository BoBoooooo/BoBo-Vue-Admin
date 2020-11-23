# BoBo's Vue Admin

( 🚀 `9.19号 Vue3发布`, 本项目暂不考虑迁移)

本项目基于 [Vue CLI 4.x](https://cli.vuejs.org/config/) 构建。

🍌 [在线演示地址](http://server.boboooooo.top:9999/admin)

🍉 [项目文档](https://github.com/BoBoooooo/BoBo-Vue-Admin/wiki/CrudTable-%E6%96%87%E6%A1%A3/)

🍏 [配套后端地址](https://github.com/BoBoooooo/NestJS-API-Server.git) (初期阶段)

## 1. 核心功能

- **三员管理** `用户部门角色`

- **字典管理**

- **权限模块**

- **[element-pro-crud](https://github.com/BoBoooooo/Element-Pro-Crud.git) 一键 Crud 插件**

  - **表单设计器(TableDesigner)** (基于[vue-form-making](https://github.com/GavinZhuLei/vue-form-making) 开源版本二次开发,感谢大佬!)
    - 新增下列组件
    - `附件组件 (FileUpload)`
    - `文本组件 (h3)`
    - `按钮组件 (el-button)`
    - `表格组件 (CrudTable)`
    - `级联选择器 (el-cascader)`
    - `富文本编辑器 (Tinymce)`
    - `树形下拉选择框 (tree-select)`
  - **表格设计器(FormDesigner)** `基于表单设计json自动生成列表json,可视化配置`
  - **CrudTable** `基于el-table封装,结合表单、表格设计器,动态配置,解放生产力`
  - **GenerateForm** `根据表单设计器json动态渲染表单`

- **后端地址可配置**

  ```javascript
    // index.html 生产环境下支持动态修改后端地址,避免重复打包

    <!-- 服务器地址 -->
    <script>
      window.__HOST__URL__ = 'http://localhost:3000';
    </script>
    <!-- 后端地址 -->
    <script>
      window.__PREFIX__URL__ = '/';
    </script>

    // 最后请求的地址即为 http://localhost:3000/
  ```

## 2. 开始使用

- 使用 npm 安装依赖包

```
npm i
```

- 开发环境编译启动及部署

```
npm start
```

TIPS: 若只启动前端项目,本地运行可以先将后端 api 地址修改为

```
// .env.dev

+ VUE_APP_HOST_URL=http://47.100.164.86:7788
- VUE_APP_HOST_URL=http://localhost:3000
```

## 3. eslint 规范

默认采用 airbnb 规范,规则详见 .eslintrc.js

## 4. 内置装饰器

有些场景使用装饰器比在代码里面硬编码显得更简单，比如防抖节流，确认提示等等，当前框架内置了一小部分装饰器，更多装饰器正在完善中。

详见 @/decorator

```javascript
使用方法 eq:

@confirm('请输入内容','提示')
confirmCallBack(){
  console.log('我是确认回调');
}

```

## 5. 目录结构

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

## 6. 拉取代码时注意事项

```
// 提交时转换为LF，检出时不转换
git config --global core.autocrlf input
```

```
// 设置为区分大小写
git config core.ignorecase false
```

## 7. Git 提交规范

```
npm run cz
```

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
  - `ci` 持续集成

**如果提示找不到 commitlint 命令,请先全局安装**

```
cnpm install commitizen -g
cnpm install @commitlint/config-conventional @commitlint/cli -g
```

## 8. 致谢

@ytyang

@GavinZhuLei
