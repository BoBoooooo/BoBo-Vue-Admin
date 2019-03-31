<template>
  <div>
    <el-form
      ref="generateForm"
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
                              :key="citem.key"
                               v-show="!citem.hidden">>
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
                          :key="item.key"
                           v-show="!item.hidden">>
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
  props: {
    // 表单配置Json
    data: {
      type: Object,
      default: () => ({}),
    },
    // 表单初始值
    value: {
      type: Object,
      default: () => ({}),
    },
    // 表单当前实时对象
    entity: {
      type: Object,
      default: () => ({}),
    },
    /**
     * 设置只读,默认Null为全部不只读,传{}为全部只读
     * 以下是分别设置黑白名单
     * {
     *  whiteList:[],  //设置需要只读的
     *  blackList:[]   //设置不需要只读的
     * }
     */
    setReadOnly: {
      type: Object,
      default: null,
    },
    // 设置隐藏区域
    setHidden: {
      type: Array,
      default: () => ([]),
    },
    // 远端数据
    remote: {
      type: Object,
      default: () => ({}),
    },
  },
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
    this.setFormReadOnly(this.data.list);
    this.setFormHidden(this.data.list);
  },
  methods: {
    // 设置只读
    setFormReadOnly(genList) {
      // 遍历设计的结构
      if (this.setReadOnly) {
        for (let i = 0; i < genList.length; i += 1) {
          if (genList[i].type === 'grid') {
            genList[i].columns.forEach((item) => {
              this.setFormReadOnly(item.list);
            });
          } else {
            const { whiteList, blackList } = this.setReadOnly;
            const row = genList[i];
            // 默认空对象 代表全部只读
            if ((whiteList == null && blackList == null)
            || (blackList && !blackList.includes(row.model))
            || (whiteList && whiteList.includes(row.model))) {
              row.options.disabled = true;
              row.options.readonly = true;
            }
          }
        }
      }
    },
    // 设置隐藏
    setFormHidden(genList) {
      // 遍历设计的结构
      if (this.setHidden) {
        for (let i = 0; i < genList.length; i += 1) {
          if (genList[i].type === 'grid') {
            genList[i].columns.forEach((item) => {
              this.setFormHidden(item.list);
            });
          } else {
            const row = genList[i];
            // 默认空对象 代表全部只读
            if (this.setHidden.includes(row.model)) {
              row.hidden = true;
            }
          }
        }
      }
    },
    generateModle(genList) {
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
