<template>
  <div
    id="person"
    class="app-container">
    <el-row>
      <el-col :span="24">
        <el-select
          v-model="listQuery.SearchKey"
          placeholder="请选择"
          style="float:left;width:20%">
          <el-option
            label="姓名"
            value="name" />
          <el-option
            label="工作单位"
            value="workunit" />
          <el-option
            label="职务"
            value="workduty" />
          <el-option
            label="职级"
            value="worklevel" />
        </el-select>
        <el-input
          v-model="listQuery.SearchValue"
          placeholder="请输入"
          style="float:left;width:80%"
          @keyup.enter.native="Refresh">
          <el-button
            slot="append"
            icon="el-icon-search"
            @click="Refresh" />
          <el-button
            slot="append"
            icon="el-icon-refresh"
            @click="Clear" />

        </el-input>
      </el-col>
    </el-row>
    <br>
    <el-table
      v-loading.body="listLoading"
      :default-sort="{prop: 'name', order: 'descending'}"
      :data="list"
      element-loading-text="拼命加载中"
      border
      fit
      highlight-current-row>

      <el-table-column
        label="姓名"
        prop="name"
        sortable
        align="center">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column
        label="性别"
        prop="gender"
        sortable
        align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.gender }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="工作单位"
        prop="workunit"
        sortable
        align="center">
        <template slot-scope="scope">
          {{ scope.row.workunit }}
        </template>
      </el-table-column>
      <el-table-column
        label="职务"
        prop="workduty"
        sortable
        align="center">
        <template slot-scope="scope">
          {{ scope.row.workduty }}
        </template>
      </el-table-column>
      <el-table-column
        label="职级"
        prop="worklevel"
        sortable
        align="center">
        <template slot-scope="scope">
          {{ scope.row.worklevel }}
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        min-width="110px">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="small"
            @click="Detail(scope.row.id)">详情</el-button>

        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :currentpage="listQuery.pageNumber"
      :page-sizes="[10, 20, 30]"
      :page-size="listQuery.pageSize"
      :total="listQuery.totalCount"
      layout="total,sizes, prev, pager, next"
      style="margin-top:5px"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
    <el-dialog
      :visible.sync="dialogFormVisible"
      title="查看"
      width="80%">
      <generate-form
        ref="generateForm"
        :data="jsonData"
        :upload_params="uploadParams"
        :value="temp_obj"
        :disabled="disabled"
      />
    </el-dialog>
  </div>
</template>

<script>
import {
  GetUsers,
  GetUsersDetail,
} from '@/api/Archive/person'
import { GetFormDetail } from '@/api/system/form'
import GenerateForm from '@/components/FormDesigner/GenerateForm'

export default {
  name: 'PersonDetail',
  components: {
    GenerateForm,
  },
  data() {
    return {
      jsonData: null,
      temp_obj: {},
      listQuery: {
        totalCount: null,
        pageSize: 10,
        pageNumber: 1,
        SearchKey: '',
        SearchValue: '',
      },
      disabled: true,
      uploadParams: {
        Param: {
          MasterID: '',
        },
        IsDetail: true,
        Url: 'http://localhost:8089/file/Upload',
      },
      dialogFormVisible: false,
      list: null,
      listLoading: true,
      filelist: null,
      temp: null,
      defaultProps: {
        children: 'children',
        label: 'text',
      },
    }
  },

  created() {
    this.fetchData(this.listQuery)
  },
  mounted() {
    GetFormDetail('Person').then((res) => {
      this.jsonData = JSON.parse(res.data.formJson)
    })
  },
  methods: {
    handleSizeChange(val) {
      this.listQuery.pageSize = val
      this.fetchData(this.listQuery)
    },
    handleCurrentChange(val) {
      this.listQuery.pageNumber = val
      this.fetchData(this.listQuery)
    },

    Refresh() {
      this.fetchData(this.listQuery)
    },
    Clear() {
      this.listQuery.SearchKey = ''
      this.listQuery.SearchValue = ''
      this.fetchData(this.listQuery)
    },
    fetchData(params) {
      this.listLoading = true
      GetUsers(params).then((response) => {
        this.list = response.data.list
        this.listQuery.totalCount = response.total
        this.listLoading = false
      })
    },
    Detail(id) {
      this.uploadParams.Param.MasterID = id
      this.uploadParams.IsDetail = true
      GetUsersDetail(id).then((response) => {
        this.temp_obj = response.data
        this.dialogFormVisible = true
      })
    },
  },
}
</script>
