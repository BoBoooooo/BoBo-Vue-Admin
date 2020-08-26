<!--
 * @file: 修改密码弹窗
 * @copyright: NanJing Anshare Tech .Com
 * @author: BoBo
 * @Date: 2019年10月16 14:42:32
 -->

<template>
  <el-dialog :title="title"
             :visible.sync="visible"
             width="30%"
             :before-close="handleClose"
             :show-close="showClose">
    <el-form :model="userForm"
             status-icon
             :rules="rules"
             ref="userForm"
             label-width="80px"
             class="demo-userForm">
      <el-form-item label="密码"
                    prop="pass">
        <el-input type="password"
                  v-model="userForm.pass"
                  autocomplete="new-password"></el-input>
      </el-form-item>
      <el-form-item label="确认密码"
                    prop="checkPass">
        <el-input type="password"
                  v-model="userForm.checkPass"
                  autocomplete="new-password"></el-input>
      </el-form-item>
      <el-form-item label="强度"
                    prop="">
        <div class="input_span">
          <span :class="{
              color1: span.color1,
            }"></span>
          <span :class="{
              color2: span.color2,
            }"></span>
          <span :class="{
              color3: span.color3,
            }"></span>
        </div>

        <div id="font">
          <span>弱</span>
          <span>中</span>
          <span>强</span>
        </div>
      </el-form-item>
    </el-form>

    <span slot="footer"
          class="dialog-footer">
      <el-button type="primary"
                 @click="submitForm('userForm')">提交</el-button>
      <el-button @click="resetForm()">重置</el-button>
    </span>
  </el-dialog>
</template>


<script lang="ts">
import {
  Component, Vue, Emit, Watch, Prop,
} from 'vue-property-decorator';
import checkStrong from '@/utils/checkpassStrong';
import { mapGetters } from 'vuex';

@Component({
  computed: {
    ...mapGetters(['config', 'name']),
  },
})
export default class ChangePasswordDialog extends Vue {
  @Prop({
    type: Boolean,
    default: true,
  })
  showClose!: boolean;

  @Prop({
    type: String,
    default: '修改密码',
  })
  title!: string;

  config!: any;

  name!: any;

  visible = false;

  userForm = {
    username: '',
    pass: '',
    checkPass: '',
  };


  rules = {}

  span = {
    color1: false,
    color2: false,
    color3: false,
  };

  $refs!: {
    userForm: HTMLFormElement;
  };

  created() {
    const validatePass = (rule, value, callback) => {
      const { passwordLength } = this.config;
      // eslint-disable-next-line no-useless-escape
      const reg = new RegExp(`^(?=^.{${passwordLength}}$)(?=.*[a-zA-Z])(?=.*\\d)(?=(?:.*?[!@#$%*()_+^&}{:;?.]){1})[A-Za-z\\d!@#$%*()_+^&}{:;?.]`);
      if (value === '') {
        callback(new Error('请输入密码'));
      } else if (!reg.test(value)) {
        const [min, max] = passwordLength && passwordLength.split(',');
        callback(new Error(`至少含有1个数字,1个英文,1个特殊符号,长度最低${min}位,最高${max}位`));
      } else {
        if (this.userForm.checkPass !== '') {
          this.$refs.userForm.validateField('checkPass');
        }
        callback();
      }
    };

    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.userForm.pass) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };

    this.rules = {
      pass: [{ validator: validatePass, trigger: 'blur' }],
      checkPass: [{ validator: validatePass2, trigger: 'blur' }],
    };
  }

  submitForm(formName) {
    this.$refs[formName].validate((valid) => {
      if (valid) {
        this.$store.dispatch('changePassword', {
          username: this.userForm.username,
          password: this.userForm.checkPass,
        });
        return true;
      }
      this.$message.error('密码格式校验失败');
      return false;
    });
  }

  resetForm() {
    this.$refs.userForm.resetFields();
  }

  handleClose() {
    this.$refs.userForm.resetFields();
    this.visible = false;
  }

  showDialog(username) {
    this.visible = true;
    this.userForm.username = username || this.name;
  }

  get password() {
    return this.userForm.pass;
  }

  @Watch('password')
  onChange(newValue) {
    const msgText = checkStrong(newValue);
    if (msgText > 1 || msgText === 1) {
      this.span.color1 = true;
      this.span.color2 = false;
      this.span.color3 = false;
    }
    if (msgText > 2 || msgText === 2) {
      this.span.color1 = true;
      this.span.color2 = true;
      this.span.color3 = false;
    }
    if (msgText === 4) {
      this.span.color1 = true;
      this.span.color2 = true;
      this.span.color3 = true;
    }
    if (msgText === 0) {
      this.span.color1 = false;
      this.span.color2 = false;
      this.span.color3 = false;
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.input_span {
  span {
    display: inline-block;
    width: 33%;
    height: 10px;
    border-radius: 4px;
    background: #eee;
    line-height: 20px;
  }
  span:nth-child(1) {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
  span:nth-child(2) {
    border-radius: 0;
  }
  span:nth-child(3) {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
}

.input_span {
  .color1 {
    background: red !important;
  }
  .color2 {
    background: orange !important;
  }
  .color3 {
    background: #00d1b2 !important;
  }
}
#font {
  margin-top: -15px;
  span {
    width: 33%;
    display: inline-block;
    text-align: center;
  }
}
#font span:nth-child(1) {
  color: red;
}
#font span:nth-child(2) {
  color: orange;
}
#font span:nth-child(3) {
  color: #00d1b2;
}

.isActive {
  left: 36px !important;
  transition: all 0.3s;
}
.el-header {
  background: #3f51b5;
  box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.2), 0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 1px 10px 0 rgba(0, 0, 0, 0.12);
  color: #fff;
  height: 64px;
  position: fixed;
  top: 0;
  right: 0;
  left: 260px;
  z-index: 1000;
  .logo {
    width: 2em;
    height: 2em;
    position: relative;
    top: 0.5em;
  }
  .hamburger-container {
    display: block;
    position: absolute;
    top: 1.3em;
    left: 3em;
    color: #fff;
  }
}

// 姓名及下拉菜单
.user-container {
  top: 1.1em;
  position: absolute;
  right: 30px;
  color: #fff;
  .userName {
    color: #fff;
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
  }
  .icon {
    color: #fff;
    font-size: 28px;
    outline: none;
    margin-left: 30px;
    cursor: pointer;
    vertical-align: -3px;
  }
  .user_icon {
    width: 28px;
    height: 28px;
    margin-left: 30px;
    margin-right: 10px;
    vertical-align: -7px;
  }
}
</style>
