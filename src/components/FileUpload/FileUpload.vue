<!--
 * @file: 文件上传
 * @copyright: NanJing Anshare Tech .Com
 * @author: BoBo
 * @Date: 2019年04月28 13:45:17
-->

<template>
  <div class="upload-container">
    <el-upload v-if="view.upload && !readOnly"
               ref="upload"
               :action="uploadUrl"
               :data="uploadParams"
               :accept="accept"
               :headers="{ Authorization: this.$store.getters.token }"
               :show-file-list="false"
               :before-upload="beforeUpload"
               :on-success="uploadSuccess"
               multiple>
      <slot name="uploadBtn"></slot>
      <el-tooltip class="item"
                  effect="dark"
                  content="上传附件"
                  placement="bottom">
        <el-button size="mini"
                   ref="uploadBtn"
                   v-show="view.uploadBtn"
                   style="float:right;"
                   :icon="btnIcon"
                   :loading="btnSaveIsLoading"
                   type="primary">{{btnText}}</el-button>
      </el-tooltip>
    </el-upload>
    <CrudTable ref="table"
               id="affix_list"
               v-if="view.list"
               :listField="listField"
               emptyText="暂无附件"
               :tableName="tableName"
               :maxHeightMinus="290"
               :pageSize="[30,50,100]"
               :tableTitle="tableTitle"
               :tableParams="tableParams"
               :promiseForSelect="promiseForSelect"
               :allResponse="allResponse"
               :fullHeight="fullHeight"
               :visibleList="{
                  conditionTitle: false,
                  tableTitle:view.tableTitle,
                  searchForm: view.searchForm,
                  btnAdd: false,
                  btnExport: false,
                  actionColumnBtnEdit: false,
                  actionColumnBtnDel:false,
                  tableTitle:view.tableTitle
                }"
               :paginationLayout="paginationLayout"
               :showPagination="showPagination"
               @selection="getSelection"
               :isMultiple="isMultiple"
               :row-class-name="rowClassName">
      <template #columnFormatter="{prop,row}">
        <template v-if="prop=== 'filename'">
          <span>{{row.filename}}</span>
        </template>
      </template>
      <template #btnBarPrevBtn>
        <slot name="btnBarPrevBtn"></slot>
      </template>
      <template #btnCustom="scope">
        <slot name="btnCustom"
              :row="scope.row"></slot>
        <div v-if="view.btnHandleGroup && scope.row.isdeleted === false">
          <el-dropdown trigger="click"
                       placement="bottom"
                       class="selectButton">
            <span class="el-dropdown-link">
              更多<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item v-if="visibleWenShuEdit(scope)">
                <i class="el-icon-edit-outline"
                   @click="btnRenameOnClick(scope.row)">
                  <span class="dropLink">
                    重命名
                  </span>
                </i>
              </el-dropdown-item>

              <el-dropdown-item>
                <i class="el-icon-download"
                   @click="btnDownloadOnClick(scope)">
                  <span class="dropLink">
                    下载
                  </span>
                </i>
              </el-dropdown-item>

              <el-dropdown-item v-if="visibleDelBtn(scope)">
                <i class="el-icon-delete"
                   @click="btnDelOnClick(scope)">
                  <span class="dropLink">
                    删除
                  </span>
                </i>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </template>
    </CrudTable>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import download from '@/utils/download';
import { crud, DML } from '@/api/public/crud';

@Component
export default class FileUpload extends Vue {
  $refs!: {
    uploadBtn: HTMLFormElement;
    table:HTMLFormElement;
  };

  // 若是制作文书的情况,upload接口传wenshuId
  wenShuId = '';

  // 保存按钮Loading状态
  btnSaveIsLoading = false;

  @Prop({
    type: Boolean,
    default: false,
  })
  fullHeight!: boolean;

  @Prop({
    type: String,
    default: 'data.list',
  })
  listField!: string;

  @Prop({
    type: String,
    default: '.doc,.docx,.xls,.xlsx,.PDF',
  })
  accept!: string;

  @Prop({
    type: String,
    default: '上传附件',
  })
  btnText!: string;

  @Prop({
    type: String,
    default: '',
  })
  btnIcon!: string;

  @Prop({
    type: Boolean,
    default: false,
  })
  showPagination!: boolean;

  @Prop({
    type: String,
    default: '',
  })
  resourceid!: string;

  @Prop({
    type: Object,
    default: null,
  })
  myTask: any;

  // 直接传入表头和表体，表格不用再发起任何请求

  @Prop({
    type: Object,
    default: null,
  })
  allResponse: any;

  @Prop({
    type: Object,
    default: () => ({}),
  })
  visibleList: any;

  @Prop({
    type: String,
    default: '',
  })
  tableTitle!: string;

  @Prop({
    type: String,
    default: `${process.env.VUE_APP_API_URL}file/upload`,
  })
  uploadUrl!: string;

  @Prop({
    default: null,
    type: Function,
  })
  promiseForSelect: any;

  @Prop({
    type: Object,
    default: () => ({}),
  })
  customParams: any;

  @Prop({
    type: String,
    default: 'file',
  })
  tableName!: string;

