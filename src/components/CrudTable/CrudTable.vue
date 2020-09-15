<!--
@file 用于增删改查的表格，第三层封装
      三次封装关系：el-table->BaseTable.vue->CrudTable.vue
@author BoBo
@copyright NanJing Anshare Tech .Com
@createDate 2019年07月29日14:58:39
-->
<template>
  <div class="CrudTable">
    <BaseTable ref="BaseTable"
               :url="`${tableUrl}/list`"
               :tableParams="tableParams"
               :tableTitle="tableTitle"
               :columns="tableConfig.columns"
               :showPagination="showPagination"
               :promiseForSelect="promiseForSelect"
               :expandModel="expandModel"
               :orderCondition="orderCondition"
               :visibleList="view"
               :remoteFuncs="remoteFuncs"
               :fullHeight="fullHeight"
               :height="height"
               :maxHeightMinus="maxHeightMinus"
               :rowClassName="rowClassName"
               :empty-text="emptyText"
               @done="done"
               :border="border"
               method="post"
               fit
               :rowStyle="rowStyle"
               :cellStyle="cellStyle"
               highlight-current-row
               :stripe="stripe"
               :isMultiple="isMultiple || view.btnDel"
               @selection-change="handleSelectionChange"
               :listField="listField"
               :expandRowKeys="expandRowKeys"
               :paginationLayout="paginationLayout"
               :selectableFunc="selectableFunc"
               :showColumnIndex="showColumnIndex">
      <template #bottomBtn>
        <slot name="bottomBtn"></slot>
      </template>
      <template #columnFormatter="scope">
        <slot name="columnFormatter"
              :row="scope.row"
              :prop="scope.prop" />
      </template>
      <!-- 自定义右上角前置按钮 -->
      <template #btnBarPrevBtn>
        <slot name="btnBarPrevBtn" />
        <!-- 批量删除按钮 -->
        <el-button v-if="view.btnDel"
                   @click="btnDeletesOnClick"
                   slot="bottom-btn"
                   type="primary"
                   size="mini"
                   icon="el-icon-delete">删除</el-button>
      </template>
      <template #columnHeader="scope"
                v-if="view.btnAddOnColumnHeader">
        <!-- 添加按钮 -->
        <el-button v-if="scope.slotName === 'actionColumn'"
                   icon="el-icon-plus"
                   size="mini"
                   type="primary"
                   style="color:white"
                   @click.stop="btnAdd()"></el-button>

      </template>
      <!-- 操作列 -->
      <template #actionColumn="scope">
        <!-- 操作列-添加按钮 -->
        <el-button v-if="view.actionColumnBtnAdd"
                   icon="el-icon-plus"
                   type="primary"
                   size="mini"
                   @click.stop="actionColumnAdd(scope.row)">{{text.add}}</el-button>
        <!-- 操作列-编辑按钮 -->
        <template v-if="actionColumnBtnEditVisible(scope.row)">
          <!-- 正常编辑按钮 -->
          <el-button type="success"
                     size="mini"
                     @click.stop="actionColumnEdit(scope.row)">{{text.edit}}</el-button>
        </template>
        <!-- 查看按钮 -->
        <el-button v-if="actionColumnBtnDetailVisible(scope.row)"
                   type="primary"
                   size="mini"
                   @click.stop="actionColumnDetail(scope.row)">{{text.detail}}</el-button>
        <!-- 自定义按钮 -->
        <slot name="btnCustom"
              :row="scope.row" />
        <!-- 操作列-删除按钮，支持传入btnDelVisibleFunc()用于判断按钮显示状态 -->
        <el-button v-if="actionColumnBtnDelVisible(scope.row)"
                   type="danger"
                   size="mini"
                   @click.stop="actionColumnDel(scope.row)">{{text.del}}</el-button>
      </template>
      <!-- 添加按钮 -->
      <el-button v-if="view.btnAdd"
                 slot="btnAdd"
                 type="primary"
                 icon="el-icon-plus"
                 size="mini"
                 @click.stop="btnAdd()">{{text.add}}</el-button>
    </BaseTable>
    <!-- 新增、编辑、查看按钮 弹出 表单-->
    <GenerateFormDialog ref="dialog"
                        :tableName="tableName"
                        :dialogFormDesignerName="dialogFormDesignerName"
                        :tableParams="tableParams"
                        @afterSave="tableReload"
                        @change="formChange"
                        :remoteFuncs="remoteFuncs"
                        :visibleList="view"
                        :setReadOnly="setReadOnly"
                        :append-to-body="appendToBody"
                        :close_on_click_modal="closeOnClickModal"
                        :fullscreen="fullscreen"
                        @btnOnClick="formBtnOnClick">
    </GenerateFormDialog>
  </div>
