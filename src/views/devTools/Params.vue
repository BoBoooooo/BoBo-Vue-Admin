<!--
 * @file: 参数管理
 * @copyright: NanJing Anshare Tech .Com
 * @author: BoBo
 * @Date: 2020年07月25 15:31:01
-->

<template>
  <div class='container'>
       <CrudTable tableName='ad_codelist'
          :visibleList='{
            tableTitle:false,
          }'
          :tableParams="{
            codeType:'系统配置'
          }"
          tableDesignerName="params"
          dialogFormDesignerName="params"
          fullHeight>
        </CrudTable>
  </div>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator';

@Component({
  name: 'Params',
})
export default class extends Vue {

}
</script>

<style lang='scss' scoped>

</style>
