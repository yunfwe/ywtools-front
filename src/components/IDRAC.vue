<template>
  <div id="vidrac" >
    <div style="position: fixed;margin-left: 20px;" class="layui-btn-group">
      <button  class="layui-btn layui-btn-small layui-btn-primary" @click="getAllInfo()">全部刷新</button>
      <br>
      <button class="layui-btn layui-btn-small" @click="powerAll('on')">启动所选</button>
      <br>
      <button class="layui-btn layui-btn-small layui-btn-danger" @click="powerAll('off')">关闭所选</button>
      <br>
      <button class="layui-btn layui-btn-small layui-btn-normal" @click="powerAll('reboot')">重启所选</button>
      <br>
      <button class="layui-btn layui-btn-small layui-btn-warm" @click="powerAll('status')">更新所选</button>
    </div>
    <h1 style="text-align: center">服务器开关机管理</h1>
    <div class="result">
      <table class="layui-table">
        <colgroup>
          <col width="20">
          <col width="60">
          <col width="130">
          <col width="130">
          <col width="130">
          <col width="100">
          <col width="200">
          <col>
        </colgroup>
        <thead>
        <tr>
          <th>
            <input v-if="!selectall"  type="checkbox"  @click="selectAll()">
            <input v-else   type="checkbox"  @click="unselectAll()">
            <!--<input type="checkbox" @click="selectAll()">-->
            <!--<input type="checkbox" @click="unselectAll()">-->
          </th>
          <th>编号</th>
          <th>IP</th>
          <th>IPMI</th>
          <th>位置</th>
          <th>状态</th>
          <th>控制</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item, index) in hosts">
          <td><input type="checkbox" name="checkname" :value="item.id"></td>
          <td>{{index+1}}</td>
          <td>{{item.hostip}}</td>
          <td>{{item.ipmiip}}</td>
          <td>{{item.position}}</td>
          <td v-if="item.status=='on'" style="color: #009688">已开机</td>
          <td v-else-if="item.status=='off'" style="color: #ff5722">已关机</td>
          <td v-else style="color: #ffb800">未知</td>
          <td>
            <div class="layui-btn-group">
              <button class="layui-btn layui-btn-mini" :class="{'layui-disabled': item.status=='on'}"
                      :disabled="item.status=='on'" @click="power(item.id,'on')">开机</button>
              <button class="layui-btn layui-btn-mini layui-btn-danger" :class="{'layui-disabled': item.status=='off'}"
                      :disabled="item.status=='off'" @click="power(item.id,'off')">关机</button>
              <button class="layui-btn layui-btn-mini layui-btn-warm" @click="power(item.id,'reboot')">重启</button>
              <button class="layui-btn layui-btn-mini layui-btn-normal" @click="power(item.id,'status')">状态</button>
            </div>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    name: "vidrac",
    data: ()=>{
      return {
        hosts:[],
        selectall:false,
        tasks:[]
      }
    },
    methods: {
      getAllInfo: function () {
        this.hosts = []
        layui.layer.msg('正在处理 请稍后...',{time:500});
        axios.get(GET_ALL_INFO).then(
             (data)=> {
              let keys = Object.keys(data.data)
              for (let i of keys){
                  window._data_ = data.data
                  let tmp = data.data[i]
                  tmp['id'] = i
                  this.hosts.push(tmp)
              }
            }
        )
      },
      selectAll:function () {
        layui.jquery("input[name='checkname']").each(
            function () {
              layui.jquery(this).prop("checked",true)
            }
        )
        this.selectall = true
      },
      unselectAll:function () {
        layui.jquery("input[name='checkname']").each(
          function () {
            layui.jquery(this).prop("checked", false)
          }
        )
        this.selectall = false
      },
      getSelected:function () {
        let selecteds = []
        layui.jquery("input[name='checkname']").each(
          function () {
            let ceckobj =  layui.jquery(this)
            if (ceckobj[0].checked){
              selecteds.push(ceckobj.val())
            }
          }
        )
        return selecteds
      },
      power: function (id,action) {
        layui.layer.msg('请稍后...',{time:10000});
        axios.post(CONTROL_SYNC, JSON.stringify({id:id,action:action}),
          {headers: {"content-type": "application/json"}}).then(
          (data)=>{
            layui.layer.msg(data.data['result'],{time:2000});
          }
        )
      },

      powerAll:function (action) {
        layui.layer.msg('请稍后...',{time:10000});
        let ids = this.getSelected()
        axios.post(CONTROL_ASYNC, JSON.stringify({id:ids,action:action}),
          {headers: {"content-type": "application/json"}}).then(
          (data)=>{
            if (data.data['status'] === 'ok'){
              layui.layer.msg("请求已成功 后台正在处理",{time:2000});
            }
          }
        )
      },
    },
    mounted: function () {
      this.getAllInfo()
    }
  }
</script>

<style scoped>
  h1 {
    font-size: 24px;
    margin: 20px 0 20px 0;
  }

  .result {
    margin: auto;
    max-width: 1400px;
    min-width: 800px;
    padding-left: 100px;
    padding-right: 100px;
  }
</style>
