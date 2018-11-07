<template>
  <el-transfer
    v-model="selectList"
    :props="{
      key: 'COLUMN_NAME',
      label: 'COLUMN_COMMENT'
    }"
    :data="allList"
    :right-default-checked="already_list">
  </el-transfer>
</template>

<script>
import { getKeyBytableName } from "@/api/system/form";
export default {
  data() {
    return {
      allList: [],
      selectList:[]
    };
  },
  computed:{
      already_list(){
        let arr = [];
        this.data.columnList.forEach(item=>{
          arr.push(item.value)
        })
        return arr
      }

  },
  props: ["data", "tablename"],
  watch: {
    tablename: {
      handler(val) {
        getKeyBytableName(val).then(res => {
          console.log(res);
          this.allList = res.data;

          this.allList.forEach(item => {
            item.COLUMN_NAME = item.COLUMN_NAME.toLowerCase();
          });
        });
      }
    },
    selectList: {
      handler(val) {
        let arr = this.selectList;

        console.log(this.selectList);
        let newarr = [];

        arr.forEach(item => {
            this.allList.forEach(temp => {
              let obj = temp;
              if (obj.COLUMN_NAME == item) {
                newarr.push({
                  label: obj.COLUMN_COMMENT,
                  value: obj.COLUMN_NAME
                });
              }
            });
        });

        this.data.columnList = newarr;
      }
    }
  }
};
</script>