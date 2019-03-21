<!--
 * @file: 封装CrudTable组件的表单弹出层
 * @copyright: NanJing Anshare Tech .Com
 * @author: BoBo
 * @Date: 2019-03-21 14:42:29
 -->

<template>

    <el-dialog
      :title="textMap[dialogStatus]"
      :visible.sync="visible"
      v-if="visible"
      width="80%"
      @close="$emit('update:dialogFormVisible', false)"
    >
      <generate-form
        ref="generateForm"
        :data="jsonData"
        :value="formValues"
        :entity.sync="models"
        :disabled="disabled"
      />
      <div slot="footer" class="dialog-footer">
        <template v-if="dialogStatus === 'detail'">
          <v-btn @click="visible = false;$emit('update:dialogFormVisible', false)" color="white">关 闭</v-btn>
        </template>
        <template v-else>
          <v-btn @click="visible = false;$emit('update:dialogFormVisible', false)" color="white">取 消</v-btn>
          <v-btn color="blue" @click="save" style="color:white">保 存</v-btn>
        </template>
      </div>
    </el-dialog>
</template>

<script>
// eslint-disable-next-line import/named
import GenerateForm from '@/components/FormDesigner/GenerateForm';
import { newGuid } from '@/utils/index';

export default {
  name: 'GenerateFormDialog',
  components: {
    GenerateForm,
  },
  data() {
    return {
      models: {},
      textMap: {
        update: '编辑',
        create: '新增',
      },
      visible: this.dialogFormVisible,
    }
  },
  props: {
    entity: {
      type: Object,
      default: () => ({}),
    },
    jsonData: {
      type: Object,
      default: () => ({
        list: [],
        config: {},
      }),
    },
    dialogFormVisible: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    tableName: String,
    dialogStatus: String,
    formValues: {
      type: Object,
      default: () => ({}),
    },
  },

  methods: {
    newGuid,
    save() {
      this.$refs.generateForm
        .getData()
        .then((data) => {
          if (this.dialogStatus === 'create') {
            data = { ...data, id: newGuid() }
          }
          // 如果select,radio,checkbox等多选情况返回数组的话，默认拼接成逗号分隔的字符串传给后台
          Object.keys(data).forEach((k) => {
            if (Array.isArray(data[k])) {
              data[k] = data[k].toString();
            }
          });
          this.crud(this.dialogStatus === 'create' ? 'add' : 'update', this.tableName, data).then(() => {
            this.visible = false;
            this.$emit('afterSave');
            this.$emit('update:dialogFormVisible', false)
          });
        })
        .catch(() => {
          this.$message({
            message: '请检查必填项',
            type: 'warning',
          });
        });
    },
  },

  watch: {
    formValues: {
      deep: true,
      immediate: true,
      handler() {
        // 如果select,radio,checkbox等组件为多选情况  后台返回逗号分隔字符串 => 数组
        for (const row of this.jsonData.list) {
          if (row.columns) {
            for (const column of row.columns) {
              const { list } = column;
              if (Array.isArray(list)) {
                list.forEach((citem) => {
                  if (citem.options.multiple) {
                    if (!Array.isArray(this.formValues[citem.model])
                      && this.formValues[citem.model]) {
                      this.formValues[citem.model] = this.formValues[citem.model].split(',');
                    }
                  }
                });
              }
            }
          } else if (row.options.multiple) {
            if (!Array.isArray(this.formValues[row.model])
                      && this.formValues[row.model]) {
              this.formValues[row.model] = this.formValues[row.model].split(',');
            }
          }
        }
      },
    },
    dialogFormVisible(val) {
      this.visible = val;
    },
    models: {
      deep: true,
      immediate: true,
      handler(val) {
        this.$emit('update:entity', val)
      },
    },
  },
}

</script>
<style lang="scss" scoped>

</style>
