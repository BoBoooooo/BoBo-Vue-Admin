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

        <template v-if="item.type === 'grid'">
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
               <template v-for="citem in col.list">
                <el-form-item v-if="citem.type=='blank'"
                              :label="citem.name"
                              :prop="citem.model"
                              :key="citem.key">
                  <slot :name="citem.model"
                        :model="models"></slot>
                </el-form-item>
                <GenerateFormItem v-else
                                  :key="citem.key"
                                  :models.sync="models"
                                  :remote="remote"
                                  :rules="rules"
                                  :widget="citem"
                                  v-show="!item.hidden"></GenerateFormItem>
              </template>
            </el-col>
          </el-row>
        </template>
        <template v-else-if="item.type === 'blank'">
            <el-form-item :label="item.name"
                          :prop="item.model"
                          :key="item.key">
              <slot :name="item.model"
                        :model="models"></slot>
            </el-form-item>
        </template>
        <!-- 普通行布局方式 -->
        <template v-else>
          <GenerateFormItem :key="item.key"
                            :models.sync="models"
                            :rules="rules"
                            :widget="item"
                            :remote="remote"
                            v-show="!item.hidden"></GenerateFormItem>
        </template>

      </template>
    </el-form>
  </div>
</template>

<script>
// 常规组件
import GenerateFormItem from './GenerateFormItem';

export default {
  name: 'FmGenerateForm',
  components: {
    GenerateFormItem,
  },
  props: ['data', 'value', 'disabled', 'clear', 'remote', 'entity'],
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
    models: {
      deep: true,
      immediate: true,
      handler(val) {
        this.$emit('update:entity', val);
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
