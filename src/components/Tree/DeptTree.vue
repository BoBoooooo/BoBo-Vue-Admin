<!--
 * @file: 部门树结构
 * @copyright: BoBo
 * @author: BoBo
 * @Date: 2019-04-08 09:52:18
 -->

<template>
  <div>
    <el-input size="mini" placeholder="请输入查询内容" v-model="filterText" prefix-icon="el-icon-search"> </el-input>
    <!-- 部门树 -->
    <el-tree
      v-loading="loading"
      class="deptTree"
      ref="deptTree"
      highlight-current
      accordion
      :data="deptTree.data"
      :show-checkbox="isMultiple"
      @node-click="nodeClick"
      :filterNodeMethod="filterNode"
      check-on-click-node
      @check="deptTreeNodeCheck"
      :props="deptTree.mapping"
      :node-key="deptTree.mapping.nodeKey"
      :default-expanded-keys="deptTree.expandedKeys"
    >
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <div style="float: left">
          <i v-if="!data.parentid" style="color: #3f51b5" class="el-icon el-icon-user-solid"></i>
          <i v-else class="el-icon el-icon-s-home" style="color: #ff5722"></i>
          <span>{{ node.label }}</span>
        </div>
      </span>
    </el-tree>
  </div>
</template>

<script>
export default {
  name: 'DeptTree',
  data() {
    return {
      // loading
      loading: false,
      // 搜索text
      filterText: '',
      // 部门树
      deptTree: {
        // 部门树数据源
        data: [],
        // 部门树数据源属性映射关系
        mapping: {
          children: 'children',
          label: 'label',
          nodeKey: 'id',
          isLeaf: 'leaf',
          disabled: 'parentid',
        },
        // 根节点id
        rootId: 0,
        // 根节点parentid
        rootParentid: 0,
        // 默认展开的节点
        expandedKeys: ['2f8447de-5732-4fa4-8286-9a71b41dd1e7'],
      },
    };
  },
  props: {
    isMultiple: {
      type: Boolean,
      default: false,
    },
    buttonEntity: {
      type: Object,
      default: () => ({}),
    },
  },
  created() {
    const { selectDeptList } = this.buttonEntity;
    this.loadDeptTree(selectDeptList);
  },
  watch: {
    filterText(val) {
      this.$refs.deptTree.filter(val);
    },
  },
  methods: {
    // 请求部门树
    loadDeptTree(data) {
      this.loading = true;
      this.axios({
        url: '/dept/treeDeptUsers',
        method: 'post',
        data,
      }).then((res) => {
        this.deptTree.data = res.data;
        this.deptTree.rootId = res.data[0].id;
        this.loading = false;
      });
    },
    // 树节点过滤
    filterNode(value, data, node) {
      if (!value) return true;
      if (this.$pinyinmatch.match(data.label, value)) {
        return true;
      }
      const tmpArray = [];
      this.getReturnNode(node, tmpArray, value);
      let result = false;
      tmpArray.forEach((item) => {
        result = result || item;
      });
      return result;
    },
    // 获取匹配的节点
    getReturnNode(node, array, value) {
      let isPass = node.data && node.data.label && (node.data.label.indexOf(value) !== -1 || this.$pinyinmatch.match(node.data.label, value));
      isPass = isPass ? array.push(isPass) : '';
      this.index += 1;
      if (!isPass && node.level !== 1 && node.parent) {
        this.getReturnNode(node.parent, array, value);
      }
    },
    /**
     * 部门树复选框选中
     *
     * @param {Object} deptTreeData 当前节点的数据
     */
    deptTreeNodeCheck(deptTreeData, checkedKeys) {
      if (this.isMultiple) {
        this.$emit('check', this.$refs.deptTree.getCheckedNodes(true), deptTreeData);
      }
    },
    nodeClick(data, node) {
      // 此处处理选中的结点通过鼠标点击可以再取消选中,需要判断是人员结点还是部门结点,通过disabled是否为null判断
      // 如果为null则表示为人员结点
      const currentNode = {
        id: node.key,
        label: node.label,
      };
      if (node.isLeaf && node.disabled === null) {
        // 此处需要判断是否为多选情况,单选则只set当前选中的node结点
        if (this.isMultiple) {
          let arr = this.$refs.deptTree.getCheckedNodes(true);
          if (node.checked) {
            arr = arr.filter((item) => item.id !== node.data.id);
          } else {
            arr.push(currentNode);
          }
          this.$refs.deptTree.setCheckedNodes(arr);
        } else {
          this.$refs.deptTree.setCheckedNodes([currentNode]);
        }
        this.$emit('check', {
          username: data.id,
          realname: data.label,
        });
      }
    },
  },
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.deptTree {
  max-height: 450px;
  border-radius: 3px;
  border: none;
  overflow-y: auto;
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
    color: black;
  }
}
</style>
<style scoped>
.deptTree >>> .is-disabled {
  display: none;
}
</style>
