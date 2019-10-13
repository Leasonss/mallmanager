<template>
  <el-card>
    <my-bread level1="权限管理" level2="角色列表"></my-bread>
    <el-row>
      <el-col class="buttonrole">
        <el-button type="primary">信息按钮</el-button>
      </el-col>
    </el-row>

    <!-- 表格 -->
    <el-table :data="RoleList" style="width: 100%" height="300px">
      <el-table-column type="expand" width="150">
          <template slot-scope="scope">
              <el-row v-for="(item1,i) in scope.row.children" :key="i">
                  <el-col :span="4">
                      <el-tag @close="deleteRight(scope.row.id,item1.id)" closable type="primary">{{item1.authName}}</el-tag>
                      <i class="el-icon-arrow-right"></i>
                  </el-col>
                  <el-col :span="20">
                      <el-row v-for="(item2,i) in item1.children" :key="i">
                          <el-col :span="4">
                              <el-tag @close="deleteRight(scope.row.id,item2.id)" closable type="success">{{item2.authName}}</el-tag>
                              <i class="el-icon-arrow-right"></i>
                          </el-col>
                          <el-col :span="20">
                              <el-tag @close="deleteRight(scope.row.id,item3.id)" closable type="warning" v-for="(item3,i) in item2.children" :key="i">
                                  {{item3.authName}}
                              </el-tag>
                          </el-col>
                      </el-row>
                  </el-col>
              </el-row>
              <span v-if="scope.row.children.length===0">未分配权限</span>
          </template>
      </el-table-column>
      <el-table-column type="index" label="#" width="100"></el-table-column>
      <el-table-column prop="roleName" label="角色名称" width="200"></el-table-column>
      <el-table-column prop="roleDesc" label="角色描述" width="200"></el-table-column>
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
  </el-card>
</template>
<script>
export default {
  data() {
    return {
      RoleList: []
    };
  },
  created() {
    this.getRoleList();
  },
  methods: {
    //   取消权限
    async deleteRight(userid,rightid){
        const res=await this.$http.delete(`roles/${userid}/rights/${rightid}`)
        console.log(res)
        this.getRoleList()
    },
// 获取所有列表信息
    async getRoleList() {
      // 先获取token值

      const res = await this.$http.get(`roles`);
      console.log(res);
      this.RoleList = res.data.data;
    }
  }
};
</script>
<style>
.buttonrole {
  margin-top: 20px;
}
</style>