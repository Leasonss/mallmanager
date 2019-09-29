<template>
  <el-card class="box-card">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
      <!-- 搜索 -->
      <el-row class="searchRow">
        <el-col>
          <el-input placeholder="请输入内容" v-model="query" class="selectSearch">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
          <el-button type="success">添加用户</el-button>
        </el-col>
      </el-row>
      <!-- 表格 -->
      <el-table :data="userList" style="width: 100%">
        <el-table-column type="index" label="#" width="60"></el-table-column>
        <el-table-column prop="username" label="姓名" width="80"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="mobile" label="电话"></el-table-column>
        <el-table-column prop="create_time" label="创建时间">
            <template slot-scope="userList">
                {{userList.row.create_time|fmtdate}}
            </template>
        </el-table-column>
        <el-table-column prop="role_name" label="用户状态"></el-table-column>
        <el-table-column prop="role_name" label="操作"></el-table-column>
      </el-table>
      <!-- 分页 -->
    </el-breadcrumb>
  </el-card>
</template>
<script>
export default {
  data() {
    return {
      query: "",
    // 表格绑定的数据
      userList: [],
    //分页   
      total: -1,
      pagenum: 1,
      pagesize: 2
    };
  },
  created() {
    this.getUserList();
  },
  methods: {
    async getUserList() {
      const AUTH_TOKEN = localStorage.getItem("token");
      this.$http.defaults.headers.common["Authorization"] = AUTH_TOKEN;
      const res = await this.$http.get(
        `users?query=${this.query}&pagenum=${this.pagenum}&pagesize=${this.pagesize}`
      );
      const {meta:{mag,status},data:{total,users}}=res.data
      if(status===200){
        //   给表格,total赋值，获取数据成功提示框
        this.userList=users
        this.total=total
        this.$message.success('获取数据成功！')
      }
      console.log(res);
    }
  }
};
</script>
<style>
.box-card {
  height: 100%;
}
.selectSearch {
  width: 300px;
}
.searchRow {
  margin-top: 35px;
}
</style>