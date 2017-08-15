<template>
  <div id="vmonitor">
    <div id="meminfo"></div>
  </div>
</template>
<script>
import urls from '../config/urls'
import dict from '../utils/dict'
import axios from 'axios'
import echarts from 'echarts'
export default {
  name:'vmonitor',
  data:()=>{
    return {
        myChart:null,
    }
  },
  methods:{
    drawMemGraph: async function(){
      let meminfo = await axios.get(urls.MONITOR_MEMINFO);
//      let myChart = echarts.init(document.getElementById('meminfo'));
//      let MemTotal = (meminfo.data.MemTotal/1024/1024).toFixed(0)
      let _MemUsed = meminfo.data.MemTotal - meminfo.data.MemFree
      let MemUsed = (_MemUsed/1024/1024).toFixed(0)
      let MemFree = (meminfo.data.MemFree/1024/1024).toFixed(0)
      let Cached = (meminfo.data.Cached/1024/1024).toFixed(0)
      let Buffers = (meminfo.data.Buffers/1024/1024).toFixed(0)
      this.myChart.setOption({
        title : {
          text: '内存使用',
          subtext: 'Linux-192.168.8.253',
          x:'center'
        },
        tooltip : {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} MB ({d}%)"
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: ['已使用 '+MemUsed+'MB','可用 '+MemFree+'MB',
          ]
        },
        series : [
          {
            name: '内存使用情况分析',
            type: 'pie',
            radius : '55%',
            center: ['50%', '60%'],
            data:[
              {value:MemUsed, name:'已使用 '+MemUsed+'MB'},
              {value:MemFree, name:'可用 '+MemFree+'MB'},
              {value:Cached, name:'Cache占用 '+Cached+'MB'},
              {value:Buffers, name:'Buffer占用 '+Buffers+'MB'},
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      });
    }
  },
  beforeCreate() {
    dict.bcindex = layui.layer.load(3)
  },
  mounted() {
    this.myChart = document.getElementById('meminfo');
    this.drawMemGraph();
    layui.layer.close(dict.bcindex);
    setInterval(this.drawMemGraph,10000);
  }
}
</script>
<style scoped>
#meminfo {
  width: 500px;
  height: 300px;
  box-shadow: 2px 2px 5px grey;
  display: inline-block;
}
</style>
