<template>
  <div class="container">
    <h1
      :class="{
        title: true,
        'is-2': true,
        alert: value <= WARNING_VALUE,
        warning: value <= WARNING_VALUE,
        danger: value <= DANGER_VALUE
      }"
    >
      {{ value.toFixed(0) }}%
    </h1>
    <div class="subtitle is-2">SpO<span class="subscript">2</span></div>
    <progress
      v-show="valid"
      :class="{
        progress: true,
        'is-large': true,
        'is-info': value > WARNING_VALUE,
        'is-warning': value <= WARNING_VALUE && value > DANGER_VALUE,
        'is-danger': value <= DANGER_VALUE
      }"
      :value="value"
      max="100"
    ></progress>
    <progress
      v-show="!valid"
      :class="{
        progress: true,
        'is-large': true,
        'is-info': value > WARNING_VALUE,
        'is-warning': value <= WARNING_VALUE && value > DANGER_VALUE,
        'is-danger': value <= DANGER_VALUE
      }"
      max="100"
    ></progress>
    <div class="invalid" v-if="!valid"><senal-ruidosa /></div>
  </div>
</template>

<script>
import SenalRuidosa from './SenalRuidosa'

var warning_sound = new Audio(require('../assets/audio/chime.mp3'))
warning_sound.volume = 1
warning_sound.loop = true
var danger_sound = new Audio(require('../assets/audio/alert.mp3'))
danger_sound.volume = 1
danger_sound.loop = true

export default {
  name: 'OxygenMonitor',
  components: { SenalRuidosa },
  data() {
    return {
      WARNING_VALUE: localStorage.getItem('alertaSuperior'),
      DANGER_VALUE: localStorage.getItem('alertaInferior')
    }
  },
  props: { value: Number, valid: Boolean },
  watch: {
    value(val) {
      console.log(val)
      if (val <= this.WARNING_VALUE) {
        try {
          if (warning_sound.paused) {
            warning_sound.play()
          }
        } catch (error) {
          void 0
        }
      } else {
        try {
          if (!warning_sound.paused) {
            warning_sound.pause()
          }
        } catch (error) {
          void 0
        }
      }
      if (val <= this.DANGER_VALUE) {
        try {
          if (danger_sound.paused) {
            danger_sound.play()
          }
        } catch (error) {
          void 0
        }
      } else {
        try {
          if (!danger_sound.paused) {
            danger_sound.pause()
          }
        } catch (error) {
          void 0
        }
      }
    }
  }
}
</script>

<style scoped lang="scss"></style>
