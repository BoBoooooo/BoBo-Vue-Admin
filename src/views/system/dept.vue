<template>
  <div
    id="dept"
    class=" widget-box">


<el-row>
  <el-col :span="8">
     <el-tree
            ref="tree"
            :data="deptList"
            :props="defaultProps"
            show-checkbox
            node-key="nodeName"
            highlight-current
            check-strictly/>
  </el-col>
    <el-col :span="16">
         <el-form
        :model="temp"
        class="small-space"
        label-position="left"
        label-width="70px">

        <el-form-item label="部门名称">
          <el-input
            v-model="temp.deptname"
            class="filter-item"
            placeholder="请输入部门名称"/>
        </el-form-item>
        <el-form-item label="排序码">
          <el-input
            v-model="temp.rank"
            class="filter-item"
            placeholder="请输入排序码"/>
        </el-form-item>

    <el-form-item label="分管单位">
          <el-tree
            ref="tree"
            :data="unitList"
            :props="defaultProps"
            show-checkbox
            node-key="nodeName"
            highlight-current
            check-strictly/>

        </el-form-item>


      </el-form>

    </el-col>

</el-row>


        <el-button>确 定</el-button>

  </div>
</template>

<script>
import {
  GetDeptTree,
  DeleteDept,
  GetDeptDetail,
  AddDept,
  UpdateDept,
} from '@/api/system/dept';

import {
  GetUnitTree,
} from '@/api/system/unit';

export default {
  name: 'Dept',
  data() {
    return {

      deptList: null,
      unitList: null,
      temp: {
        id: '',
        deptname: '',
        rank: '',
        isdeleted: false,
      },
      defaultProps: {
        children: 'children',
        label: 'nodeName',
      },
    }
  },

  created() {
    this.fetchDept()
    this.fetchUnit()
  },
  methods: {


    fetchDept() {
      GetDeptTree().then((response) => {
        this.deptList = response.data;
      });
    },

    fetchUnit() {
      GetUnitTree().then((response) => {
        this.unitList = response.data;
      });
    },

    Delete(id) {
      this.$confirm('确认删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          DeleteDept(id).then(() => {
            this.fetchDept()
          })
        })
    },
    Edit(id) {
      GetDeptDetail(id).then((response) => {
        this.temp = response.data;
      });
    },
    create() {
      AddDept(this.temp).then(() => {
        this.fetchDept();
      });
    },
    update() {
      UpdateDept(this.temp).then(() => {
        this.fetchDept();
      });
    },
  },
};

</script>
