<!--
 * @file: 公告管理
 * @copyright: NanJing Anshare Tech .Com
 * @author: BoBo
 * @Date: 2019年12月17日19:31:49
 -->

<template>
  <div class="page-container">
    <CrudTable tableName="reminder_center"
               :visibleList="{
                 tableTitle:false,
                 btnExport:false
               }"
               :tableParams="{
                 userid:userid
               }"
               :prefill="{
                 userid:userid
               }"
               :remoteFuncs="remoteFuncs"
               :textMap="{
                 add:'发布',
                 edit:'编辑',
                 detail:'查看'
               }"
               fullHeight>
    </CrudTable>
  </div>
</template>
<script>
import { crud, DML } from '@/api/public/crud';

export default {
  name: 'Article',
  data() {
    return {
      userid: this.$store.getters.userid,
      remoteFuncs: {
        funcGetDeptTree(resolve) {
          crud(DML.TREE, 'dept').then((res) => {
            resolve(res.data);
          });
        },
      },
    };
  },
};
</script>
