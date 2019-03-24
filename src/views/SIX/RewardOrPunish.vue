<template>
  <div>
    <CrudTable
      tableName="six_rewardorpunish"
      toolbarButton="add,clear,search"
      handleButton="edit,delete"
    ></CrudTable>
  </div>
</template>
<script>
import crud from '@/api/Public/crud.js'

export default {
  name: 'RewardOrPunish',
  data() {
    return {
      remoteFunctions: {
        funcGetStaff() {
          return crud('list', 'six_staff', { pageSize: 100 })
        },
      },
    }
  },
};
</script>
