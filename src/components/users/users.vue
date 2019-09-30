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
          <el-input
            clearable
            @clear="clearGetUser"
            placeholder="请输入内容"
            v-model="query"
            class="selectSearch"
          >
            <el-button @click="searchUser" slot="append" icon="el-icon-search"></el-button>
          </el-input>
          <el-button type="success"  @click="showAddDialog">添加用户</el-button>
        </el-col>
      </el-row>
      <!-- 表格 -->
      <el-table :data="userList" style="width: 100%">
        <el-table-column type="index" label="#" width="60"></el-table-column>
        <el-table-column prop="username" label="姓名" width="80"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="mobile" label="电话"></el-table-column>
        <el-table-column prop="create_time" label="创建时间">
          <template slot-scope="userList">{{userList.row.create_time|fmtdate}}</template>
        </el-table-column>
        <el-table-column label="用户状态">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.mg_state" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="role_name" label="操作">
          <template>
            <el-button plain size="mini" type="primary" icon="el-icon-edit" circle></el-button>
            <el-button plain size="mini" type="danger" icon="el-icon-delete" circle></el-button>
            <el-button plain size="mini" type="success" icon="el-icon-check" circle></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
    </el-breadcrumb>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[2, 4, 6, 8]"
      :page-size="2"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>

    <!-- 编辑删除弹窗 -->
    <el-dialog title="添加用户" :visible.sync="dialogFormVisibleAdd">
      <el-form :model="form">
        <el-form-item   label="用户名" label-width="100px">
          <el-input v-model="form.usernme"  autocomplete="off"></el-input>
        </el-form-item>
         <el-form-item  label="密码 " label-width="100px">
          <el-input v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>
         <el-form-item  label="邮箱" label-width="100px">
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>
         <el-form-item  label="电话" label-width="100px">
          <el-input v-model="form.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleAdd = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </div>
    </el-dialog>
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
      pagesize: 2,
      dialogFormVisibleAdd:false,
      form:{
         usernme:'',
         password:'',
         email:'',
         mobile:''
      }
    }
  },
  created() {
    this.getUserList();
  },
  methods: {
    // 添加用户发送请求
     async addUser(){
      this.dialogFormVisibleAdd=false
      const res = await this.$http.post(`users`,this.form)
      console.log(res)
     
      },
    // 点击之后显示添加对话框
    showAddDialog(){
      this.dialogFormVisibleAdd=true
    },

    // 输入框清空后重新获取数据
    clearGetUser() {
      this.getUserList();
    },
    // 搜索用户
    searchUser() {
      this.getUserList();
    },

    // 获取数据刷新数据
    async getUserList() {
      const AUTH_TOKEN = localStorage.getItem("token");
      this.$http.defaults.headers.common["Authorization"] = AUTH_TOKEN;
      const res = await this.$http.get(
        `users?query=${this.query}&pagenum=${this.pagenum}&pagesize=${this.pagesize}`
      );
      const {
        meta: { mag, status },
        data: { total, users }
      } = res.data;
      if (status === 200) {
        //   给表格,total赋值，获取数据成功提示框
        this.userList = users;
        this.total = total;
        this.$message.success("刷新数据成功！");
      }
      console.log(res);
    },
    // 分页方法
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pagesize = val; //赋值每页传进来多少条
      this.pagenum = 1; //每次点击了页数规定多少条后回到首页开始排版
      this.getUserList(); //每页规定页数后重新获取排版
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pagenum = val;
      this.getUserList();
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