  // 分页显示内容
  @Prop({
    type: String,
    default: 'sizes,total,prev, pager, next',
  })
  paginationLayout!: string;

  // 是否开启多选
  @Prop({
    type: Boolean,
    default: false,
  })
  isMultiple!: boolean;

  // file列表行样式
  @Prop({
    type: [String, Function],
    default: null,
  })
  rowClassName: any;

  @Prop({
    type: String,
    default: '',
  })
  // 附件类型
  fileType!: string;

  @Prop({
    type: Boolean,
    default: false,
  })
  readOnly!: boolean;

  // 内部元素显示控制，默认只有上传人可以编辑删除
  get view() {
    return {
      btnAdd: true,
      btnDel: true,
      btnEdit: true,
      btnPreview: true,
      upload: true,
      list: true,
      btnHandleGroup: true,
      btnWenShuCode: false,
      btnDownload: true,
      uploadBtn: true,
      searchForm: false,
      tableTitle: true,
      btnSetSecret: true,

      ...this.visibleList,
    };
  }

  get tableParams() {
    const params:any = {};
    // 工作流附件需要传该参数,非工作流相关的附件则为null
    if (this.myTask) {
      params.taskId = this.myTask.id;
    }
    if (this.resourceid) {
      params.resourceid = this.resourceid;
    }
    if (this.fileType) {
      params.type = this.fileType;
    }
    return params;
  }

  get uploadParams() {
    const {
      wenShuId, myTask, resourceid, fileType,
    } = this;
    let params : any = {
      userid: this.$store.getters.userid,
    };
    if (wenShuId) {
      params.affixId = wenShuId;
    }
    if (myTask) {
      params.taskId = myTask.id;
      params.append = '0';
    }
    if (resourceid) {
      params.resourceid = resourceid;
    }
    if (fileType) {
      params.filetype = fileType;
    }
    params = {
      ...params,
      ...this.customParams,
    };
    return params;
  }

  // 文书编辑按钮 仅当上传人为【自己、领导角色、文书审核员时】,表单可编辑,以及还未生成过文书编号时显示
  visibleWenShuEdit({ row }) {
    return this.view.btnEdit && (this.$store.getters.name === row.uploaduser || this.$store.getters.isLeader || this.$store.getters.rolename === '文书审核员') && !this.readOnly;
  }

  // 重命名
  btnRenameOnClick(data) {
    this.$prompt('请输入新文件名', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
    })
      .then(({ value } : any) => {
        crud(DML.UPDATE, 'file', {
          id: data.id,
          filename: value + data.fileextension,
        }).then((res:any) => {
          if (res.code === 200) {
            this.$message.success('修改成功');
            this.tableReload();
          }
        });
      })
      .catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入',
        });
      });
  }

  // 删除按钮是否显示
  visibleDelBtn({ row }) {
    return this.view.btnDel && this.$store.getters.name === row.uploaduser && !this.readOnly;
  }

  beforeUpload() {
    this.btnSaveIsLoading = true;
    this.$message({
      type: 'info',
      message: '文件上传中……',
    });
    return true;
  }

  // 文件上传成功
  uploadSuccess(res) {
    console.log(res);
    const { code } = res;
    if (code === 400) {
      this.$message({
        type: 'error',
        message: '上传失败',
      });
    } else {
      this.$message({
        type: 'success',
        message: '上传成功',
      });
      this.wenShuId = '';
      if (this.view.list) {
        this.tableReload();
      }
      this.$emit('uploadSuccess');
    }
    this.btnSaveIsLoading = false;
  }

  // 下载
  btnDownloadOnClick(scope) {
    download(`${process.env.VUE_APP_API_URL}file/download`, scope.row.filename, { id: scope.row.id });
  }


  // 删除按钮代理
  btnDelOnClick({ row }) {
    this.$confirm('此操作将删除该附件, 是否继续?', '提示', {
      confirmButtonText: '确认删除',
      cancelButtonText: '取消',
      type: 'warning',
    })
      .then(() => {
        crud(DML.DELETE, this.tableName, {
          id: row.id,
        }).then((res:any) => {
          if (res.code === 200) {
            this.$message.success('删除成功');
            this.tableReload();
          }
        });
      })
      .catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除',
        });
      });
  }

  // 附件列表刷新
  tableReload() {
    this.$refs.table.tableReload();
  }

  triggerUploadBtn({ wenShuId, affixId = null }) {
    this.wenShuId = wenShuId;
    if (affixId) {
      this.customParams.type = affixId;
    }
    this.$refs.uploadBtn.$el.click();
  }

  submitUpload() {
    this.$refs.uploadBtn.$el.click();
  }

  // 获取附件列表勾选项
  getSelection(data) {
    this.$emit('selection', data);
  }
}
</script>

<style scoped>
.upload-container >>> .el-upload {
  float: right;
  margin-right: 5px;
  margin-bottom: 5px;
}
</style>
<style lang="scss" scoped>
.dropButton {
  margin-right: 10px;
  .el-dropdown-selfdefine {
    padding: 9px 15px;
    font-size: 12px;
  }
}
// 操作列更多按选项按钮
.selectButton {
  .el-dropdown-link {
    cursor: pointer;
    color: #409eff;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
}
</style>
