<template>
  <div class="app-container" id="movie">
    <h2>音乐查询</h2>
     <el-input @keyup.enter.native="search" placeholder="请输入歌名" v-model="criteria" style="padding-bottom:10px;">
            
              <el-button slot="append" icon="el-icon-search" v-on:click="search"></el-button>
          </el-input>   
    <el-table empty-text="暂无数据"  :data="tableData" v-loading.body="listLoading" element-loading-text="拼命加载中" fit highlight-current-row>
  
      <el-table-column label="歌名" align="center">
        <template slot-scope="scope">
          <a :href="scope.row.alt" target="_blank" id="name">{{scope.row.title}}</a>
        </template>
      </el-table-column>
 <el-table-column label="歌手" align="center">
        <template slot-scope="scope">
                      <el-tag :key="index" type="primary" v-for="(item,index) in scope.row.attrs.singer" style="margin-right:5px">{{item}}</el-tag>

        </template>
      </el-table-column>

      <el-table-column label="描述" align="center">
        <template slot-scope="scope">
          <el-tag  type="danger" v-if="scope.row.alt_title.length>0"  style="margin-right:5px;margin-top:10px">{{scope.row.alt_title}}</el-tag>

        </template>
      </el-table-column>
        

      <el-table-column label="豆瓣评分" align="center">

        <template slot-scope="scope">

          <el-rate v-model="scope.row.rating.average" disabled show-score text-color="#ff9900" score-template="{value}">
          </el-rate>
        </template>
      </el-table-column>
      <el-table-column label="封面" align="center">
        <template slot-scope="scope">
          <img :src="getImage(scope.row.image)" style="height:100px">
        </template>
      </el-table-column>

    </el-table>

  </div>
</template>

<script>
  import axios from "axios";
  export default {
        name:"music",

    data() {
      return {
        //表格当前页数据
        tableData: null,
        //请求的URL
        url: "/douban/music/search",
        //下拉菜单选项
        select: "",
        //默认每页数据量
        pagesize: 10,
        //当前页码
        currentPage: 1,
        //查询的页码
        criteria:"",
        start: 1,
        //默认数据总数
        totalCount: 1000,
        listLoading: false
      };
    },
   
    methods: {
      //从服务器读取数据
        loadData: function (criteria,pageNum, pageSize) {
        axios
          .get(this.url+"?q="+criteria+"&count=100")
          .then(
            response => {

              console.log(response.data)
              this.tableData = response.data.musics;
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
      },
        search: function() {
      this.loadData(this.criteria, this.currentPage, this.pagesize);
    }



    }
  };

</script>
