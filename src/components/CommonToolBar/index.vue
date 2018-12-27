/* eslint-disable vue/require-valid-default-prop */
<template>
  <div id="toolbar">
    <div
      v-show="buttonVisible=='el-icon-arrow-up'"
      class="searchContainer"
    >
      <ElRow
        v-for="(item,index) in searchArr"
        :key="index"
        style="margin-top:2px"
      >
        <ElCol :span="6">
          <ElSelect
            v-model="item.SearchKey"
            style="width:100%"
            placeholder="请选择查询项"
          >
            <ElOption
              v-for="(subitem,index_) in optionJson.filter(k => k.searchable)"
              :key="index_"
              :label="subitem.label"
              :value="subitem.prop"
            />
          </ElSelect>
        </ElCol>
        <ElCol :span="6">
          <ElSelect
            v-model="item.SearchType"
            style="width:100%"
            placeholder="请选择查询条件"
          >
            <ElOption
              v-for="(subitem__,index__) in SearchType"
              :key="index__"
              :label="subitem__.label"
              :value="subitem__.key"
            />
          </ElSelect>
        </ElCol>

        <ElCol :span="10">
          <ElInput
            v-model="item.SearchValue"
            style="width:100%"
            placeholder="请输入查询内容"
          />
        </ElCol>

        <ElCol
          :span="2"
          style="text-align:center"
        >
 <ElButton
            style="margin:5px 0px 0px 10px;padding:10px"
            type="danger"
            size="mini"
            circle
            icon="el-icon-minus"
            @click="removeItem"
          />

        </ElCol>
      </ElRow>
                <el-tooltip class="item" effect="dark" content="添加查询项" placement="right">

      <ElButton
        style="margin:0 auto;display:block;margin-top:10px"
        type="primary"
        size="mini"
        circle
        icon="el-icon-plus"
        @click="addItem"
      />
                </el-tooltip>

    </div>

    <ElRow style="margin-bottom:10px">
      <ElCol :span="24">
        <ElButtonGroup style="float:right">
           <el-tooltip class="item" effect="light" content="新增" placement="top">
      <el-button  icon="el-icon-plus"
            @click="New()" ></el-button>
    </el-tooltip>

             <el-tooltip class="item" effect="light" content="搜索" placement="top">
      <el-button   icon="el-icon-search"
            @click="Refresh"></el-button>
    </el-tooltip>

<el-tooltip class="item" effect="light" content="刷新" placement="top">
      <el-button    icon="el-icon-refresh"
            @click="ClearOption"></el-button>
    </el-tooltip>

<el-tooltip class="item" effect="light" content="查询条件" placement="top">
      <el-button    :icon="buttonVisible"
            class="buttonVisible"
            @click="changeVisible"></el-button>
    </el-tooltip>


        </ElButtonGroup>
      </ElCol>
    </ElRow>
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
