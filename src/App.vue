<template>
  <section id="app" class="content">
    <div class="container">
      <div :class="{ modal: true, 'is-active': !interact }">
        <div class="modal-background"></div>
        <div class="modal-content">
          <button class="button is-primary is-large" @click="interact = true">
            Iniciar
          </button>
        </div>
      </div>
      <div v-if="!isConnected">
        <div class="tile is-ancestor">
          <article class="tile is-child notification is-primary">
            <p class="title">Conexión perdida</p>
            <p class="subtitle"></p>
          </article>
        </div>
      </div>
      <!--<div v-else-if="sensorDesconectado">
      <article class="tile is-child notification is-info">
        <p class="title">Sensor Desconectado</p>
        <p class="subtitle"></p>
      </article>
    </div>-->

      <Signals
        v-else
        :spo2_v="values.spo2_v"
        :spo2="values.spo2"
        :hr_v="values.hr_v"
        :hr="values.hr"
        :ir="values.ir"
        :red="values.red"
      />
    </div>
    <div>
      <div class="raw-data">
        <div>
          Red: <span>{{ values.red }}</span>
        </div>
        <div>
          IR: <span>{{ values.ir }}</span>
        </div>
        <span
          class="icon is-large"
          style="cursor: pointer"
          @click="showSettings = !showSettings"
        >
          <i class="fas fa-2x fa-cog"></i>
        </span>
      </div>
    </div>
    <settings @show-settings="showSettings = false" :show="showSettings" />
  </section>
</template>

<script>
import Signals from './components/Signals'
import Settings from './components/Settings'
export default {
  name: 'App',
  components: {
    Signals,
    Settings
  },
  data() {
    return {
      isConnected: true,
      sensorDesconectado: false,
      values: {
        hr: 0,
        hr_v: false,
        ir: 0,
        red: 0,
        spo2: 0,
        spo2_v: false,
        t: 0
      },
      old_valid: { spo2: [false, false, false], hr: [false, false, false] },
      showSettings: false,
      interact: false
    }
  },
  mounted() {
    setInterval(() => {
      const recentValidHr = this.old_valid.hr.some((v) => v)
      const recentValidSpo2 = this.old_valid.spo2.some((v) => v)
      if (!recentValidSpo2 && !recentValidHr) {
        this.sensorDesconectado = true
      } else {
        this.sensorDesconectado = false
      }
    }, 3 * 1000)
  },
  sockets: {
    connect() {
      // Fired when the socket connects.
      this.isConnected = true
    },

    disconnect() {
      this.isConnected = false
    },
    // Fired when the server sends something on the "data" channel.
    data(data) {
      this.values = data
      this.old_valid.spo2.push(data.spo2_v)
      this.old_valid.hr.push(data.hr_v)
      if (this.old_valid.spo2.length >= 100) {
        this.old_valid.spo2.shift()
      }
      if (this.old_valid.hr.length >= 100) {
        this.old_valid.hr.shift()
      }
    }
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@300;400;600;700&display=swap');

#app {
  font-family: 'Nunito Sans', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2d2f31;
  height: 100vh;
  width: 100vw;
  //margin-top: 60px;
  padding: 50px 50px 0 50px;
  display: flex;
  flex-direction: column;
}
span.subscript {
  vertical-align: sub;
}
.signals {
  width: 100%;
  .container {
    height: 300px;
  }
}

div.raw-data {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  font-size: 0.75rem;
  position: fixed;
  bottom: 0;
  left: 0;
  //margin: 0 20px;
  min-width: 100%;
  max-height: 30px;
  margin-bottom: 10px;
  /*div {
    width: 100px;
    margin-left: 24px;
  }*/
}

.alert {
  font-size: 4em;
  &.warning {
    color: #ffc72e;
    text-shadow: black;
  }
  &.danger {
    color: #f14668;
    font-size: 6em;
  }
  &.emergency {
    color: #ff0000;
    font-size: 6em;
  }
}
</style>
