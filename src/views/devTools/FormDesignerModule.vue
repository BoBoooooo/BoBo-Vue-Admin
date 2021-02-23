<!--
@file 动态表单设计器
@author BoBo
@copyright BoBo
@createDate 2018年12月13日21:06:23
-->
<template>
  <div class="page-container">
    <CrudTable
      ref="table"
      tableName="form"
      tableTitle="表单设计"
      orderCondition="timestamp desc"
      :btnEditOnClick="btnEditOnClick"
      :btnAddOnClick="btnAddOnClick"
      fullHeight
      :visibleList="{
        btnDel: true,
      }"
    >
      <template #btnCustom="{row}">
        <el-button slot="btnCustom" type="primary" size="mini" @click="btnCopyOnClick(row)">复制</el-button>
      </template>
    </CrudTable>
    <el-dialog v-if="visible" ref="dialog" fullscreen class="dialog" :visible.sync="visible" append-to-body>
      <FormDesigner ref="formDesigner" :dictType="dictType" :getFormKey="getFormKey" :allTables="allTables">
        <template #custom-btn>
          <el-button type="normal" size="small" @click="btnSaveOnClick" :loading="btnSaveIsLoading" icon="el-icon-check">保存</el-button>
        </template>
      </FormDesigner>
    </el-dialog>
  </div>
</template>

<script>
import { DML, crud } from '@/api/public/crud';
import { getTables, getFormKey } from '@/api/system/form';

import { Vue, Component } from 'vue-property-decorator';

const STATUS = {
  CREATE: 0,
  UPDATE: 1,
};
@Component({
  name: 'FormDesignerModule',
})
export default class FormDesignerModule extends Vue {
  allTables = [];

  visible = false;

  btnSaveIsLoading = false;

  formValues = {};

dictType = [];

created() {
  crud(DML.SELECT, 'ad_codelist_type').then((res) => {
    this.dictType = res.data.list.map(item => ({
      label: item.typeName,
      value: item.id,
    }));
  });
  getTables().then((res) => {
    this.allTables = res.data.map(item => ({
      label: item.TABLE_NAME,
      value: item.TABLE_NAME,
    }));
  });
}

getFormKey(tablename) {
  return getFormKey(tablename);
}

// 添加按钮点击事件
btnAddOnClick() {
  this.formValues = {};
  this.visible = true;
}

// 编辑按钮点击事件
btnEditOnClick(row) {
  this.formValues = { ...row };
  this.visible = true;
  this.$nextTick(() => {
    this.$refs.formDesigner.setJSON(JSON.parse(row.formJson));
  });
}

// 复制表单设计json
btnCopyOnClick(row) {
  const r = { ...row };
  r.tableName += '_复制';
  delete r.id;
  crud(DML.INSERT, 'form', r).then((res) => {
    if (res.code !== 200) {
      this.$message({
        type: 'error',
        message: `保存失败，原因：${res.message}`,
      });
      return;
    }
    this.$message({
      type: 'success',
      message: '复制成功',
    });
    this.$refs.table.tableReload();
  });
}

// 保存设计
btnSaveOnClick() {
  const formValues = this.$refs.formDesigner.getData();
  this.btnSaveIsLoading = true;
  // 调用此方法验证表单数据和获取表单数据
  let type;
  let msg;
  // 根据对话框状态判断保存或编辑
  if (this.dialogStatus === STATUS.CREATE) {
    type = DML.INSERT;
    msg = '添加成功';
  } else {
    type = DML.UPDATE;
    msg = '编辑成功';
  }
  // 如果有代理的保存方法
  crud(type, 'form', {
    ...this.formValues,
    formJson: JSON.stringify(formValues),
    tableName: formValues.config.name,
    position: formValues.config.position,
  })
    .then(() => {
      this.btnSaveIsLoading = false;
      this.$message({
        type: 'success',
        message: msg,
      });
      this.visible = false;
      this.$refs.table.tableReload();
    })
    .catch(() => {
      this.btnSaveIsLoading = false;
    });
}
}
</script>
<style lang="scss" scoped>
.dialog {
  ::v-deep {
    .el-dialog__body {
      height: 100%;
      padding: 0;
    }
    .el-dialog__header {
      padding: 0;
    }
    .el-dialog__headerbtn {
      top: 13px;
      right: 10px;
      border: 1px solid gray;
      background: #fffbd7;
      color: black;
      z-index: 100;
    }
  }
}
</style>
