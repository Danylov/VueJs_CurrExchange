import Vue from 'vue'
import App from './App'
import store from './store'

import 'semantic-ui-css/semantic.min.css'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  template: '<App/>',
  components: { App }
})
