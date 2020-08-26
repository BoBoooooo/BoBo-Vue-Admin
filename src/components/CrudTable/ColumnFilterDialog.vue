<!--
@file 表格导出列过滤对话框
@author BoBo
@copyright NanJing Anshare Tech .Com
@createDate 2018年12月28日11:37:23
-->
<template>
  <!-- 对话框 -->
  <el-dialog v-if="visible"
             ref="dialog"
             class="dialog"
             title="导出xls文件"
             :visible.sync="visible"
             width="720px">
    <div class="viewColumn">
      <h2>请选择xls文件包含的列名
        <span>
          导出{{localExportColumns.filter(c=>c.show).length}}列，共{{localExportColumns.length}}列。
        </span>
      </h2>
      <div class="chk-container">
        <el-checkbox v-for="(condition,index) in localExportColumns"
                     :key="index"
                     v-model="condition.show"
                     class="chkColumn"
                     border>
          {{condition.value}}
        </el-checkbox>
      </div>
    </div>
    <el-row type="flex"
            justify="end"
            style="margin-top: 10px;">
      <el-button type="primary"
                 icon="el-icon-check"
                 @click="btnExportOnClick()"
                 :disabled="localExportColumns.filter(c => c.show).length===0"
                 :loading="btnSaveIsLoading">导出xls文件</el-button>
      <el-button icon="el-icon-close"
                 @click="btnCancelOnClick()">取消</el-button>
    </el-row>
  </el-dialog>
</template>

<script lang="ts">
import download from '@/utils/download';
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component({
  name: 'ColumnFilterDialog',
})
export default class ColumnFilterDialog extends Vue {
  $refs!: {
    upload: HTMLFormElement;
  };


  // 对话框是否显示
  visible = false;

  // 导出条件
  localExportColumns:any = [];

  // 保存按钮Loading状态
  btnSaveIsLoading = false;

  // 传入的查询条件和排序条件
  requestParams:any = null;

  // 传入的导出条件
  @Prop({ type: Array, default: null }) exportColumns!: any;

  // 下载地址
  @Prop({ type: String, default: null }) downloadURL!: string;

  // 下载文件名
  @Prop({ type: String, default: null }) tableTitle!: string;

  // 覆盖导出的promise
  @Prop({ type: Function, default: null }) promiseForExport!: any;


  created() {
    // 初始化导出条件
    this.localExportColumns = this.exportColumns.map((f) => {
      // 不能f.show = true否则vue跟踪不到show属性的变化
      this.$set(f, 'show', true);
      return f;
    });
  }

  showDialog(requestParams) {
    this.requestParams = requestParams;
    this.visible = true;
  }

  // 导出按钮点击
  btnExportOnClick() {
    const ec = this.localExportColumns
      .filter(c => c.show)
      .map((t) => {
        const col :any = {
          ...t,
        };
        delete col.show;
        return t;
      });
    if (this.promiseForExport) {
      // 如果外侧传入了导出方法则调用外侧
      this.promiseForExport({
        ...this.requestParams,
        exportCondition: ec,
        pageIndex: 0,
        pageSize: 0,
      });
    } else {
      // 下载
      download(
        this.downloadURL,
        this.tableTitle,
        {
          exportCondition: ec,
          ...this.requestParams,
          pageIndex: 0,
          pageSize: 0,
        },
        'post',
      );
    }
    this.visible = false;
  }

  // 取消按钮点击
  btnCancelOnClick() {
    this.visible = false;
  }
}
</script>
<style scoped>
.dialog >>> .el-dialog__body {
  padding: 0px 20px 30px;
}
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
h2 {
  margin-bottom: 0.8em;
  font-size: 1.2em;
  font-weight: normal;
  span {
    font-size: 0.7em;
    color: #b6b6b6;
  }
}
.chk-container {
  margin: 0 -5px;
  .chkColumn {
    width: 220px;
    margin: 5px 5px !important;
    text-overflow: ellipsis;
    overflow: hidden;
  }
}
</style>
