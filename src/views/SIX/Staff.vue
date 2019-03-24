<template>
  <div>
    <CrudTable
      tableName="six_staff"
      toolbarButton="add,clear,search"
      handleButton="edit,delete"
      :remoteFunctinos="remoteFunctinos"
    ></CrudTable>
  </div>
</template>
<script>
export default {
  name: 'Staff',
  data() {
    return {
      remoteFunctinos: {
        funcGetStaff() {
          return this.crud('list', 'six_staff', { pageSize: 100 })
        },
      },
    }
  },
};
</script>
