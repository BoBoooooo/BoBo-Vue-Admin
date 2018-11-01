<template>
  <div class="app-container" ref="container" id="formdesigner">
<making-form preview generate-json ref="form">
    <template slot="action">

          <span style="margin-left:20px" v-if="selectform!==''">{{selectform}}</span>
            <el-button style="border:none;float:left;margin-left:80px" @click="openmodal">选择要制作的表</el-button>

      <el-button style="border:none" @click="save">保存</el-button>
    </template>
</making-form>



 <el-dialog title="选择表单"  :visible.sync="dialogFormVisible" >
     <el-select v-model="selectform" placeholder="请选择">
    <el-option
 v-for="(item, index) in tablelist"
 :key="index"
      :label="item.table_name"
      :value="item.table_name">
    </el-option>
  </el-select>

  <el-button @click="select">选择</el-button>
  </el-dialog>


  </div>



 
</template>

<script>
import { MakingForm } from "form-making";
import {
  getTables,
  GetFormDetail,
  AddForm,
  UpdateForm
} from "@/api/system/form";
export default {
  name: "formdesigner",
  data() {
    return {
      IsNew: true,
      tablelist: null,
      selectform: "",
      dialogFormVisible: false
    };
  },
  created() {
    getTables().then(res => {
      this.tablelist = res.data;
    });
  },

  methods: {
    save() {
     let json = this.$refs.form.getJSON()
     console.log(json)
          let obj = {
            tableName: this.selectform,
            formJson: json
          }
          if (this.IsNew) AddForm(obj);
          else UpdateForm(obj);

          this.dialogFormVisible = false;
     
      
    },
    openmodal() {
      this.dialogFormVisible = true;
    },
    select() {
      GetFormDetail(this.selectform).then(res => {
        if (res.code !== 400) {
         
          this.$refs.form.setJSON(JSON.parse(res.data.formJson));
                    this.IsNew = false;

        } else
        {
                    this.$refs.form.setJSON([]);
                    this.IsNew = true;

        }
        this.dialogFormVisible = false;
      });
    }
  },
  components: {
    MakingForm
  }
};
</script>
