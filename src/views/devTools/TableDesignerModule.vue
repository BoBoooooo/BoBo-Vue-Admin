<!--
@file 表格设计器
@author BoBo
@copyright BoBo
@createDate 2018年11月7日14:12:38
-->
<template>
  <div class="page-container">
    <CrudTable
      ref="dynamictables"
      tableName="dynamictables"
      tableTitle="表格设计"
      orderCondition="timestamp desc"
      :btnEditOnClick="btnEditOnClick"
      :btnAddOnClick="btnAddOnClick"
      fullHeight
      :visibleList="{
        btnDel: true,
      }"
    >
      <template slot="btnCustom" slot-scope="scope">
        <el-button slot="btnCustom" type="primary" size="mini" @click="btnCopyOnClick(scope.row)">复制</el-button>
      </template>
    </CrudTable>
    <!-- 对话框 -->
    <el-dialog v-if="visible" ref="dialog" top="10vh" class="dialog" :visible.sync="visible" width="95%" append-to-body>
      <TableDesigner :dictList="dictList" :formList="formList" :allTables="allTables" ref="tableDesigner" />

      <!-- 底部按钮栏 -->
      <el-row type="flex" justify="end">
        <el-button type="primary" icon="el-icon-check" @click="btnSaveOnClick()" :loading="btnSaveIsLoading">保存</el-button>
        <el-button icon="el-icon-close" @click="btnCancelOnClick()">取消</el-button>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import { DML, crud } from '@/api/public/crud';
import { getTables } from '@/api/system/form';
import { Vue, Component } from 'vue-property-decorator';

const STATUS = {
  CREATE: 0,
  UPDATE: 1,
};
@Component({
  name: 'TableDesignerModule',
})
export default class TableDesignerModule extends Vue {
  // 对话框是否显示
  visible = false;

  allTables = [];

  formList = [];

  dictList = [];

  btnSaveIsLoading = false;

  formValues = {};

  created() {
    getTables().then((res) => {
      this.allTables = res.data.map(item => ({
        label: item.TABLE_NAME,
        value: item.TABLE_NAME,
      }));
    });
    crud(DML.SELECT, 'form').then((res) => {
      this.formList = res.data.list;
    });
    crud(DML.SELECT, 'ad_codelist_type').then((res) => {
      this.dictList = res.data.list.map(item => ({
        label: item.typeName,
        value: item.codeValue,
      }));
    });
  }

  // 添加按钮点击事件
  btnAddOnClick() {
    this.visible = true;
  }

  // 编辑按钮点击事件
  btnEditOnClick(row) {
    this.formValues = { ...row };
    this.visible = true;
    this.$nextTick(() => {
      this.$refs.tableDesigner.setJSON(JSON.parse(row.formJson));
    });
  }

  // 取消按钮点击
  btnCancelOnClick() {
    this.visible = false;
  }

  // 保存按钮点击
  btnSaveOnClick() {
    this.btnSaveIsLoading = true;
    let type;
    let msg;
    const tableDesignerJson = this.$refs.tableDesigner.getData();

    // 根据对话框状态判断保存或编辑
    if (this.dialogStatus === STATUS.CREATE) {
      type = DML.INSERT;
      msg = '添加成功';
    } else {
      type = DML.UPDATE;
      msg = '编辑成功';
    }
    tableDesignerJson.name = tableDesignerJson.name || this.formValues.tableName;
    tableDesignerJson.position = tableDesignerJson.position || this.formValues.position;
    console.log(tableDesignerJson);
    crud(type, 'dynamictables', {
      ...this.formValues,
      tableName: tableDesignerJson.name,
      position: tableDesignerJson.position,
      formJson: JSON.stringify(tableDesignerJson),
    }).then(() => {
      this.btnSaveIsLoading = false;
      this.visible = false;
      this.$message({
        type: 'success',
        message: msg,
      });
    });
  }

  // 复制表格设计json
  btnCopyOnClick(row) {
    const r = { ...row };
    r.tableName += '_复制';
    delete r.id;
    crud(DML.INSERT, 'dynamictables', r).then((res) => {
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
      this.$refs.dynamictables.tableReload();
    });
  }
}
</script>
