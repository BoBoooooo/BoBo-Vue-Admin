
<template>
  

<el-form   ref="dynamicValidateForm" label-width="100px" class="demo-dynamic">

  <el-form-item
    v-for="(item, index) in allList"
    :key="index"
  >

      <el-select v-model="item.key" class="inline" placeholder="选择字段名">
        <option
         v-for="(item, index) in selectList"
             :key="index"
:label="item.label" :value="item.value"
        ></option>
      </el-select>

      <el-input v-model="item.label" class="inline" placeholder="输入列标题"></el-input>

    
    <el-button @click.prevent="removeDomain(item)" circle icon="el-icon-minus"  class="inline_button"></el-button>

  </el-form-item>
  <el-form-item>
    <el-button @click="addDomain" circle icon="el-icon-plus"></el-button>
  </el-form-item>
</el-form>
</template>

<script>
import { getKeyBytableName } from "@/api/system/form";
export default {
  data() {
    return {
      selectList: []
    };
  },
  props: ["tablename", "allList"],
  watch: {
    tablename: {
      immediate: true,
      handler(val) {
        console.log(222);
        getKeyBytableName(response => {
          this.selectList = response.list;
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
        key: "",
        value: ""
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
</style>
