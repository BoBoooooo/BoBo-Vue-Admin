<!--
 * @file: 部门管理
 * @copyright: NanJing Anshare Tech .Com
 * @author: BoBo
 * @Date: 2019-07-09 14:30:43
 -->
<template>
  <div class="page-container">
    <CrudTable ref="table"
               tableName="dept"
               tableTitle="部门列表"
               listField="data"
               :visibleList="{
                 searchForm: false,
                 btnExport: false,
                 btnAdd: false,
                 btnDel:true,
                 tableTitle:false,
                 conditionTitle: false,
                 actionColumnBtnAdd: true,
               }"
               fullHeight
               :showPagination="false"
               :promiseForSelect="promiseForSelect"
               :btnRowAddOnClick="btnRowAddOnClick"
               :btnEditOnClick="btnEditOnClick" />
    <!-- 添加/编辑对话框 -->
    <DeptDialog ref="deptDialog"
                :textMap="textMap"
                @afterSave="saveDialog" />
  </div>
</template>

<script>
import { DML, crud } from '@/api/public/crud';
import DeptDialog from './components/DeptDialog.vue';

// 对话框状态枚举
const STATUS = {
  CREATE: 0,
  UPDATE: 1,
};

export default {
  name: 'Dept',
  data() {
    return {
      textMap: {
        add: '添加',
        edit: '编辑',
      },
    };
  },
  components: {
    DeptDialog,
  },

  created() {},
  methods: {
    // 表格查询代理
    promiseForSelect() {
      return new Promise((resolve, reject) => {
        crud(DML.TREE, 'dept', {}, {
          type: this.$store.getters.isAdmin ? null : '1',
        })
          .then((res) => {
            resolve(res);
          })
          .catch(err => reject(err));
      });
    },
    // 添加
    btnRowAddOnClick(row) {
      this.textMap.add = `添加到${row.name}`;
      const params = {
        companyid: row.companyid || this.$store.getters.companyid,
        parentid: row.id,
        flowregion: row.flowregion,
        region: row.region,
        namesx: row.namesx,
      };
      this.$refs.deptDialog.showDialog(
        params,
        STATUS.CREATE,
      );
    },
    // 编辑
    btnEditOnClick(row) {
      this.textMap.edit = `编辑${row.name}`;
      this.$refs.deptDialog.showDialog({ id: row.id }, STATUS.UPDATE, row);
    },
    // 对话框保存后刷新表格
    saveDialog() {
      this.$refs.table.tableReload();
    },
  },
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.page-container {
  .tree {
    height: 500px;
  }
}
</style>
