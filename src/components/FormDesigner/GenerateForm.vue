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
                                  v-show="!citem.hidden"></GenerateFormItem>
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
import { DateTimeNowSplit } from '@/utils/index';

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
      // 遍历设计的结构
      for (let i = 0; i < genList.length; i += 1) {
        if (genList[i].type === 'grid') {
          genList[i].columns.forEach((item) => {
            this.generateModle(item.list);
          });
        } else {
          // 如果是自定义组件,model值为slotName,不在model中赋属性值
          if (Object.keys(this.value).indexOf(genList[i].model) >= 0 && genList[i].type !== 'blank') {
            // 3.后端要求下拉列表传值时要同时给key和value，为了实现此需求的另外两处赋值在GenerateFormItem.vue中
            if (genList[i].type === 'select') {
              const dict = `${genList[i].model}dict`;
              this.models[dict] = this.value[dict];
            }
            this.initFormValue(genList[i]);
          } else {
            this.setDefaultValue(genList[i]);
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

    /**
     * 如果select,radio,checkbox等组件为多选情况  后台返回逗号分隔字符串 => 数组
     * 如果 this.value为null 则会按默认值赋值相应字段
     * @param {String} 当前表单json.list
     */
    initFormValue(row) {
      if (row.options.multiple || row.type === 'cascader') {
        if (this.value[row.model] != null && this.value[row.model] !== '') {
          this.models[row.model] = this.value[row.model].split(',');
        }
      } else if (this.value[row.model] == null || this.value[row.model] === '') {
        this.setDefaultValue(row);
      } else {
        this.models[row.model] = this.value[row.model];
      }
    },
    // 多选情况下数组转字符串
    formValueToString() {
      const model = { ...this.models };
      Object.keys(model).forEach((k) => {
        if (Array.isArray(model[k])) {
          model[k] = model[k].toString();
        }
      });
      return model;
    },
    // 表单默认值回填单独拉出来封装
    setDefaultValue(config) {
      // 如果时间选择器需要默认值,默认回填当前日期
      if (config.type === 'date' && config.options.defaultValue) {
        this.models[config.model] = DateTimeNowSplit();
      } else {
        let { defaultValue } = config.options;
        // 如果默认值设置为$开头,则表示要读取vuex中的全局变量
        // 如设置为 $deptname 则读取 this.$store.getters.deptname
        if (typeof (defaultValue) === 'string' && defaultValue.includes('$')) {
          defaultValue = this.$store.getters[defaultValue.replace('$', '')];
        }
        this.models[config.model] = typeof (defaultValue) === 'boolean' ? '' : defaultValue;
      }
    },
    // 先验证再获取表单内容
    getData(args) {
      return new Promise((resolve, reject) => {
        this.$refs.generateForm.validate((valid) => {
          if (valid) {
            resolve(this.formValueToString(), args);
          } else {
            // 校验失败时focus到文本框
            // 注意此处没有考虑textarea的情况,多行文本会失败
            setTimeout(() => {
              const isError = document.getElementsByClassName('is-error');
              isError[0].querySelector('input').focus();
            }, 100);
            reject(new Error('表单数据校验失败').message);
          }
        });
      });
    },
  },
};
</script>
