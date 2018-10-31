<template>
  <div class="app-container" ref="container" id="formdesigner">
<making-form preview generate-json ref="form">
    <template slot="action">
      <el-button @click="test">保存</el-button>
    </template>
</making-form>
  </div>
</template>

<script>
import {MakingForm} from 'form-making'

export default {
  name:"formdesigner",
  data(){
    return {

    }
  },
  mounted(){

    let obj = {
  "list": [
    {
      "type": "input",
      "name": "单行文本",
      "icon": "regular/keyboard",
      "options": {
        "width": "100%",
        "defaultValue": "",
        "required": false,
        "dataType": "string",
        "pattern": "",
        "placeholder": "",
        "remoteFunc": "func_1540898325000_60519"
      },
      "key": "1540898325000_60519",
      "model": "input_1540898325000_60519",
      "rules": [
        {
          "type": "string",
          "message": "单行文本格式不正确"
        }
      ]
    },
    {
      "type": "textarea",
      "name": "多行文本",
      "icon": "regular/keyboard",
      "options": {
        "width": "100%",
        "defaultValue": "",
        "required": false,
        "pattern": "",
        "placeholder": "",
        "remoteFunc": "func_1540898327000_70367"
      },
      "key": "1540898327000_70367",
      "model": "textarea_1540898327000_70367",
      "rules": []
    },
    {
      "type": "time",
      "name": "时间选择器",
      "icon": "regular/clock",
      "options": {
        "defaultValue": "",
        "readonly": false,
        "disabled": false,
        "editable": true,
        "clearable": true,
        "placeholder": "",
        "startPlaceholder": "",
        "endPlaceholder": "",
        "isRange": false,
        "arrowControl": true,
        "format": "HH:mm:ss",
        "required": false,
        "width": "",
        "remoteFunc": "func_1540898328000_61326"
      },
      "key": "1540898328000_61326",
      "model": "time_1540898328000_61326",
      "rules": []
    }
  ],
  "config": {
    "labelWidth": 100,
    "labelPosition": "left",
    "size": "small"
  }
}
    this.$refs.form.setJSON(obj)
  },
  methods:{
      test(){
       console.log(this.$refs.form.getJSON())
      }
  },
  components:{
MakingForm
  }
}
</script>
