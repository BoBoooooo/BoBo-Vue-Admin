<!--
 * @file: 消息盒子
 * @copyright: NanJing Anshare Tech .Com
 * @author: BoBo
 * @Date: 2019年12月13 17:08:17
 -->
<template>
  <div class="container">
    <el-dialog top="10vh"
               class="dialog"
               title="消息中心"
               append-to-body
               :visible.sync="dialogVisible"
               v-if="dialogVisible"
               :before-close="()=>$emit('close')"
               width="70%">
      <div slot="title"
           style="color:white"
           class="clearfix">
        <span>消息中心</span>
      </div>

      <el-card class="box-card full-height"
               shadow="hover">
        <el-row class="box_container full-height">
          <el-col :span="5"
                  class="left_container full-height">
            <div class="leftItem"
                 @click="tabClick('notification')"
                 :class="{
              active:activeName === 'notification'
            }">

              <svgIcon class="left_icon"
                       icon-class="message_icon"></svgIcon><span>公告通知事项 ({{totalArticle}})</span>
            </div>
          </el-col>

          <el-col :span="19"
                  v-show="activeName === 'notification'"
                  class="right_container full-height"
                  :infinite-scroll-disabled="disabledArticle"
                  v-infinite-scroll="getMessageList">
            <div class="rightItem"
                 v-for="(item, index) in messageList"
                 :key="index">
              <p class="top_time">
                {{ item.startTime }}
              </p>
              <el-card shadow="never"
                       class="right_card"
                       @click.native="openArticleDialog(item)">
                <h3>
                  [{{item.type}}] {{ item.title }}
                </h3>
                <div class="bottom">
                  <span>发布人: {{ item.realname }} ({{item.deptname}})</span>
                  <span>发布时间: {{ item.sendtime }}</span>
                </div>
                <el-divider></el-divider>
                <div class="footer">
                  <span>
                    阅读详情
                  </span>
                  <i class="el-icon el-icon-arrow-right"></i>
                </div>
              </el-card>
            </div>
            <div class="noMore">
              <span v-if="loadingArticle">加载中...</span>
              <span v-else-if="noMoreArticle">
                没有更多啦...
              </span>
            </div>
          </el-col>
        </el-row>
      </el-card>
    </el-dialog>

    <ArticleDialog ref="articleDialog"></ArticleDialog>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import { crud, DML } from '@/api/public/crud';
import ArticleDialog from '@/components/BaseDialog/ArticleDialog.vue';

export default {
  name: 'boxDialog',
  data() {
    return {
      dialogVisible: this.visible,
      dialogArticleVisible: false,
      messageList: [],
      waitList: [],
      activeName: 'notification',
      loadingArticle: false,
      pageIndex: 0,
      pageIndexArticle: 0,
      countArticle: 0,
      totalArticle: 0,
    };
  },
  components: {
    ArticleDialog,
  },
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapGetters(['menuNum', 'serverData']),

    disabledArticle() {
      return this.loadingArticle || this.noMoreArticle;
    },
    noMoreArticle() {
      return this.countArticle >= this.totalArticle;
    },
  },

  created() {
    this.getMessageList();
  },
  methods: {
    tabClick(name) {
      this.activeName = name;
    },
    showModal() {
      this.dialogVisible = true;
    },
    showDialog() {
      this.dialogVisible = true;
    },
    openArticleDialog(item) {
      this.$refs.articleDialog.showDialog(item);
    },
    getMessageList(reload = false) {
      if (reload) {
        this.pageIndexArticle = 0;
        this.countArticle = 0;
      }
      this.loadingArticle = true;
      crud(DML.SELECT, 'reminder_center', {
        orderCondition: 'sendtime desc',
        pageIndex: this.pageIndexArticle + 1,
        pageSize: 5,
        searchCondition: [
          {
            field: 'receivedeptid',
            operator: 'like',
            value: this.$store.getters.deptid,
          },
        ],
      }).then((res) => {
        const { length } = res.data.list;
        this.totalArticle = res.data.total;
        if (length > 0) {
          if (reload) {
            this.messageList = res.data.list;
          } else {
            this.messageList = this.messageList.concat(res.data.list);
          }
          this.countArticle += length;
          this.pageIndexArticle += 1;
        }
        this.loadingArticle = false;
      });
    },

  },
};
</script>
<style lang="scss" scoped>
.dialog {
  /deep/.el-dialog__header{
    background:#3f51b5;
  }
  /deep/.el-dialog__body {
    padding: 0;
    height: 70vh;
  }
}
.box-card {
  /deep/.el-card__body {
    padding: 0;
    height: 100%;
  }
}
.left_container {
  background: white;
  .active {
    background: #f1f3fd;
  }
  .leftItem {
    cursor: pointer;
    padding: 7px 10px 7px 15px;
    margin-top: -1px;
    border-top: 1px solid #e6e6e6;
    border-bottom: 1px solid #e6e6e6;
    .left_icon {
      vertical-align: -12px;
      width: 2.5em;
      height: 2.5em;
    }
    span {
      font-size: 15px;
      margin-left: 10px;
    }
  }
}
.right_container {
  background: #f9f9f9;
  padding: 15px;
  height: 100%;
  h3 {
    color: #666;
  }
  overflow: auto;
  .noMore {
    text-align: center;
    color: #9f9f9f;
    margin-top: 15px;
  }
  .top_time {
    text-align: center;
    color: #999;
  }
  .right_card {
    padding: 10px;
    cursor: pointer;
    &:hover {
      box-shadow: 0 1px 1px 0 rgba(60, 64, 67, 0.08), 0 1px 3px 1px rgba(60, 64, 67, 0.16) !important ;
    }
    .bottom {
      margin-top: 50px;
      color: #999;
      span {
        display: block;
      }
    }
    .footer {
      margin-top: -10px;
      overflow: hidden;
      span {
        float: left;
      }
      i {
        float: right;
      }
    }
  }
}
</style>
