<template>
 <div>
<CrudTable
 :IsMultiple="true"
 tableName="person"
 :entity.sync="entity"
 toolbarButton="add,clear,search"
 handleButton="edit,delete"
 @selection-change="getChange"
 ></CrudTable>
 </div>
</template>
<script>

export default {
  name: 'PersonEdit',
  data() {
    return {
      entity: {}, // 当前表单内实体对象
    }
  },
  methods: {
    getChange(selection) {
      console.log(selection)
    },
  },
}
</script>
