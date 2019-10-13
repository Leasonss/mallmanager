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
          <el-button type="success" @click="showAddDialog">添加用户</el-button>
        </el-col>
      </el-row>
      <!-- 表格 -->
      <el-table :data="userList" style="width: 100%" height="300px">
        <el-table-column type="index" label="#" width="60"></el-table-column>
        <el-table-column prop="username" label="姓名" width="80"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="mobile" label="电话"></el-table-column>
        <el-table-column prop="create_time" label="创建时间">
          <template slot-scope="userList">{{userList.row.create_time|fmtdate}}</template>
        </el-table-column>
        <el-table-column label="用户状态">
          <template slot-scope="scope">
            <el-switch
              @change="changestatus(scope.row)"
              v-model="scope.row.mg_state"
              active-color="#13ce66"
              inactive-color="#ff4949"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="role_name" label="操作">
          <template slot-scope="scope">
            <el-button
              plain
              size="mini"
              type="primary"
              icon="el-icon-edit"
              circle
              @click="showEditDialog(scope.row)"
            ></el-button>
            <el-button
              plain
              size="mini"
              type="danger"
              icon="el-icon-delete"
              circle
              @click="showDeleteMessage(scope.row.id)"
            ></el-button>
            <el-button
              plain
              size="mini"
              type="success"
              icon="el-icon-check"
              circle
              @click="showsetRoleDia(scope.row)"
            ></el-button>
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

    <!-- 添加用户弹窗 -->
    <el-dialog title="添加用户" :visible.sync="dialogFormVisibleADD">
      <el-form :model="form">
        <el-form-item label="用户名" label-width="100px">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="100px">
          <el-input v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" label-width="100px">
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号" label-width="100px">
          <el-input v-model="form.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleADD = false">取 消</el-button>
        <el-button type="primary" @click="addUsers">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 编辑用户弹窗 -->
    <el-dialog title="编辑用户" :visible.sync="dialogFormVisibleEdit">
      <el-form :model="form">
        <el-form-item label="用户名" label-width="100px">
          <el-input disabled v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" label-width="100px">
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号" label-width="100px">
          <el-input v-model="form.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleEdit = false">取 消</el-button>
        <el-button type="primary" @click="eidtUsers">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 角色弹框 -->
    <el-dialog title="分配角色" :visible.sync="dialogFormRole">
      <el-form :model="form">
        <el-form-item label="用户名" label-width="100px">
         {{userUserName}}
        </el-form-item>
        <el-form-item label="角色" label-width="100px">
          <el-select v-model="bangdingxianshi">
            <el-option label="请选择" :value="-1"></el-option>
             <el-option 
             :label="item.roleName"
             :value="item.id"
             v-for="(item,i) in roles" 
             :key="i">
             </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormRole = false">取 消</el-button>
        <el-button type="primary" @click="setRole()">确 定</el-button>
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
      dialogFormVisibleADD: false,
      dialogFormVisibleEdit: false,
      dialogFormRole:false,
      // 用户表单
      form: {
        username: "",
        password: "",
        email: "",
        mobile: ""
      },
      bangdingxianshi:-1,
      userputRoleId:-1,
      userUserName:'',
      // 保存所有的用户角色数据
      roles:[]
    };
  },
  created() {
    this.getUserList();
  },
  methods: {
    // 分配角色-发送请求
    async setRole(){
      // 请求路径：users/:id/role
      // 进行当前选中角色替换
      const res=await this.$http.put(`users/${this.userputRoleId}/role`,{
        rid:this.bangdingxianshi
      })
      this.dialogFormRole=false
    },
    // 分配角色打开对话框
    async showsetRoleDia(user) {
      // 获取显示用户角色的名字username
      this.userUserName=user.username
      // 获取到角色id
      this.userputRoleId=user.id
      // 获取当前所有角色
      const res1=await this.$http.get(`roles`)
      console.log(res1)
      // 获取当前用户的id里面的角色-->rid
        this.roles=res1.data.data
        const res =await this.$http.get(`users/${user.id}`)
        // 赋值到用户角色然后进行遍历
        console.log(res)
        this.bangdingxianshi=res.data.data.rid
        this.dialogFormRole=true
    },
    // 改变用户状态
    async changestatus(user) {
      const res = await this.$http.put(
        `users/${user.id}/state/${user.mg_state}`
      );
      console.log(res);
    },
    // 编辑用户发送请求
    async eidtUsers() {
      // const res=await this.$http.put(`users/:id`)因为id获取之前
      // 已经打开对话框了所以form里面是存在id可以直接使用
      const res = await this.$http.put(`users/${this.form.id}`, this.form);
      // console.log(res)
      // 关闭对话框
      // 更新视图
      this.dialogFormVisibleEdit = false;
      this.getUserList();
    },
    //编辑用户信息显示对话框
    showEditDialog(user) {
      console.log(user);
      this.form = user;

      this.dialogFormVisibleEdit = true;
    },
    // 删除用户-打开消息盒子
    showDeleteMessage(userId) {
      this.$confirm("删除用户?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          // 发送用户的请求id---->用户id
          // 1.data中找id
          // 把userId传进来
          const res = await this.$http.delete(`users/${userId}`);
          if (res.data.meta.status === 200) {
            // 删除之后回到首页
            this.pagenum = 1;
            // 更新视图
            this.getUserList();
            // 提示
            this.$message({
              type: "success",
              message: "删除成功!"
            });
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },

    // 添加用户发送请求
    async addUsers() {
      const res = await this.$http.post(`users`, this.form);
      console.log(res);
      const {
        data,
        meta: { msg, status }
      } = res.data;
      if (status === 201) {
        // 1.提示成功
        this.$message.success(msg);
        // 2.重新获取数据
        this.getUserList();
        // 3.置空
        this.form = {};
        // 其他置空
        // for(const key in this.form){
        //   if(this.form.hasOwnProperty(key)){
        //     this.form[key]=""
        //   }
        // }
        // 4.关闭屏幕
        this.dialogFormVisibleADD = false;
      } else {
        this.$$message.warning(msg);
      }
    },
    // 点击之后显示添加对话框
    showAddDialog() {
      this.form = {};
      this.dialogFormVisibleADD = true;
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
      // 获取token值权限
      // const AUTH_TOKEN = localStorage.getItem("token");
      // this.$http.defaults.headers.common["Authorization"] = AUTH_TOKEN;
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
