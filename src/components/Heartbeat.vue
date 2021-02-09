<template>
  <div class="container column">
    <div class="is-flex is-horizontal-center">
      <h1 class="title is-2">{{ value }} bpm</h1>
      <figure class="image is-128x128">
        <img ref="heart" src="../assets/heart.png" />
      </figure>
    </div>
    <div class="invalid" v-if="!valid"><senal-ruidosa /></div>
  </div>
</template>

<script>
import SenalRuidosa from './SenalRuidosa'
import { gsap } from 'gsap'

let timeline

export default {
  name: 'Heartbeat',
  components: { SenalRuidosa },
  props: { value: Number, valid: Boolean },
  computed: {
    heartbeat() {
      if (!this.valid) return this.value / 6000
      return this.value / 60
    }
  },
  mounted() {
    const { heart } = this.$refs
    timeline = gsap.from(heart, {
      duration: 0.6,
      scale: 1.2,
      repeat: -1,
      repeatDelay: 0.4
    })
  },
  watch: {
    heartbeat(value) {
      timeline.timeScale(value)
    }
  }
}
</script>

<style scoped lang="scss">
.container {
  padding: 1rem;
}
.title {
  margin: 0.6em;
}
div.heart {
  margin: 0;
  img {
    max-width: 400px;
    height: auto;
  }
}
</style>
