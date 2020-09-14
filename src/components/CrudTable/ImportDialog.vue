<!--
 * @file: 通用导入操作台Dialog  (excel的情况)
 * @copyright: NanJing Anshare Tech .Com
 * @author: BoBo
 * @Date: 2020年03月10 09:21:48
 -->

<!-- 组件说明 -->
<template>
  <el-dialog v-if="visible"
             ref="dialog"
             class="dialog"
             title="导入xls"
             append-to-body
             :visible.sync="visible"
             width="60%">
    <el-upload class="upload-demo"
               drag
               ref="upload"
               accept=".xls,.xlsx"
               :multiple="false"
               :on-remove="onRemove"
               :limit="1"
               :on-success="uploadSuccess"
               :before-upload="beforeUpload"
               :headers="{ Authorization: this.$store.getters.token }"
               :action="checkUploadUrl">
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <div class="el-upload__tip"
           slot="tip">注意:只能上传指定xls模板!
      </div>
    </el-upload>
    <div class="guide_text">
      <p v-for="(item,index) in guideArr"
         :key="index">
        <transition name="el-fade-in">
          <span :style="{
            color:item.result === 'success'?'#4caf50':'red'
          }">{{item.label}}</span>
        </transition>
        <transition name="el-fade-in">
          <i v-if="item.result === 'success'"
             class="el-icon el-icon-circle-check result-success-icon"></i>
          <i v-else
             class="el-icon el-icon-circle-close result-error-icon"></i>
        </transition>
      </p>
    </div>
    <div v-if="success === true">
      <el-button type="primary"
                 plain
                 :loading="btnUploadLoading"
                 size="mini"
                 @click="confirmImport">确认导入</el-button>
    </div>
    <template v-if="success === false">
      <el-row>
        <el-col :span="12"
                class="colHeight">
          <h4>正确模板样式</h4>
          <div>
            <p v-for="(item,index) in columns.filter(item=>item.prop).map(item=>item.label)"
               :key="index">
              {{item}}
            </p>
          </div>
        </el-col>
        <el-col :span="12"
                class="colHeight">
          <h4>当前导入模板</h4>
          <div>
            <p v-for="(item,index) in xlsHeader"
               :key="index"
               :style="{
               color:item.error?'red':'green'
             }">
              {{item.label}}
            </p>
          </div>
        </el-col>
      </el-row>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import {
  Component, Vue, Prop,
} from 'vue-property-decorator';

@Component({
  name: 'ImportDialog',
})
export default class ImportDialog extends Vue {
   $refs!: {
    upload: HTMLFormElement;
  };

  visible = false;

  btnUploadLoading = false;

  // 用来暂存文件流
  file:any = null;

  // 校验数据
  checkedData:any = null;

  // 回传实体对象
  entity:any = null;

  guideArr:any = [];

  // 记录模板校验是否成功
  success:any = null;

  // 导入模板表头
  xlsHeader:any = [];

  // 上传 参数
  uploadParams:any = {};

  // 导入xls地址
  @Prop(String) importUrl!: string;

  // 展开行
  @Prop({ type: Array, required: true }) columns!: any;

  // 表名
  @Prop({
    type: String,
    default: '',
  })
  tableName!: string;

  get checkUploadUrl() {
    return `${this.tableUrl}/dataHeaderImport`;
  }

  get uploadUrl() {
    return `${this.tableUrl}/dataImport`;
  }

  // 表格数据源地址
  get tableUrl() {
    return `${process.env.VUE_APP_API_URL}${this.tableName.replace(/_/g, '/')}`;
  }

  onRemove() {
    this.reset();
  }

  showDialog() {
    this.reset();
    this.visible = true;
  }

  beforeUpload() {
    this.reset();
    this.guideArr.push({
      label: '模板校验中...',
      result: 'success',
    });
    return true;
  }

  reset() {
    this.file = null;
    this.checkedData = null;
    this.entity = null;
    this.success = null;
    this.xlsHeader = [];
    this.guideArr = [];
  }

  // 上传成功
  // 第一次上传为校验模板是否匹配
  uploadSuccess(res, file, fileList) {
    this.checkedData = res.data;
    // 如果校验通过,则预览导入xls效果
    if (this.verification()) {
      this.guideArr.push({
        label: `校验成功...共${res.data.datacount}条数据`,
        result: 'success',
      });
      this.file = file;
      this.success = true;
    } else {
      this.guideArr.push({
        label: '上传模板不匹配,请返回列表下载指定模板...!',
        result: 'error',
      });
      this.success = false;
    }
    this.$refs.upload.clearFiles();
  }

  // 校验函数
  // 此处需要将表头跟表格设计的json进行匹配
  // 第一行数据用于展示导入效果
  verification() {
    const xlsHeader = Object.keys(this.checkedData.header);
    const fieldData = this.columns.filter(item => item.prop);
    // 字段field对象
    this.entity = {};
    // 当前表格设计表头
    const coulmnHeader:any = [];
    // 标记是否校验成功
    let result = false;
    for (const row of fieldData) {
      const { prop, label } = row;
      this.entity[prop] = label;
      coulmnHeader.push(label);
    }
    // 对比模板表头长度和当前表格设计json的列长度
    result = this.checkArr(coulmnHeader, xlsHeader);
    // 如果返回的是数组,则表示校验失败,返回匹配失败列信息
    if (Array.isArray(result)) {
      for (const v of xlsHeader) {
        const header:any = {
          label: v,
        };
        // 找出不包含的列
        if (!coulmnHeader.includes(v)) {
          header.error = true;
        }
        this.xlsHeader.push(header);
      }
      result = false;
    }

    return result;
  }

  // 数组包含校验,判断arr1是否包含了arr2
  // 如果完全包含则返回true
  // 否则返回匹配失败的列
  checkArr(arr1, arr2) {
    const arr3:any = [];
    const arr4:any = [];
    for (let i = 0; i < arr2.length; i += 1) {
      if (arr1.includes(arr2[i])) {
        arr3.push(arr2[i]);
      }
      arr4.push(arr2[i]);
    }
    if (arr3.length === arr2.length) {
      return true;
    }
    return arr4;
  }

  // 确认导入
  confirmImport() {
    this.btnUploadLoading = true;
    const formData = new FormData();
    formData.append('file', this.file.raw);
    formData.append('field', JSON.stringify(this.entity));
    this.axios
      .post(this.uploadUrl, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        if (res.code === 200) {
          this.$message.success(res.message);
        }
        this.visible = false;
        this.$emit('importSuccess');
        this.btnUploadLoading = false;
      })
      .catch((res) => {
        this.guideArr.push({
          label: '上传失败',
          result: 'error',
        });
        this.btnUploadLoading = false;
      });
  }
}
</script>

<style lang='scss' scoped>
.dialog {
  /deep/.el-dialog__body {
    padding-top: 0;
  }
  .upload-demo {
    /deep/.el-upload {
      width: 100%;
      .el-upload-dragger {
        width: 100%;
      }
    }
  }
  .colHeight {
    max-height: 500px;
    overflow: auto;
  }
  .guide_text {
    p {
      span {
        font-size: 14px;
      }
      i {
        float: right;
        margin-right: 5px;
      }
      .result-success-icon {
        color: #4caf50;
      }
      .result-error-icon {
        color: red;
      }
    }
  }
}
</style>