</template>

<script lang="ts">
import {
  Component, Vue, Emit, Prop,
} from 'vue-property-decorator';
import { DML, crud } from '@/api/public/crud';
import { getTableDetail, getFormDetail } from '@/api/system/form';
import BaseTable from '@/components/BaseTable/BaseTable.vue';
import GenerateFormDialog from '@/components/BaseDialog/GenerateFormDialog.vue';
import { confirm } from '@/decorator/confirm';

const STATUS = {
  CREATE: 0,
  UPDATE: 1,
  DETAIL: 2,
};
@Component({
  name: 'CrudTable',
  components: {
    BaseTable,
    GenerateFormDialog,
  },
})
export default class CrudTable extends Vue {
  // https://github.com/vuejs/vue-class-component/issues/94
  $refs!: {
    BaseTable: HTMLFormElement;
    dialog: HTMLFormElement;
  };

  // 表格结构json，将来可能有多张表
  tableConfig = { columns: [] };

  // 对话框保存时的参数
  dialogParams = {};

  // 对话框编辑或删除状态
  dialogStatus = STATUS.CREATE;

  // 从表格列的json获取要导出的字段
  exportCondition: any | null = null;

  // 多选行选中项
  selectedRows: any = [];

  // 跨页码多选仓库
  selectedRowMap = {};

  // 表格数据
  tableData = [];

  // 保存按钮Loading状态
  btnSaveIsLoading = false;

  // 表格行中的添加按钮点击事件
  @Prop({ default: null, type: Function }) btnRowAddOnClick!: any;

  // 展开行
  @Prop(Array) expandRowKeys!: any;

  // listField
  @Prop({
    type: String,
    default: 'data.list',
  })
  listField!: string;

  // 设置只读
  @Prop({ default: null, type: Object }) setReadOnly!: any;

  // 是否需要多选
  @Prop({ default: false, type: Boolean }) isMultiple!: boolean;

  // el-table emptyText
  @Prop(String) emptyText!: string;

  // 添加对话框预填项
  @Prop({ default: null, type: Object }) prefill!: any;

  // 弹出表单appendToBody
  @Prop({ default: false, type: Boolean }) appendToBody!: boolean;

  // 用于请求表格设计json的name
  @Prop({
    type: String,
    default: null,
  })
  tableDesignerName!: string;

  // 排序条件
  @Prop({
    type: String,
    default: null,
  })
  orderCondition!: string;

  // 对话框内加载FormDesigner的表名
  @Prop({
    type: String,
    default: null,
  })
  dialogFormDesignerName!: string;

  // 内部元素显示控制
  @Prop({ default: () => ({}), type: Object }) visibleList!: any;

  // 表名
  @Prop({
    type: String,
    default: '',
  })
  tableName!: string;

  // 表格标题
  @Prop({
    type: String,
    default: '',
  })
  tableTitle!: string;

  // 表格标题
  @Prop([Object, Array]) tableParams!: any;

  // 按钮名字
  @Prop({ default: () => ({}), type: Object }) textMap!: any;

  // 表格行中的添加按钮点击事件
  @Prop({ default: null, type: Function }) promiseForDel!: any;

  // 表格行中的添加按钮点击事件
  @Prop({ default: null, type: Function }) promiseForSelect!: any;

  // 表格行中的添加按钮点击事件
  @Prop({ default: null, type: Function }) promiseForAdd!: any;

  // 表格行中的添加按钮点击事件
  @Prop({ default: null, type: Function }) promiseForEdit!: any;

  // 表格行中的添加按钮点击事件
  @Prop({ default: null, type: Function }) promiseForExport!: any;

  // 代理保存方法
  @Prop({ default: null, type: Function }) promiseForSave!: any;

  // 表格行中的添加按钮点击事件
  @Prop({ default: null, type: Function }) btnDelVisibleFunc!: any;

  // 表格行中的添加按钮点击事件
  @Prop({ default: null, type: Function }) btnEditVisibleFunc!: any;

  // 表格行中的添加按钮点击事件
  @Prop({ default: null, type: Function }) btnDetailVisibleFunc!: any;

