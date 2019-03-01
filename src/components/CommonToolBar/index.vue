<template>
  <div id="toolbar">
    <div
      v-show="buttonVisible=='el-icon-arrow-up'"
      class="searchContainer"
    >
      <el-row
        v-for="(item,index) in searchArr"
        :key="index"
        style="margin-top:2px"
      >
        <el-col :span="6">
          <el-select
            v-model="item.SearchKey"
            style="width:100%"
            placeholder="请选择查询项"
          >
            <el-option
              v-for="(subitem,index_) in optionJson.filter(k => k.searchable)"
              :key="index_"
              :label="subitem.label"
              :value="subitem.prop"
            />
          </el-select>
        </el-col>
        <el-col :span="6">
          <el-select
            v-model="item.SearchOperator"
            style="width:100%"
            placeholder="请选择查询条件"
          >
            <el-option
              v-for="(subitem,index) in SearchOperator"
              :key="index"
              :label="subitem.label"
              :value="subitem.key"
            />
          </el-select>
        </el-col>

        <el-col :span="8">
          <el-input
            v-model="item.SearchValue"
            style="width:100%"
            placeholder="请输入查询内容"
          />
        </el-col>

        <el-col
          :span="4"
          style="text-align:center"
        >


      <v-btn  fab dark small color="indigo"  @click="addItem"
>
        <v-icon dark>add</v-icon>
      </v-btn>


         <v-btn fab dark small color="pink"  @click="removeItem"
>
        <v-icon dark>remove</v-icon>
      </v-btn>


        </el-col>
      </el-row>


 <v-btn color="orange" @click="Refresh" style="display:block;margin:0 auto" dark>搜索
          <v-icon dark right>search</v-icon>
        </v-btn>

    </div>

    <el-row style="margin-bottom:10px">
      <el-col :span="24">
        <el-button-group style="float:right">


          <template v-if="toolbarButton.includes('add')">

             <v-btn fab dark small color="indigo">
        <v-icon dark  @click="New()" >add</v-icon>
      </v-btn>

</template>
          <template v-if="toolbarButton.includes('clear')">


  <v-btn fab dark small color="pink"  @click="ClearOption"
>
        <v-icon dark>refresh</v-icon>
      </v-btn>


    </template>

          <template v-if="toolbarButton.includes('search')">

 <v-btn fab dark small color="green"   class="buttonVisible"
            @click="changeVisible"
>
        <v-icon dark>search</v-icon>
      </v-btn>


</template>


        </el-button-group>


      </el-col>
    </el-row>
  </div>
</template>

<script>

export default {
  name: 'CommonToolBar',
  props: {
    optionJson: {
      type: Array, // 展示数据
      default: () => ([]),

    },
    searchArr: {
      type: Array, // 列表配置json
      default: () => ([]),
    },
    toolbarButton: {
      type: String,
      default: 'add,clear,search',
    },
  },
  data() {
    return {
      buttonVisible: 'el-icon-arrow-down',

      SearchOperator: [
        {
          label: '等于',
          key: '=',
        },
        {
          label: '包含',
          key: 'like',
        },
        {
          label: '不等于',
          key: '<>',
        },
        {
          label: '不包含',
          key: 'notlike',
        },
        {
          label: '大于',
          key: '>',
        },
        {
          label: '大于等于',
          key: '>=',
        },
        {
          label: '小于',
          key: '<',
        },
        {
          label: '小于等于',
          key: '<=',
        },
      ],
    }
  },


  methods: {

    removeItem(item) {
      const index = this.searchArr.indexOf(item)
      if (index) {
        this.searchArr.splice(index, 1)
      }
    },
    New() {
      this.$emit('addEvent')
    },
    addItem() {
      this.searchArr.push({
        SearchKey: '',
        SearchValue: '',
        SearchOperator: '',
      })
    },
    changeVisible() {
      if (this.buttonVisible === 'el-icon-arrow-down') { this.buttonVisible = 'el-icon-arrow-up' } else this.buttonVisible = 'el-icon-arrow-down'
    },

    Refresh() {
      this.$emit('searchEvent')
      this.buttonVisible = 'el-icon-arrow-down'
    },
    ClearOption() {
      this.buttonVisible = 'el-icon-arrow-down'
      this.$emit('clearEvent')
    },

  },


}
</script>
<style lang="scss" scoped>
.searchContainer {
    position: absolute;
    top: 72px;
    left: 20px;
    padding: 15px;
    min-height: 100px;
    z-index: 10;
    right: 28px;
    background-color: white;
    box-shadow: 0px 0px 10px gray;

  }


</style>
