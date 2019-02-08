<!--
 * @Author: BoBo
 * @Date: 2019-02-01 15:30:19
 * @Description:
 * 基于CommonTable以及CommonToolbar二次封装一个增删改查table
 -->
<template>
  <div
    id="crud_table"
    class="widget-box">

    <common-tool-bar
      :option-json ="jsonData.config.columnList"
      :search-arr ="listQuery.searchArr"
      @addEvent ="New"
      @searchEvent ="Refresh"
      @clearEvent ="Clear"
      :toolbarButton="toolbarButton"
    />

    <common-table
      :list="list"
      :table-json="jsonData.config.columnList"
      :list-query="listQuery"
      :list-loading="listLoading"
      @handleEdit="Edit"
      @handleDelete="Delete"
      @handleCurrentChange="Refresh"
      @handleSizeChange="Refresh"
      :handleButton="handleButton"
    />


    <el-dialog
      :title="textMap[dialogStatus]"
      :visible.sync="dialogFormVisible"
      width="80%">

      <generate-form
        ref="generateForm"
        :data="jsonData"
        :value="entity"
      />

      <div
        slot="footer"
        class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button
          v-if="dialogStatus=='create'"
          type="primary"
          @click="create">新 增</el-button>
        <el-button
          v-else
          type="primary"
          @click="update">修 改</el-button>
      </div>
    </el-dialog>

  </div>

</template>

<script>

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
    handleButton: {
      type: String,
      default: 'edit,detail,delete',
    },
    toolbarButton: {
      type: String,
      default: 'add,clear,search',
    },
    asyncCondition: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      entity: {}, // 当前表单实体model
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
          },
        ],
      },
      dialogFormVisible: false,
      dialogStatus: '',
      list: null,
      listLoading: true,
      id: '',
    };
  },

  created() {
    this.fetchData(this.listQuery);
    this.getObj();
    GetFormDetail(this.tableName).then((res) => {
      this.jsonData = JSON.parse(res.data.formJson);
    });
  },

  methods: {

    newGuid,
    getObj() {
      this.axios({
        url: `/${this.tableName}/getObj`,
        method: 'post',
      }).then((res) => {
        this.entity = res.data;
      })
    },

    Refresh() {
      this.fetchData(this.listQuery);
    },

    fetchData(params) {
      this.axios({
        url: `/${this.tableName}/list`,
        method: 'post',
        data: params,
      }).then((response) => {
        this.list = response.data.list;
        this.listQuery.totalCount = response.total;
        this.listLoading = false;
      })
    },

    New() {
      this.dialogStatus = 'create';
      this.dialogFormVisible = true;
      Object.keys(this.entity).forEach((k) => {
        this.entity[k] = ''
      })
    },
    Delete(id) {
      this.$confirm('确认删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        this.axios({
          url: `/${this.tableName}/delete`,
          method: 'post',
          params: { id },
        }).then(() => {
          this.fetchData(this.listQuery);
        });
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
    Edit(id) {
      this.dialogStatus = 'update';

      this.axios({
        url: `/${this.tableName}/detail`,
        method: 'post',
        params: { id },
      }).then((response) => {
        this.fetchData(this.listQuery);
        this.entity = response.data;
        this.dialogFormVisible = true;
      });
    },

    create() {
      this.$refs.generateForm
        .getData()
        .then((data) => {
          this.entity = data;
          this.entity.id = newGuid(); // 赋值主键
          this.axios({
            url: `/${this.tableName}/add`,
            method: 'post',
            data: this.entity,
          }).then(() => {
            this.dialogFormVisible = false;
            this.fetchData(this.listQuery);
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
          this.entity = data;
          // this.entity.id = this.id;
          this.axios({
            url: `/${this.tableName}/update`,
            method: 'post',
            data: this.entity,
          }).then(() => {
            this.dialogFormVisible = false;
            this.fetchData(this.listQuery);
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
}
</script>
