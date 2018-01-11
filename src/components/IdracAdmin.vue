<template>
  <div id="idrac-admin">
    <h1 style="text-align: center">IDRAC后台管理</h1>
    <div class="content">
      <!--<div class="status">-->
        <!--<form @submit.prevent="getAllInfo(false,searchinfo)" style="display: inline-block;">-->
          <!--<div class="layui-input-inline" title="输入IP地址 支持模糊查询" style="width: 150px;">-->
            <!--<input v-model="searchinfo" type="text" placeholder="请输入IP地址"-->
                   <!--class="layui-input" id="search">-->
            <!--&lt;!&ndash;AUTOCOMPLETE="off"&ndash;&gt;-->
          <!--</div>-->
        <!--</form>-->
        <!--&nbsp&nbsp-->
        <!--<span>总计: <span class="">{{total['on'] + total['off'] + total['unknown']}}</span>&nbsp&nbsp&nbsp&nbsp-->
          <!--已开机: <span style="color: #009688">{{total['on']}}</span>&nbsp&nbsp&nbsp&nbsp-->
          <!--已关机: <span style="color: #ff5722">{{total['off']}}</span>&nbsp&nbsp&nbsp&nbsp-->
          <!--未知: <span style="color: #ffb800">{{total['unknown']}}</span>&nbsp&nbsp&nbsp&nbsp-->
          <!--<span v-if="selecteds.length!==0">已选择: {{selecteds.length}} 个</span>-->
        <!--</span>-->

        <!--<i class="layui-icon layui-anim layui-anim-rotate layui-anim-loop load"-->
           <!--v-if="showLoad" title="后台任务正在进行">&#xe63d;-->
        <!--</i>-->
        <!--<div class="filter">-->
          <!--结果筛选：-->
          <!--<div class="parent">-->
            <!--<select name="filter" id="filter">-->
              <!--<option>全部状态</option>-->
              <!--<option>已开机</option>-->
              <!--<option>已关机</option>-->
              <!--<option>未知</option>-->
              <!--<option>已选择</option>-->
              <!--&lt;!&ndash;<option v-if="searchinfo" selected>自定义</option>&ndash;&gt;-->
            <!--</select>-->
          <!--</div>-->
        <!--</div>-->
      <!--</div>-->
      <div class="tabtitle">
        <table class="layui-table" style="margin-bottom: 0">
          <colgroup>
            <col width="20">
            <col width="60">
            <col width="120">
            <col width="120">
            <col width="80">
            <col width="80">
            <col width="200">
            <col>
          </colgroup>
          <thead>
          <tr>
            <th>
              <input v-if="!selectall" type="checkbox" @click="selectAll()" name="selall">
              <input v-else type="checkbox" @click="unselectAll()" name="selall">
            </th>
            <th>编号</th>
            <th>IP</th>
            <th>IPMI</th>
            <th>位置</th>
            <th>状态</th>
            <th>控制</th>
          </tr>
          </thead>

        </table>
      </div>
      <div class="result">
        <table class="layui-table" style="margin-top: 0;">
          <colgroup>
            <col width="20">
            <col width="60">
            <col width="120">
            <col width="120">
            <col width="80">
            <col width="80">
            <col width="200">
          </colgroup>
          <tbody>
          <tr v-for="(item, index) in hosts">
            <td><input type="checkbox" name="checkname" :value="item.id" @click="addselecteds()"></td>
            <td>{{index + 1}}</td>
            <td>{{item.hostip}}</td>
            <td>{{item.ipmiip}}</td>
            <td>{{item.position}}</td>
            <td v-if="item.enabled=='yes'" style="color: #009688">已启用</td>
            <td v-else-if="item.enabled=='no'" style="color: #ff5722">已禁用</td>
            <td v-else style="color: #ffb800">未知</td>
            <td>
              <div class="layui-btn-group">
                <!--<button class="layui-btn layui-btn-mini layui-btn-primary"-->
                <!--style="background-color: rgba(42,210,63,0.2)" :class="{'layui-disabled': item.status=='on'}"-->
                <!--:disabled="item.status=='on'" @click="power(item.id,'on')">开机-->
                <!--</button>-->
                <!--<button class="layui-btn layui-btn-mini layui-btn-primary" style="background-color: rgba(255,87,34,0.2)"-->
                <!--:class="{'layui-disabled': item.status=='off'}"-->
                <!--:disabled="item.status=='off'" @click="power(item.id,'off')">关机-->
                <!--</button>-->
                <!--<button class="layui-btn layui-btn-mini layui-btn-primary" style="background-color: rgba(255,184,0,0.2)"-->
                <!--@click="power(item.id,'reboot')">重启</button>-->
                <!--<button class="layui-btn layui-btn-mini layui-btn-primary" style="background-color: rgba(56,131,170,0.2)"-->
                <!--@click="power(item.id,'status')">获取状态</button>-->
                <button class="layui-btn layui-btn-mini layui-btn-primary"
                        :class="{'layui-disabled': item.enabled=='yes'}"
                        :disabled="item.enabled=='yes'" @click="power(item.id,'yes')">启用
                </button>
                <button class="layui-btn layui-btn-mini layui-btn-primary"
                        :class="{'layui-disabled': item.enabled=='no'}"
                        :disabled="item.enabled=='no'" @click="power(item.id,'no')">禁用
                </button>
                <!--<button class="layui-btn layui-btn-mini layui-btn-primary"-->
                        <!--@click="power(item.id,'reboot')">重启-->
                <!--</button>-->
                <!--<button class="layui-btn layui-btn-mini layui-btn-primary"-->
                        <!--@click="power(item.id,'status')">获取状态-->
                <!--</button>-->

              </div>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
      <div class="layui-btn-group btn">
        <!--<button class="layui-btn layui-btn-small layui-btn-primary" @click="getAllInfo(true)">刷新页面</button>-->
        <button class="layui-btn layui-btn-small layui-btn-primary"
                style="background-color: rgba(42,210,63,0.2)" @click="powerAll('yes')">批量启用
        </button>
        <button class="layui-btn layui-btn-small layui-btn-primary"
                style="background-color: rgba(255,87,34,0.2)" @click="powerAll('no')">批量禁用
        </button>
        <!--<button class="layui-btn layui-btn-small layui-btn-primary"-->
                <!--style="background-color: rgba(255,184,0,0.2)" @click="powerAll('reboot')">批量重启-->
        <!--</button>-->
        <!--<button class="layui-btn layui-btn-small layui-btn-primary"-->
                <!--style="background-color: rgba(56,131,170,0.2)" @click="powerAll('status')">批量获取状态-->
        <!--</button>-->
        <!--<button class="layui-btn layui-btn-small layui-btn-primary" @click="getAllInfo(true)">全部刷新</button>-->
        <!--<button class="layui-btn layui-btn-small layui-btn-primary" @click="powerAll('on')">启动所选</button>-->
        <!--<button class="layui-btn layui-btn-small layui-btn-primary" @click="powerAll('off')">批量关机</button>-->
        <!--<button class="layui-btn layui-btn-small layui-btn-primary" @click="powerAll('reboot')">批量重启</button>-->
        <!--<button class="layui-btn layui-btn-small layui-btn-primary" @click="powerAll('status')">批量获取状态</button>-->
      </div>
    </div>
  </div>
