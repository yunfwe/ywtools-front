import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home.vue'
import Monitor from '../components/Monitor.vue'
import Home_index from '../components/Home-index.vue'
import Pxe from '../components/PXE.vue'
import Hostscan from '../components/Hostscan.vue'
import ServerControl from '../components/ServerControl.vue'
import AssetsShare from '../components/AssetsShare.vue'

Vue.use(Router);

export default new Router({
  routes: [
    { path: '/', redirect:'/home/' },
    { path: '/home', component: Home, children:[
      { path: '', component: Home_index },
      { path: 'monitor', component: Monitor },
      { path: 'pxe', component: Pxe },
      { path: 'hostscan', component: Hostscan },
      { path: 'share', component: AssetsShare },
      { path: 'control', component: ServerControl },
    ]}
  ]
})
