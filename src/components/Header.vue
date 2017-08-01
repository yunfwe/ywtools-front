<template>
  <div id="vheader">
    <ul class="layui-nav">
      <li class="layui-nav-item"><a href="/">工具箱</a></li>
      <li class="layui-nav-item right">
        <a href="javascript:">个人中心</a>
        <dl class="layui-nav-child">
          <dd><a href="javascript:" @click="userInfo()">个人信息</a></dd>
          <dd><a href="javascript:">系统通知</a></dd>
          <dd><a href="javascript:">退出登陆</a></dd>
        </dl>
      </li>
    </ul>
    <div style="display: none" id="userinfo">
      <div style="padding: 30px">
        <form action="" class="layui-form">
          <div class="layui-form-item">
            <label for="username" class="layui-form-label">用户名</label>
            <div class="layui-input-block">
              <input type="text" name="username" id="username" class="layui-input" required value="魏云飞">
            </div>
          </div>
          <div class="layui-form-item">
            <label for="phone" class="layui-form-label">手机号</label>
            <div class="layui-input-block">
              <input type="text" name="phone" id="phone" class="layui-input" required value="13366299324">
            </div>
          </div>
          <div class="layui-form-item">
            <label for="email" class="layui-form-label">电子邮箱</label>
            <div class="layui-input-block">
              <input type="text" name="email" id="email" class="layui-input" required value="1441923087@qq.com">
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    name: 'vheader',
    methods: {
        userInfo: function (){
            layui.layer.open({
              shade:0,title:"用户信息",type:1,maxmin:true,
              content:layui.jquery('#userinfo').html(),
              btn:['提交','关闭'],
              yes:function (index, layero) {
                layui.layer.msg("提交成功", {time:1000});
                return false
              },
            })
        }
    }
}

</script>
<style scoped="">
  ul{
    padding:0px;
  }

  .right {
    float: right;
    margin-right: 10px;
  }
</style>
