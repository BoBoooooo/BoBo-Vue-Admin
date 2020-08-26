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
      <el-col :span="6"
              class="full-height">
        <el-input placeholder="请输入查询内容"
                  v-model="filterText"
                  prefix-icon="el-icon-search"></el-input>
        <el-tree ref="dicttypetree"
                 class="full-height tree"
                 :data="typeList"
                 draggable
                 @node-drop="afterDropDown"
                 :props="defaultProps"
                 :filterNodeMethod="filterNode"
                 :allow-drag="node=> node.data.parentid !== '0'"
                 node-key="id"
                 highlight-current
                 :default-expanded-keys="['fe980574-2552-4754-88c8-366eb5a22861']"
                 @node-click="treeClick">
          <span class="custom-tree-node"
                slot-scope="{ node, data }">
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
                         v-if="data.parentid!=='0'"
                         @click="() => remove(data)">
                删除
              </el-button>
            </span>
          </span>
        </el-tree>
      </el-col>
      <el-col :span="18">
        <CrudTable tableName="ad_codelist"
                   ref="codeListTable"
                   full-height
                   :maxHeightMinus="245"
                   :prefill="tableParams"
                   :tableParams="tableParams"
                   :remoteFuncs="remoteFuncs"
                   :visibleList="{
                 tableTitle:false,
                 btnDel:true,
               }">
          <template #btnBarPrevBtn>
            <el-button v-if="codeTypeId"
                       type="primary"
                       size="mini"
                       icon="el-icon-plus"
                       style="margin-left: 10px"
                       @click="multiAddDict()">批量添加</el-button>
          </template>
        </CrudTable>
      </el-col>

    </el-row>
    <el-dialog :title="textMap[dialogStatus]"
               :visible.sync="dialogFormVisible"
               width="80%">

      <el-form ref="form"
               :model="entity"
               label-width="80px">
        <el-form-item label="类目名">
          <el-input v-model="entity.codename"></el-input>
        </el-form-item>
        <el-form-item label="排序码">
          <el-input-number v-model="entity.codeorder"></el-input-number>
        </el-form-item>
        <el-form-item label="备注">
          <el-input type="textarea"
                    v-model="entity.remark"></el-input>
        </el-form-item>

      </el-form>

      <div slot="footer"
           class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button v-if="dialogStatus=== 0 "
                   type="primary"
                   @click="save">新 增</el-button>
        <el-button v-else
                   type="primary"
                   @click="save">修 改</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { DML, crud } from '@/api/public/crud';

const STATUS = {
  CREATE: 0,
  UPDATE: 1,
  DETAIL: 2,
};
export default {
  name: 'Dict',
  created() {
    this.fetchDictType();
  },
  data() {
    return {
      // 搜索text
      filterText: '',
      typeList: [],
      dialogFormVisible: false,
      dialogStatus: 0,
      defaultProps: {
        children: 'children',
        label: 'codename',
      },
      textMap: {
        1: '编辑',
        0: '新增',
      },
      entity: {
        id: '',
        codename: '',
        codevalue: '',
        parentid: '',
        codeorder: 0,
        remark: '',
      },
      tableParams: {},
      // 当前节点，字典类型的id
      codeTypeId: '',
      remoteFuncs: {
        getDictType(resolve) {
          // 请求字典分类
          crud(DML.SELECT, 'ad_codelist_type').then((res) => {
            const options = res.data.list.map(item => ({
              label: item.codename,
              value: item.id,
            }));
            resolve(options);
          });
        },
      },
    };
  },
  methods: {
    afterDropDown(node, end, position, event) {
      if (position === 'inner') {
        const obj = node.data;
        obj.parentid = end.data.id;
        crud(DML.UPDATE, 'ad_codelist_type', obj).then((res) => {
          this.$message.success('操作成功');
          this.fetchDictType();
        });
      } else if (position === 'before') {
        const obj = node.data;
        obj.codeorder = Number(end.data.codeorder) - 1;
        crud(DML.UPDATE, 'ad_codelist_type', obj).then((res) => {
          this.$message.success('操作成功');
          this.fetchDictType();
        });
      } else if (position === 'after') {
        const obj = node.data;
        obj.codeorder = Number(end.data.codeorder) + 1;
        crud(DML.UPDATE, 'ad_codelist_type', obj).then((res) => {
          this.$message.success('操作成功');
          this.fetchDictType();
        });
      }
    },
    remove(data) {
      this.$confirm('确认删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        crud(DML.DELETE, 'ad_codelist_type', { id: data.id }).then(() => {
          this.dialogFormVisible = false;
          this.fetchDictType();
        });
      });
    },
    save() {
      this.entity.codevalue = this.entity.codename;
      if (this.dialogStatus === STATUS.CREATE) {
        crud(DML.INSERT, 'ad_codelist_type', this.entity).then((res) => {
          this.fetchDictType();
          this.dialogFormVisible = false;
        });
      } else {
        crud(DML.UPDATE, 'ad_codelist_type', this.entity).then((res) => {
          this.fetchDictType();
          this.dialogFormVisible = false;
        });
      }
    },
    fetchDictType() {
      crud(DML.TREE, 'ad_codelist_type').then((response) => {
        this.typeList = response.data;
      });
    },
    add(data) {
      this.dialogFormVisible = true;
      Object.keys(this.entity).forEach((key) => {
        this.entity[key] = '';
      });
      this.entity.parentid = data.id;
      this.dialogStatus = STATUS.CREATE;
    },
    edit(data) {
      this.dialogFormVisible = true;
      this.entity = { ...data };
      this.dialogStatus = STATUS.UPDATE;
    },
    treeClick(data) {
      if (data.parentid === '0') {
        delete this.tableParams.codetype;
      } else {
        this.codeTypeId = data.id || '';
        this.tableParams.codetype = data.codevalue;
      }
      this.$refs.codeListTable.tableReload();
    },
    // 树节点过滤
    filterNode(value, data, node) {
      if (!value) return true;
      return this.$pinyinmatch.match(data.codename, value);
    },
    // 批量添加字典值
    multiAddDict() {
      this.$prompt('请输入需要添加的字典值，\n多个值请用 “、” 分割', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^[a-zA-Z 0-9 、\u4e00-\u9fa5]+$/,
        inputErrorMessage: '多个值请使用顿号分割！',
      })
        .then(({ value }) => {
          this.axios({
            url: 'ad/codelist/batchAdd',
            method: 'post',
            data: {
              codeTypeId: this.codeTypeId,
              codeValues: value,
            },
          }).then((res) => {
            if (res.code === 200) {
              this.$message({
                type: 'success',
                message: '添加成功！',
              });
              this.$refs.codeListTable.tableReload();
            } else {
              this.$message({
                type: 'error',
                message: '添加失败！',
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '字典值录入取消',
          });
        });
    },
  },
  watch: {
    filterText(val) {
      this.$refs.dicttypetree.filter(val);
    },
  },
};
</script>
<style lang="scss" scoped>
.tree {
  overflow: auto;
}
</style>
