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
            @node-click="treeClick"
            >
             <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{ node.label }}</span>
        <span style="margin-left:8 px">
          <el-button
            type="text"
            size="mini"
               @click="() => append(data)">
                  添加
          </el-button>
            <el-button
            type="text"
            size="mini"
            @click="() => Edit(data.id)">
            修改
          </el-button>
          <el-button
            type="text"
            size="mini"
            @click="() => remove(data)">
            删除
          </el-button>
        </span>
      </span>
            </el-tree>
  </el-col>
    <el-col :span="16">
<crud-table tableName="dict" :asyncCondition="asyncCondition" class="no-boxshadow no-padding-top" toolbarButton="add,clear" handleButton="edit,delete"></crud-table>

    </el-col>

</el-row>

 <el-dialog
      :title="textMap[dialogStatus]"
      :visible.sync="dialogFormVisible"
      width="80%">

   <el-form ref="form" :model="entity" label-width="80px">
  <el-form-item label="类目名">
    <el-input v-model="entity.name"></el-input>
  </el-form-item>

<el-form-item label="排序码">
    <el-input-number v-model="entity.sort"></el-input-number>
  </el-form-item>


</el-form>

      <div
        slot="footer"
        class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button
          v-if="dialogStatus=='create'"
          type="primary"
          @click="save">新 增</el-button>
        <el-button
          v-else
          type="primary"
          @click="save">修 改</el-button>
      </div>
    </el-dialog>

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
      dialogFormVisible: false,
      textMap: {
        update: '编辑',
        create: '新增',
      },
      status: 'create',
      dicttypeList: null,
      entity: {
        id: '',
        name: '',
        sort: '',
        pid: '',
      },
      asyncCondition: {
        searchKey: '',
        searchValue: '',
      },
      dialogStatus: '',
      defaultProps: {
        children: 'children',
        label: 'nodeName',
      },

    };
  },

  created() {
    DictTypeList().then((res) => {
      this.dicttypeoptions = res.data.list;
    });
    this.fetchDictType();
  },
  methods: {

    append(data) {
      this.dialogStatus = 'create';
      this.clearObj();
      this.entity.pid = data.id;
      this.dialogFormVisible = true;
    },
    remove(data) {
      this.$confirm('确认删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          DeleteDictType(data.id).then(() => {
            this.dialogFormVisible = false;
            this.fetchDictType()
          });
        });
    },

    clearObj() {
      Object.keys(this.entity).forEach((key) => {
        this.entity[key] = '';
      });
      this.status = 'create';
    },
    fetchDictType() {
      GetDictTypeTree().then((response) => {
        this.dicttypeList = response.data;
      });
    },

    treeClick(data) {
      console.log(data)
      this.asyncCondition.searchKey = 'dictid'
      this.asyncCondition.searchValue = data.id
    },
    Edit(id) {
      GetDictTypeDetail(id).then((response) => {
        this.entity = response.data;
        this.status = 'update';
        this.dialogFormVisible = true;
      });
    },
    save() {
      if (this.status === 'create') {
        AddDictType(this.entity).then(() => {
          this.fetchDictType();
          this.dialogFormVisible = false;
        });
      } else {
        UpdateDictType(this.entity).then(() => {
          this.fetchDictType();
          this.dialogFormVisible = false;
        });
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
