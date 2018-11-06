<template>
  <el-container>
    <el-aside style="wdith: 250px;">

      <div class="components-list">
        <div class="widget-cate">基础字段</div>
        <draggable element="ul" :list="basicComponents" 
          :options="{group:{ name:'people', pull:'clone',put:false},sort:false, ghostClass: 'ghost'}"
          @end="handleMoveEnd"
          @start="handleMoveStart"
          :move="handleMove"
        >
          
          <li class="form-edit-widget-label" v-for="(item, index) in basicComponents" :key="index">
            <a>
              <icon class="icon" :name="item.icon"></icon>
              <span>{{item.name}}</span>
            </a>
          </li>
        </draggable>

        <div class="widget-cate">高级字段</div>
        <draggable element="ul" :list="advanceComponents" 
          :options="{group:{ name:'people', pull:'clone',put:false},sort:false, ghostClass: 'ghost'}"
          @end="handleMoveEnd"
          @start="handleMoveStart"
          :move="handleMove"
        >
          
          <li class="form-edit-widget-label" v-for="(item, index) in advanceComponents" :key="index">
            <a>
              <icon class="icon" :name="item.icon"></icon>
              <span>{{item.name}}</span>
            </a>
          </li>
        </draggable>
        
        <div class="widget-cate">布局字段</div>
        <draggable element="ul" :list="layoutComponents" 
          :options="{group:{ name:'people', pull:'clone',put:false},sort:false, ghostClass: 'ghost'}"
          @end="handleMoveEnd"
          @start="handleMoveStart"
          :move="handleMove"
        >
          
          <li class="form-edit-widget-label data-grid" v-for="(item, index) in layoutComponents" :key="index">
            <a>
              <icon class="icon" :name="item.icon"></icon>
              <span>{{item.name}}</span>
            </a>
          </li>
        </draggable>
      </div>
      
    </el-aside>
    <el-container class="center-container" direction="vertical">
      <el-header class="btn-bar" style="height: 45px;">
             <span style="margin-left:20px;float:left" v-if="selectform!==''">正在制作:{{selectform}}</span>
      <el-button style="border:none" @click="save"><svg-icon icon-class="icons"></svg-icon>
保存</el-button>
       <el-button style="border:none;margin-right:0px" @click="openmodal"><svg-icon icon-class="icons"></svg-icon>
选择要制作的表</el-button>
        <!-- <el-button type="text" size="medium" @click="handleGoGithub">GitHub</el-button> -->
        <el-button type="text" size="medium" icon="el-icon-view" @click="handlePreview">预览</el-button>
        <el-button type="text" size="medium" icon="el-icon-tickets" @click="handleGenerateJson">生成JSON</el-button>
        <!-- <el-button type="text" size="medium" icon="el-icon-document" @click="handleGenerateCode">生成代码</el-button> -->
      </el-header>
      <el-main :class="{'widget-empty': widgetForm.list.length == 0}">
        
        <widget-form ref="widgetForm" :data="widgetForm" :select.sync="widgetFormSelect"></widget-form>
      </el-main>
    </el-container>
    
    <el-aside class="widget-config-container">
      <el-container>
        <el-header height="45px">
          <div class="config-tab" :class="{active: configTab=='widget'}" @click="handleConfigSelect('widget')">字段属性</div>
          <div class="config-tab" :class="{active: configTab=='form'}" @click="handleConfigSelect('form')">表单属性</div>
        </el-header>
        <el-main class="config-content">
          <widget-config v-show="configTab=='widget'" :data="widgetFormSelect"></widget-config>
          <form-config v-show="configTab=='form'" :data="widgetForm.config"></form-config>
        </el-main>
      </el-container>
      
    </el-aside>

    <cus-dialog
      :visible="previewVisible"
      @on-close="previewVisible = false"
      ref="widgetPreview"
      @on-submit="handleTest"
      width="1000px"
      form
    >
      <generate-form v-if="previewVisible" :data="widgetForm" :remote="remoteFuncs" :value="widgetModels" ref="generateForm">

        <template slot="blank" slot-scope="scope">
          宽度：<el-input v-model="scope.model.blank.width" style="width: 100px"></el-input>
          高度：<el-input v-model="scope.model.blank.height" style="width: 100px"></el-input>
        </template>
      </generate-form>
    </cus-dialog>

    <cus-dialog
      :visible="jsonVisible"
      @on-close="jsonVisible = false"
      ref="jsonPreview"
      width="800px"
      form
    >
      <div id="jsoneditor" style="height: 400px;width: 100%;">{{jsonTemplate}}</div>
      
      <template slot="action">
        <el-button id="copybtn" data-clipboard-target=".ace_text-input">双击复制</el-button>
      </template>
    </cus-dialog>

    <cus-dialog
      :visible="codeVisible"
      @on-close="codeVisible = false"
      ref="codePreview"
      width="800px"
      form
      :action="false"
    >
      <div id="codeeditor" style="height: 500px; width: 100%;">{{htmlTemplate}}</div>
    </cus-dialog>


     <el-dialog title="选择表单"  :visible.sync="dialogFormVisible" >
     <el-select v-model="selectform" placeholder="请选择">
    <el-option
 v-for="(item, index) in tablelist"
 :key="index"
      :label="item.table_name"
      :value="item.table_name">
    </el-option>
  </el-select>

  <el-button @click="select">选择</el-button>
  </el-dialog>


  </el-container>


  
</template>

