<template>
  <el-container direction="vertical">
    <!--  <el-container direction="horizontal">-->
    <el-main>
      <el-row>
        <el-col :xs="{span:20,offset:2}" :lg="{span:12,offset:6}">
          <el-form :model="userInfo">
            <el-form-item label="用户ID">{{ userInfo.id }}</el-form-item>
            <el-form-item label="用户名">{{ userInfo.username }}</el-form-item>
            <el-form-item label="姓名">{{ userInfo.name }}</el-form-item>
            <el-form-item label="电话">{{ userInfo.phone }}</el-form-item>
            <el-form-item label="区域">{{ userInfo.area }}</el-form-item>
            <el-form-item v-if="$store.state.user.roles" label="角色">{{
                $store.state.user.roles.map(i => i.nickname).join(",")
              }}
            </el-form-item>
            <el-form-item label="注册时间" v-if="userInfo.createdAt">{{ userInfo.createdAt.timeString }}</el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </el-main>
    <el-footer>
      <el-button type="primary" @click="visible.editUserInfo=true">修改</el-button>
      <el-button type="primary" @click="visible.editPassword=true">修改密码</el-button>
    </el-footer>
    <el-dialog :visible.sync="visible.editUserInfo" title="修改用户信息">
      <user-info-edit :data="userInfo" @success="visible.editUserInfo=false;info()"/>
    </el-dialog>
    <el-dialog :visible.sync="visible.editPassword" title="修改密码">
      <password-edit @success="reload"/>
    </el-dialog>

  </el-container>
</template>

<script>
import UserInfoEdit from "./user-info-edit";
import PasswordEdit from "./password-edit";

export default {
  name: "user-info",
  components: {PasswordEdit, UserInfoEdit},
  data() {
    return {
      visible: {
        editUserInfo: false,
        editPassword: false,
      },
      userInfo: {},
    }
  },
  methods: {
    reload() {
      window.location.reload();
    },
  },
  mounted() {
    this.$store.dispatch("user/info").then(() => {
      this.userInfo = this.$store.state.user.info
    })
  },
  props: [],
}

</script>

<style scoped>

</style>
