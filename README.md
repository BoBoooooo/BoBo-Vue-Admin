# dev框架板项目
本项目基于 [Vue CLI 3](https://cli.vuejs.org/config/) 构建。

项目文档 https://wiki.anshare.com.cn/frameworks 。

## 0. 拉取代码时注意事项
本项目基于airbnb的eslint规范，所以无论你用Windows、Mac OS还是UNIX，请使用0x0A（LF）换行符。
Git提供了一个“换行符自动转换”功能，默认处于自动模式，Windows环境必须做如下设置：
```
提交时转换为LF，检出时不转换
git config --global core.autocrlf input
```
由于vue大小写敏感，请修改Git默认设置
```
设置为区分大小写
git config core.ignorecase false
```
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
