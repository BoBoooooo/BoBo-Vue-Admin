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
        <slot name="formatter"
        :row="scope.row"></slot>
      </template>
    </common-table>

    <el-dialog
      :title="textMap[dialogStatus]"
      :visible.sync="dialogFormVisible"
      v-if="dialogFormVisible"
      width="80%"
    >
      <generate-form
        ref="generateForm"
        :data="jsonData"
        :value="formValue"
        :entity.sync="models"
        :disabled="handleButton.includes('detail')"
      />

      <div slot="footer" class="dialog-footer">
        <template v-if="dialogStatus === 'detail'">
          <v-btn @click="dialogFormVisible = false" color="white">关 闭</v-btn>
        </template>

        <template v-else>
          <v-btn @click="dialogFormVisible = false" color="white">取 消</v-btn>
          <v-btn v-if="dialogStatus=='create'" color="blue" @click="create">新 增</v-btn>
          <v-btn v-else color="blue" @click="update">修 改</v-btn>
        </template>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import operation from './handleButton.js';
// eslint-disable-next-line import/named
import { GetFormDetail } from '@/api/system/form';
import { newGuid } from '@/utils/index';
import GenerateForm from '@/components/FormDesigner/GenerateForm';
import CommonTable from '@/components/CommonTable';
import CommonToolBar from '@/components/CommonToolBar';

export default {
  name: 'CrudTable',
  components: {
    GenerateForm,
    CommonTable,
    CommonToolBar,
  },
  props: {
    tableName: String,
    showPagination: {
      type: Boolean,
      default: true,
    },
    handleButton: {
      type: String,
      default: '',
    },
    IsMultiple: {
      type: Boolean,
      default: false,
    },
    toolbarButton: {
      type: String,
      default: 'clear,search',
    },
    asyncCondition: {
      type: Object,
      default: () => ({}),
    },
    // 当前表单实体model
    entity: {
      type: Object,
      default: () => ({}),
    },

  },
  data() {
    return {
      operation,
      models: {}, // 表单内部实体
      formValue: {}, // 当前表单实体model
      jsonData: {
        list: [],
        config: {},
      },
      textMap: {
        update: '编辑',
        create: '新增',
      },
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
        this.$emit('update:entity', val)
      },
    },
  },
  computed: {
    getShowButton() {
      return this.operation.filter(element => this.handleButton.includes(element.name));
    },
  },
  created() {
    this.fetchData(this.listQuery);
    // this.getObj();
    GetFormDetail(this.tableName).then((res) => {
      this.jsonData = JSON.parse(res.data.formJson);
    });
  },

  methods: {
    emitEvent(...args) {
      this.$emit(args[0], ...Array.from(args).slice(1));
    },
    newGuid,
    // getObj() {
    //   this.axios({
    //     url: `/${this.tableName}/getObj`,
    //     method: 'post',
    //   }).then((res) => {
    //     this.formValue = res.data;
    //   });
    // },

    Refresh() {
      this.fetchData(this.listQuery);
    },

    async fetchData(params) {
      const response = await this.crud('list', this.tableName, params)
      this.list = response.data.list;
      this.listQuery.totalCount = response.total;
      this.listLoading = false;
    },
    handleOperation(funcName, id) {
      this[funcName](id)
    },

    New() {
      this.dialogStatus = 'create';
      Object.keys(this.formValue).forEach((k) => {
        this.formValue[k] = '';
      });
      this.dialogFormVisible = true;
    },
    Delete(id) {
      this.$confirm('确认删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(async () => {
        await this.crud('delete', this.tableName, { id })
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
      const response = await this.crud('detail', this.tableName, { id })
      this.formValue = response.data;
      this.dialogFormVisible = true;
    },

    async Detail(id) {
      this.dialogStatus = 'update';
      const response = await this.crud('detail', this.tableName, { id })
      this.formValue = response.data;
      this.dialogFormVisible = true;
    },

    create() {
      this.$refs.generateForm
        .getData()
        .then(async (data) => {
          this.formValue = {
            ...data,
            id: newGuid(),
          };
          await this.crud('add', this.tableName, this.formValue)
          this.dialogFormVisible = false;
          this.Refresh();
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
        .then(async (data) => {
          await this.crud('update', this.tableName, data)
          this.dialogFormVisible = false;
          this.Refresh();
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
};
</script>
