<!--
@file 用户管理
@author BoBo
@copyright NanJing Anshare Tech .Com
@createDate 2018年12月1日22:07:03
-->
<template>
  <div class="page-container">
     <el-row :gutter="15" class="full-height">
      <el-col :span="4" class="full-height">
        <div class="full-height">
          <el-input placeholder="请输入查询内容"
                    v-model="filterText"
                    prefix-icon="el-icon-search"> </el-input>
          <!-- 部门树 -->
          <el-tree v-loading="loading"
                   class="deptTree"
                   style="height:calc(100% - 50px);overflow:auto"
                   ref="deptTree"
                   highlight-current
                   accordion
                   :data="deptTree.data"
                   @node-click="nodeClick"
                   :filter-node-method="filterNode"
                   check-strictly
                   :props="deptTree.mapping"
                   :node-key="deptTree.mapping.nodeKey"
                   :default-expanded-keys="deptTree.expandedKeys">
            <span class="custom-tree-node"
                  slot-scope="{ node }">
              <div style="float:left">
                <i v-if="node.isLeaf"
                   class="el-icon el-icon-user-solid"></i>
                <i v-else
                   class="el-icon el-icon-s-home"></i>
                <span>{{ node.label }}</span>
              </div>
            </span>
          </el-tree>
        </div>
      </el-col>
      <el-col :span="20">
        <CrudTable ref="table"
                   table-name="users"
                   :tableTitle="tableTitle"
                   :btnAddOnClick="btnAddOnClick"
                   :btnEditOnClick="btnEditOnClick"
                   :remoteFuncs="remoteFuncs"
                   :promiseForSelect="promiseForSelect"
                   full-height
                   :tableParams="tableParams"
                   :visibleList="{
            tableTitle: true,
            btnAdd:false,
            btnDel:true,
            actionColumnBtnDel:false
          }">
          <template #columnFormatter="{prop,row}">
            <template v-if="prop === 'logincount'">
              <span v-if="row.logincount === '5'"
                    style="color:red">锁定</span>
              <span v-else
                    style="color:green">正常</span>
            </template>
            <!-- 头像上传 -->
            <template v-if="prop === 'avatar'">
              <img v-if="row.photo"
                   :src="row.photo"
                   class="avatar" />
            </template>
            <!-- 签名上传 -->
            <template v-if="prop === 'signature'">
              <img v-if="row.signature"
                   :src="row.signature"
                   class="avatar" />
            </template>
          </template>
        </CrudTable>
      </el-col>
    </el-row>
    <!-- 用户编辑对话框 -->
    <AuthDialog ref="dialog"
                :remoteFuncs="remoteFuncs"
                @afterSave="dialogOnClose" />
  </div>
</template>

<script>
import { DML, crud } from '@/api/public/crud';
import AuthDialog from './components/AuthDialog.vue';

export default {
  name: 'Auth',
  components: {
    AuthDialog,
  },
  created() {
    this.loadDeptTree();
  },
  data() {
    return {
      // loading
      loading: false,
      // 搜索text
      tableTitle: '',
      filterText: '',
      tableParams: {},
      // 部门树
      deptTree: {
        // 部门树数据源
        data: [],
        // 部门树数据源属性映射关系
        mapping: {
          children: 'children',
          label: 'name',
          nodeKey: 'id',
          isLeaf: 'leaf',
          disabled: 'parentid',
        },
        // 根节点id
        rootId: '-1',
        // 根节点parentid
        rootParentid: 0,
        // 默认展开的节点
        expandedKeys: ['-1'],
      },
      remoteFuncs: {
        // 请求角色
        funcGetRole(resolve) {
          crud(DML.SELECT, 'role').then((res) => {
            const options = res.data.list.map(item => ({
              label: item.rolename,
              value: item.id,
            }));
            resolve(options);
          });
        },
        // 请求部门tree
        funcGetDeptTree(resolve) {
          crud(DML.TREE, 'dept').then((res) => {
            resolve(res.data);
          });
        },
      },
    };
  },
  methods: {
    promiseForSelect(data) {
      return crud(DML.SELECT, 'users', data, {
        type: this.$store.getters.isAdmin ? null : '1',
      });
    },
    btnAddOnClick() {
      this.$refs.dialog.showDialog();
    },
    // 请求部门树
    loadDeptTree(data) {
      this.loading = true;
      crud(
        DML.TREE,
        'dept',
        {},
        {
          type: this.$store.getters.isAdmin ? null : '1',
        },
      ).then((res) => {
        this.deptTree.data = [
          {
            name: '全部',
            id: '-1',
            children: res.data,
          },
        ];

        this.loading = false;
        this.deptTree.expandedKeys.push(this.deptTree.rootId);
      });
    },
    btnEditOnClick(row) {
      this.$refs.dialog.showDialog({ id: row.id }, 1, row);
    },
    dialogOnClose() {
      this.$refs.table.tableReload();
    },
    filterNode(value, data, node) {
      if (!value) return true;
      return this.$pinyinmatch.match(data.name, value);
    },
    nodeClick(data, node) {
      if (data.id === this.deptTree.rootId) {
        delete this.tableParams.deptid;
      } else {
        this.tableParams.deptid = data.id;
      }
      this.tableTitle = data.name;
      this.$refs.table.tableReload();
    },
  },
  watch: {
    filterText(val) {
      this.$refs.deptTree.filter(val);
    },
  },
};
</script>
<style lang="scss" scoped>
.avatar {
  width: 39px;
  height: 39px;
}
</style>
