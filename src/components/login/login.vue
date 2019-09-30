<template>
  <div class="login-wrap">
    <!-- 通过设置 label-position 属性可以改变表单域标签的位置，
    可选值为 top、left，当设为 top 时标签会置于表单域的顶部-->
    <el-form class="login-form" label-position="top" label-width="80px" :model="formData">
      <h2>用户登录</h2>
      <el-form-item label="用户名">
        <el-input v-model="formData.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="password" v-model="formData.password"></el-input>
      </el-form-item>
      <el-button
        @click.prevent="handleLogin()"
        class="login-btn"
        type="primary"
        @click="openFullScreen"
        v-loading.fullscreen.lock="fullscreenLoading"
      >登录</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        username: "",
        password: ""
      },
      fullscreenLoading: false
    };
  },
  methods: {
    // openFullScreen() {
    //   this.fullscreenLoading = true;
    //   setTimeout(() => {
    //     this.fullscreenLoading = false;
    //   }, 4000);
    // },
    openFullScreen() {
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        setTimeout(() => {
          loading.close();
        }, 1000);
    },
    //  简化  代码让代码看起来像是同步的
    
    
    async handleLogin() {
      const res = await this.$http.post("login", this.formData);

      // console.log(res);
      // this和then异步操作
      const {
        data,
        meta: { msg, status }
      } = res.data;
      if (status === 200) {
        // 登录成功会有提示出现
        // 保存token 验证登录否则返回原来的登录页面
        localStorage.setItem("token", data.token);
        this.$router.push({ name: "home" });
        this.$message.success(msg);
      } else {
        // 登录失败也会有提示根据状态码
        this.$message.warning(msg);
      }
    }

    //  handleLogin(){
    //          this.$http.post('login',this.formData)
    //                    .then((res)=>{
    //                       // console.log(res);
    //                       // this和then异步操作
    //                       const {
    //                         // 赋值
    //                         data,meta:{msg,status}
    //                       }=res.data
    //                       if(status===200){
    //                         // 登录成功会有提示出现
    //                         this.$router.push({name:'home'})
    //                         this.$message.success(msg)
    //                       }
    //                       else{
    //                         // 登录失败也会有提示根据状态码
    //                         this.$message.warning(msg);

    //                       }

    //                    })
    //  }
  }
};
</script>

<style>
.login-wrap {
  height: 100%;
  background-color: #324152;
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-wrap .login-form {
  background-color: #fff;
  width: 400px;
  padding: 30px;
  border-radius: 5px;
}
.login-wrap .login-btn {
  width: 100%;
}
</style>