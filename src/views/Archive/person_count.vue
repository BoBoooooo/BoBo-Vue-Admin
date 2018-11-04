<template>
  <div id="person_count" style="width:100%">
      <mix-chart id="chart1" width="100%" height="600px" ></mix-chart>
      <line-marker id="chart2"  width="100%" height="600px"></line-marker>
      <keyboard id="chart3"  width="100%" height="600px"></keyboard>
  </div>
</template>

<script>
import mixChart from "@/components/Charts/mixChart";
import lineMarker from "@/components/Charts/lineMarker";
import keyboard from "@/components/Charts/keyboard";

export default {
  name: "person_count",
  data() {
    return {}
  },
  components: {
    mixChart,
    lineMarker,
    keyboard
  }
};
</script>

<style lang="scss" scoped>
</style>
