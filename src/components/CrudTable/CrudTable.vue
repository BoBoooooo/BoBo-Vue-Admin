<!--
 * @Author: BoBo
 * @Date: 2019-02-01 15:30:19
 * @Description:
 * 基于CommonTable以及CommonToolbar二次封装一个增删改查table
 -->
<template>
  <div id="crud_table" class="widget-box">
    <common-tool-bar
      :option-json="jsonData.config.columnList"
      :search-arr="listQuery.searchArr"
      @addEvent="New"
      @searchEvent="Refresh"
      @clearEvent="Clear"
      :toolbarButton="toolbarButton"
    />

    <common-table
      :list="list"
      :table-json="jsonData.config.columnList"
      :list-query="listQuery"
      :list-loading="listLoading"
      :IsMultiple="IsMultiple"
      :showPagination="showPagination"
      @handleCurrentChange="Refresh"
      @handleSizeChange="Refresh"
      :handleButton="handleButton"
      @selection-change="selection => emitEvent('selection-change', selection)"
      @row-click="(row, event, column) => emitEventHandler('row-click', row, event, column)"
    >
      <template slot="handleButton" slot-scope="scope">
        <v-btn
          :key="index"
          :color="btn.color"
          v-for="(btn,index) in getShowButton"
          small
          dark
          @click.stop="handleOperation(btn.Fun,scope.row.id)"
        >
          {{btn.label}}
          <v-icon>{{btn.icon}}</v-icon>
        </v-btn>
        <slot name="customButton" :row="scope.row"></slot>
      </template>
      <template slot="formatter" slot-scope="scope">
        <slot name="formatter" :row="scope.row" :prop="scope.prop"></slot>
      </template>
    </common-table>

    <GenerateFormDialog
    :dialogFormVisible.sync="dialogFormVisible"
    :disabled="disabled"
    :tableName="tableName"
    :dialogStatus="dialogStatus"
    :formValues="formValues"
    @afterSave="Refresh"
    :jsonData="jsonData"
    :entity.sync="models"
    >
    </GenerateFormDialog>
  </div>
</template>

<script>
import operation from './components/handleButton.js';
import props from './components/props.js';
import GenerateFormDialog from './components/GenerateFormDialog.vue'
import CommonTable from '@/components/CommonTable';
import CommonToolBar from '@/components/CommonToolBar';
// eslint-disable-next-line import/named
import { GetFormDetail } from '@/api/system/form';

export default {
  name: 'CrudTable',
  components: {
    CommonTable,
    CommonToolBar,
    GenerateFormDialog,
  },
  props,
  data() {
    return {
      operation,
      models: {}, // 表单内部实体
      formValues: {}, // 当前表单实体model
      listQuery: {
        totalCount: null,
        pageSize: 10,
        pageNumber: 1,
        searchArr: [
          {
            SearchKey: '',
            SearchValue: '',
            SearchOperator: '',
          },
        ],
      },
      dialogFormVisible: false,
      dialogStatus: '',
      list: null,
      listLoading: true,
      jsonData: {
        list: [],
        config: {},
      },
    };
  },
  watch: {
    asyncCondition: {
      deep: true,
      handler(val) {
        this.listQuery.searchArr[0].SearchKey = val.searchKey;
        this.listQuery.searchArr[0].SearchValue = val.searchValue;
        this.listQuery.searchArr[0].SearchOperator = '=';
        this.Refresh();
      },
    },
    models: {
      immediate: true,
      deep: true,
      handler(val) {
        this.$emit('update:entity', val);
      },
    },
  },
  computed: {
    getShowButton() {
      return this.operation.filter(element => this.handleButton.includes(element.name));
    },
  },

  created() {
    GetFormDetail(this.tableName).then((res) => {
      this.jsonData = JSON.parse(res.data.formJson);
    });
    this.fetchData(this.listQuery);
  },

  methods: {

    emitEvent(...args) {
      this.$emit(args[0], ...Array.from(args).slice(1));
    },
    Refresh() {
      this.fetchData(this.listQuery);
    },

    async fetchData(params) {
      const response = await this.crud('list', this.tableName, params);
      this.list = response.data.list;
      this.listQuery.totalCount = response.total;
      this.listLoading = false;
    },
    handleOperation(funcName, id) {
      this[funcName](id);
    },

    New() {
      this.dialogStatus = 'create';
      Object.keys(this.formValues).forEach((k) => {
        this.formValues[k] = '';
      });
      this.dialogFormVisible = true;
    },
    Delete(id) {
      this.$confirm('确认删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(async () => {
        await this.crud('delete', this.tableName, { id });
        this.Refresh();
      });
    },
    Clear() {
      this.listQuery.searchArr = [
        {
          SearchKey: '',
          SearchValue: '',
        },
      ];
      this.Refresh();
    },
    async Edit(id) {
      this.dialogStatus = 'update';
      const response = await this.crud('detail', this.tableName, { id });
      this.formValues = response.data;
      this.dialogFormVisible = true;
    },
    async Detail(id) {
      this.dialogStatus = 'detail';
      const response = await this.crud('detail', this.tableName, { id });
      this.formValues = response.data;
      this.dialogFormVisible = true;
      this.disabled = true
    },
  },
}
</script>
<style lang="scss" scoped>
  .v-btn{
    min-width:60px!important;
  }
</style>
