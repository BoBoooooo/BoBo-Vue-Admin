<!--
@file 部门数据权限的对话框
@author BoBo
@copyright NanJing Anshare Tech .Com
@createDate 2019年3月29日18:02:33
-->
<template>
  <!-- 对话框 -->
  <el-dialog v-if="dialog.visible"
             ref="dialog"
             :title="dialogTitle"
             :visible.sync="dialog.visible"
             width="50%">
    <!-- 对话框内动态表单 -->
    <GenerateForm ref="generateForm"
                  :value="formValues"
                  :data="formDesign"
                  :remote="remoteFuncs"/>
    <!-- <span class="label">单位数据权限</span> -->
    <!-- 管辖单位 -->
    <!-- <el-tree ref="unitTree"
             class="unitTree"
             :data="unitTree.data"
             :props="unitTree.mapping"
             :node-key="unitTree.mapping.nodeKey"
             :default-expanded-keys="unitTree.expandedKeys"
             auto-expand-parent
             show-checkbox
             highlight-current /> -->
    <el-row type="flex"
            justify="end">
      <el-button type="primary"
                 icon="el-icon-check"
                 :loading="btnSaveIsLoading"
                 @click="btnSaveOnClick">保存</el-button>
      <el-button icon="el-icon-close"
                 @click="btnCancelOnClick">取消</el-button>
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
  name: 'DeptDialog',
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
      // 对话框内文本框们填写的值
      formValues: {},
      // 对话框设计结构json
      formDesign: {},
      // 保存按钮Loading状态
      btnSaveIsLoading: false,
      // 加载用户
      remoteFuncs: {
        funcGetUserByName(resolve) {
          // 根据输入的用户名模糊查询
          crud(DML.SELECT, 'users').then((res) => {
            const options = res.data.list.map(item => ({
              label: item.realname,
              value: item.id,
              rightLabel: item.username,
            }));
            resolve(options);
          });
        },
        funcGetUsersList(resolve) {
          // 根据输入的用户名模糊查询
          crud(DML.SELECT, 'users').then((res) => {
            const options = res.data.list;
            resolve(options);
          });
        },
        funcGetCompnayList(resolve) {
          crud(DML.SELECT, 'company').then((res) => {
            const options = res.data.list;
            resolve(options);
          });
        },
        funcGetPostList(resolve) {
          crud(DML.SELECT, 'act_task_post').then((res) => {
            const options = res.data.list;
            resolve(options);
          });
        },
        funcGetUserByNameForLoad(resolve, txt) {
          // 加载时根据id加载用户名
          crud(DML.SELECT, 'users', {
            searchCondition: [{
              field: 'id',
              operator: 'eq',
              value: txt,
            }],
          }).then((res) => {
            const options = res.data.list.map(item => ({
              label: item.realname,
              value: item.id,
              rightLabel: item.username,
            }));
            resolve(options);
          });
        },
      },
    };
  },
  computed: {
    // 对话框标题
    dialogTitle() {
      return this.dialog.status === STATUS.CREATE
        ? this.textMap.add
        : this.textMap.edit;
    },
  },
  methods: {
    /**
     * 显示对话框，父元素调用
     *
     * @param {Object} param 对话框保存时的参数
     * @param {Number} status 对话框状态[添加:0,编辑:1]，必须是STATUS枚举
     * @param {Object} formValues 编辑时传入所有字段的默认值
     */
    async showDialog(param = {}, status = STATUS.CREATE, formValues = {}) {
      // 保存参数用于save方法
      this.dialog.params = param;
      this.dialog.status = status;
      // 请求对话框内的动态表单json
      const res = await getFormDetail('dept');
      this.formDesign = JSON.parse(res.data.formJson);
      if (this.dialog.status === STATUS.UPDATE) {
        // 填写编辑框
        this.formValues = { ...formValues };
      } else {
        this.formValues = {
          ...param,
        };
      }
      this.dialog.visible = true;
    },
    // 保存按钮点击
    async btnSaveOnClick() {
      try {
        this.btnSaveIsLoading = true;
        // 验证表单数据和获取表单数据
        const formValues = await this.$refs.generateForm.getData();
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
        delete formValues.children;
        await crud(type, 'dept', {
          ...this.dialog.params,
          ...formValues,
        });
        this.$message({
          type: 'success',
          message: msg,
        });
        this.$emit('afterSave', {
          status: this.dialog.status,
          dialogParams: this.dialog.params,
        });
        this.dialog.visible = false;
      } catch (error) {
        this.$message({
          type: 'error',
          message: '保存失败',
        });
      } finally {
        this.btnSaveIsLoading = false;
      }
    },
    // 取消按钮点击
    btnCancelOnClick() {
      this.dialog.visible = false;
      this.$emit('cancel');
    },
  },
};
</script>

<style scoped>
.label {
  font-weight: 700;
}
.unitTree {
  margin: -1.1em 0 1em 7em;
  border: 1px solid #dcdfe6;
  border-radius: 3px;
}
</style>
