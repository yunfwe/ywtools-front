<template>
  <div id="vhostscan">
    <h1>局域网主机扫描工具</h1>
    <form @submit.prevent="onSubmit()"  class="layui-form">
        <div class="layui-inline">
          <div class="layui-input-inline">
            <input type="text" name="iprange" placeholder="输入单个IP或者网段"
                   class="layui-input">
          </div>
          <div class="layui-input-inline">
            <button type="submit" class="layui-btn">扫描</button>
          </div>
        </div>
    </form>
    <div v-for="item in iprst" class="result">
      IP: {{item.ip}}  result:{{item.result}}
    </div>
  </div>
</template>
<script>
  export default {
    name:'vhostscan',
    data: ()=>{
        return {
            iprst:[
              {ip:'192.168.1.1', result:true},
              {ip:'192.168.1.3', result:false},
              {ip:'192.168.1.4', result:true},
              {ip:'192.168.1.5', result:false},
              {ip:'192.168.1.1', result:true},
              {ip:'192.168.1.3', result:false},
              {ip:'192.168.1.4', result:true},
              {ip:'192.168.1.5', result:false},
              {ip:'192.168.1.1', result:true},
              {ip:'192.168.1.3', result:false},
              {ip:'192.168.1.4', result:true},
              {ip:'192.168.1.5', result:false},
              {ip:'192.168.1.1', result:true},
              {ip:'192.168.1.3', result:false},
              {ip:'192.168.1.4', result:true},
              {ip:'192.168.1.5', result:false},
              {ip:'192.168.1.1', result:true},
              {ip:'192.168.1.3', result:false},
              {ip:'192.168.1.4', result:true},
              {ip:'192.168.1.5', result:false},
              {ip:'192.168.1.1', result:true},
              {ip:'192.168.1.3', result:false},
              {ip:'192.168.1.4', result:true},
              {ip:'192.168.1.5', result:false},
            ]
        }
    },
    methods:{
      onSubmit:function () {

      }
    }
  }
</script>
<style scoped>
  .layui-btn{
    padding: 0 10px;
  }
  .layui-input-inline{
    float: left;
  }

  h1 {
    font-size: 24px;
    margin: 20px 0 20px 0;
  }

  .result{
    margin-top: 20px;
  }
</style>
