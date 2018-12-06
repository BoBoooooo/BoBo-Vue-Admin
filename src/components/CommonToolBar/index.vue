<template>
  <div id="toolbar">
    <div
      v-show="buttonVisible=='el-icon-arrow-up'"
      class="searchContainer">
      <el-row
        v-for="(item,index) in searchArr"
        :key="index"
        style="margin-top:2px">
        <el-col :span="6">
          <el-select
            v-model="item.SearchKey"
            style="width:100%"
            placeholder="请选择查询项">
            <el-option
              v-for="(subitem,index_) in filter_search(optionJson)"
              :key="index_"
              :label="subitem.label"
              :value="subitem.prop" />
          </el-select>
        </el-col>
        <el-col :span="6">

          <el-select
            v-model="item.SearchType"
            style="width:100%"
            placeholder="请选择查询条件">
            <el-option
              v-for="(subitem,index__) in SearchType"
              :key="index__"
              :label="subitem.label"
              :value="subitem.key" />
          </el-select>
        </el-col>

        <el-col :span="10">
          <el-input
            v-model="item.SearchValue"
            style="width:100%"
            placeholder="请输入查询内容" />

        </el-col>

        <el-col
          :span="2"
          style="text-align:center">
          <el-button
            style="margin:5px 0px 0px 10px;padding:10px"
            type="danger"
            size="mini"
            circle
            icon="el-icon-minus"
            @click="removeItem" />

        </el-col>

      </el-row>
      <el-button
        style="margin:0 auto;display:block;margin-top:10px"
        type="primary"
        size="mini"
        circle
        icon="el-icon-plus"
        @click="addItem" />

    </div>

    <el-row style="margin-bottom:10px">

      <el-col :span="24">
        <el-button-group style="float:right">
          <el-button
            icon="el-icon-plus"
            @click="New()" />

          <el-button
            icon="el-icon-search"
            @click="Refresh" />
          <el-button
            icon="el-icon-refresh"
            @click="ClearOption" />

          <el-button
            :icon="buttonVisible"
            class="buttonVisible"
            @click="changeVisible" />
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
      default: () => ({}),

    },
    searchArr: {
      type: Array, // 列表配置json
      default: () => ({}),

    },
  },
  data() {
    return {
      buttonVisible: 'el-icon-arrow-down',

      SearchType: [
        {
          label: '等于',
          key: '=',
        },
        {
          label: '不等于',
          key: '<>',
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
        SearchType: '',
      })
    },
    changeVisible() {
      if (this.buttonVisible === 'el-icon-arrow-down') { this.buttonVisible = 'el-icon-arrow-up' } else this.buttonVisible = 'el-icon-arrow-down'
    },
    filter_search(item) {
      return item.filter(k => k.searchable)
    },
    Refresh() {
      this.$emit('searchEvent')
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
