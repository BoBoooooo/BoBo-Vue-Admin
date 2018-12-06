module.exports = {
  root: true,
  
    "env": {
        "browser": true,
        "es6": true,
        "node": true
    },
     "parserOptions": {
         "parser": "babel-eslint"
     },
    "extends": [
        "airbnb-base",
        "plugin:vue/recommended"
    ],
    rules: {
      "semi": "off", //去掉分号检查
      'no-param-reassign': 0,  //允许改变形参
      'no-plusplus':0,  // ++ --允许使用
      'no-underscore-dangle':0 ,//允许类似 const _this=this 下划线命名
      'import/no-unresolved':'off', //允许alias import    
      'import/no-duplicates':'off', //允许alias import    
      'no-restricted-syntax': 0, // 允许for-of，
'vue/require-prop-types':0, //props允许不指定type
      'consistent-return':'off', //
      'max-len':'off'
    },
    "settings": {
        "import/resolver": {
          "webpack":{
            "config": "./build/webpack.base.conf.js"
          }
        }
      }

}

