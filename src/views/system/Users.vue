<!--
@file 用户管理
@author BoBo
@copyright NanJing Anshare Tech .Com
@createDate 2018年12月1日22:07:03
-->
<template>
  <div class="page-container">
    <el-row :gutter="15"
            class="full-height">
      <el-col :span="4"
              class="full-height">
        <div class="full-height"
             style="overflow:auto">
          <el-input placeholder="请输入查询内容"
                    v-model="filterText"
                    size="small"
                    prefix-icon="el-icon-search"> </el-input>
          <!-- 部门树 -->
          <el-tree v-loading="loading"
                   class="deptTree"
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
            <template v-slot="{ node }">
              <span class="custom-tree-node">
                <div style="float:left">
                  <i v-if="node.isLeaf"
                     class="el-icon el-icon-user-solid"></i>
                  <i v-else
                     class="el-icon el-icon-s-home"></i>
                  <span>{{ node.label }}</span>
                </div>
              </span>
            </template>

          </el-tree>
        </div>
      </el-col>
      <el-col :span="20">
        <CrudTable ref="table"
                   table-name="users"
                   :tableTitle="tableTitle"
                   orderCondition="timestamp desc"
                   :remoteFuncs="remoteFuncs"
                   fullHeight
                   :prefill="tableParams"
                   :actionColumnWidth="300"
                   :tableParams="tableParams"
                   :visibleList="{
                      tableTitle: true,
                      btnDel:true,
                    }">
          <template #columnFormatter="{row,prop}">
            <!-- 头像上传 -->
            <template v-if="prop === 'photo'">
              <el-upload class="avatar-uploader"
                         :action="uploadUrl"
                         :show-file-list="false"
                         :headers="{ Authorization: getToken }"
                         :data="{
                           userid:userid
                         }"
                         :on-success="handleAvatarSuccess"
                         :before-upload="beforeAvatarUpload">
                <img v-if="row.photo"
                     :src="row.photo"
                     class="avatar"
                     @click="userid = row.id">
                <i v-else
                   class="el-icon el-icon-plus avatar-uploader-icon"
                   @click="userid = row.id"></i>

              </el-upload>
            </template>
          </template>
          <template #btnCustom="{row}">
            <el-button icon="el-icon-edit-outline"
                       type="warning"
                       size="mini"
                       @click="resetPassword(row)">重置密码</el-button>
          </template>
        </CrudTable>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { DML, crud } from '@/api/public/crud';
import { mapGetters } from 'vuex';

export default {
  name: 'Users',

  created() {
    this.loadDeptTree();
  },
  computed: {
    getToken() {
      return this.$store.getters.token;
    },
    uploadUrl() {
      return `${process.env.VUE_APP_API_URL}users/uploadImage`;
    },
    ...mapGetters(['config']),
  },
  data() {
    return {
      imageUrl: '',
      // loading
      loading: false,
      // 搜索text
      tableTitle: '',
      filterText: '',
      userid: '',
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
            const options = res.data.list.map((item) => ({
              label: item.roleName,
              value: item.id,
            }));
            resolve(options);
          });
        },
        // 请求部门tree
        funcGetDeptTree: (resolve) => {
          // 此处暂时写死 admin权限的账号可以看到全部部门
          crud(DML.TREE, 'dept').then((res) => {
            resolve(res.data);
          });
        },
      },
    };
  },
  methods: {
    handleAvatarSuccess() {
      this.$refs.table.tableReload();
    },
    beforeAvatarUpload(file) {
      const isJPG = 'image/jpeg,image/png'.includes(file.type);
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传图片只能是 JPG/PNG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    resetPassword(user) {
      const { initialPassword } = this.config;
      this.$confirm(`确认重置到初始密码${initialPassword}`, '提示', {
        confirmButtonText: '重置',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          const data = { ...user };
          data.password = initialPassword;
          crud(DML.UPDATE, 'users', data).then((res) => {
            if (res.code === 200) {
              this.$message('重置成功');
              this.$refs.table.tableReload();
            }
          });
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消重置',
          });
        });
    },

    // 请求部门树
    loadDeptTree() {
      this.loading = true;
      crud(DML.TREE, 'dept').then((res) => {
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

    dialogOnClose() {
      this.$refs.table.tableReload();
    },
    filterNode(value, data) {
      if (!value) return true;
      return this.$pinyinmatch.match(data.name, value);
    },
    nodeClick(data) {
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
.avatar-uploader {
  /deep/.el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    display: block;
    width: 39px;
    height: 39px;
    margin: 0 auto;
    position: relative;
    overflow: hidden;
    &:hover {
      border-color: #409eff;
    }
  }
}
.avatar-uploader-icon {
  font-size: 22px;
  color: #8c939d;
  width: 39px;
  height: 39px;
  line-height: 39px;
  text-align: center;
}
.avatar {
  width: 39px;
  height: 39px;
  display: block;
}
</style>
