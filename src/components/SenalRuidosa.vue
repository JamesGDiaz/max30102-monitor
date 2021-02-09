<template>
  <div class="noisy-wrapper">
    <div ref="noisy" class="noisy">Señal ruidosa</div>
  </div>
</template>

<script>
import { gsap } from 'gsap'

export default {
  data() {
    return {
      timeline: null
    }
  },
  mounted() {
    const { noisy } = this.$refs
    gsap.to(noisy, { duration: 1, scale: 1.3, repeat: -1 })
    gsap.from(noisy, { duration: 1, opacity: 0.5, repeat: -1 })
  }
}
</script>

<style lang="scss">
.noisy-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 100%;
}
.noisy {
  display: inline-block;
  z-index: 2;
  background: rgb(255, 222, 114);
  border: 0px solid rgb(238, 96, 96);
  color: black;
  //opacity: 90%;
  border-radius: 8px;
  padding: 0.5rem 1rem;
  font-weight: bold;
}
</style>
