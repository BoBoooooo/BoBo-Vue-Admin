<!--
 * @file: 公告查看dialog
 * @copyright: NanJing Anshare Tech .Com
 * @author: BoBo
 * @Date: 2019年12月29日11:40:45
 -->
<template>
  <el-dialog :title="article.title"
             width="90%"
             top="2%"
             class="articleDialog"
             :visible.sync="dialogArticleVisible"
             append-to-body>
    <div class="article">
      <h3>{{article.title}}</h3>
      <div class="top">
        <span>发布人: {{article.realname}}</span>
        <span>发布时间: {{article.sendtime}}</span>
      </div>
      <el-divider></el-divider>
      <div class="content"
           v-html="article.content"></div>
    </div>
  </el-dialog>
</template>
<script>
export default {
  name: 'ArticleDialog',
  data() {
    return {
      dialogArticleVisible: false,
      article: {},
    };
  },
  methods: {
    showDialog(item) {
      this.article = item;
      this.dialogArticleVisible = true;
    },
  },
};
</script>
<style lang="scss" scoped>
.articleDialog {
  /deep/.el-dialog__body {
    height: calc(100% - 116px);
    overflow: auto;
  }
}
.article {
  width: 1200px;
  margin: 0 auto;
  .top {
    text-align: center;
    font-size: 14px;
    font-family: 'Microsoft Yahei';
    color: black;
    span {
      margin-right: 20px;
    }
  }
  h3 {
    font-size: 26px;
    color: #1f5781;
    margin-bottom: 10px;
    margin-top: 0px;
    font-weight: bold;
    text-align: center;
    line-height: 45px;
  }
  .content {
    font-size: 16px;
    font-family: 'Microsoft Yahei';
    line-height: 2;
    color: black;
  }
}
</style>
