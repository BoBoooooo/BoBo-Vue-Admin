<template>
  <div
    id="dept"
    class="widget-box">


<el-row>
  <el-col :span="8">
     <el-tree
            ref="depttree"
            :data="deptList"
            :props="defaultProps"
            node-key="id"
            highlight-current
              :default-expanded-keys="['00000000-0000-0001-0000-000000000000']"
            @node-click="deptTreeClick"
            />
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
  <el-form-item label="上级部门">
          <el-select
            v-model="temp.parentid"
            placeholder="请选择"
            filterable>
            <el-option
              v-for="item in deptoptions"
              :key="item.id"

              :label="item.deptname"
              :value="item.id"/>
          </el-select>

        </el-form-item>

        <el-form-item label="排序码">
          <el-input
            v-model="temp.rank"
            class="filter-item"
            placeholder="请输入排序码"/>
        </el-form-item>

    <el-form-item label="分管单位">
          <el-tree
            ref="unittree"
            :data="unitList"
            :props="defaultProps"
            show-checkbox
            node-key="id"
            highlight-current
            check-strictly class="tree"/>

        </el-form-item>


      </el-form>
    <div
        class="dialog-footer">
         <el-button
          type="success"
          @click="clearObj">新 增</el-button>
        <el-button
          type="primary"
          @click="save">保 存</el-button>
        <el-button v-if="status==='update'" type="danger" @click="Delete">删 除</el-button>

      </div>
    </el-col>

</el-row>

  </div>
</template>

<script>
import {
  GetDeptTree,
  DeleteDept,
  DeptList,
  GetDeptDetail,
  AddDept,
  UpdateDept,
  getObj,
} from '@/api/system/dept';

import {
  GetUnitTree,
} from '@/api/system/unit';

export default {
  name: 'Dept',
  data() {
    return {
      deptoptions: [],
      status: 'create',
      deptList: null,
      unitList: null,
      temp: null,
      defaultProps: {
        children: 'children',
        label: 'nodeName',
      },
    }
  },

  created() {
    getObj().then((res) => {
      this.temp = res.data
    })
    DeptList().then((res) => {
      this.deptoptions = res.data.list;
    })
    this.fetchDept()
    this.fetchUnit()
  },
  methods: {

    clearObj() {
      Object.keys(this.temp).forEach((key) => {
        this.temp[key] = ''
      })
      this.status = 'create'
    },
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
    deptTreeClick(obj) {
      this.status = 'update'
      this.Edit(obj.id)
    },

    Delete() {
      this.$confirm('确认删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          DeleteDept(this.temp.id).then(() => {
            this.fetchDept()
          })
        })
    },
    Edit(id) {
      GetDeptDetail(id).then((response) => {
        this.temp = response.data;
      });
    },
    save() {
      if (this.status === 'create') {
        AddDept(this.temp).then(() => {
          this.fetchDept();
        })
      } else {
        UpdateDept(this.temp).then(() => {
          this.fetchDept();
        })
      }
    },
  },
};

</script>

<style scope>
.tree{
  max-height:400px;
  overflow: auto;
}
.dialog-footer{
  text-align: center;
}
</style>
