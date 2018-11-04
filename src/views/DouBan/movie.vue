<template>
  <div class="app-container" id="movie">
    <h2>近期热映电影</h2>
    <el-table :data="tableData" v-loading.body="listLoading" element-loading-text="拼命加载中" fit highlight-current-row>
      <el-table-column align="center" label='上映年份' width="95">
        <template slot-scope="scope">
          {{scope.row.year}}
        </template>
      </el-table-column>
      <el-table-column label="电影名" align="center">
        <template slot-scope="scope">
          <a :href="scope.row.alt" target="_blank" id="name">{{scope.row.title}}</a>
        </template>
      </el-table-column>
      <el-table-column label="类型" align="center">
        <template slot-scope="scope">
          <el-tag :key="index" type="primary" v-for="(item,index) in scope.row.genres" style="margin-right:5px;margin-top:5px">{{item}}</el-tag>

        </template>
      </el-table-column>

      <el-table-column label="主演" align="center" min-width="100px">
        <template slot-scope="scope">
          <el-tag :key="index" type="danger" v-for="(item,index) in scope.row.casts" style="margin-right:5px;margin-top:5px">{{item.name}}</el-tag>

        </template>
      </el-table-column>
      <el-table-column label="豆瓣评分" align="center">

        <template slot-scope="scope">

          <el-rate v-model="scope.row.rating.average"  disabled show-score text-color="#ff9900" score-template="{value}">
          </el-rate>
        </template>
      </el-table-column>
      <el-table-column label="海报" align="center">
        <template slot-scope="scope">
          <img :src="getImage(scope.row.images.small)" style="height:200px">
        </template>
      </el-table-column>

    </el-table>

  </div>
</template>

<script>
  import axios from "axios";
  export default {
        name:"movie",

    data() {
      return {
        //表格当前页数据
        tableData: null,
        //请求的URL
        url: "/douban/movie/in_theaters?city=南京&count=100",
        //下拉菜单选项
        select: "",
        //默认每页数据量
        pagesize: 10,
        //当前页码
        currentPage: 1,
        //查询的页码
        start: 1,
        //默认数据总数
        totalCount: 1000,
        listLoading: true
      };
    },
    created() {
      this.loadData(this.currentPage, this.pagesize);
    },
    methods: {
      //从服务器读取数据
      loadData: function (pageNum, pageSize) {
        axios
          .get(this.url)
          .then(
            response => {

              console.log(response.data)
              this.tableData = response.data.subjects;
              // for(let i = 0 ; i<this.tableData.subjects;i++){
              //     let obj = this.tableData.subjects[i];
              //     obj.rating.averange = (obj.rating.averange/2).toFixed(1);
              // }
              this.listLoading = false;
              this.totalCount = response.data.total;
            },
            function () {
              console.log("failed");
            }
          );
      },
      getImage(url) {
        if (url !== undefined) {
          return  url.replace('http:\/\/', 'https://images.weserv.nl/?url=');
        }
      }


    }
  };

</script>
