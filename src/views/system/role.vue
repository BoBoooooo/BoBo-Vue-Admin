<template>
  <div
    id="role"
    class="app-container">
    <el-button
      type="primary"
      size="small"
      style="margin:10px 0px"
      @click="New()">新增</el-button>

    <el-table
      v-loading.body="listLoading"
      :data="list"
      element-loading-text="拼命加载中"
      border
      fit
      highlight-current-row >
      <el-table-column
        align="center"
        label="序号"
        width="95">
        <template slot-scope="scope">
          {{ scope.$index+1 }}
        </template>
      </el-table-column>
      <el-table-column label="角色名">
        <template slot-scope="scope">
          {{ scope.row.rolename }}
        </template>
      </el-table-column>
      <el-table-column label="排序码">
        <template slot-scope="scope">
          {{ scope.row.rank }}
        </template>
      </el-table-column>

      <el-table-column
        label="操作"
        align="center"
        min-width="110px">
        <template slot-scope="scope">
          <el-button
            type="success"
            size="small"
            @click="Edit(scope.row.id)">编辑</el-button>

          <el-button
            type="danger"
            size="small"
            @click="Delete(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :current-page="listQuery.pageNumber"
      :page-sizes="[10, 20, 30]"
      :page-size="listQuery.pageSize"

      :total="listQuery.totalCount"
      layout="total,sizes, prev, pager, next"
      style="margin-top:5px"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"/>

    <el-dialog
      :title="textMap[dialogStatus]"
      :visible.sync="dialogFormVisible"
      :modal-append-to-body="false"
      width="50%">
      <el-form
        :model="temp"
        class="small-space"
        label-position="left"
        label-width="70px">

        <el-form-item label="角色名">
          <el-input
            v-model="temp.rolename"
            class="filter-item"
            placeholder="请输入角色名"/>
        </el-form-item>
        <el-form-item label="排序码">
          <el-input
            v-model="temp.rank"
            class="filter-item"
            placeholder="请输入排序码"/>
        </el-form-item>
        <el-form-item label="菜单">
          <el-tree
            ref="tree"
            :data="menu"
            :props="defaultProps"
            auto-expand-parent
            show-checkbox
            default-expand-all
            node-key="name"
            highlight-current
            check-strictly/>
        </el-form-item>

      </el-form>

      <div
        slot="footer"
        class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button
          v-if="dialogStatus=='create'"
          type="primary"
          @click="create">确 定</el-button>
        <el-button
          v-else
          type="primary"
          @click="update">确 定</el-button>
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
  UpdateRole,
} from '@/api/system/role'


import { asyncRouterMap } from '@/router/index'

export default {
  name: 'Role',

  data() {
    return {
      textMap: {
        update: '编辑',
        create: '新增',
      },
      dialogFormVisible: false,
      dialogStatus: '',
      list: null,
      listLoading: true,
      temp: {
        id: '',
        rolename: '',
        rank: '',
        roleauthname: null,
      },
      menu: null,
      listQuery: {
        totalCount: 0,
        pageSize: 10,
        pageNumber: 1,
      },
      defaultProps: {
        children: 'children',
        label: 'title',
      },
    }
  },

  created() {
    this.fetchData(this.listQuery)

    console.log(asyncRouterMap)
    const arr = asyncRouterMap.filter((item) => {
      if (item.children) {
        const obj = item.children
        obj.map((k) => {
          k.title = k.meta.title
        })
      }


      if (item.hidden) { return false }
      return true
    })
    this.menu = arr
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
      RoleList(params).then((response) => {
        this.list = response.data.list
        console.log(this.list)
        this.listQuery.totalCount = parseInt(response.data.total, 10)
        this.listLoading = false
      })
    },
    New() {
      this.temp.rolename = ''
      this.temp.rank = ''
      this.menulist = ''
      this.temp.id = ''
      this.dialogStatus = 'create'

      this.dialogFormVisible = true


      this.$nextTick(() => {
        this.$refs.tree.setCheckedKeys([])
      })
    },
    Delete(id) {
      this.$confirm('确认删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        DeleteRole(id).then(() => {
          this.fetchData(this.listQuery)
        })
      })
    },
    Edit(id) {
      this.dialogStatus = 'update'

      GetRoleDetail(id).then((response) => {
        this.dialogStatus = 'update'
        this.temp = response.data
        this.$nextTick(() => {
          this.$refs.tree.setCheckedKeys(this.temp.roleauthname.split(','))
        })
        this.dialogFormVisible = true
      })
    },

    create() {
      this.temp.roleauthname = this.$refs.tree.getCheckedKeys().join(',')

      AddRole(this.temp).then(() => {
        this.dialogFormVisible = false
        this.fetchData(this.listQuery)
      })
    },
    update() {
      this.temp.roleauthname = this.$refs.tree.getCheckedKeys().join(',')
      UpdateRole(this.temp).then(() => {
        this.dialogFormVisible = false

        this.fetchData(this.listQuery)
      })
    },
  }, //
}
</script>
