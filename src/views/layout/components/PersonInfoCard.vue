<!--
 * @file: 当前用户个人信息card
 * @copyright: BoBo
 * @author: BoBo
 * @Date: 2020年02月20 10:02:20
 -->

<!-- 组件说明 -->
<template>
  <div class="container">
    <el-dialog
      v-if="visible"
      ref="actiondialog"
      title="个人信息"
      :visible.sync="visible"
      append-to-body
      width="30%"
      :before-close="
        () => {
          visible = false;
        }
      "
      class="dialog"
    >
      <el-row class="row-container" :gutter="15">
        <el-col :span="11" class="col" :offset="1">
          <el-upload
            class="avatar-uploader"
            :action="uploadUrl"
            :show-file-list="false"
            :headers="{ auth: token }"
            :data="{
              type: '1',
              userid: userid,
            }"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-col>
        <el-col :span="11" class="col">
          <svgIcon class="icon" icon-class="dashboard-person"></svgIcon>
          <p style="margin-top: 0">用户: {{ this.$store.getters.realname }}</p>
          <p>部门: {{ $store.getters.deptname }}</p>
          <p>角色: {{ this.$store.getters.rolename }}</p>
        </el-col>
      </el-row>
      <div slot="footer" class="footer">
        <div @click="changePassword"><i class="el-icon-s-tools icon"></i>修改密码</div>
      </div>
    </el-dialog>

    <ChangePasswordDialog ref="passwordDialog"></ChangePasswordDialog>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { Getter } from 'vuex-class';
import ChangePasswordDialog from '@/components/ChangePasswordDialog/ChangePasswordDialog.vue';

@Component({
  name: 'PersonInfoCard',
  components: {
    ChangePasswordDialog,
  },
})
export default class PersonInfoCard extends Vue {
  @Getter photo!: string;

  @Getter userid!: string;

  @Getter token!: string;

  $refs!: {
    passwordDialog: HTMLFormElement;
  };

  visible = false;

  visibleMember = false;

  imageUrl = '';

  created() {
    this.imageUrl = this.photo;
  }

  get uploadUrl() {
    return `${window.__HOST__URL__ + window.__PREFIX__URL__}users/uploadImage`;
  }

  showDialog(param = {}) {
    this.visible = true;
  }

  changePassword() {
    this.$refs.passwordDialog.showDialog();
  }

  handleAvatarSuccess(res, file) {
    this.imageUrl = res.data;
    this.$store.commit('SET_PHOTO', res.data);
  }

  beforeAvatarUpload(file) {
    const isJPG = file.type === 'image/jpeg';
    const isLt2M = file.size / 1024 / 1024 < 2;

    if (!isJPG) {
      this.$message.error('上传头像图片只能是 JPG 格式!');
    }
    if (!isLt2M) {
      this.$message.error('上传头像图片大小不能超过 2MB!');
    }
    return isJPG && isLt2M;
  }
}
</script>

<style lang="scss" scoped>
.row-container {
  height: 120px;
  .col {
    height: 100%;
    .icon {
      width: 5em;
      position: absolute;
      top: -20px;
      right: 0;
      opacity: 0.2;
      height: 5em;
    }
  }
}
.cancelIcon {
  color: Red;
  cursor: pointer;
}
.avatar-uploader {
  ::v-deep.el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    display: block;
    width: 100px;
    height: 100px;
    margin: 0 auto;
    position: relative;
    overflow: hidden;
    &:hover {
      border-color: #409eff;
    }
  }
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
}
.avatar {
  width: 100px;
  height: 100px;
  display: block;
}

.footer {
  & > div {
    cursor: pointer;
    display: inline-block;
    width: 50%;
    text-align: center;
  }
}
</style>
