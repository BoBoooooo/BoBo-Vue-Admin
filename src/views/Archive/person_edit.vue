<template>
  <div
    id="person"
    class="app-container">

    <common-tool-bar
      :option-json ="jsonData.config.columnList"
      :search-arr ="listQuery.searchArr"
      @addEvent ="New"
      @searchEvent ="Refresh"
      @clearEvent ="Clear"
    />


    <common-table
      :list="list"
      :table-json="jsonData.config.columnList"
      :list-query="listQuery"
      :list-loading="listLoading"
      @Edit="Edit"
      @Delete="Delete"
      @handleCurrentChange="Refresh"
    />


    <el-dialog
      :title="textMap[dialogStatus]"
      :visible.sync="dialogFormVisible"
      width="80%">

      <generate-form
        ref="generateForm"
        :data="jsonData"
        :value="temp_obj"
        :upload_params="uploadParams"
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
import {
  GetUsers,
  DeleteUser,
  GetUsersDetail,
  SaveNewUsers,
  UpdateUsers,
  getObj,
} from '@/api/Archive/person';
import GenerateForm from '@/components/FormDesigner/GenerateForm';
import { GetFormDetail } from '@/api/system/form';
import { newGuid } from '@/utils/index';
import CommonTable from '@/components/CommonTable';
import CommonToolBar from '@/components/CommonToolBar';


export default {
  name: 'PersonEdit',
  components: {
    GenerateForm,
    CommonTable,
    CommonToolBar,
  },
  data() {
    return {
      jsonData: {
        list: [],
        config: {},
      },
      textMap: {
        update: '编辑',
        create: '新增',
      },
      temp_obj: {},
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
      uploadParams: {
        Param: {
          MasterID: '',
        },
        IsDetail: false,
      },

      dialogFormVisible: false,
      dialogStatus: '',
      list: null,
      listLoading: true,
      filelist: null,
      temp: null,
      defaultProps: {
        children: 'children',
        label: 'text',
      },
      id: '',
    };
  },

  created() {
    this.fetchData(this.listQuery);
    this.getObj();
    GetFormDetail('Person').then((res) => {
      this.jsonData = JSON.parse(res.data.formJson);
      console.log(this.jsonData);
    });
  },

  methods: {

    newGuid,
    getObj() {
      getObj().then((res) => {
        this.temp_obj = res.data;
      });
    },

    Refresh() {
      this.fetchData(this.listQuery);
    },

    fetchData(params) {
      GetUsers(params).then((response) => {
        this.list = response.data.list;
        this.listQuery.totalCount = response.total;
        this.listLoading = false;
      });
    },

    New() {
      this.dialogStatus = 'create';
      this.uploadParams.Param.MasterID = '';
      this.filelist = null;
      this.dialogFormVisible = true;
      Object.keys(this.temp_obj).forEach((k) => {
        this.temp_obj[k] = ''
      })
    },
    Delete(id) {
      this.$confirm('确认删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        DeleteUser(id).then(() => {
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
      GetUsersDetail(id).then((response) => {
        this.temp_obj = response.data;
        this.id = id;
        this.uploadParams.Param.MasterID = id;
        this.dialogFormVisible = true;
      });
    },

    create() {
      this.$refs.generateForm
        .getData()
        .then((data) => {
          this.temp_obj = data;
          this.temp_obj.id = newGuid(); // 赋值主键
          SaveNewUsers(this.temp_obj).then(() => {
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
          this.temp_obj = data;
          this.temp_obj.id = this.id;
          UpdateUsers(this.temp_obj).then(() => {
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
    // todolist
    handleRowClick(row, event, column) { // 点击行的事件，同理可以绑定其他事件
      console.log('click row:', row, event, column);
    },
    handleSelectionChange(selection) {
      console.log(selection);
    },
  },
};
</script>
