<template>
  <div
    id="person_count"
    style="width:100%">
    <mix-chart
      id="chart1"
      width="100%"
      height="600px" />
    <line-marker
      id="chart2"
      width="100%"
      height="600px" />
    <keyboard
      id="chart3"
      width="100%"
      height="600px" />
  </div>
</template>

<script>
import mixChart from '@/components/Charts/mixChart'
import lineMarker from '@/components/Charts/lineMarker'
import keyboard from '@/components/Charts/keyboard'

export default {
  name: 'PersonCount',
  components: {
    mixChart,
    lineMarker,
    keyboard,
  },
  data() {
    return {}
  },
}
</script>

<style lang="scss" scoped>
</style>
