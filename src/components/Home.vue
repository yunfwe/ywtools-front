<template>
  <div id="vhome">
    <vheader></vheader>
    <vside></vside>
    <div id="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import vheader from './Header.vue'
import vside from './Side.vue'
export default {
  name:'vhome',
  components:{
    vheader,
    vside,
  }
}
</script>

<style>
#content{
  position: absolute;
  top: 70px;
  left: 220px;
}
</style>
