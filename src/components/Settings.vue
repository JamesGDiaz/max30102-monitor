<template>
  <div :class="{ modal: true, 'is-active': show }" style="z-index: 999">
    <div class="modal-background"></div>
    <div class="modal-content">
      
      <div class="block field is-horizontal">
        <div class="field-label is-normal">
          <label class="label">Alerta superior %SpO2</label>
        </div>
        <div class="field-body">
          <div class="field">
            <p class="control has-icons-right">
              <input
                :class="{
                  input: true,
                  'is-success': !isNaN(alertaSuperior),
                  'is-danger': isNaN(alertaSuperior)
                }"
                type="text"
                value="90"
                v-model="alertaSuperior"
              />
            </p>
          </div>
        </div>
      </div>
      <div class="block field is-horizontal">
        <div class="field-label is-normal">
          <label class="label">Alerta inferior %SpO2</label>
        </div>
        <div class="field-body">
          <div class="field">
            <p class="control">
              <input
                :class="{
                  input: true,
                  'is-success': !isNaN(alertaInferior),
                  'is-danger': isNaN(alertaInferior)
                }"
                v-model="alertaInferior"
                type="text"
                value="80"
              />
            </p>
          </div>
        </div>
      </div>
      <!--<div class="block">
        <label class="checkbox">
          <input type="checkbox" v-model="theme" />
          Modo Oscuro
        </label>
      </div>-->
      <button class="block button is-success" v-on:click="saveSettings">
        Aplicar
      </button>
      <div v-if="error" class="block notification is-danger is-light">
        Error en las opciones
      </div>
    </div>
    <button
      block
      class="modal-close is-large"
      aria-label="close"
      v-on:click="$emit('show-settings', false)"
    ></button>
  </div>
</template>

<script>
export default {
  name: 'Settings',
  props: {
    show: Boolean
  },
  data() {
    return {
      alertaSuperior: localStorage.getItem('alertaSuperior') || 90,
      alertaInferior: localStorage.getItem('alertaInferior') || 80,
      darkTheme: localStorage.getItem('darkTheme') || false
    }
  },
  computed: {
    error() {
      return isNaN(this.alertaSuperior) || isNaN(this.alertaInferior)
    }
  },
  methods: {
    setSetting(name, value) {
      localStorage.setItem(name, value)
    },
    saveSettings() {
      this.setSetting('alertaSuperior', this.alertaSuperior)
      this.setSetting('alertaInferior', this.alertaInferior)
      window.location.reload()
    }
  }
}
</script>

<style lang="scss">
.modal {
  label {
    color: #fefefe;
  }
}
.modal-content {
  //background: #fefefe;
  //border-radius: 16px;
  padding: 2em;
}
</style>