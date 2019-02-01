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
            :default-expanded-keys="['00000000-0000-0000-0000-000000000001']"
            @node-click="dicttypeTreeClick"
            />
  </el-col>
    <el-col :span="16">
<crud-table tableName="dict" toolbarButton="add,clear,search" handleButton="edit,delete"></crud-table>

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
