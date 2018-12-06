<template>
  <div
    id="movie"
    class="app-container">
    <h2>图书查询</h2>
    <el-input
      v-model="criteria"
      placeholder="请输入图书名"
      style="padding-bottom:10px;"
      @keyup.enter.native="search">

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
        label="图书名"
        align="center">
        <template slot-scope="scope">
          <a
            id="name"
            :href="scope.row.alt"
            target="_blank">{{ scope.row.title }}</a>
        </template>
      </el-table-column>

      <el-table-column
        label="作者"
        align="center">
        <template slot-scope="scope">
          <el-tag
            type="danger"
            style="margin-right:5px;margin-top:5px">{{ scope.row.author }}</el-tag>

        </template>
      </el-table-column>
      <el-table-column
        label="发行日期"
        align="center">

        <template slot-scope="scope">
          {{ scope.row.pubdate }}
        </template>
      </el-table-column>
      <el-table-column
        label="售价"
        align="center">

        <template slot-scope="scope">

          {{ scope.row.price }}
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
        label="海报"
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
  name: 'Book',
  data() {
    return {
      // 表格当前页数据
      tableData: null,
      // 请求的URL
      url: '/douban/book/search',
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
        .get(`${this.url}?q=${criteria}&count=20`)
        .then(
          (response) => {
            console.log(response.data)
            this.tableData = response.data.books
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
