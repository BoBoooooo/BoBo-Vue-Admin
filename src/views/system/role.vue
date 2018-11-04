<template>
  <div class="app-container" id="role">
    <el-button @click="New()" type="primary" size="small" style="margin:10px 0px">新增</el-button>

    <el-table :data="list" v-loading.body="listLoading" element-loading-text="拼命加载中" border fit highlight-current-row >
      <el-table-column align="center" label='序号' width="95">
        <template slot-scope="scope">
          {{scope.$index+1}}
        </template>
      </el-table-column>
      <el-table-column label="角色名">
        <template slot-scope="scope">
          {{scope.row.rolename}}
        </template>
      </el-table-column>
      <el-table-column label="排序码">
        <template slot-scope="scope">
          {{scope.row.rank}}
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center" min-width="110px">
        <template slot-scope="scope">
          <el-button  @click="Edit(scope.row.id)" type="success" size="small">编辑</el-button>

          <el-button @click="Delete(scope.row.id)" type="danger" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.pageNumber"
      :page-sizes="[10, 20, 30]" :page-size="listQuery.pageSize" 　 layout="total,sizes, prev, pager, next" :total="listQuery.totalCount"
      style="margin-top:5px">
    </el-pagination>

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" width="50%" :modal-append-to-body='false'>
      <el-form class="small-space" :model="temp" label-position="left" label-width="70px">

        <el-form-item label="角色名">
          <el-input class="filter-item" v-model="temp.rolename" placeholder="请输入角色名">

          </el-input>
        </el-form-item>
        <el-form-item label="排序码">
          <el-input class="filter-item" v-model="temp.rank" placeholder="请输入排序码">

          </el-input>
        </el-form-item>
        <el-form-item label="菜单">
             <el-tree :data="menu" auto-expand-parent show-checkbox default-expand-all node-key="name" ref="tree" highlight-current
            :props="defaultProps" check-strictly>
             </el-tree>
        </el-form-item>

      </el-form>
      
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="create">确 定</el-button>
        <el-button v-else type="primary" @click="update">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import {
  RoleList,
  DeleteRole,
  GetRoleDetail,
  AddRole,
  UpdateRole
} from "@/api/system/role"


import {asyncRouterMap} from '@/router/index'
import { mapGetters } from "vuex"
import store from '@/store'
export default {
      name:"role",

  data() {
    return {
      textMap: {
        update: "编辑",
        create: "新增"
      },
      dialogFormVisible: false,
      dialogStatus: "",
      list: null,
      listLoading: true,
      temp: {
        id: "",
        rolename: "",
        rank: "",
        roleauthname:null
      },
      menu: null,
      listQuery: {
        totalCount: 0,
        pageSize: 10,
        pageNumber: 1
      },
      defaultProps: {
        children: "children",
        label: "title"
      }
    }
  },

  created() {
    this.fetchData(this.listQuery)

console.log(asyncRouterMap)
   let arr =  asyncRouterMap.filter(item=>{

      if(item.hidden)
      return false
      else
      return true

    })
          this.menu=arr


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

    fetchData(params) {
      this.listLoading = true
      RoleList(params).then(response => {
        this.list = response.data.list
        console.log(this.list)
        this.listQuery.totalCount = parseInt(response.data.total)
        this.listLoading = false
      })
    },
    New() {
       this.temp.rolename = ""
      this.temp.rank = ""
      this.menulist = ""
      this.temp.id=""
      this.dialogStatus = "create"
    
      this.dialogFormVisible = true
     

         this.$nextTick(() => {
                this.$refs.tree.setCheckedKeys([])
})

    },
    Delete(id) {
      this.$confirm("确认删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        DeleteRole(id).then(response => {
       
          this.fetchData(this.listQuery)
        })
      })
    },
    Edit(id) {
      this.dialogStatus = "update"

      GetRoleDetail(id).then(response => {
        this.dialogStatus = "update"
        this.temp = response.data
        this.$nextTick(() => {
                this.$refs.tree.setCheckedKeys(this.temp.roleauthname.split(','))
})
        this.dialogFormVisible = true


      })
    },

    create() {
      this.temp.roleauthname = this.$refs.tree.getCheckedKeys().join(',')

      AddRole(this.temp).then(response => {
  
        this.dialogFormVisible = false
        this.fetchData(this.listQuery)
      })
    },
    update() {
      this.temp.roleauthname = this.$refs.tree.getCheckedKeys().join(',')
      UpdateRole(this.temp).then(response => {
    
        this.dialogFormVisible = false

        this.fetchData(this.listQuery)
      })
    }
  }//
}
</script>
