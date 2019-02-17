<template>
  <div>
    <el-form
      ref="generateForm"
      :disabled="disabled"
      :model="models"
      :rules="rules"
      :label-position="data.config.labelPosition"
      :label-width="data.config.labelWidth + 'px'">
      <template v-for="item in data.list">

        <template v-if="item.type == 'grid'">
          <el-row
            :key="item.key"
            :gutter="item.options.gutter ? item.options.gutter : 0"
            :justify="item.options.justify"
            :align="item.options.align"
            type="flex"
          >
            <el-col
              v-for="(col, colIndex) in item.columns"
              :key="colIndex"
              :span="col.span">
              <template v-for="citem in col.list" >

                <genetate-form-item
                  :key="citem.key"
                  :models.sync="models"
                  :rules="rules"
                  :widget="citem"
                  :disabled="disabled"/>
              </template>
            </el-col>
          </el-row>
        </template>
        <template v-else>
          <genetate-form-item
            :key="item.key"
            :models.sync="models"
            :rules="rules"
            :widget="item"
            :disabled="disabled"
            />
        </template>

      </template>
    </el-form>
  </div>
</template>

<script>
// 常规组件
import GenetateFormItem from './GenerateFormItem';

export default {
  name: 'FmGenerateForm',
  components: {
    GenetateFormItem,
  },
  props: ['data', 'value', 'disabled', 'clear'],
  // data 初始化表单
  // value 表单赋值
  // clear 清空表单
  // disabled 表单只读
  data() {
    return {
      models: {},
      rules: {},
    }
  },
  watch: {
    value: {
      deep: true,
      handler(val) {
        this.$refs.generateForm.clearValidate();
        this.models = { ...this.models, ...val };
      },
    },
  },
  created() {
    this.generateModle(this.data.list);
  },
  methods: {
    generateModle(genList) {
      // 添加一个ID隐藏域
      const obj = {
        model: 'id',
        type: 'hidden',
        options: {
          defaultValue: '',
          remote: false,
        },
        rules: [],
      }

      genList.push({ ...obj })
      for (let i = 0; i < genList.length; i++) {
        if (genList[i].type === 'grid') {
          genList[i].columns.forEach((item) => {
            this.generateModle(item.list);
          });
        } else {
          if (Object.keys(this.value).indexOf(genList[i].model) >= 0) {
            this.models[genList[i].model] = this.value[genList[i].model];
          } else {
            this.models[genList[i].model] = genList[i].options.defaultValue;
          }


          if (this.rules[genList[i].model]) {
            this.rules[genList[i].model] = [
              ...this.rules[genList[i].model],
              ...genList[i].rules,
            ];
          } else {
            this.rules[genList[i].model] = [...genList[i].rules];
          }
        }
      }
    },
    getData() {
      return new Promise((resolve, reject) => {
        this.$refs.generateForm.validate((valid) => {
          if (valid) {
            resolve(this.models);
          } else {
            reject(new Error('表单数据校验失败').message);
          }
        });
      });
    },
  },
};
</script>
