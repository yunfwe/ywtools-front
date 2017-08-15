import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home.vue'
import Monitor from '../components/Monitor.vue'
import Home_index from '../components/Home-index.vue'
import Pxe from '../components/PXE.vue'
import Hostscan from '../components/Hostscan.vue'

Vue.use(Router);

export default new Router({
  routes: [
    { path: '/', redirect:'/home/' },
    { path: '/home', name: 'Hello', component: Home, children:[
      { path: '', component: Home_index },
      { path: 'monitor', component: Monitor },
      { path: 'pxe', component: Pxe },
      { path: 'hostscan', component: Hostscan }
    ]}
  ]
})
