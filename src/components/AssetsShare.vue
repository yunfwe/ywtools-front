<template>
  <div id="vassetsshare">
    <h1>资源共享</h1>
    <form @submit.prevent="getNodeData()"  class="layui-form">
      <div class="layui-inline">
        <div class="layui-input-inline">
          <input v-model="filename" type="text" name="filename" placeholder="文件搜索"
                 class="layui-input" required>
        </div>
        <div class="layui-input-inline">
          <button type="submit" class="layui-btn layui-btn-primary">
            <i class="layui-icon" style="display: inline-block;font-size: 25px; color: #0f0f0f;">&#xe615;</i>
          </button>
        </div>
        <!--<div class="layui-input-inline" style="margin-left: 30px" v-if="showLoad">-->
          <!--<i class="layui-icon layui-anim layui-anim-rotate layui-anim-loop"-->
             <!--style="display: inline-block;font-size: 25px; color: #0f0f0f;">&#xe63d;-->
          <!--</i>-->
        <!--</div>-->
      </div>
    </form>
    <ul id="demo"></ul>
  </div>
</template>

<script>
  export default {
    name:'vassetsshare',
    data(){
        return {
          filename:'',
          tree:{},
        }
    },
    methods: {
      getNodeData(){
        this.tree =   {
          elem: '#demo',
          nodes: [
            {
              name: '父节点1',
              children: [
                  {name: '子节点11'},
                  {name: '子节点12'}
                ]
            },
            {
              name: '父节点2（可以点左侧箭头，也可以双击标题）',
              children: [
                  {
                    name: '子节点21',
                    children: [
                        {name: '子节点211'}
                    ]
                  }
              ]
            },
            {"name":'asd'}
          ],
          click: function (node) {
            console.log(JSON.stringify(node))
          }
        }
        layui.tree(this.tree)
      },

    },
    mounted: function () {
      this.getNodeData()
      console.log(this.tree)
      setTimeout(()=>{
        this.tree.nodes.push({'name':'asdsadsad'})
        layui.jquery('#demo').html('')
        layui.tree(this.tree)
      },2000)
//
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

  ul {
    margin-top:20px;
  }
</style>
