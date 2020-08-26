<!--
 * @file: 用户属性对话框
 * @copyright: NanJing Anshare Tech .Com
 * @author: BoBo
 * @Date: 2019-07-09 14:30:43
 -->
<template>
  <!-- 对话框 -->
  <el-dialog v-if="dialog.visible"
             ref="dialog"
             :title="dialogTitle"
             :visible.sync="dialog.visible"
             width="70%">
    <!-- 对话框内动态表单 -->
    <GenerateForm ref="generateDialogForm"
                  :value="formValues"
                  :data="formDesign"
                  :remote="remoteFuncs" />
    <!-- <el-form size="small"
             label-position="right"
             label-width="100px">
      <el-form-item label="部门数据权限">
        <el-tree ref="deptTree"
                 class="tree"
                 :data="deptTree.data"
                 :props="deptTree.mapping"
                 :node-key="deptTree.mapping.nodeKey"
                 auto-expand-parent
                 show-checkbox
                 highlight-current
                 :default-expanded-keys="unitTree.expandedKeys"/>
      </el-form-item>
      <el-form-item label="单位数据权限">
        <el-tree ref="unitTree"
                 class="tree"
                 :data="unitTree.data"
                 :props="unitTree.mapping"
                 :node-key="unitTree.mapping.nodeKey"
                 auto-expand-parent
                 show-checkbox
                 highlight-current
                 :default-expanded-keys="unitTree.expandedKeys" />
      </el-form-item>
    </el-form> -->
    <el-row type="flex"
            justify="end">
      <el-button type="danger"
                 v-if="Locked"
                 icon="el-icon-unlock"
                 @click="btnUnLock_onClick()">解锁账号</el-button>
      <el-button type="primary"
                 icon="el-icon-check"
                 @click="btnSave_onClick()">保存</el-button>
      <el-button icon="el-icon-close"
                 @click="btnCancel_onClick()">取消</el-button>
    </el-row>
  </el-dialog>
</template>

<script>
import { DML, crud } from '@/api/public/crud';
import { getFormDetail } from '@/api/system/form';
import GenerateForm from '@/components/FormDesigner/GenerateForm.vue';

const STATUS = {
  CREATE: 0,
  UPDATE: 1,
};

