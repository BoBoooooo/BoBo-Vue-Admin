<template>
  <div
    id="movie"
    class="app-container">
    <h2>音乐查询</h2>
    <el-input
      v-model="criteria"
      placeholder="请输入歌名"
      style="padding-bottom:10px;"> @keyup.enter.native="search">

      <el-button
        slot="append"
        icon="el-icon-search"
        @click="search" />
    </el-input>
    <el-table
      v-loading.body="listLoading"
      :data="tableData"
      empty-text="暂无数据"
      element-loading-text="拼命加载中"
      fit
      highlight-current-row>

      <el-table-column
        label="歌名"
        align="center">
        <template slot-scope="scope">
          <a
            id="name"
            :href="scope.row.alt"
            target="_blank">{{ scope.row.title }}</a>
        </template>
      </el-table-column>
      <el-table-column
        label="歌手"
        align="center">
        <template slot-scope="scope">
          <el-tag
            v-for="(item,index) in scope.row.attrs.singer"
            :key="index"
            type="primary"
            style="margin-right:5px">{{ item }}</el-tag>

        </template>
      </el-table-column>

      <el-table-column
        label="描述"
        align="center">
        <template slot-scope="scope">
          <el-tag
            v-if="scope.row.alt_title.length>0"
            type="danger"
            style="margin-right:5px;margin-top:10px">{{ scope.row.alt_title }}</el-tag>

        </template>
      </el-table-column>

      <el-table-column
        label="豆瓣评分"
        align="center">

        <template slot-scope="scope">

          <el-rate
            v-model="scope.row.rating.average"
            disabled
            show-score
            text-color="#ff9900"
            score-template="{value}" />
        </template>
      </el-table-column>
      <el-table-column
        label="封面"
        align="center">
        <template slot-scope="scope">
          <img
            :src="getImage(scope.row.image)"
            style="height:100px">
        </template>
      </el-table-column>

    </el-table>

  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Music',

  data() {
    return {
      // 表格当前页数据
      tableData: null,
      // 请求的URL
      url: '/douban/music/search',
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
    }
  },

  methods: {
    // 从服务器读取数据
    loadData(criteria) {
      axios
        .get(`${this.url}?q=${criteria}&count=100`)
        .then(
          (response) => {
            this.tableData = response.data.musics
            this.listLoading = false
            this.totalCount = response.data.total
          },
          () => {
            console.log('failed')
          },
        )
    },
    getImage(url) {
      if (url !== undefined) {
        // eslint-disable-next-line no-useless-escape
        return url.replace('http:\/\/', 'https://images.weserv.nl/?url=')
      }
    },
    search() {
      this.loadData(this.criteria, this.currentPage, this.pagesize)
    },

  },
}

</script>
