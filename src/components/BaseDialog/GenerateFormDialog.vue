<!--
@file 用于动态表单保存的对话框
@author BoBo
@copyright NanJing Anshare Tech .Com
@createDate 2018年11月16日19:31:29
-->
<template>
  <!-- 对话框 -->
  <el-dialog v-if="visible"
             ref="dialog"
             :title="dialogTitle"
             v-model:visible="visible"
             :width="width"
             :append-to-body="appendToBody"
             :fullscreen="fullscreen"
             :close-on-click-modal="closeOnClickModal">
    <!-- 对话框内动态表单 -->
    <GenerateForm ref="generateDialogForm"
                  :value="formValues"
                  :data="formDesign"
                  :setReadOnly="readOnly"
                  :remote="remoteFuncs"
                  v-model="entity"
                  @btn-on-click="btnOnClick"
                  :formTableConfig="formTableConfig" />
    <template #footer>
      <el-row type="flex"
              justify="end">
        <template v-if="readOnly">
          <el-button @click="visible=false">关 闭</el-button>
        </template>
        <template v-else>
          <el-button type="primary"
                     icon="el-icon-check"
                     @click="btnSaveOnClick()"
                     :loading="btnSaveIsLoading">保存</el-button>
          <el-button icon="el-icon-close"
                     @click="btnCancelOnClick()">取消</el-button>
        </template>
      </el-row>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { DML, crud } from '@/api/public/crud';
import { getFormDetail } from '@/api/system/form';
import GenerateForm from '@/components/FormDesigner/GenerateForm.vue';
import guid from '@/utils/generator';
import { Options, props } from 'vue-class-component';

const Props = props({
  // 子表tableConfig 详情看GenerateFormItem中解释
  formTableConfig: { default: () => ({}), type: Object },
  // 设置只读
  setReadOnly: { default: null, type: Object },
  // 对话框内加载FormDesigner的表名
  dialogFormDesignerName: {
    type: String,
    default: null,
  },
  // 内部元素显示控制
  visibleList: { default: () => ({}), type: Object },
  // 按钮名字
  textMap: { default: () => ({}), type: Object },
  // 对话框宽度
  width: {
    type: String,
    default: '80%',
  },
  // 表名
  tableName: {
    type: String,
    default: '',
  },
  // 表格参数
  tableParams: [Object, Array],
  // 代理保存方法
  promiseForSave: { default: null, type: Function },
  // 远程数据方法
  remoteFuncs: { default: () => ({}), type: Object },
  // 弹出表单appendToBody
  appendToBody: { default: false, type: Boolean },
  // 点击阴影关闭
  closeOnClickModal: { default: true, type: Boolean },
  // 全屏
  fullscreen: { default: false, type: Boolean },
});

const STATUS = {
  CREATE: 0,
  UPDATE: 1,
  DETAIL: 2,
};
@Options({
  components: {
    GenerateForm,
  },
  watch: {
    entity: {
      deep: true,
      handler: (value) => {
        // 抛出当前表单对象以及当前表单json
        this.$emit('change', {
          formEntity: value,
          formDesign: this.formDesign,
        });
      },
    },
  },
})
export default class GenerateFormDialog extends Props {
  $refs!: {
    generateDialogForm: HTMLFormElement;
  };

  // 对话框内文本框们填写的值
  formValues: any = {};

  // 对话框设计结构json
  formDesign: any = {};

  // 对话框是否显示
  visible = false;

  // 保存按钮Loading状态
  btnSaveIsLoading = false;

  // 当前整个表单的entity
  entity = {};

  // 表单状态
  dialogStatus = 0;

  // 表格参数
  dialogParams: any = {};

  // 对话框标题
  get dialogTitle() {
    let title = '';
    switch (this.dialogStatus) {
      case STATUS.CREATE:
        title = this.textMap.add;
        break;
      case STATUS.UPDATE:
        title = this.textMap.edit;
        break;
      case STATUS.DETAIL:
        title = this.textMap.detail;
        break;
      default:
        title = '';
    }
    return title;
  }

  get readOnly() {
    if (this.dialogStatus === STATUS.DETAIL) {
      return {};
    }
    return this.setReadOnly;
  }

  // 内部元素显示控制
  get view() {
    return {
      ...this.visibleList,
    };
  }

  /**
   * 显示对话框，父元素调用
   *
   * @param {Object} param 对话框保存时的参数
   * @param {Number} status 对话框状态[添加:0,编辑:1]，必须是STATUS枚举
   * @param {Object} formValues 编辑时传入所有字段的默认值
   */
  showDialog(param = {}, status = STATUS.CREATE, formValues = {}) {
    // 保存参数用于save方法
    this.dialogParams = param;
    this.dialogStatus = status;
    // 请求对话框内的动态表单json
    getFormDetail(this.dialogFormDesignerName ? this.dialogFormDesignerName : this.tableName).then((res) => {
      this.formDesign = JSON.parse(res.data.formJson);
      if (this.dialogStatus === STATUS.UPDATE) {
        // 填写编辑框
        this.formValues = { ...formValues };
      } else {
        // add 默认生成id
        this.formValues = {
          id: guid(),
          ...formValues,
        };
      }
      this.visible = true;
    });
  }

  // 保存按钮点击
  btnSaveOnClick() {
    this.btnSaveIsLoading = true;
    // 调用此方法验证表单数据和获取表单数据
    this.$refs.generateDialogForm
      .getData()
      .then((formValue) => {
        let type;
        let msg;
        // 如果select,radio,checkbox等多选情况返回数组的话，默认拼接成逗号分隔的字符串传给后台
        Object.keys(formValue).forEach((k) => {
          if (Array.isArray(formValue[k])) {
            formValue[k] = formValue[k].toString();
          }
        });
        // 根据对话框状态判断保存或编辑
        if (this.dialogStatus === STATUS.CREATE) {
          type = DML.INSERT;
          msg = '添加成功';
        } else {
          type = DML.UPDATE;
          msg = '编辑成功';
        }
        let promise;
        // const opt = {
        //   ...this.formValues,
        //   ...this.tableParams,
        //   ...formValue,
        //   ...this.dialogParams,
        // };
        // 如果有代理的保存方法
        if (this.promiseForSave) {
          promise = this.promiseForSave(formValue);
        } else {
          promise = crud(type, this.tableName, formValue);
        }

        promise.then((res) => {
          if (res.code !== 200) {
            this.$message({
              type: 'error',
              message: `保存失败，原因：${res.message}`,
            });
            this.btnSaveIsLoading = false;
            return;
          }
          this.btnSaveIsLoading = false;
          this.visible = false;
          this.$message({
            type: 'success',
            message: msg,
          });
          this.$emit('after-save', {
            status: this.dialogStatus,
            dialogParams: this.dialogParams,
          });
        });
      })
      .catch(() => {
        this.btnSaveIsLoading = false;
        // 数据校验失败
      });
  }

  // 取消按钮点击
  btnCancelOnClick() {
    this.visible = false;
    this.$emit('cancel');
  }

  // 生成的按钮点击
  btnOnClick(widget) {
    this.$emit('btn-on-click', widget);
  }
}
</script>
