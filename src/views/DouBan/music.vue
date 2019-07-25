<template>
  <div id="movie"
       class=" widget-box">

    <section class="u-plhead pylst_header">
      <div class="plhead_bg"
           style="background-image:url(http://music.163.com/api/img/blur/18708190348409091?param=170y170)"></div>
      <div class="plhead_wrap">
        <div class="plhead_fl lsthd_fl"><img class="u-img"
               src="https://p2.music.126.net/GhhuF6Ep5Tq9IEvLsyCN7w==/18708190348409091.webp?imageView&amp;thumbnail=252x0&amp;quality=75&amp;tostatic=0&amp;type=webp"></div>
        <div class="plhead_fr">
          <h2 class="f-thide2 f-brk lsthd_title">云音乐热歌榜</h2>
          <div class="lsthd_auth f-thide">
            <div class="u-avatar lsthd_ava"><img class="u-img"
                   src="http://p1.music.126.net/QWMV-Ru_6149AKe0mCBXKg==/1420569024374784.webp?imageView&amp;thumbnail=60x0&amp;quality=75&amp;tostatic=0&amp;type=webp"><span class="ava-icon ava-icon-v"></span></div>网易云音乐
          </div>
        </div>
      </div>
    </section>

    <el-table v-loading.body="listLoading"
              :data="tableData"
              empty-text="暂无数据"
              element-loading-text="拼命加载中"
              fit
              highlight-current-row>
      <el-table-column label="序号"
                       align="center">
        <template slot-scope="scope">
          {{scope.$index+1}}
        </template>
      </el-table-column>
      <el-table-column label="歌名"
                       align="center">
        <template slot-scope="scope">
          {{scope.row.name}}
        </template>
      </el-table-column>
      <el-table-column label="歌手"
                       align="center">
        <template slot-scope="scope">
          <el-tag type="primary"
                  style="margin-right:5px">{{ scope.row.ar[0].name }}</el-tag>
        </template>
      </el-table-column>
      <!-- <el-table-column label="封面"
                       align="center">
        <template slot-scope="scope">
          <img :src="getImage(scope.row.al.picUrl)"
               style="height:100px">
        </template>
      </el-table-column> -->

    </el-table>

  </div>
</template>

<script>
import axios from 'axios';
import qs from 'qs';

export default {
  name: 'Music',

  data() {
    return {
      // 表格当前页数据
      tableData: null,
      // 请求的URL
      url: '/music/weapi/v3/playlist/detail',
      // 下拉菜单选项
      select: '',
      // 默认每页数据量
      pagesize: 10,
      // 当前页码
      currentPage: 1,
      // 查询的页码
      criteria: '',
      start: 1,
      // 默认数据总数
      totalCount: 1000,
      listLoading: false,
    };
  },
  created() {
    this.loadData(this.criteria, this.currentPage, this.pagesize);
  },
  methods: {
    // 从服务器读取数据
    loadData() {
      const params = {
        params:
          'Bt7jos1UTh79OHOsBKuf1rGUt3QoAQc12qKhQFg0ojo2IGIsRbLekYPMAgfH6ffXeAQ/+1yFEOkIvNwjRCUTHuk7bCnkipe5kisuUTbmghE=',
        encSecKey:
          '257fbf440f8aad17a535030fd43940a2d72946d8582a545fafb46344962add162cdd14ff824b0a983e05fcb4d8a3054f8ef4e2e10f6cc4617c77ba39de410894044698fc8b6ed62218876fb6380166d7acf1dca077b3d99dbff9063eeb62ce3078009563fdafb1bf4b995cf22198a4bc8fd7c3b6c64257972f8c7270b05f864f',
      };
      axios({
        method: 'post',
        url: `${this.url}`,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        },
        data: qs.stringify(params),
      }).then((response) => {
        this.tableData = response.data.playlist.tracks;
        this.listLoading = false;
        this.totalCount = response.data.playlist.trackCount;
      });
    },
    getImage(url) {
      if (url != null && url !== '') {
        // eslint-disable-next-line no-useless-escape
        return url.replace('http://', 'https://images.weserv.nl/?url=');
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.u-plhead {
  position: relative;
  padding: 30px 10px 30px 15px;
  overflow: hidden;
  .plhead_fr {
    -webkit-box-flex: 1;
    -webkit-flex: 1 1 auto;
    -ms-flex: 1 1 auto;
    flex: 1 1 auto;
    width: 1%;
    margin-left: 16px;
  }
  .plhead_bg,
  .plhead_bg:after {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 50%;
    -webkit-filter: blur(20px);
    filter: blur(20px);
    -webkit-transform: scale(1.5);
    -ms-transform: scale(1.5);
    transform: scale(1.5);
  }
  .plhead_wrap {
    display: flex;
    position: relative;
    z-index: 2;
    .plhead_fl {
      width: 200px;
      height: 200px;
      .u-img {
        width: 100%;
        vertical-align: middle;
      }
    }
    .lsthd_title {
      padding-top: 1px;
      font-size: 17px;
      line-height: 1.3;
      color: #fefefe;
      height: 44px;
      display: -webkit-box;
      -webkit-box-pack: center;
    }
  }
  .f-thide2,
  .f-thide3,
  .f-thide4 {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .f-brk {
    word-wrap: break-word;
    white-space: normal;
  }
  .plhead_bg:after {
    content: " ";
    background-color: rgba(0, 0, 0, 0.25);
  }
  .u-avatar > .u-img {
    border-radius: 50%;
    width: 22px;
  }
  .lsthd_link {
    display: inline-block;
    color: hsla(0, 0%, 100%, 0.7);
  }
  .lsthd_auth {
    color: hsla(0, 0%, 100%, 0.7);
    display: block;
    position: relative;
    margin-top: 20px;
  }

  .f-thide {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    word-break: normal;
  }
  .ava-icon {
    position: absolute;
    right: -5px;
    bottom: 0;
    width: 12px;
    height: 12px;
    background-image: url("//s3.music.126.net/mobile-new/img/usericn_2x.png?6423c0681bfb3358d5c684c9b998e412=");
    background-repeat: no-repeat;
    background-size: 75px auto;
  }
  .lsthd_ava {
    display: inline-block;
    height: 30px;
    border-radius: 50%;
    vertical-align: middle;
    margin-right: 5px;
  }
}
</style>
