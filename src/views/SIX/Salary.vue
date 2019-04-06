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

export default {
  name: 'Salary',
  data() {
    return {
      remoteFunctions: {
        funcGetStaff: () => this.crud('list', 'six_staff'),
      },
    }
  },
};
</script>