<script>
import Draggable from 'vuedraggable'
import WidgetConfig from './WidgetConfig'
import FormConfig from './FormConfig'
import WidgetForm from './WidgetForm'
import CusDialog from './CusDialog'
import icon from 'vue-awesome/components/Icon'
import 'vue-awesome/icons/regular/keyboard'
import 'vue-awesome/icons/regular/trash-alt'
import 'vue-awesome/icons/regular/clone'
import 'vue-awesome/icons/regular/dot-circle'
import 'vue-awesome/icons/regular/check-square'
import 'vue-awesome/icons/bars'
import 'vue-awesome/icons/regular/calendar-alt'
import 'vue-awesome/icons/regular/clock'
import 'vue-awesome/icons/th'
import 'vue-awesome/icons/sort-numeric-up'
import 'vue-awesome/icons/regular/star'
import 'vue-awesome/icons/palette'
import 'vue-awesome/icons/regular/caret-square-down'
import 'vue-awesome/icons/toggle-off'
import 'vue-awesome/icons/sliders-h'
import 'vue-awesome/icons/regular/image'
import 'vue-awesome/icons/chalkboard'
import GenerateForm from './GenerateForm'
// import JSONEditor from 'jsoneditor'
// import 'jsoneditor/dist/jsoneditor.min.css'
import Clipboard from 'clipboard'
import {basicComponents, layoutComponents, advanceComponents} from './componentsConfig.js'

import generateCode from './generateCode.js'
import {
  getTables,
  GetFormDetail,
  AddForm,
  UpdateForm
} from "@/api/system/form";
export default {
  name: 'fm-making-form',
  components: {
    Draggable,
    WidgetConfig,
    FormConfig,
    WidgetForm,
    CusDialog,
    GenerateForm,
    icon
  },
  data () {
    return {
      basicComponents,
      layoutComponents,
      advanceComponents,
      widgetForm: {
        list: [],
        config: {
          labelWidth: 100,
          labelPosition: 'top'
        },
      },
      configTab: 'widget',
      widgetFormSelect: null,
      previewVisible: false,
      jsonVisible: false,
      codeVisible: false,
      remoteFuncs: {
        func_test (resolve) {
          setTimeout(() => {
            const options = [
              {id: '1', name: '1111'},
              {id: '2', name: '2222'},
              {id: '3', name: '3333'}
            ]

            resolve(options)
          }, 2000)
        },
        funcGetToken (resolve) {
          request.get('http://tools-server.xiaoyaoji.cn/api/uptoken').then(res => {
            resolve(res.uptoken)
          })
        }
      },
      widgetModels: {},
      blank: '',
      htmlTemplate: '',
      jsonTemplate: '',
       IsNew: true,
      tablelist: null,
      selectform: "",
      ID: "",
      dialogFormVisible: false
    }
  },
    created() {
    getTables().then(res => {
      this.tablelist = res.data;
    });
  },
  mounted () {
    // // loadCss('https://unpkg.com/jsoneditor/dist/jsoneditor.min.css')
    // // loadJs('https://unpkg.com/jsoneditor/dist/jsoneditor.min.js')
    // loadJs('lib/ace/src/ace.js')
  },
  methods: {
 
    handleConfigSelect (value) {
      this.configTab = value
    },
    handleMoveEnd (evt) {
      console.log('end', evt)
    },
    handleMoveStart ({oldIndex}) {
      console.log('start', oldIndex, this.basicComponents)
    },
    handleMove () {
      return true
    },
    handlePreview () {
      this.previewVisible = true
    },
    handleTest () {
      this.$refs.generateForm.getData().then(data => {
        this.$alert(data, '').catch(e=>{})
        this.$refs.widgetPreview.end()
      }).catch(e => {
        this.$refs.widgetPreview.end()
      })
    },
    handleGenerateJson () {
      this.jsonVisible = true
      this.jsonTemplate = this.widgetForm
      this.$nextTick(() => {

        // const editor = ace.edit('jsoneditor')
        // // editor.session.setMode("ace/mode/json")

        const btnCopy = new Clipboard('#copybtn')
      })
    },
    handleGenerateCode () {
      this.codeVisible = true
      this.htmlTemplate = generateCode(JSON.stringify(this.widgetForm))
      this.$nextTick(() => {
        // const editor = ace.edit('codeeditor')
        // editor.session.setMode("ace/mode/html")
      })
    },
     save() {
      let json = this.widgetForm
      console.log(json);
      let obj = {
        id: this.ID,
        tableName: this.selectform,
        formJson: json
      };
      if (this.IsNew) AddForm(obj);
      else UpdateForm(obj);

      this.dialogFormVisible = false;
    },
    openmodal() {
      this.dialogFormVisible = true;
    },
    select() {
      GetFormDetail(this.selectform).then(res => {
        this.dialogFormVisible = false;
        console.log(res);
        if (res.data !== null) {
          this.widgetForm=JSON.parse(res.data.formJson);
          this.IsNew = false;
          this.ID = res.data.id;
        } else {

          this.widgetForm = {
        list: [],
        config: {
          labelWidth: 100,
          labelPosition: 'top'
        },
      },
          this.IsNew = true;
          this.ID = "";
        }
      });
    }
  },
  watch: {
    widgetForm: {
      deep: true,
      handler: function (val) {
        console.log(this.$refs.widgetForm)
      }
    }
  }
}
</script>

<style lang="scss">
@import './styles/cover.scss';
@import './styles/index.scss';

.widget-empty{
  background: url('./assets/form_empty.png') no-repeat;
  background-position: 50%;
}

</style>
