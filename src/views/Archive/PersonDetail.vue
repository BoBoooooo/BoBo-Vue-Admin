<template>
 <div>
<CrudTable tableName="person" toolbarButton="clear,search" handleButton="detail" :setReadOnly="{}"></CrudTable>
 </div>
</template>
<script>

export default {
  name: 'PersonDetail',
}
</script>