  // 表格行中的添加按钮点击事件
  @Prop({ default: null, type: Function }) btnAddOnClick!: any;

  // 表格行中的添加按钮点击事件
  @Prop({ default: null, type: Function }) btnEditOnClick!: any;

  // 表格行中的添加按钮点击事件
  @Prop({ default: null, type: Function }) btnDetailOnClick!: any;

  // 是否显示分页
  @Prop({ default: true, type: Boolean }) showPagination!: boolean;

  // 远程数据方法
  @Prop({ default: () => ({}), type: Object }) remoteFuncs!: any;

  // 行的 className 的回调方法
  @Prop([String, Function]) rowClassName!: any;

  // 表格选中行的id
  @Prop({ default: null, type: Function }) multipleExportField!: any;

  // 页码大小
  @Prop({ default: () => [20, 50, 100] }) pageSizes!: number[];

  // 分页显示
  @Prop({
    type: String,
    default: 'total, prev, pager, next, jumper, sizes',
  })
  paginationLayout!: string;

  // 是否自适应屏幕高度
  @Prop({ type: Boolean, default: false }) fullHeight!: boolean;

  // 高度minus
  @Prop({ type: Number, default: 245 }) maxHeightMinus!: number;

  // 高度minus
  @Prop(Number) height!: number;

  // 选择行是否可选
  @Prop({ default: null, type: Function }) selectableFunc: any;

  // 点击阴影弹框是否可以关闭
  @Prop({ default: true, type: Boolean }) closeOnClickModal!: boolean;

  // 表单是否全屏
  @Prop({ default: false, type: Boolean }) fullscreen!: boolean;

  // 是否显示序号列
  @Prop({ default: false }) showColumnIndex!: boolean;

  // el-table expandModel
  @Prop(Object) expandModel !:any;

  // 边框线
  @Prop({ type: Boolean, default: false }) border!: boolean;

  // 斑马纹
  @Prop({ type: Boolean, default: true }) stripe!: boolean;

  // 子表tableConfig 详情看GenerateFormItem中解释
  @Prop({ default: () => ({}), type: Object }) formTableConfig!: any;

  // 行样式
  @Prop({
    default: () => ({
      height: '20px',
    }),
    type: Function,
  })
  rowStyle!: any;

  // 单元格样式
  @Prop({
    default: () => ({
      padding: '5px',
    }),
    type: Function,
  })
  cellStyle!: any;

  // 操作列宽度
  @Prop({ type: Number, default: null }) actionColumnWidth!: number;

  // 表格数据源地址
  get tableUrl() {
    return `${this.tableName.replace(/_/g, '/')}`;
  }

  // 文本映射
  get text() {
    return {
      add: '添加',
      edit: '编辑',
      del: '删除',
      detail: '查看',
      export: '导出xls',
      ...this.textMap,
    };
  }

  // 内部元素显示控制
  get view() {
    return {
      conditionTitle: true,
      searchForm: true,
      tableTitle: true,
      btnAdd: true,
      actionColumnBtnAdd: false,
      actionColumnBtnEdit: true,
      actionColumnBtnDetail: false,
      actionColumnBtnDel: true,
      personInfo: false,
      actionColumn: true,
      btnAddOnColumnHeader: false,
      btnDel: false,
      ...this.visibleList,
    };
  }

  created() {
    // 请求表格设计json
    const promise = getTableDetail(this.tableDesignerName ? this.tableDesignerName : this.tableName);
    // 加载表格结构
    promise.then((res) => {
      this.tableConfig = JSON.parse(res.data.formJson);
      // 如果不显示操作列,则隐藏
      if (!this.view.actionColumn) {
        this.tableConfig.columns = this.tableConfig.columns.filter((item: any) => item.slotName !== 'actionColumn');
      }
      const { actionColumnWidth } = this;
      // 如果显示指明了操作列列宽
      if (actionColumnWidth) {
        const actionColumn: any = this.tableConfig.columns.find((item: any) => item.slotName === 'actionColumn');
        if (actionColumn) {
          actionColumn.width = actionColumnWidth;
          actionColumn.minWidth = actionColumnWidth;
        }
      }
    });
  }

  // 表格刷新
  tableReload() {
    this.$refs.BaseTable.dataChangeHandler();
  }

