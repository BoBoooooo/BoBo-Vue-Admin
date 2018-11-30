<template>
  <div  class="app-container">
    <el-table v-loading.body="listLoading" :default-sort="{prop: 'name', order: 'descending'}" :data="list" element-loading-text="拼命加载中" border fit highlight-current-row>
      <el-table-column
        v-for="(item,index) in tableJson"
        :key="index"
        :label="item.label"
        :prop="item.prop"
        :align="item.align"
        :sortable="item.sortable"
        :width="item.width"
        :min-width="item.min_width"
        :header-align="item.header_align"
        :show-overflow-tooltip="item.show_overflow_tooltip"
      />
      <el-table-column label="操作" align="center" min-width="110px">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" circle @click="Edit(scope.row.id)" />
          <el-button type="danger" icon="el-icon-delete" circle @click="Delete(scope.row.id)" />
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      style="margin-top:5px"
      layout="total,sizes, prev, pager, next"
      :current-page="listQuery.pageNumber"
      :page-size="listQuery.pageSize"
      :total="listQuery.totalCount"
      :page-sizes="[10, 20, 30]"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />


  </div>

</template>

<script>

export default {
  name: 'BasicTable',
  props:{
    list:{
      type:Array      //展示数据
    },
    tableJson:{
      type:Array      //列表配置json
    },
    listLoading:{     //正在加载
      type:Boolean,
      default:true
    }

  },
  data() {
    return {   
      listQuery: {
        totalCount: 0,
        pageSize: 10,
        pageNumber: 1,
        SearchKey: '',
        SearchValue: ''
      } 
    }
  },

 

  methods: {

    handleSizeChange(val) {
      this.listQuery.pageSize = val
      this.$emit('Refresh',this.listQuery)
    },
    handleCurrentChange(val) {
      this.listQuery.pageNumber = val
      this.$emit('Refresh',this.listQuery)
    },
    Edit(id){
      this.$emit('Edit',id)

    },
     Delete(id){
      this.$emit('Delete',id)

    }

  },
  watch:{
    'list':{
      deep:true,
      immediate:true,
      handler(val){
        this.listQuery.totalCount = val.length||0;
      }
    }
  }

  
}
</script>

<style lang="scss" scoped>
.searchContainer {
    position: absolute;
    top: 62px;
    left: 20px;
    padding: 15px;
    min-height: 100px;
    z-index: 10;
    right: 20px;
    background-color: white;
;    box-shadow: 0px 0px 10px gray;

  }
</style>
