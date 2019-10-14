<template>
  <el-container class="container">
    <el-header class="header">
      <el-row>
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <img
              src="../../assets/tubo.jpg"
              width="200px"
              height="60px"
              alt="无法显示图片"
              style="border-radius:30px"
            />
          </div>
        </el-col>
        <el-col :span="18" class="middle">
          <h3>个人博客后台管理系统</h3>
        </el-col>
        <el-col :span="2">
          <div class="grid-content bg-purple">
            <a class="loginout" @click.prevent="handleSiglogin" href="#">退出</a>
          </div>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside class="aside" width="200px">
        <!-- 侧边栏开启路由模式 -->
        <el-menu :router="true" :unique-opened="true">
          <!-- 侧边栏，上面是控制整个侧边栏的下拉状态 -->
          <!-- 1 :index动态绑定路由的标识跳转-->
          <el-submenu :index="''+item1.order" v-for="(item1,i) in menus" :key="i">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{item1.authName}}</span>
            </template>
            <el-menu-item :index="item2.path" v-for="(item2,i) in item1.children" :key="i">
              <i class="el-icon-menu"></i>
              <span>{{item2.authName}}</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main class="main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      menus: []
    };
  },
  // beforeCreate() {
  //   const token = localStorage.getItem("token");
  //   if (!token) {
  //     // token 不存在,回到login
  //     this.$router.push({
  //       name: "login"
  //     });
  //     // token存在继续渲染
  //   }
  // },
  created() {
    this.getMenu();
  },
  methods: {
    // 从后台获取所有的后台管理列表
    async getMenu() {
      const res = await this.$http.get(`menus`);
      console.log(res);
      this.menus = res.data.data;
    },
    handleSiglogin() {
      localStorage.clear();
      this.$message.success("退出成功！");
      this.$router.push({ name: "login" });
    }
  }
};
</script>


<style>
.container {
  height: 100%;
}

.header {
  background-color: #b3c0d1;
}

.aside {
  background-color: #d3dce6;
}

.main {
  background-color: #e9eef3;
  height: 100%;
}

/* 头部样式 */
.header .middle {
  text-align: center;
}
.header .loginout {
  line-height: 60px;
  text-decoration: none;
}
</style>