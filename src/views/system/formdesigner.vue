<template>
  <div class="app-container" ref="container" id="formdesigner">
<making-form preview generate-json ref="form">
    <template slot="action">

          <span style="margin-left:20px;float:left" v-if="selectform!==''">正在制作:{{selectform}}</span>
      <el-button style="border:none" @click="save"><svg-icon icon-class="icons"></svg-icon>
保存</el-button>
       <el-button style="border:none;margin-right:0px" @click="openmodal"><svg-icon icon-class="icons"></svg-icon>
选择要制作的表</el-button>

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
import MakingForm from "@/components/FormDesigner/Container";
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
      ID: "",
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
      let json = this.$refs.form.getJSON();
      console.log(json);
      let obj = {
        id: this.ID,
        tableName: this.selectform,
        formJson: json
      };
      if (this.IsNew) AddForm(obj);
      else UpdateForm(obj);

      this.dialogFormVisible = false;
    },
    openmodal() {
      this.dialogFormVisible = true;
    },
    select() {
      GetFormDetail(this.selectform).then(res => {
        this.dialogFormVisible = false;
        console.log(res);
        if (res.data !== null) {
          this.$refs.form.setJSON(JSON.parse(res.data.formJson));
          this.IsNew = false;
          this.ID = res.data.id;
        } else {
          this.$refs.form.setJSON({});
          this.IsNew = true;
          this.ID = "";
        }
      });
    }
  },
  components: {
    MakingForm
  }
};
</script>
