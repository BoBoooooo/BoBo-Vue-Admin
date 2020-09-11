<!--
@file 用于增删改查的表格，第三层封装
      三次封装关系：el-table->BaseTable.vue->CrudTable.vue
@author BoBo
@copyright NanJing Anshare Tech .Com
@createDate 2018年11月14日17:25:47
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
               :type="rows?'local':'remote'"
               :data="rows"
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
      <!-- 高级查询slot -->
      <template #SeniorSearchForm>
        <slot name="SeniorSearchForm"></slot>
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
                   @click.stop="editInlineMode? btnAddInline(): btnAdd()"></el-button>

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
          <!-- 行内编辑模式 -->
          <template v-if="scope.row.isEdit">
            <el-button type="primary"
                       icon="el-icon-check"
                       @click.stop="btnSaveInlineOnClick(scope.row)"
                       size="mini"
                       :loading="btnSaveIsLoading">保存</el-button>
            <el-button icon="el-icon-close"
                       size="mini"
                       @click.stop="tableReload">取消</el-button>
          </template>
          <!-- 正常编辑按钮 -->
          <el-button v-else
                     type="success"
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
                 @click.stop="editInlineMode? btnAddInline(): btnAdd()">{{text.add}}</el-button>
      <!-- 导出按钮 -->
      <el-button v-if="view.btnExport"
                 slot="btnExport"
                 slot-scope="scope"
                 type="primary"
                 icon="el-icon-download"
                 size="mini"
                 @click.stop="btnExport(scope)">{{text.export}}</el-button>
      <!-- 导入按钮、数据校验按钮 -->
      <template v-if="view.btnImport"
                slot="btnImport"
                slot-scope="scope">
        <el-button type="primary"
                   icon="el-icon-upload"
                   size="mini"
                   @click.stop="btnImport(scope)">{{text.import}}</el-button>
        <span style="margin-right: 15px;margin-top: 5px;display:inline-block"
              v-if="checkSwitchStatus === '关闭校验'">数据校验状态:<span style="color:green">开启</span></span>
        <el-switch v-model="checkSwitchStatus"
                   @change="dataCheck"
                   style="margin-top:4px"
                   active-color="#13ce66"
                   active-value="关闭校验"
                   inactive-value="开启校验"
                   inactive-color="#ff5722">
        </el-switch>
      </template>
    </BaseTable>
    <!-- 对话框内的只有表单，时表格默认的对话框 -->
    <GenerateFormDialog ref="dialog"
                        :tableName="tableName"
                        :dialogFormDesignerName="dialogFormDesignerName"
                        :tableParams="tableParams"
                        @afterSave="saveDialog"
                        @change="formChange"
                        :formValuesAsync="formValuesAsync"
                        :remoteFuncs="remoteFuncs"
                        :visibleList="view"
                        :setReadOnly="setReadOnly"
                        :append-to-body="appendToBody"
                        :close_on_click_modal="closeOnClickModal"
                        :fullscreen="fullscreen"
                        @btnonclick="btnOnClick">
      <template #formTitle>
        <slot name="formTitle"></slot>
      </template>
      <template #footer="{save}">
        <slot name="footer"
              :save="save"></slot>
      </template>
    </GenerateFormDialog>
    <!-- 导出列过滤对话框 -->
    <ColumnFilterDialog ref="columnFilterDialog"
                        :downloadURL="downloadURL"
                        :tableTitle="tableTitle"
                        :exportColumns="exportCondition"
                        :promiseForExport="promiseForExport"
                        v-if="exportCondition" />
    <!-- 导入对话框 -->
    <ImportDialog ref="importDialog"
                  :tableName="tableName"
                  @importSuccess="tableReload"
                  :columns="tableConfig.columns"></ImportDialog>
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
import ColumnFilterDialog from './ColumnFilterDialog.vue';
import ImportDialog from './ImportDialog.vue';

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
    ColumnFilterDialog,
    ImportDialog,
  },
})
export default class CrudTable extends Vue {
  // https://github.com/vuejs/vue-class-component/issues/94
  $refs!: {
    BaseTable: HTMLFormElement;
    dialog: HTMLFormElement;
    columnFilterDialog: HTMLFormElement;
    importDialog: HTMLFormElement;
  };

  // 表格结构json，将来可能有多张表
  tableConfig = { columns: [] };

  // 对话框保存时的参数
  dialogParams = {};

  // 对话框编辑或删除状态
  dialogStatus = STATUS.CREATE;

  // 如果直接传入rows说明无需请求，直接根据rows生成表体
  rows = null;

  // 从表格列的json获取要导出的字段
  exportCondition: any | null = null;

