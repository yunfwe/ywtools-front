<template>
  <div id="vhostscan">
    <h1>局域网主机扫描工具</h1>
    <form @submit.prevent="onSubmit()"  class="layui-form">
        <div class="layui-inline">
          <div class="layui-input-inline">
            <input v-model="iprange" type="text" name="iprange" placeholder="输入单个IP或者网段"
                   class="layui-input" required>
          </div>
          <div class="layui-input-inline">
            <button type="submit" class="layui-btn layui-btn-primary" :class="{'layui-disabled': showLoad}" >
              <i class="layui-icon" style="display: inline-block;font-size: 25px; color: #0f0f0f;">&#xe615;</i>
            </button>
            <!--<button type="submit" class="layui-btn">扫描</button>-->
          </div>
          <div class="layui-input-inline" style="margin-left: 30px" v-if="showLoad">
            <i class="layui-icon layui-anim layui-anim-rotate layui-anim-loop"
               style="display: inline-block;font-size: 25px; color: #0f0f0f;">&#xe63d;
            </i>
          </div>
        </div>
    </form>
    <div class="result">
      <table class="layui-table">
        <colgroup>
          <col width="70">
          <col width="200">
          <col width="150">
          <col>
        </colgroup>
        <thead>
        <tr>
          <th>编号</th>
          <th>IP</th>
          <th>状态</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item,index) in iprst">
          <td>{{index+1}}</td>
          <td>{{item.ip}}</td>
          <td v-if="item.result" style="color: green">online</td>
          <td v-else style="color: red">offline</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
  import urls from '../config/urls'
  export default {
    name:'vhostscan',
    data: ()=>{
        return {
          iprange:'',
          showLoad:false,
          iprst:[
//              {ip:'192.168.1.1', result:true},
//              {ip:'192.168.1.3', result:false},
//              {ip:'192.168.1.4', result:true},
//              {ip:'192.168.1.5', result:false},
//              {ip:'192.168.1.1', result:true},
//              {ip:'192.168.1.3', result:false},
//              {ip:'192.168.1.4', result:true},
//              {ip:'192.168.1.5', result:false},
//              {ip:'192.168.1.1', result:true},
//              {ip:'192.168.1.3', result:false},
//              {ip:'192.168.1.4', result:true},
//              {ip:'192.168.1.5', result:false},
//              {ip:'192.168.1.1', result:true},
//              {ip:'192.168.1.3', result:false},
//              {ip:'192.168.1.4', result:true},
//              {ip:'192.168.1.5', result:false},
//              {ip:'192.168.1.1', result:true},
//              {ip:'192.168.1.3', result:false},
//              {ip:'192.168.1.4', result:true},
//              {ip:'192.168.1.5', result:false},
//              {ip:'192.168.1.1', result:true},
//              {ip:'192.168.1.3', result:false},
//              {ip:'192.168.1.4', result:true},
//              {ip:'192.168.1.5', result:false},
            ]
        }
    },
    methods:{
      onSubmit: async function () {
        if(this.showLoad){
          layui.layer.msg('正在处理 请稍后...',{time:2000});
          return
        }
        layui.layer.msg('请稍后...',{time:1000});
        this.showLoad = true;
        try{
          console.log(urls.WS_PING);
          let ws = new WebSocket(urls.WS_PING);
          ws.onopen = ()=> {
            ws.send(this.iprange);
            this.iprst = []
          };
          ws.onmessage = (data)=>{
              console.log(data.data);
              this.iprst.push(JSON.parse(data.data))
          };
          ws.onerror = ()=>{
            this.showLoad = false;
            layui.layer.msg('网络连接失败',{time:1000})
          };
          ws.onclose = ()=>{
            this.showLoad = false;
//            layui.layer.msg('扫描成功',{time:1000})
          }
        } catch(e) {
          this.showLoad = false;
          layui.layer.msg('网络连接失败',{time:1000})
        }

      }
    },
    mounted:function () {
//      setInterval( ()=> {
//        this.iprst.push({ip:'192.168.1.1',result:true});
//        this.iprst.push({ip:'192.168.1.2',result:false})
//      },100)

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
    width: 400px;
  }
</style>
