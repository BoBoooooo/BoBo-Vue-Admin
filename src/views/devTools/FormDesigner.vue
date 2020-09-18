<!--
@file 动态表单设计器
@author BoBo
@copyright NanJing Anshare Tech .Com
@createDate 2018年12月13日21:06:23
-->
<template>
  <div class="page-container">
    <CrudTable ref="table"
               tableName="form"
               tableTitle="表单设计"
               orderCondition="timestamp desc"
               :btnEditOnClick="btnEditOnClick"
               :btnAddOnClick="btnAddOnClick"
               :searchFormCondition="searchFormParams"
               fullHeight
                :visibleList="{
                 tableTitle:false,
                 btnDel:true,
               }">
      <!-- 以后这里会改成form -->
      <template slot="btnCustom"
                slot-scope="scope">
        <el-button slot="btnCustom"
                   type="primary"
                   size="mini"
                   @click="btnCopyOnClick(scope.row)">复制</el-button>
      </template>
    </CrudTable>
    <FormDesignerDialog ref="dialog"
                        tableName="dynamictables"
                        @afterSave="dialogOnClose"
                        :remoteFuncs="remoteFuncs" />
  </div>
</template>

<script>
import { DML, crud } from '@/api/public/crud';
import { getTables } from '@/api/system/form';
import FormDesignerDialog from '@/components/BaseDialog/FormDesignerDialog.vue';

export default {
  name: 'FormDesigner',
  components: {
    FormDesignerDialog,
  },
  data() {
    return {
      searchFormParams: [{ key: 'tableName', operator: 'like', value: '' }],
      remoteFuncs: {
        getTablesOfDB(resolve) {
          // 请求表名列表
          getTables().then((res) => {
            const options = res.data.map(item => ({
              label: item.TABLE_NAME,
              value: item.TABLE_NAME,
            }));
            resolve(options);
          });
        },
      },
    };
  },
  methods: {
    // 添加按钮点击事件
    btnAddOnClick() {
      this.$refs.dialog.showDialog();
    },
    // 编辑按钮点击事件
    btnEditOnClick(row) {
      this.$refs.dialog.showDialog({ id: row.id }, 1, row);
    },
    // 对话框关闭
    dialogOnClose() {
      this.$refs.table.tableReload();
    },
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
    },
  },
};
</script>
