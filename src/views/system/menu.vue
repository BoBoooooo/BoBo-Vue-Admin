<template>
  <div class="app-container" ref="container" id="dept">

   <el-button @click="New()" type="primary" size="small" style="margin:10px 0px">新增</el-button>


    <el-table   :data="list" v-loading.body="listLoading" element-loading-text="拼命加载中" border fit highlight-current-row>
      <el-table-column align="center" label='ID' width="95">
        <template slot-scope="scope">
          {{scope.row.id}}
        </template>
      </el-table-column>
      <el-table-column label="菜单名称">
        <template slot-scope="scope">
          {{scope.row.title}}
        </template>
      </el-table-column>
      <el-table-column label="菜单路径">
        <template slot-scope="scope">
          {{scope.row.path}}
        </template>
      </el-table-column>

 <el-table-column label="菜单唯一标识">
        <template slot-scope="scope">
          {{scope.row.name}}
        </template>
      </el-table-column>

       <el-table-column label="父级菜单">
        <template slot-scope="scope">
          {{scope.row.parentid}}
        </template>
      </el-table-column>

       <el-table-column label="菜单图标">
        <template slot-scope="scope">
          {{scope.row.icon}}
        </template>
      </el-table-column>
 <el-table-column label="排序码">
        <template slot-scope="scope">
          {{scope.row.sequence}}
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center" min-width="110px">
        <template slot-scope="scope">
          <el-button @click="Edit(scope.row.id)" type="success" size="small">编辑</el-button>

          <el-button @click="Delete(scope.row.id)" type="danger" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.pageNumber"
      :page-sizes="[10, 20, 30]" :page-size="listQuery.pageSize" 　 layout="total,sizes, prev, pager, next" :total="listQuery.totalCount"
      style="margin-top:5px">
    </el-pagination>
    <!-- <el-tree :data="depttree"  default-expand-all node-key="id" ref="tree" highlight-current :props="defaultProps">
    </el-tree> -->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" width="50%" :modal-append-to-body='false'>
      <el-form class="small-space" :model="temp" label-position="left" label-width="70px">

        <el-form-item label="部门名称">
          <el-input class="filter-item" v-model="temp.deptname" placeholder="请输入部门名称">

          </el-input>
        </el-form-item>
        <el-form-item label="排序码">
          <el-input class="filter-item" v-model="temp.rank" placeholder="请输入排序码">

          </el-input>
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
   MenuList,
    DeleteMenu,
    GetMenuDetail,
    AddMenu,
    UpdateMenu,
  } from "@/api/system/menu";

  export default {
    data() {
      return {
        textMap: {
          update: "编辑",
          create: "新增"
        },
        dialogFormVisible: false,
        dialogStatus: "",
        list: null,
        windowheight:"550",
        listLoading: true,
        temp: {
          id: "",
          name: "",
          icon: "",
          parentid: "",
          path: "",
          sequence: "",
          title: "",
          redirect: "noredirect",
        },
            listQuery: {
        totalCount: 0,
        pageSize: 10,
        pageNumber: 1
      },
        depttree: [],
        defaultProps: {
          children: "children",
          label: "text"
        }
      }
    },

    created() {
      // GetDeptTree().then(response => {
      //   this.depttree = JSON.parse(response.data);
      // });
      this.fetchData(this.listQuery);


    },
    mounted(){
     
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
        this.listLoading = true;
        MenuList(params).then(response => {
          this.list = response.data.list;
          this.listLoading = false
          this.listQuery.totalCount = parseInt(response.data.total)

        });
      },
      New() {
        this.dialogFormVisible = true;
        this.temp.deptname = "";
        this.temp.rank = "";
        this.dialogStatus = "create";
      },
      Delete(id) {
        this.$confirm("确认删除?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
          .then(() => {
            DeleteMenu(id).then(()=>{    
                      this.fetchData()
})
          })

      },
      Edit(id) {
        this.dialogStatus = "update";

        GetMenuDetail(id).then(response => {
          this.dialogStatus = "update";
          this.temp = response.data;
          console.log(this.temp)
          this.dialogFormVisible = true;

        });

      },


      create() {
        AddMenu(this.temp).then(response => {
         
          this.dialogFormVisible = false;
          this.fetchData();

        });

      },
      update() {
        UpdateMenu(this.temp).then(response => {
          
          this.dialogFormVisible = false;

          this.fetchData();

        });

      }
    }
  };

</script>
