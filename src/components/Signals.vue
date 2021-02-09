<template>
  <div class="columns">
    <oxygen-monitor class="column" :value="spo2" :valid="spo2_v" />
    <heartbeat class="column" :value="hr" :valid="hr_v" />
    <div class="graph"></div>
  </div>
</template>

<script>
import Heartbeat from './Heartbeat'
import OxygenMonitor from './OxygenMonitor'

export default {
  name: 'Signals',
  components: { OxygenMonitor, Heartbeat },
  props: {
    spo2_v: Boolean,
    spo2: Number,
    hr_v: Boolean,
    hr: Number,
    ir: Number,
    red: Number
  }
}
</script>

<style lang="scss"></style>