</template>

<script>
    import axios from 'axios'
    export default {
        name: "idrac-admin",
      data: () => {
        return {
          searchinfo: null,
          bakhostsid: {},
          selecteds: [],
          hostsid: {},
          selectall: false,
          tasks: [],
          showLoad: false,
          statusInter: null,
          usedTime: 0,
          usedTimeInter: null,
          searchInter: null,
          total: {
            on: 0,
            off: 0,
            unknown: 0,
          }

        }
      },
      computed: {
        hosts: {
          get: function () {
            let _hosts = []
            let keys = Object.keys(this.hostsid)
            for (let i of keys) {
              let tmp = this.hostsid[i]
              tmp['id'] = i
              _hosts.push(tmp)
            }
            return _hosts
          },
          set: () => {
          },
        },
      },
      methods: {
        getAllInfo: function (msg, ip, d) {
          this.unselectAll()
          var ip = ip || 'all'
          this.hosts = []
          let hid = Object.keys(this.hostsid)

          if (msg) {
            layui.layer.msg('正在刷新 请稍后...', {time: 500});
          }
          axios.get(GET_ADMIN_INFO + ip).then(
            (data) => {
              if (Object.keys(data.data).length === 0) {
                if (!d) {
                  layui.layer.msg('没有查询到任何数据', {time: 1000});
                }
                return
              }
              if (ip !== 'all') {
                hid = Object.keys(data.data)
              }
              if (hid.length === 0) {
                this.hostsid = data.data
              } else {
                let _tmp = {}
                for (let i of hid) {
                  _tmp[i] = data.data[i]
                }
                this.hostsid = _tmp
              }
              this.bakhostsid = data.data
              this.getTotal()
            }
          )
        },

        getTotal: function () {
          this.total = {on: 0, off: 0, unknown: 0}
          let keys = Object.keys(this.hostsid)
          for (let i of keys) {
            if (this.hostsid[i]['status'] === 'on') {
              this.total['on']++
            } else if (this.hostsid[i]['status'] === 'off') {
              this.total['off']++
            } else {
              this.total['unknown']++
            }
          }
        },
        selectAll: function () {
          if (!layui.jquery("input[name='selall']").prop("checked")) {
            return
          }
          layui.jquery("input[name='checkname']").prop("checked", true)
          this.selectall = true
          this.addselecteds()
        },
        unselectAll: function () {
          if (layui.jquery("input[name='selall']").prop("checked")) {
            return
          }
          layui.jquery("input[name='checkname']").prop("checked", false)
          this.selectall = false
          this.addselecteds()
        },
        getSelected: function () {
          let selecteds = []
          layui.jquery("input[name='checkname']").each(
            function () {
              let checkobj = layui.jquery(this)
              if (checkobj[0].checked) {
                selecteds.push(checkobj.val())
              }
            }
          )
          return selecteds
        },

        addselecteds: function () {
          this.selecteds = this.getSelected()
        },

        power: function (id, action) {
          if (action !== 'status') {
            let act = ''
            if (action === 'yes') {
              act = '主机: ' + this.hostsid[id]['hostip'] + ' 是否启用？'
            } else if (action === 'no') {
              act = '主机: ' + this.hostsid[id]['hostip'] + ' 是否禁用？'
            }
            layui.layer.open(
              {
                content: act,
                btn: ['是的', '取消'],
                yes: () => {
                  this.showLoad = true
                  layui.layer.msg('请稍后...', {time: 10000});
                  axios.post(ADMIN_ENABLED, JSON.stringify({id: id, action: action}),
                    {headers: {"content-type": "application/json"}}).then(
                    (data) => {
                      layui.layer.msg(data.data['result'], {time: 2000});
                      this.getAllInfo()
                      this.showLoad = false
                    }
                  )
                },
                btn2: function () {
                  layui.layer.msg('操作已取消', {time: 1000});
                }
              }
            )
          } else {
            this.showLoad = true
            layui.layer.msg('请稍后...', {time: 10000});
            axios.post(CONTROL_SYNC, JSON.stringify({id: id, action: action}),
              {headers: {"content-type": "application/json"}}).then(
              (data) => {
                layui.layer.msg(data.data['result'], {time: 2000});
                this.getAllInfo()
                this.showLoad = false
              }
            )
          }


        },
        filterStatus: function () {
//        layui.jquery('#filter').click(()=>{
          layui.jquery('#filter').change(() => {
            let val = layui.jquery('#filter').val()
            if (val === '全部状态') {
              this.hostsid = this.bakhostsid
            } else if (val === '已开机') {
              this.hostsid = this.bakhostsid
              let keys = Object.keys(this.hostsid)
              let _tmp = {}
              for (let i of keys) {
                if (this.hostsid[i]['status'] === 'on') {
                  _tmp[i] = this.hostsid[i]
                }
              }
              this.hostsid = _tmp
            } else if (val === '已关机') {
              this.hostsid = this.bakhostsid
              let keys = Object.keys(this.hostsid)
              let _tmp = {}
              for (let i of keys) {
                if (this.hostsid[i]['status'] === 'off') {
                  _tmp[i] = this.hostsid[i]
                }
              }
              this.hostsid = _tmp
            } else if (val === '未知') {
              this.hostsid = this.bakhostsid
              let keys = Object.keys(this.hostsid)
              let _tmp = {}
              for (let i of keys) {
                if (this.hostsid[i]['status'] !== 'on' && this.hostsid[i]['status'] !== 'off') {
                  _tmp[i] = this.hostsid[i]
                }
              }
              this.hostsid = _tmp
            } else if (val === '已选择') {
              this.hostsid = this.bakhostsid
              let _tmp = {}
              for (let i of this.getSelected()) {
                _tmp[i] = this.hostsid[i]
              }
              this.hostsid = _tmp
            }
            this.getTotal()
            this.unselectAll()
          })

        },
        getStatus: function () {
          axios.get(GET_STATUS).then(
            (data) => {
              if (data.data['status'] === 'running') {
                this.getAllInfo()
                this.showLoad = true
              } else {
                clearInterval(this.statusInter)
                this.showLoad = false
                this.getAllInfo()
                clearInterval(this.usedTimeInter)
                layui.layer.msg('任务全部完成<br>耗时: ' + this.usedTime + ' 秒', {time: 3000});
                this.usedTime = 0
              }
            }
          )
        },

        powerAll: function (action) {
          if (this.showLoad) {
            layui.layer.msg('您还有任务没结束哦', {time: 2000});
            return
          }

          let ids = this.selecteds;
          if (ids.length > 0) {
            if (action !== 'status') {
              let act = ''
              if (action === 'yes') {
                act = '您已选中 ' + ids.length + ' 台主机<br>是否执行启用操作？'
              } else if (action === 'no') {
                act = '您已选中 ' + ids.length + ' 台主机<br>是否执行禁用操作？'
              }
              layui.layer.open(
                {
                  content: act,
                  btn: ['是的', '取消'],
                  yes: () => {
                    this.showLoad = true;
                    this.usedTimeInter = setInterval(() => {
                      this.usedTime++
                    }, 1000)
                    axios.post(ADMIN_ENABLED, JSON.stringify({id: ids, action: action}),
                      {headers: {"content-type": "application/json"}}).then(
                      (data) => {
                        if (data.data['result'] === 'ok') {
                          this.statusInter = setInterval(this.getStatus, 1500)
                          layui.layer.msg("请求已成功 后台正在处理", {time: 2000});
                        } else {
                          layui.layer.msg("抱歉 后端出了问题 请求没有成功", {time: 2000});
                        }
                      }
                    )
                  },
                  btn2: function () {
                    layui.layer.msg('操作已取消', {time: 1000});
                  }
                }
              )
            } else {
              this.showLoad = true;
              this.usedTimeInter = setInterval(() => {
                this.usedTime++
              }, 1000)
              axios.post(ADMIN_ENABLED, JSON.stringify({id: ids, action: action}),
                {headers: {"content-type": "application/json"}}).then(
                (data) => {
                  if (data.data['status'] === 'ok') {
                    this.statusInter = setInterval(this.getStatus, 1500)
                    layui.layer.msg("请求已成功 后台正在处理", {time: 2000});
                  } else {
                    layui.layer.msg("抱歉 后端出了问题 请求没有成功", {time: 2000});
                  }
                }
              )
            }
          } else {
            layui.layer.msg('您还没有选择主机哦', {time: 2000});
          }

        },
      },
      mounted: function () {
        this.getAllInfo(true)
        this.filterStatus()
        layui.jquery('#search').on('input', () => {
          clearTimeout(this.searchInter)
          this.searchInter = setTimeout(() => {
            this.hostsid = {}
            this.getAllInfo(false, this.searchinfo, true)
          }, 500)

        })
//      setInterval(this.getAllInfo, 10000)
      }
    }
