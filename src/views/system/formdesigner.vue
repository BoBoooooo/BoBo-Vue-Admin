<template>
  <div id="formdesigner" ref="container" class="widget-box">
    <makingform ref="form"/>
  </div>
</template>

<script>
import makingform from '@/components/FormDesigner/Container';

export default {
  name: 'Formdesigner',

  components: {
    makingform,
  },
  data() {
    return {};
  },
};
</script>
<style scoped>
</style>
