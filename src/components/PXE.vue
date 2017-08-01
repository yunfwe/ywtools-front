<template>
  <div id="vpxe">
    <div class="title">
      <h1>PXE自动装机服务控制面板</h1>
      <button @click="getStatus()" class="layui-btn layui-btn-small layui-btn-primary update">刷新</button>
    </div>
    <table class="layui-table">
      <colgroup>
        <col width="150">
        <col width="200">
        <col>
      </colgroup>
      <thead>
      <tr>
        <th>端口</th>
        <th>类型</th>
        <th>状态</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="item in ports">
        <td>{{item.port}}</td>
        <td>{{item.type}}</td>
        <td v-if="item.status" style="color: green">Listen</td>
        <td v-else style="color: red">Close</td>
      </tr>
      </tbody>
    </table>
    <table class="layui-table">
      <colgroup>
        <col width="150">
        <col width="200">
        <col>
      </colgroup>
      <thead>
      <tr>
        <th>服务名</th>
        <th>状态</th>
        <th>动作</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="item in processes">
        <td>{{item.name}}</td>
        <td v-if="item.pid">Running ({{item.pid}})</td>
        <td v-else>Stopped</td>
        <td>
          <button class="layui-btn layui-btn-mini" @click="startServe(item.name)">启动</button>
          <button class="layui-btn layui-btn-mini layui-btn-danger" @click="stopServe(item.name)">停止</button>
          <button class="layui-btn layui-btn-mini layui-btn-normal" @click="restartServe(item.name)">重启</button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
  import urls from '../config/urls'
  import dict from '../utils/dict'
  import axios from 'axios'
  export default {
    name: 'vpxe',
    data: function () {
      return {
        processes: [
//          {name:'nginx', 'pid':1190},
//          {name:'dnsmasq', 'pid':1191},
        ],
        ports: [
//          {port:21, type:'udp', status:true},
//          {port:67, type:'tcp/udp', status:false},
//          {port:80, type:'udp', status:true},
        ]
      }
    },
    methods: {
      getStatusQuiet: async function () {
//        let id = layui.layer.load(2);
        let status = await axios.get(urls.PXE_STATUS)
//        layui.layer.close(id)
        this.processes = status.data.processes
        this.ports = status.data.ports
      },
      getStatus: async function () {
        let id = layui.layer.load(2);
        try {
          let status = await axios.get(urls.PXE_STATUS)
          layui.layer.close(id)
          try {
            this.processes = status.data.processes
            this.ports = status.data.ports
            layui.layer.msg('刷新成功', {time: 1000})
          } catch (e) {
            layui.layer.msg('数据格式错误', {time: 1500})
          }
        } catch (e) {
          layui.layer.close(id)
          layui.layer.msg('数据获取失败', {time: 1500})
        }
      },
      startServe: async function (serveName) {
        let id = layui.layer.load(2);
        try{
          let rst = await axios.get(urls.PXE_START_SERVE+serveName)
          layui.layer.close(id)
          if(rst.data.result){
            layui.layer.msg('启动成功', {time: 1000})
            this.getStatusQuiet()
          } else {
            layui.layer.msg('启动失败', {time: 1000})
          }
        } catch(e){
          layui.layer.close(id)
          layui.layer.msg('命令请求失败', {time: 1500})
        }
      },
      stopServe: async function (serveName) {
        let id = layui.layer.load(2);
        try{
          let rst = await axios.get(urls.PXE_STOP_SERVE+serveName)
          layui.layer.close(id)
          if(rst.data.result){
            layui.layer.msg('停止成功', {time: 1000})
            this.getStatusQuiet()
          } else {
            layui.layer.msg('停止失败', {time: 1000})
          }
        } catch(e){
          layui.layer.close(id)
          layui.layer.msg('命令请求失败', {time: 1500})
        }
      },
      restartServe: async function (serveName) {
        let id = layui.layer.load(2);
        try{
          let rst = await axios.get(urls.PXE_RESTART_SERVE+serveName);
          layui.layer.close(id);
          if(rst.data.result){
            layui.layer.msg('重启成功', {time: 1000});
            this.getStatusQuiet()
          } else {
            layui.layer.msg('重启失败', {time: 1000})
          }
        } catch(e){
          layui.layer.close(id);
          layui.layer.msg('命令请求失败', {time: 1500})
        }
      },
    },
    mounted: function () {
      this.getStatus()
    }
  }
</script>
<style scoped>
  #vpxe{
    margin:auto;
  }
  h1 {
    font-size: 24px;
    display: inline-block;
  }

  ul {
    font-size: 18px;
    padding-top: 10px;
    padding-left: 20px;
    padding-bottom: 10px;
  }

  .update {
    float: right;
  }

  .title {
    width: 600px;
    margin-top: 20px;
    margin-bottom: 20px;
  }
</style>
