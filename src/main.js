// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

import VueSocketIO from 'vue-socket.io'
import SocketIO from 'socket.io-client'

const __production__ = process.env.NODE_ENV === 'development'

const options = {
  path: '/biometrics'
}
const upstream = __production__
  ? 'http://192.168.0.24/biometrics'
  : '/biometrics'
console.log(upstream)
Vue.use(
  new VueSocketIO({
    debug: false,
    connection: SocketIO(upstream),
    options: __production__ ? undefined : options
  })
)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})
