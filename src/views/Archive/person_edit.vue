<template>
  <div id="person" class="app-container">

    <div v-show="buttonVisible=='el-icon-arrow-up'" class="searchContainer">
      <el-row v-for="(item,index) in searchArr" :key="index" style="margin-top:2px">
        <el-col :span="6">
          <el-select v-model="item.SearchKey" style="width:100%" placeholder="请选择查询项">
            <el-option v-for="(subitem,index_) in filter_search(jsonData.config.columnList)" :key="index_" :label="subitem.label" :value="subitem.prop" />
          </el-select>
        </el-col>
        <el-col :span="6">

          <el-select v-model="item.SearchType" style="width:100%" placeholder="请选择查询条件">
            <el-option v-for="(subitem,index__) in SearchType" :key="index__" :label="subitem.label" :value="subitem.key" />
          </el-select>
        </el-col>

        <el-col :span="10">
          <el-input v-model="item.SearchValue" style="width:100%" placeholder="请输入查询内容" />

        </el-col>

        <el-col :span="2" style="text-align:center">
          <el-button style="margin:5px 0px 0px 10px;padding:10px" type="danger" size="mini" circle icon="el-icon-minus" @click="removeItem" />

        </el-col>

      </el-row>
      <el-button style="margin:0 auto;display:block;margin-top:10px" type="primary" size="mini" circle icon="el-icon-plus" @click="addItem" />

    </div>

    <el-row style="margin-bottom:10px">

      <el-col :span="24">
        <el-button-group style="float:right">
          <el-button icon="el-icon-plus" @click="New()" />

          <el-button icon="el-icon-search" @click="Refresh" />
          <el-button icon="el-icon-refresh" @click="ClearOption" />

          <el-button class="buttonVisible" :icon="buttonVisible" @click="changeVisible" />
        </el-button-group>
      </el-col>
    </el-row>

    <el-table v-loading.body="listLoading" :default-sort="{prop: 'name', order: 'descending'}" :data="list" element-loading-text="拼命加载中" border fit highlight-current-row>
      <el-table-column
        v-for="(item,index) in jsonData.config.columnList"
        :key="index"
        :label="item.label"
        :prop="item.prop"
        :align="item.align"
        :sortable="item.sortable"
        :width="item.width"
        :min-width="item.min_width"
        :header-align="item.header_align"
        :show-overflow-tooltip="item.show_overflow_tooltip"
      />
      <el-table-column label="操作" align="center" min-width="110px">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" circle @click="Edit(scope.row.id)" />

          <el-button type="danger" icon="el-icon-delete" circle @click="Delete(scope.row.id)" />

        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      style="margin-top:5px"
      layout="total,sizes, prev, pager, next"
      :current-page="listQuery.pageNumber"
      :page-size="listQuery.pageSize"
      :total="listQuery.totalCount"
      :page-sizes="[10, 20, 30]"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" width="80%">

      <generate-form
        ref="generateForm"
        :data="jsonData"
        :value="temp_obj"
        :upload_params="uploadParams"
      />

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="create">新 增</el-button>
        <el-button v-else type="primary" @click="update">修 改</el-button>
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
  getObj
} from '@/api/Archive/person'
import GenerateForm from '@/components/FormDesigner/GenerateForm'
import { GetFormDetail } from '@/api/system/form'
import { newGuid } from '@/utils/index'
export default {
  name: 'PersonEdit',
  components: {
    GenerateForm
  },
  data() {
    return {
      jsonData: {
        list: [],
        config: {}
      },
      selected: null,
      Clear: true,
      textMap: {
        update: '编辑',
        create: '新增'
      },
      temp_obj: {},
      listQuery: {
        totalCount: null,
        pageSize: 10,
        pageNumber: 1,
        SearchKey: '',
        SearchValue: ''
      },
      SearchType: [
        {
          label: '等于',
          key: '='
        },
        {
          label: '不等于',
          key: '<>'
        },
        {
          label: '大于',
          key: '>'
        },
        {
          label: '大于等于',
          key: '>='
        },
        {
          label: '小于',
          key: '<'
        },
        {
          label: '小于等于',
          key: '<='
        }
      ],
      searchArr: [
        {
          SearchKey: '',
          SearchValue: ''
        }
      ],
      uploadParams: {
        Param: {
          MasterID: ''
        },
        IsDetail: false
      },

      dialogFormVisible: false,
      dialogStatus: '',
      list: null,
      listLoading: true,
      RoleID: '',
      filelist: null,
      temp: null,
      defaultProps: {
        children: 'children',
        label: 'text'
      },
      buttonVisible: 'el-icon-arrow-down',
      id: ''
    }
  },

  created() {
    this.fetchData(this.listQuery)
    this.getObj()
    GetFormDetail('Person').then(res => {
      this.jsonData = JSON.parse(res.data.formJson)
      console.log(this.jsonData)
    })
  },

  methods: {
    changeVisible() {
      if (this.buttonVisible === 'el-icon-arrow-down') { this.buttonVisible = 'el-icon-arrow-up' } else this.buttonVisible = 'el-icon-arrow-down'
    },
    filter_search(item) {
      return item.filter(item => item.searchable)
    },
    newGuid,
    getObj() {
      getObj().then(res => {
        this.temp_obj = res.data
      })
    },
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
    ClearOption() {
      this.listQuery.SearchKey = ''
      this.listQuery.SearchValue = ''
      this.searchArr = [
        {
          SearchKey: '',
          SearchValue: ''
        }
      ]
      this.buttonVisible = 'el-icon-arrow-up'
      this.fetchData(this.listQuery)
    },
    fetchData(params) {
      GetUsers(params).then(response => {
        this.list = response.data.list
        this.listQuery.totalCount = response.total
        this.listLoading = false
      })
    },

    New() {
      this.dialogStatus = 'create'
      this.uploadParams.Param.MasterID = ''
      this.filelist = null
      this.dialogFormVisible = true
      for (const key in this.temp_obj) {
        this.temp_obj[key] = ''
      }
    },
    Delete(id) {
      this.$confirm('确认删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        DeleteUser(id).then(response => {
          this.fetchData(this.listQuery)
        })
      })
    },

    Edit(id) {
      this.dialogStatus = 'update'
      GetUsersDetail(id).then(response => {
        this.temp_obj = response.data
        this.id = id
        this.uploadParams.Param.MasterID = id
        this.dialogFormVisible = true
      })
    },

    create() {
      this.$refs.generateForm
        .getData()
        .then(data => {
          console.log(data)
          // data 为获取的表单数据

          this.temp_obj = data
          this.temp_obj.id = newGuid() // 赋值主键
          SaveNewUsers(this.temp_obj).then(response => {
            this.dialogFormVisible = false
            this.fetchData(this.listQuery)
          })
        })
        .catch(e => {
          this.$message({
            message: '请检查必填项',
            type: 'warning'
          })
        })
    },
    update() {
      this.$refs.generateForm
        .getData()
        .then(data => {
          this.temp_obj = data
          this.temp_obj.id = this.id
          UpdateUsers(this.temp_obj).then(response => {
            this.dialogFormVisible = false
            this.fetchData(this.listQuery)
          })
        })
        .catch(e => {
          // 数据校验失败
          this.$message({
            message: '请检查必填项',
            type: 'warning'
          })
        })
    },
    removeItem(item) {
      var index = this.searchArr.indexOf(item)
      if (index) {
        this.searchArr.splice(index, 1)
      }
    },
    addItem() {
      this.searchArr.push({
        SearchKey: '',
        SearchValue: '',
        SearchType: ''
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.searchContainer {
    position: absolute;
    top: 62px;
    left: 20px;
    padding: 15px;
    min-height: 100px;
    z-index: 10;
    right: 20px;
    background-color: white;
;    box-shadow: 0px 0px 10px gray;

  }
</style>
