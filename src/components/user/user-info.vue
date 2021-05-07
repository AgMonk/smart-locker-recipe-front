<template>
  <el-container direction="vertical">
    <!--  <el-container direction="horizontal">-->
    <el-main>
      <el-row>
        <el-col :offset="4" :span="16">
          <el-form :model="userInfo">
            <el-form-item label="用户ID">{{ userInfo.id }}</el-form-item>
            <el-form-item label="用户名">{{ userInfo.username }}</el-form-item>
            <el-form-item label="姓名">{{ userInfo.name }}</el-form-item>
            <el-form-item label="电话">{{ userInfo.phone }}</el-form-item>
            <el-form-item label="注册时间">{{ userInfo.createdAt.timeString }}</el-form-item>
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
      <password-edit @success="reload" />
    </el-dialog>

  </el-container>
</template>

<script>
import {userInfo} from "../../assets/js/api/user/user-api";
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
    reload(){
      window.location.reload();
    },
    info() {
      userInfo({
        success: (res) => this.$message(res.message),
      }).then(res => {
        if (res.code === 2000) {
          this.userInfo = res.data;
        }
      })
    }
  },
  mounted() {
    this.info()
  },
  props: [],
}

</script>

<style scoped>

</style>