  // 添加
  btnAdd() {
    if (this.btnAddOnClick) {
      this.btnAddOnClick({
        tableParams: this.tableParams,
      });
    } else if (this.prefill) {
      // 对话框内加载预填项
      this.$refs.dialog.showDialog({}, 0, this.prefill);
    } else {
      this.$refs.dialog.showDialog();
    }
  }

  // 操作列-添加
  actionColumnAdd(row) {
    if (this.btnRowAddOnClick) {
      this.btnRowAddOnClick(row);
    } else if (this.prefill) {
      // 对话框内加载预填项
      // 此处跟正常情况的preFill不一样
      // 此处传的为Array
      // 用于tree接口点添加自动赋值parentid的情况
      // 例如传 { parentid : id} 则表示添加的parentid = row.id
      const obj = {};
      Object.keys(this.prefill).forEach((key) => {
        obj[key] = row[this.prefill[key]];
      });
      this.$refs.dialog.showDialog({}, 0, obj);
    } else {
      this.$refs.dialog.showDialog();
    }
  }

  // 操作列-编辑
  actionColumnEdit(row) {
    if (this.btnEditOnClick) {
      this.btnEditOnClick(row);
    } else {
      // 此处处理防止tree结构带有children属性造成保存bug
      // 删除children属性
      const clone = this.lodash.cloneDeep(row);
      delete clone.children;
      this.$refs.dialog.showDialog({ id: row.id }, STATUS.UPDATE, clone);
    }
  }

  // 操作列-查看
  actionColumnDetail(row) {
    if (this.btnDetailOnClick) {
      this.btnDetailOnClick(row);
    } else {
      this.$refs.dialog.showDialog({ id: row.id }, STATUS.DETAIL, row);
    }
  }

  // 批量删除按钮
  btnDeletesOnClick() {
    const { length } = this.selectedRows || [];
    if (length > 0) {
      this.$confirm(`已选中${length}项,确认删除？该操作不可恢复！`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          const promise = crud(
            DML.DELETES,
            this.tableName,
            this.selectedRows.map(item => item.id),
          );
          promise.then(() => {
            this.tableReload();
            this.$message({
              type: 'success',
              message: '批量删除成功',
            });
          });
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
          });
        });
    } else {
      this.$message('请先选择删除项');
    }
  }

  // 操作列-删除
  @confirm('确认删除?', '提示')
  actionColumnDel(row) {
    // 如果prop传入了promiseForDel说明需要回调自定义删除
    const promise = this.promiseForDel ? this.promiseForDel({ id: row.id }) : crud(DML.DELETE, this.tableName, {}, { id: row.id });
    promise.then(() => {
      this.tableReload();
      this.$message({
        type: 'success',
        message: '删除成功',
      });
    });
  }

  // 操作列-编辑按钮是否显示
  actionColumnBtnEditVisible(row) {
    let visible;
    if (this.btnEditVisibleFunc) {
      // 如果传入了计算函数，取函数结果
      visible = this.btnEditVisibleFunc(row);
    } else {
      // 默认不显示
      visible = this.view.actionColumnBtnEdit;
    }
    return visible;
  }

  // 操作列-详情按钮是否显示
  actionColumnBtnDetailVisible(row) {
    let visible;
    // 如果传入了计算函数，取函数结果
    if (this.btnDetailVisibleFunc) {
      visible = this.btnDetailVisibleFunc(row);
    } else {
      // 默认不显示
      visible = this.view.actionColumnBtnDetail;
    }
    return visible;
  }

  // 操作列-删除按钮是否显示
  actionColumnBtnDelVisible(row) {
    let visible;
    if (this.btnDelVisibleFunc) {
      // 如果传入了计算函数，取函数结果
      visible = this.btnDelVisibleFunc(row);
    } else {
      // 默认显示
      visible = this.view.actionColumnBtnDel;
    }
    return visible;
  }

  // 表格数据请求完成
  done(t) {
    t.tableTitle = this.tableTitle;
    this.$emit('done', t);
  }

  // 多选事件
  handleSelectionChange(selection) {
    this.selectedRows = selection;
    this.$emit('selection', selection);
  }

  // 生成的按钮点击
  formBtnOnClick(widget) {
    this.$emit('formBtnOnClick', widget);
  }

  // 监听dialog中form对象改变
  formChange(val) {
    this.$emit('formChange', val);
  }
}
</script>
<style lang="scss" scoped>
.CrudTable {
  background: white;
  padding: 10px;
}
</style>
