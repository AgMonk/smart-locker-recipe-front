<template>
  <el-container direction="vertical">
    <!--  <el-container direction="horizontal">-->
    <el-header height="20px">
      <el-select v-model="add" placeholder="添加新角色" @change="save">
        <el-option v-for="item in rolePool"
                   :value="item.id"
                   :key="item.id"
                   :label="item.nickname"
        />
      </el-select>
    </el-header>
    <el-main>
      <el-table :data="userRoles">
        <el-table-column label="角色" prop="name"/>
        <el-table-column label="昵称" prop="nickname"/>
        <el-table-column label="删除">
          <template slot-scope="s">
            <el-button type="danger" @click="del(s.row.uuid)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
  </el-container>
</template>

<script>
import {hasRoles} from "../../../assets/js/api/user/user-role-api";
import {baseDel, baseFindAll, baseSave} from "../../../assets/js/api/baseApi";

export default {
  name: "user-role-management",
  data() {
    return {
      prefix:"/user_role",
      add: undefined,
      userId: undefined,
      userRoles: [],
      rolePool: [],
    }
  },
  methods: {
    save(roleId){
      let p = {userId:this.userId,roleId};
      baseSave(this.prefix,p,(res) => this.$message(res.message)).then(() => {
        this.hasRoles()
        this.add = undefined;
      })
    },
    del(id) {
      if (!confirm("确认删除？")) {
        return
      }
      baseDel(this.prefix, id, (res) => this.$message(res.message)).then(() => {
        this.hasRoles()
      })
    },
    findAll() {
      //查询全部角色
      baseFindAll("/role").then(res => {
        this.rolePool = res.data;
        this.hasRoles()
      })
    },
    hasRoles() {
      //查询当前用户的角色
      hasRoles(this.userId, (res) => this.$message(res.message))
        .then(res => {
          this.userRoles = res.data.map(role => {
            let uuid = role.uuid;
            let ro = this.rolePool.filter(r => r.id === role.roleId)[0];
            return Object.assign({uuid}, ro)
          })
          console.log(this.userRoles)
        })
    }
  },
  mounted() {
    this.userId = this.id;
    this.findAll();
  },
  watch: {
    "id": {
      handler: function (e) {
        this.userId = e
        this.findAll();
      }
    }
  },
  props: ["id"],
}

</script>

<style scoped>
</style>
