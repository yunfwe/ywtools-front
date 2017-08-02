<template>
  <div id="vhome" class="">
    <vheader></vheader>
    <vside></vside>
    <div id="content" class="layui-body layui-tab-content">
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
#content {
  top: 60px;
  left: 220px;
}
</style>
