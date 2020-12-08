<!--
 * @file: 重构字典模块
 * @copyright: NanJing Anshare Tech .Com
 * @author: BoBo
 * @Date: 2019年12月16日17:33:54
 -->

<template>
  <div class="full-height page-container">
    <el-row :gutter="15"
            style="height:90%">
      <el-col :span="5"
              class="full-height">
        <el-input placeholder="请输入查询内容"
                  v-model="filterText"
                  size="small"
                  prefix-icon="el-icon-search"></el-input>
        <el-tree ref="dicttypetree"
                 class="full-height tree"
                 :data="typeList"
                 draggable
                 @node-drop="afterDropDown"
                 :props="defaultProps"
                 :filterNodeMethod="filterNode"
                 :allow-drag="node=> node.data.parentId !== '0'"
                 node-key="id"
                 highlight-current
                 :default-expanded-keys="['fe980574-2552-4754-88c8-366eb5a22861']"
                 @node-click="treeClick">

          <template v-slot="{ node, data }">
            <span class="custom-tree-node">
              <span>{{ node.label }}</span>
              <span style="margin-left:8px">
                <el-button type="text"
                           size="mini"
                           @click="() => add(data)">
                  添加
                </el-button>
                <el-button type="text"
                           size="mini"
                           @click="() => edit(data)">
                  修改
                </el-button>
                <el-button type="text"
                           size="mini"
                           v-if="data.parentId!=='0'"
                           @click="() => remove(data)">
                  删除
                </el-button>
              </span>
            </span>
          </template>
        </el-tree>
      </el-col>
      <el-col :span="19">
        <CrudTable tableName="ad_codelist"
                   ref="codeListTable"
                   orderCondition="timestamp desc"
                   fullHeight
                   :prefill="tableParams"
                   :tableParams="tableParams"
                   :remoteFuncs="remoteFuncs"
                   :visibleList="{
                      btnDel:true,
                    }">
        </CrudTable>
      </el-col>

    </el-row>
    <el-dialog :title="textMap[dialogStatus]"
               v-model="dialogFormVisible"
               width="80%">

      <el-form ref="form"
               :model="entity"
               label-width="80px">
        <el-form-item label="类目名">
          <el-input v-model="entity.codeName"></el-input>
        </el-form-item>
        <el-form-item label="排序码">
          <el-input-number v-model="entity.codeOrder"></el-input-number>
        </el-form-item>
        <el-form-item label="备注">
          <el-input type="textarea"
                    v-model="entity.remark"></el-input>
        </el-form-item>

      </el-form>
      <template v-slot:footer>
        <div class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button v-if="dialogStatus=== 0 "
                     type="primary"
                     @click="save">新 增</el-button>
          <el-button v-else
                     type="primary"
                     @click="save">修 改</el-button>
        </div>
      </template>
    </el-dialog>

  </div>
</template>

<script>
import { DML, crud } from '@/api/public/crud';
import { Vue, Component, Watch } from 'vue-property-decorator';

const STATUS = {
  CREATE: 0,
  UPDATE: 1,
  DETAIL: 2,
};
@Component({
  name: 'Dict',
})
export default class Dict extends Vue {
  created() {
    this.fetchDictType();
  }

  // 搜索text
  filterText = '';

  typeList = [];

  dialogFormVisible = false;

  dialogStatus = 0;

  defaultProps = {
    children: 'children',
    label: 'typeName',
  };

  textMap = {
    1: '编辑',
    0: '新增',
  };

  entity = {
    id: '',
    codeName: '',
    codeValue: '',
    parentId: '',
    codeOrder: 0,
    remark: '',
  };

  tableParams = {};

  // 当前节点，字典类型的id
  codeTypeId = '';

  remoteFuncs = {
    getDictType(resolve) {
      // 请求字典分类
      crud(DML.SELECT, 'ad_codelist_type').then((res) => {
        const options = res.data.list.map(item => ({
          label: item.typeName,
          value: item.id,
        }));
        resolve(options);
      });
    },
  };

  afterDropDown(node, end, position) {
    if (position === 'inner') {
      const obj = node.data;
      obj.parentId = end.data.id;
      crud(DML.UPDATE, 'ad_codelist_type', obj).then(() => {
        this.$message.success('操作成功');
        this.fetchDictType();
      });
    } else if (position === 'before') {
      const obj = node.data;
      obj.codeorder = Number(end.data.codeorder) - 1;
      crud(DML.UPDATE, 'ad_codelist_type', obj).then(() => {
        this.$message.success('操作成功');
        this.fetchDictType();
      });
    } else if (position === 'after') {
      const obj = node.data;
      obj.codeorder = Number(end.data.codeorder) + 1;
      crud(DML.UPDATE, 'ad_codelist_type', obj).then(() => {
        this.$message.success('操作成功');
        this.fetchDictType();
      });
    }
  }

  remove(data) {
    this.$confirm('确认删除?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }).then(() => {
      crud(DML.DELETE, 'ad_codelist_type', {}, { id: data.id }).then(() => {
        this.dialogFormVisible = false;
        this.fetchDictType();
      });
    });
  }

  save() {
    this.entity.codeValue = this.entity.codeName;
    if (this.dialogStatus === STATUS.CREATE) {
      crud(DML.INSERT, 'ad_codelist_type', this.entity).then(() => {
        this.fetchDictType();
        this.dialogFormVisible = false;
      });
    } else {
      crud(DML.UPDATE, 'ad_codelist_type', this.entity).then(() => {
        this.fetchDictType();
        this.dialogFormVisible = false;
      });
    }
  }

  fetchDictType() {
    crud(DML.TREE, 'ad_codelist_type').then((response) => {
      this.typeList = response.data;
    });
  }

  add(data) {
    this.dialogFormVisible = true;
    Object.keys(this.entity).forEach((key) => {
      this.entity[key] = '';
    });
    this.entity.parentId = data.id;
    this.dialogStatus = STATUS.CREATE;
  }

  edit(data) {
    this.dialogFormVisible = true;
    this.entity = { ...data };
    this.dialogStatus = STATUS.UPDATE;
  }

  treeClick(data) {
    if (data.parentId === '0') {
      delete this.tableParams.codeType;
    } else {
      this.codeTypeId = data.id || '';
      this.tableParams.codeType = data.id;
    }
    this.$refs.codeListTable.tableReload();
  }

  // 树节点过滤
  filterNode(value, data) {
    if (!value) return true;
    return this.$pinyinmatch.match(data.codeName, value);
  }

  @Watch('filterText')
  filterTextChange(val) {
    this.$refs.dicttypetree.filter(val);
  }
}
</script>
<style lang="scss" scoped>
.tree {
  overflow: auto;
}
</style>