  // 下载地址
  downloadURL: string | null = null;

  // 多选行选中项
  selectedRows: any = [];

  // 跨页码多选仓库
  selectedRowMap = {};

  // 表格数据
  tableData = [];

  // 保存按钮Loading状态
  btnSaveIsLoading = false;

  // 标记一下是否处于正在编辑模式
  isEditing = false;

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
  @Prop({ default: null, type: Function }) promiseForColumns!: any;

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

  // 直接传入表头和表体，表格不用再发起任何请求
  @Prop({ default: null, type: Object }) allResponse!: any;

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
  @Prop({ type: Number, default: 235 }) maxHeightMinus!: number;

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

  // 自定义导出downloadUrl
  @Prop({
    type: String,
    default: null,
  })
  exportDownloadUrl!: string;

  // 边框线
  @Prop({ type: Boolean, default: false }) border!: boolean;

  // 斑马纹
  @Prop({ type: Boolean, default: true }) stripe!: boolean;

  // 异步更新表单数据
  @Prop({ default: () => ({}), type: Object }) formValuesAsync!: any;

  // 子表tableConfig 详情看GenerateFormItem中解释
  @Prop({ default: () => ({}), type: Object }) formTableConfig!: any;

  // 是否开启行内编辑模式
  @Prop({ type: Boolean, default: false }) editInlineMode!: any;

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
      btnExport: true,
      btnImport: false,
      actionColumnBtnAdd: false,
      actionColumnBtnEdit: true,
      actionColumnBtnDetail: false,
      actionColumnBtnDel: true,
      personInfo: false,
      actionColumn: true,
      showSeniorSearchForm: true,
      btnAddOnColumnHeader: false,
      btnDel: false,
      ...this.visibleList,
    };
  }

  created() {
    // 如果直接传入表头和表体，表格不用再发起任何请求
    if (this.allResponse) {
      // allResponse下必须有config属性
      this.tableConfig = this.allResponse.config;
      this.rows = this.allResponse.rows;
      // this.pageSize = undefined;
    } else {
      // 如果传入了代理promise请求config使用代理promise请求
      const promise = this.promiseForColumns ? this.promiseForColumns() : getTableDetail(this.tableDesignerName ? this.tableDesignerName : this.tableName);
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
    // 下载地址
    if (this.exportDownloadUrl) {
      this.downloadURL = this.exportDownloadUrl;
    } else {
      this.downloadURL = `${this.tableUrl}/dataExport`;
    }
  }

  // 表格刷新
  tableReload() {
    this.$refs.BaseTable.dataChangeHandler();
    this.isEditing = false;
  }

  btnAddInline() {
    interface editMode {
      isEdit: boolean;
      [key: string]: string | boolean;
    }
    if (this.judgeIsEditing()) {
      this.isEditing = true;
      const entity: editMode = {
        isEdit: true,
      };
      for (const row of this.tableConfig.columns) {
        const { prop } = row;
        if (prop !== '') {
          entity[prop] = '';
        }
      }
      this.dialogStatus = STATUS.CREATE;
      this.$refs.BaseTable.addRow(entity);
    }
  }

  // 行内保存按钮点击
  btnSaveInlineOnClick(row) {
    this.btnSaveIsLoading = true;
    let msg;
    let type;
    // 根据对话框状态判断保存或编辑
    if (this.dialogStatus === STATUS.CREATE) {
      type = DML.INSERT;
      msg = '添加成功';
    } else {
      type = DML.UPDATE;
      msg = '编辑成功';
    }
    let promise;
    const opt = {
      ...row, // 默认基于formValues初始值修改
      ...this.prefill,
    };
    // 如果有代理的保存方法
    if (this.promiseForSave) {
      promise = this.promiseForSave(opt);
    } else {
      promise = crud(type, this.tableName, opt);
    }

    promise.then((res) => {
      if (res.code !== 200) {
        this.$message({
          type: 'error',
          message: `保存失败，原因：${res.message}`,
        });
        this.btnSaveIsLoading = false;
        return;
      }
      this.btnSaveIsLoading = false;
      this.$message({
        type: 'success',
        message: msg,
      });
      row.isEdit = false;
      this.tableReload();
    });
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

  // 导出
  btnExport(scope) {
    this.$refs.BaseTable.getSearchCondition((searchParams) => {
      // 虽然从BaseTable的AdvancedSearchForm回调的searchParams是数组
      // 如果传入的参数是数组与高级查询参数拼接，如果传入的是对象转为数组
      if (Array.isArray(this.tableParams)) {
        searchParams = searchParams.concat(this.tableParams);
      } else if (this.tableParams) {
        Object.keys(this.tableParams).forEach((k) => {
          searchParams.push({
            field: k,
            operator: 'eq',
            value: this.tableParams[k],
          });
        });
      }
      if (this.selectedRows.length > 0) {
        searchParams.push({
          field: this.multipleExportField,
          operator: 'in',
          value: this.selectedRows.map(t => t.id).join(','),
        });
      }

      // 从表格列的json获取要导出的字段
      this.exportCondition = this.tableConfig.columns
        .filter((item: any) => item.prop !== '' && !item.slotName)
        .map((item: any) => ({
          value: item.label,
          field: item.prop,
        }));

      // 对话框默认不存在，上面给exportCondition赋值后才会初始化元素
      this.$nextTick(() => {
        // 导出列过滤对话框
        this.$refs.columnFilterDialog.showDialog({
          orderCondition: scope.order,
          searchCondition: searchParams,
        });
      });
    });
  }

  // 导入
  btnImport(scope) {
    this.$refs.importDialog.showDialog(this.prefill);
  }

  // 数据校验
  dataCheck(status) {
    if (status === '关闭校验') {
      // 必填项校验
      const requiredFields = [];
      // 下拉框校验(绑定数据字典情况)
      const selectFields = [];
      // 日期格式校验
      const dateFields = [];

      // 请求对话框内的动态表单json
      getFormDetail(this.dialogFormDesignerName ? this.dialogFormDesignerName : this.tableName).then((res) => {
        this.generateModle(JSON.parse(res.data.formJson).list, requiredFields, selectFields, dateFields);
        const requiredCondition = [...requiredFields, ...selectFields, ...dateFields];
        this.$refs.BaseTable.fetchHandler(false, false, requiredCondition);
      });
    } else {
      this.$refs.BaseTable.fetchHandler(false, false, []);
    }
  }

  // 设置只读
  generateModle(genList, requiredFields, selectFields, dateFields) {
    // 遍历设计的结构
    for (let i = 0; i < genList.length; i += 1) {
      if (genList[i].type === 'grid') {
        genList[i].columns.forEach((item) => {
          this.generateModle(item.list, requiredFields, selectFields, dateFields);
        });
      } else {
        const row = genList[i];
        if (row.options.required) {
          requiredFields.push({
            field: row.model,
            operator: 'check',
            required: true,
          });
        }
        if (row.options.dictType) {
          selectFields.push({
            field: row.model,
            operator: 'check',
            dictType: row.options.dictType,
          });
        }
        if (row.options.type === 'date') {
          const { format } = row.options;
          // eslint-disable-next-line no-nested-ternary
          const dateformat = format === 'yyyy-MM-dd' ? '%Y-%m-%d' : format === 'yyyy年MM月dd日' ? '%Y年%m月%d日' : format === 'yyyyMMdd' ? '%Y%m%d' : format === 'yyyy/MM/dd' ? '%Y/%m/%d' : '';
          selectFields.push({
            field: row.model,
            operator: 'check',
            dateformat,
          });
        }
      }
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

  // 判断是否在编辑状态
  judgeIsEditing() {
    if (!this.isEditing) {
      return true;
    }
    this.$message.info('请先退出当前编辑状态');
    return false;
  }

  // 操作列-编辑
  actionColumnEdit(row) {
    if (this.editInlineMode) {
      if (this.judgeIsEditing()) {
        this.$set(row, 'isEdit', true);
        this.isEditing = true;
        this.dialogStatus = STATUS.UPDATE;
      }
    } else if (this.btnEditOnClick) {
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

  // 底部批量删除按钮(暂时只支持单表,不支持外侧传入代理方法)
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
  actionColumnDel(row) {
    this.$confirm('确认删除？该操作不可恢复！', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    })
      .then(() => {
        // 如果prop传入了promiseForDel说明需要回调自定义删除
        const promise = this.promiseForDel ? this.promiseForDel({ id: row.id }) : crud(DML.DELETE, this.tableName, { id: row.id });
        promise.then(() => {
          this.tableReload();
          this.$message({
            type: 'success',
            message: '删除成功',
          });
        });
      })
      .catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除',
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
    } else if (row.isEdit) {
      // 默认显示
      visible = false;
    } else {
      // 默认显示
      visible = this.view.actionColumnBtnDel;
    }
    return visible;
  }

  // 对话框保存成功后刷新表格
  saveDialog() {
    this.tableReload();
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
  btnOnClick(widget) {
    this.$emit('btnOnClick', widget);
  }

  // 监听dialog中form对象改变
  formChange(val) {
    this.$emit('change', val);
  }
}
</script>
<style lang="scss" scoped>
.CrudTable {
  background: white;
  padding: 10px;
}
</style>
