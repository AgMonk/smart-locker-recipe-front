<template>
  <el-container direction="vertical">
    <!--  <el-container direction="horizontal">-->
<!--    <el-header></el-header>-->
    <el-main>
      <el-row>
        <el-col :offset="6" :span="12">
          <!--      已登陆-->
          <el-container v-if="logged" direction="vertical">
            <el-main>
              <user-info/>
            </el-main>
            <el-footer>
              <el-button type="danger" @click="logout">登出</el-button>
              <el-button type="danger" @click="clearCache">清除缓存</el-button>
            </el-footer>
          </el-container>
          <!--      未登陆-->
          <el-container v-if="!logged">
            <el-main>
              <el-tabs v-model="tabs">
                <el-tab-pane label="登陆" name="登陆">
                  <login @success="logged=$event"/>
                </el-tab-pane>
                <el-tab-pane label="注册" name="注册">
                  <reg @success="tabs='登陆'"/>
                </el-tab-pane>
              </el-tabs>
            </el-main>
          </el-container>
        </el-col>
      </el-row>

    </el-main>
    <el-footer></el-footer>


  </el-container>

</template>

<script>
import {getStatus, logout} from "../../assets/js/api/user-api";
import Login from "../user/login";
import Reg from "../user/reg";
import {clearCache} from "../../assets/js/requestUtils";
import UserInfo from "../user/user-info";
import UserInfoEdit from "../user/user-info-edit";

export default {
  name: "me",
  components: {UserInfoEdit, UserInfo, Reg, Login},
  data() {
    return {
      logged: false,
      tabs: "登陆",
    }
  },
  methods: {
    logout() {
      if (!confirm("确认登出？")) {
        return
      }
      logout({
        success: (res) => this.$message(res.message)
      }).then(() => {
        this.logged = false
        clearCache();
      })
    },
    clearCache() {
      if (!confirm("清除缓存？")){
        return
      }
      clearCache();
    },
  },
  mounted() {
    getStatus().then(() => {
      this.logged = true;
    }).catch(() => {
      this.logged = false;
    })
  },
  props: [],
}

</script>

<style scoped>

</style>
