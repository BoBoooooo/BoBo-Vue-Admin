<template>
  <div>
    <CrudTable
      tableName="six_staff"
      toolbarButton="add,clear,search"
      handleButton="edit,delete"
      :remoteFunctions="remoteFunctions"
    ></CrudTable>
  </div>
</template>
<script>

export default {
  name: 'Staff',
  data() {
    return {
      remoteFunctions: {
        funcGetDept: () => this.crud('list', 'dept'),
      },
    }
  },

};
</script>
