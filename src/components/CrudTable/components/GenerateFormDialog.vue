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
        :value="formValue"
        :entity.sync="models"
        :disabled="disabled"
      />

      <div slot="footer" class="dialog-footer">
        <template v-if="dialogStatus === 'detail'">
          <v-btn @click="visible = false;$emit('update:dialogFormVisible', false)" color="white">关 闭</v-btn>
        </template>

        <template v-else>
          <v-btn @click="visible = false;$emit('update:dialogFormVisible', false)" color="white">取 消</v-btn>
          <v-btn v-if="dialogStatus=='create'" color="blue" @click="create" style="color:white">新 增</v-btn>
          <v-btn v-else color="blue" @click="update"  style="color:white">修 改</v-btn>
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
    formValue: {
      type: Object,
      default: () => ({}),
    },
  },

  methods: {
    newGuid,
    create() {
      this.$refs.generateForm
        .getData()
        .then((data) => {
          data = { ...data, id: newGuid() }
          this.crud('add', this.tableName, data).then(() => {
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
    update() {
      this.$refs.generateForm
        .getData()
        .then((data) => {
          this.crud('update', this.tableName, data).then(() => {
            this.visible = false;
            this.$emit('afterSave');
            this.$emit('update:dialogFormVisible', false)
          });
        })
        .catch(() => {
          // 数据校验失败
          this.$message({
            message: '请检查必填项',
            type: 'warning',
          });
        });
    },
  },
  watch: {
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
