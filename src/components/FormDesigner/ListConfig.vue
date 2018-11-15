
<template>
  

<el-form   ref="dynamicValidateForm" label-width="100px" class="demo-dynamic">

   <draggable v-model="config.columnList" :options = "{animation:500}">
            <transition-group>
                <el-form-item
    v-for="(item, index) in config.columnList"
    :key="index"
  >

      <el-select v-model="item.key" class="inline" placeholder="选择字段名">
        <el-option
         v-for="(subitem, index) in selectList"
             :key="index"
:label="subitem.COLUMN_NAME" :value="subitem.COLUMN_NAME"
        ></el-option>
      </el-select>

      <el-input v-model="item.label" class="inline" placeholder="输入列标题"></el-input>

    
    <el-button @click.prevent="removeDomain(item)" circle icon="el-icon-minus"  class="inline_button"></el-button>

  </el-form-item>
            </transition-group>
    </draggable>

  
  <el-form-item>
    <el-button style="text-align:center" @click="addDomain" circle icon="el-icon-plus"></el-button>
  </el-form-item>
</el-form>
</template>

<script>
import Draggable from 'vuedraggable'
import { getKeyBytableName } from "@/api/system/form";
export default {
  data() {
    return {
      selectList: [],
      finalList:[]
    };
  },
  components:{
    Draggable
  },

  props: ["tablename", "config"],
  watch: {
    tablename: {
      immediate: true,
      handler(val) {
        getKeyBytableName(this.tablename).then(response => {
          this.selectList = response.data;
          this.selectList.forEach(item=>{
            item["COLUMN_NAME"]=item["COLUMN_NAME"].toLowerCase()
          })
        });
      }
    }
  },
  methods: {
    removeDomain(item) {
      var index = this.allList.includes(item);
      if (index) {
        this.allList.splice(index, 1);
      }
    },
    addDomain() {
      this.allList.push({
        label: "",
        key: ""
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.inline {
  float: left;
  width: 150px;
}
.inline_button {
  float: left;
}

form{
  width:100%
}
</style>
