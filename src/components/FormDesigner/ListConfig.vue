
<template>
<div id="listconfig_container" style="width:100%">

   <el-alert
    title="el-table动态配置规则"
    type="warning"
    description="支持如下配置项,拖拽行可以调整显示列顺序,slot自定义功能未完待续"
    show-icon
    :closable="false"
    style="margin:20px 0">
  </el-alert>

<table class="listconfig_table">
  
<thead>
  <th>字段</th><th>标题</th><th>列宽</th><th>最小宽度</th><th>排序</th><th>内容对齐</th><th>表头对齐</th><th>超出隐藏</th><th>作为查询条件</th><th></th>
</thead>
  <draggable element="tbody" v-model="config.columnList" :options = "{animation:500}" >
                <tr v-for="(item, index) in config.columnList" :key="index">
<td>
      <el-select v-model="item.prop"  placeholder="选择字段名">
        <el-option
         v-for="(subitem, index) in selectList"
             :key="index"
:label="subitem.COLUMN_NAME" :value="subitem.COLUMN_NAME"
        ></el-option>
      </el-select>
</td>
<td>
      <el-input v-model="item.label"  placeholder="列标题"></el-input>

    </td>

    <td>
      <el-input v-model="item.width"  placeholder="列宽(px)"></el-input>

    </td>

    <td>
      <el-input v-model="item.min_width"  placeholder="列最小宽度(px)"></el-input>
    </td>
<td>
      <el-select v-model="item.sortable"  placeholder="排序">
        <el-option label="是" :value="true"></el-option>
        <el-option label="否" :value="false"></el-option>
      </el-select>

    </td>

    <td>
 <el-select v-model="item.align"  placeholder="内容对齐方式">
               <el-option label="居左" value="left"></el-option>
        <el-option label="居中" value="center"></el-option>

        <el-option label="居右" value="right"></el-option>
      </el-select>
    </td>

    <td>
  <el-select v-model="item.header_align"  placeholder="表头对齐方式">
               <el-option label="居左" value="left"></el-option>
        <el-option label="居中" value="center"></el-option>

        <el-option label="居右" value="right"></el-option>
      </el-select>
    </td>

    <td>
  <el-select v-model="item.show_overflow_tooltip"  placeholder="超出隐藏">
               <el-option label="否" :value="false"></el-option>

        <el-option label="是" :value="true"></el-option>
      </el-select>

    </td>
 <td>
  <el-select v-model="item.searchable"  placeholder="作为查询条件">
               <el-option label="否" :value="false"></el-option>

        <el-option label="是" :value="true"></el-option>
      </el-select>

    </td>
   <td> <el-button @click.prevent="removeItem(item)"  type="danger" size="mini" icon="el-icon-minus" circle class="inline_button"></el-button>
</td>
  </tr>
    </draggable>
 
</table>

      <el-button style="margin:0 auto;display:block;margin-top:10px"  size="mini"  type="primary " @click="addItem" circle  icon="el-icon-plus"></el-button>

</div>
</template>

<script>
import Draggable from "vuedraggable";
import { getKeyBytableName } from "@/api/system/form";
export default {
  data() {
    return {
      selectList: [],
      finalList: [],
      configObj:{
        label: "",
        prop: "",
        align:"center",
        sortable:true,
        width:"",
        min_width:"100px",
        header_align:"center",
        show_overflow_tooltip:false,
        slot:"",
        searchable:true
      },
      true:true,
      false:false
    };
  },
  components: {
    Draggable
  },
 
  props: ["tablename", "config"],
  watch: {
    tablename: {
      immediate: true,
      handler(val) {
        getKeyBytableName(this.tablename).then(response => {
          this.selectList = response.data;
          this.selectList.forEach(item => {
            item["COLUMN_NAME"] = item["COLUMN_NAME"].toLowerCase();
          });
        });
      }
    }
  },
  methods: {
    removeItem(item) {
      var index = this.config.columnList.indexOf(item);
      if (index!=null) {
        this.config.columnList.splice(index, 1);
      }
    },
    addItem() {
      this.config.columnList.push({...this.configObj});
    }
  }
};
</script>
<style lang="scss" scoped>

form {
  width: 100%;
}

th{
  font-size: 14px
}
.listconfig_table{
  width:100%;
  overflow-x: auto
}
</style>
