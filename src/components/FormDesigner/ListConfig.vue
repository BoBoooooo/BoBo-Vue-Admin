
<template>
<div id="listconfig_container" style="width:100%">
   <draggable v-model="config.columnList" :options = "{animation:500}">
            <transition-group>
                <div
    v-for="(item, index) in config.columnList"
    :key="index"
  style="text-align:center;clear:both">

      <el-select v-model="item.key" class="inline" placeholder="选择字段名">
        <el-option
         v-for="(subitem, index) in selectList"
             :key="index"
:label="subitem.COLUMN_NAME" :value="subitem.COLUMN_NAME"
        ></el-option>
      </el-select>

      <el-input v-model="item.label" class="inline" placeholder="输入列标题"></el-input>

    
    <el-button @click.prevent="removeItem(item)"  type="mini" icon="el-icon-minus" circle class="inline_button"></el-button>

  </div>
            </transition-group>
    </draggable>

      <el-button style="margin:0 auto;display:block;margin-top:10px" type="mini" @click="addItem" circle  icon="el-icon-plus"></el-button>

</div>
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
    removeItem(item) {
      var index = this.allList.indexOf(item);
      if (index) {
        this.allList.splice(index, 1);
      }
    },
    addItem() {
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
  width: 150px;
  display: inline-block;
}
.inline_button {
    display: inline-block;

}

form{
  width:100%
}
</style>
