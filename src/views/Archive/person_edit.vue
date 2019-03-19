<template>
 <div>
<crud-table
 :IsMultiple="true"
 tableName="person"
 toolbarButton="add,clear,search"
 handleButton="edit,delete"
 @selection-change="getChange"
 ></crud-table>
 </div>
</template>
<script>

export default {
  name: 'person_edit',
  data() {
    return {}
  },
  methods: {
    getChange(selection) {
      console.log(selection)
    },
  },
}
</script>
