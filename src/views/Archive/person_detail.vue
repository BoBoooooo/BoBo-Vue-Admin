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
      title="查看"
      :visible.sync="dialogFormVisible"
      width="80%">

      <generate-form
        ref="generateForm"
        :data="jsonData"
        :value="temp_obj"
        :upload_params="uploadParams"
        disabled
      />

      <div
        slot="footer"
        class="dialog-footer">
        <el-button @click="dialogFormVisible = false">关 闭</el-button>

      </div>
    </el-dialog>

  </div>

</template>

<script>
import {
  GetUsers,
  GetUsersDetail,
  getObj,
} from '@/api/Archive/person';
import GenerateForm from '@/components/FormDesigner/GenerateForm';
import { GetFormDetail } from '@/api/system/form';
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
        IsDetail: true,
      },

      dialogFormVisible: false,
      dialogStatus: '',
      list: null,
      listLoading: true,
      filelist: null,
      temp: null,
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

    Clear() {
      this.listQuery.searchArr = [
        {
          SearchKey: '',
          SearchValue: '',
        },
      ];
      this.Refresh();
    },
    Detail(id) {
      this.dialogStatus = 'update';
      GetUsersDetail(id).then((response) => {
        this.temp_obj = response.data;
        this.id = id;
        this.uploadParams.Param.MasterID = id;
        this.dialogFormVisible = true;
      });
    },


  },
};
</script>
