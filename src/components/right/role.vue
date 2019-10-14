<template>
  <el-card>
    <my-bread level1="权限管理" level2="角色列表"></my-bread>
    <el-row>
      <el-col class="buttonrole">
        <el-button type="primary">信息按钮</el-button>
      </el-col>
    </el-row>

    <!-- 表格 -->
    <el-table :data="RoleList" style="width: 100%" height="315px">
      <el-table-column type="expand" width="150">
        <template slot-scope="scope">
          <el-row v-for="(item1,i) in scope.row.children" :key="i">
            <el-col :span="4">
              <el-tag
                @close="deleteRight(scope.row,item1.id)"
                closable
                type="primary"
              >{{item1.authName}}</el-tag>
              <i class="el-icon-arrow-right"></i>
            </el-col>
            <el-col :span="20">
              <el-row v-for="(item2,i) in item1.children" :key="i">
                <el-col :span="4">
                  <el-tag
                    @close="deleteRight(scope.row,item2.id)"
                    closable
                    type="success"
                  >{{item2.authName}}</el-tag>
                  <i class="el-icon-arrow-right"></i>
                </el-col>
                <el-col :span="20">
                  <el-tag
                    @close="deleteRight(scope.row,item3.id)"
                    closable
                    type="warning"
                    v-for="(item3,i) in item2.children"
                    :key="i"
                  >{{item3.authName}}</el-tag>
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
            @click="showsetRightDia(scope.row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 修改权限的对话框 -->
    <el-dialog title="修改权限" :visible.sync="dialogVisibleRight">
      <!-- 树形 -->
      <!--  :default-expanded-keys="[2, 3]"
        default-checked-keys	默认勾选的节点的 key 的数组 
        default-expand-all	是否默认展开所有节点-->
        <!-- :default-expanded-keys="arrexpand" 使用一行代替-->
      <el-tree
        :data="treeList"
        show-checkbox
        node-key="id"
        default-expand-all
        :default-checked-keys="attrcheck"
        :props="defaultProps"
      ></el-tree>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleRight = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisibleRight = false">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>
<script>
export default {
  data() {
    return {
      RoleList: [],
      dialogVisibleRight: false,
      treeList:[],
      arrexpand:[],
      attrcheck:[],
      defaultProps:{
        label:'authName',
        children:'children'
      }
    };
  },
  created() {
    this.getRoleList();
  },
  methods: {
    //修改分配权限 显示对话框
    async showsetRightDia(role) {
      // 获取树形结构
      const res = await this.$http.get(`rights/tree`)
      console.log(res)
      this.treeList = res.data.data
      // 上面设置default-expand-all一行全部展开
      // var arrtemp1=[]
      // this.treeList.forEach(item1 => {
      //   arrtemp1.push(item1.id)
      //   item1.children.forEach(item2 => {
      //     arrtemp1.push(item2.id)
      //     item2.children.forEach(item3 => {
      //       arrtemp1.push(item3.id)
      //     })
      //   })
      // })
      // console.log(arrtemp1)
      // this.arrexpand=arrtemp1
      // 获取当前role的权限id
      let arrtemp2=[]
      role.children.forEach(item1 => {
        // arrtemp2.push(item1.id)防止全部全选了
        item1.children.forEach(item2 => {
          // arrtemp2.push(item2.id)实际有一些是半选的
          item2.children.forEach(item3 => {
            arrtemp2.push(item3.id)
          })
        })
      });
      this.attrcheck=arrtemp2
      this.dialogVisibleRight = true
    },
    //   取消权限
    async deleteRight(role, rightid) {
      const res = await this.$http.delete(`roles/${role.id}/rights/${rightid}`);
      console.log(res)
      // 删除成功返回200和该角色的剩余权限赋值给该点击的children
      role.children = res.data.data
      //不用整个页面刷新，优化成局部刷新
      // this.getRoleList()
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