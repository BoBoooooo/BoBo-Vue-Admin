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
      "semi": "off",
      'no-param-reassign': 0
    },
    "settings": {
        "import/resolver": {
          "webpack":{
            "config": "./build/webpack.base.conf.js"
          }
        }
      }

}

