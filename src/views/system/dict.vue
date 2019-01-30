<template>
  <div
    id="dicttype"
    class="widget-box">


<el-row>
  <el-col :span="8">
     <el-tree
            ref="dicttypetree"
            :data="dicttypeList"
            :props="defaultProps"
            node-key="id"
            highlight-current
              :default-expanded-keys="['00000000-0000-0000-0000-000000000000']"
            @node-click="dicttypeTreeClick"
            />
  </el-col>
    <el-col :span="16">
         <el-form
        :model="temp"
        class="small-space"
        label-position="left"
        label-width="70px">
             <el-form-item label="名称">
          <el-input
            v-model="temp.name"
            class="filter-item"
            placeholder="请输入名称"/>
        </el-form-item>
  <el-form-item label="上级">
          <el-select
            v-model="temp.parentid"
            placeholder="请选择"
            filterable>
            <el-option
              v-for="item in dicttypeoptions"
              :key="item.id"

              :label="item.name"
              :value="item.id"/>
          </el-select>

        </el-form-item>

        <el-form-item label="排序码">
          <el-input
            v-model="temp.rank"
            class="filter-item"
            placeholder="请输入排序码"/>
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
  GetDictTypeTree,
  DeleteDictType,
  DictTypeList,
  GetDictTypeDetail,
  AddDictType,
  UpdateDictType,
} from '@/api/system/dicttype';
import {
  GetDictTree,
  DeleteDict,
  DictList,
  GetDictDetail,
  AddDict,
  UpdateDict,
  getObj,
} from '@/api/system/dict';

export default {
  name: 'Dict',
  data() {
    return {
      dicttypeoptions: [],
      status: 'create',
      dicttypeList: null,
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
    DictTypeList().then((res) => {
      this.dicttypeoptions = res.data.list;
    })
    this.fetchDictType()
  },
  methods: {

    clearObj() {
      Object.keys(this.temp).forEach((key) => {
        this.temp[key] = ''
      })
      this.status = 'create'
    },
    fetchDictType() {
      GetDictTypeTree().then((response) => {
        this.dicttypeList = response.data;
      });
    },
    dicttypeTreeClick(obj) {
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
          DeleteDictType(this.temp.id).then(() => {
            this.fetchDictType()
          })
        })
    },
    Edit(id) {
      GetDictTypeDetail(id).then((response) => {
        this.temp = response.data;
      });
    },
    save() {
      if (this.status === 'create') {
        AddDictType(this.temp).then(() => {
          this.fetchDictType();
        })
      } else {
        UpdateDictType(this.temp).then(() => {
          this.fetchDictType();
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