</script>

<style scoped>
  h1 {
    font-size: 24px;
    margin: 20px 0 20px 0;
  }

  .status {
    text-align: left;
    height: 33px;
  }

  .load {
    display: inline-block;
    font-size: 25px;
    color: #0f0f0f;
    margin-right: 20px;
    float: right;
  }

  .filter {
    float: right;
    margin-right: 20px;
    /*font-size: 18px;*/
  }

  .parent {
    width: 90px;
    height: 25px;
    /*overflow: auto;*/
    display: inline-block;
    border: solid 1px #ccc;
  }

  .parent select {
    /*-webkit-appearance:none;*/
    /*-moz-appearance:none;*/
    background: transparent;
    border: none;
    padding-left: 9px;
    width: 90px;
    height: 100%;
    /*margin:3px;*/
  }

  .tabtitle {
    overflow-y: scroll;
  }

  .tabtitle::-webkit-scrollbar {
    opacity: 0;
  }

  .result {
    overflow-x: hidden;
    overflow-y: scroll;
    max-height: calc(100vh - 300px);
    text-align: left;
  }

  .content {
    margin: auto;
    max-width: 1600px;
    min-width: 800px;
    padding-right: 80px;
    padding-left: 80px;
    text-align: right;
  }

  .btn {
    margin-top: 20px;
    margin-right: 20px;
  }

  .layui-btn-group button {
    margin-left: 3px !important;
    border: 1px solid rgba(0, 0, 0, .1) !important;
  }

</style>