export default {
  name: 'UserDialog',
  components: {
    GenerateForm,
  },
  props: {
    // 对话框标题
    textMap: {
      type: Object,
      default: () => ({
        add: '添加',
        edit: '编辑',
      }),
    },
    // 表格参数
    tableParams: {
      type: [Object, Array],
      default: () => ({}),
    },
    // 远程数据方法
    remoteFuncs: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      // 对话框
      dialog: {
        // 对话框状态
        status: null,
        // 对话框参数，用于编辑时暂存id
        params: {},
        // 对话框是否显示
        visible: false,
      },
      // 对话框内文本框们填写的值
      formValues: {},
      // 对话框设计结构json
      formDesign: {},
      // 部门树
      deptTree: {
        // 单位树数据源
        data: [],
        // 单位树数据源属性映射关系
        mapping: {
          children: 'children',
          label: 'name',
          nodeKey: 'id',
        },
        // 根节点id
        rootId: 0,
        // 根节点parentid
        rootParentid: 0,
        // 默认展开的节点
        expandedKeys: [],
      },
      // 单位树
      unitTree: {
        // 单位树数据源
        data: [],
        // 单位树数据源属性映射关系
        mapping: {
          children: 'children',
          label: 'name',
          nodeKey: 'id',
        },
        // 根节点id
        rootId: 0,
        // 根节点parentid
        rootParentid: 0,
        // 默认展开的节点
        expandedKeys: [],
      },
    };
  },
  computed: {
    // 对话框标题
    dialogTitle() {
      return this.dialog.status === STATUS.CREATE
        ? this.textMap.add
        : `账号状态: ${this.Locked ? '已锁定' : '正常'}`;
    },
    // 是否已锁定,包含登录失败的锁定以及用户管理员手动冻结账号
    Locked() {
      return +this.formValues.logincount === 5;
    },
  },
  created() {
    // this.loadTree();
  },
  methods: {
    /**
     * 显示对话框，父元素调用
     *
     * @param {Object} param 对话框保存时的参数
     * @param {Number} status 对话框状态[添加:0,编辑:1]，必须是STATUS枚举
     * @param {Object} formValues 编辑时传入所有字段的默认值
     */
    showDialog(param = {}, status = STATUS.CREATE, formValues = {}) {
      // 保存参数用于save方法
      this.dialog.params = param;
      this.dialog.status = status;
      // 请求对话框内的动态表单json
      getFormDetail('users').then((res) => {
        this.formDesign = JSON.parse(res.data.formJson);
        this.dialog.visible = true;
        this.formValues = { ...formValues };
      });
    },
    // 请求部门和单位树
    loadTree() {
      crud(DML.TREE, 'dept').then((res) => {
        this.deptTree.data = res.data;
        this.deptTree.rootId = res.data[0].id;
        this.deptTree.rootParentid = res.data[0].rootParentid;
        if (this.deptTree.expandedKeys.length === 0) {
          this.deptTree.expandedKeys = [this.deptTree.rootId];
        }
      });
      crud(DML.TREE, 'unit').then((res) => {
        this.unitTree.data = res.data;
        this.unitTree.rootId = res.data[0].id;
        this.unitTree.rootParentid = res.data[0].rootParentid;
        if (this.unitTree.expandedKeys.length === 0) {
          this.unitTree.expandedKeys = [this.unitTree.rootId];
        }
      });
    },
    // 保存按钮点击
    btnSave_onClick() {
      // 调用此方法验证表单数据和获取表单数据
      this.$refs.generateDialogForm
        .getData()
        .then((formValue) => {
          let type;
          let msg;
          // 根据对话框状态判断保存或编辑
          if (this.dialog.status === STATUS.CREATE) {
            type = DML.INSERT;
            msg = '添加成功';
          } else {
            type = DML.UPDATE;
            msg = '编辑成功';
          }
          const opt = {
            ...this.tableParams,
            ...formValue,
            ...this.dialog.params,
          };
          // opt.userdeptpermission = this.$refs.deptTree.getCheckedKeys().join(',');
          // opt.unituserpermission = this.$refs.unitTree.getCheckedKeys().join(',');

          crud(type, 'users', opt).then((res) => {
            if (res.code === 200) {
              this.dialog.visible = false;
              this.$message({
                type: 'success',
                message: msg,
              });
              this.$emit('afterSave', {
                status: this.dialog.status,
                dialogParams: this.dialog.params,
              });
            }
          });
        })
        .catch(() => {
          // 数据校验失败
        });
    },
    // 取消按钮点击
    btnCancel_onClick() {
      this.dialog.visible = false;
      this.$emit('cancel');
    },
    // 解锁按钮
    btnUnLock_onClick() {
      this.$refs.generateDialogForm
        .getData()
        .then((formValue) => {
          formValue.logincount = '0';
          formValue.password = '123';
          const opt = {
            ...this.tableParams,
            ...formValue,
            ...this.dialog.params,
          };
          // opt.userdeptpermission = this.$refs.deptTree.getCheckedKeys().join(',');
          // opt.unituserpermission = this.$refs.unitTree.getCheckedKeys().join(',');
          crud(DML.UPDATE, 'users', opt).then(() => {
            this.dialog.visible = false;
            this.$message({
              type: 'success',
              message: '解锁成功',
            });
            this.$emit('afterSave', {
              status: this.dialog.status,
              dialogParams: this.dialog.params,
            });
          });
        });
    },
  },
};
</script>

<style scoped>
.tree {
  border: 1px solid #dcdfe6;
  border-radius: 3px;
}
</style>
