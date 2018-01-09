
<template>
  <div class="app-container" id="role">

    <el-button @click="New()" type="primary" size="small">新增</el-button>
    <br><br>

    <el-table :data="list" v-loading.body="listLoading" element-loading-text="拼命加载中" border fit highlight-current-row>
      <el-table-column align="center" label='ID' width="95">
        <template scope="scope">
          {{scope.$index+1}}
        </template>
      </el-table-column>
      <el-table-column label="角色名">
        <template scope="scope">
          {{scope.row.RoleName}}
        </template>
      </el-table-column>
            <el-table-column label="排序码">
        <template scope="scope">
          {{scope.row.Rank}}
        </template>
      </el-table-column>
   
      <el-table-column label="操作"  align="center">
        <template scope="scope">
                  <el-button @click="Edit(scope.row.ID)" type="success" size="small">编辑</el-button>

           <el-button @click="Delete(scope.row.ID)" type="danger" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>


<el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" width="50%">
      <el-form class="small-space" :model="temp" label-position="left" label-width="70px">
      
        <el-form-item label="角色名">
          <el-input class="filter-item" v-model="temp.RoleName" placeholder="请输入角色名">
           
          </el-input>
        </el-form-item>
        <el-form-item label="排序码">
          <el-input class="filter-item" v-model="temp.Rank" placeholder="请输入排序码">
           
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
import { GetRoles, DeleteRole,GetRoleDetail,SaveNewRole,UpdateRole } from "@/api/system/role";

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
      listLoading: true,
      temp: {
        ID:"",
        RoleName: "",
        Rank: "",
        IsDeleted:false,
      }
    };
  },

  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.listLoading = true;
      GetRoles().then(response => {
        this.list = response.data;
        this.listLoading = false;
      });
    },
    New() {
      this.dialogFormVisible = true;
      this.temp==null;
      this.dialogStatus="create";

    },
    Delete(ID) {
      this.$confirm("确认删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          DeleteRole(ID).then(response => {
            this.$message({
              type: "success",
              message: "删除成功!"
            });
          });
        })
       
    },
    Edit(ID) {
            this.dialogStatus="update";

   GetRoleDetail(ID).then(response => {
            this.dialogStatus = "update";
            this.temp=response.data;
            this.dialogFormVisible =true;
          
          });

    },

    
    create() {
   SaveNewRole(this.temp).then(response => {
         this.$message({
          message: '保存成功',
          type: 'success'
        });
            this.dialogFormVisible =false;
            this.fetchData();
          
          });

    },
     update(ID) {
       this.temp.ID = ID;
   UpdateRole(this.temp).then(response => {
       this.$message({
          message: '保存成功',
          type: 'success'
        });
            this.dialogFormVisible =false;

                      this.fetchData();

          });

    }
  }
};
</script>


