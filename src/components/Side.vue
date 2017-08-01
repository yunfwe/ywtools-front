<template>
  <div id="vside">
    <ul class="layui-nav layui-nav-tree layui-nav-side">
      <li class="layui-nav-item" v-for="item in items" v-if="!item.items">
        <router-link :to="item.to">{{item.name}}</router-link>
      </li>
      <li class="layui-nav-item" v-for="item in items" v-if="item.items">
        <a :href="item.to">{{item.name}}</a>
        <dl class="layui-nav-child">
          <dd v-for="childitem in item.items">
            <router-link :to="childitem.to">{{childitem.name}}</router-link>
          </dd>
        </dl>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name:'vside',
  data: ()=>{
      return {
          items: [
            {name:'仪表盘', to:'/home/monitor'},
            {name:'PXE装机', to:'/home/pxe'},
            {name:'第三个', to:''},
            {name:'集合', items:[
              {name:'集合1', to:'/'},
              {name:'集合2', to:'/'},
              {name:'集合3', to:'/'},
            ]},
            {name:'集合', items:[
              {name:'集合1', to:'/'},
              {name:'集合2', to:'/'},
              {name:'集合3', to:'/'},
            ]}
          ]
      }
  }

}
</script>
<style scoped>
.layui-nav-side {
  border-top:1px solid black;
  top: 60px;
}
</style>
