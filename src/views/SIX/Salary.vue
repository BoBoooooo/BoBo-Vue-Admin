<template>
  <div>
    <CrudTable
      tableName="six_salary"
      toolbarButton="add,clear,search"
      handleButton="edit,delete"
      :remoteFunctions="remoteFunctions"
    ></CrudTable>
  </div>
</template>
<script>
import crud from '@/api/Public/crud.js'

export default {
  name: 'Salary',
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
