<template>
  <div
    id="formdesigner"
    ref="container"
    style="padding-top:0px"
  >
    <MakingForm ref="form" />
  </div>
</template>

<script>
import MakingForm from '@/components/FormDesigner/Container';

export default {
  name: 'Formdesigner',

  components: {
    MakingForm,
  },
  data() {
    return {

    }
  },
};
</script>
