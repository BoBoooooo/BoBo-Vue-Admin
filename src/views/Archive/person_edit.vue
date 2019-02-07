<template>
 <div>
          <Tinymce ref="editor" :height="400" v-model="content" />
<crud-table tableName="person" toolbarButton="add,clear,search" handleButton="edit,delete"></crud-table>
 </div>
</template>
<script>
import Tinymce from '@/components/Tinymce'

export default {
  name: 'PersonEdit',
  data() {
    return {
      content: '',
    }
  },
  components: {
    Tinymce,
  },
}
</script>
