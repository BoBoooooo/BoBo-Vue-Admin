<template>
  <div>
    <el-form ref="generateForm" :disabled="disabled" :model="models" :rules="rules" :label-position="data.config.labelPosition" :label-width="data.config.labelWidth + 'px'">
      <template v-for="item in data.list">

        <template v-if="item.type == 'grid'">
          <el-row
            :key="item.key"
            type="flex"
            :gutter="item.options.gutter ? item.options.gutter : 0"
            :justify="item.options.justify"
            :align="item.options.align"
          >
            <el-col v-for="(col, colIndex) in item.columns" :key="colIndex" :span="col.span">
              

              <template v-for="citem in col.list" >
                <el-form-item v-if="citem.type=='blank'" :label="citem.name" :prop="citem.model" :key="citem.key">
                  <slot :name="citem.model" :model="models"></slot>
                </el-form-item>
                <genetate-form-item v-else :key="citem.key" :models.sync="models" :remote="remote" :rules="rules" :widget="citem"></genetate-form-item>
              </template>
            </el-col>
          </el-row>
        </template>

        <template v-else-if="item.type == 'upload'">
          <upload-affix :key="item.key" :Params="upload_params||item.options.uploadParams"></upload-affix>
        </template>

        <template v-else>
          <genetate-form-item :key="item.key" :models.sync="models" :rules="rules" :widget="item" :remote="remote"></genetate-form-item>
        </template>
        
      </template>
    </el-form>
  </div>
</template>

<script>
//常规组件
import GenetateFormItem from "./GenerateFormItem";

///自定义组件
import UploadAffix from "@/components/UploadAffix"; //上传模块

export default {
  name: "fm-generate-form",
  components: {
    GenetateFormItem,
    UploadAffix
  },
  props: ["data", "remote", "value", "disabled", "upload_params"],
  //data 初始化表单
  //remote 异步远程请求方法
  //value 表单赋值
  //clear 清空表单
  //disabled 表单只读
  //upload_params 自定义 文件上传模块的参数
  data() {
    return {
      models: {},
      rules: {}
    }
  },
  created() {
    this.generateModle(this.data.list);
  },
  methods: {
    generateModle(genList) {
      for (let i = 0; i < genList.length; i++) {
        if (genList[i].type === "grid") {
          genList[i].columns.forEach(item => {
            this.generateModle(item.list);
          });
        } else {
          if (Object.keys(this.value).indexOf(genList[i].model) >= 0) {
            this.models[genList[i].model] = this.value[genList[i].model];
          } else {
            if (genList[i].type === "blank") {
              this.models[genList[i].model] =
                genList[i].options.defaultType === "String"
                  ? ""
                  : genList[i].options.defaultType === "Object"
                    ? {}
                    : [];
            } else {
              this.models[genList[i].model] = genList[i].options.defaultValue;
            }
          }

          if (this.rules[genList[i].model]) {
            this.rules[genList[i].model] = [
              ...this.rules[genList[i].model],
              ...genList[i].rules
            ];
          } else {
            this.rules[genList[i].model] = [...genList[i].rules];
          }
        }
      }
    },
    getData() {
      return new Promise((resolve, reject) => {
        this.$refs.generateForm.validate(valid => {
          if (valid) {
            resolve(this.models);
          } else {
            reject(new Error("表单数据校验失败").message);
          }
        });
      });
    }
  },
  watch: {
    value: {
      deep: true,
      handler(val) {
        this.$refs.generateForm.clearValidate();
        this.models = { ...this.models, ...val };
      }
    } 
  }
};
</script>
