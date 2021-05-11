<template>
  <div>
    <el-menu :default-active="$route.path" active-text-color="#ffd04b"
             background-color="#545c64"
             class="el-menu-demo"
             mode="horizontal"
             text-color="#fff"
             @select="select($event)"
    >
      <el-menu-item
        v-for="(item,i) in router"
        v-if="checkRole(item)"
        :key="i"
        :index="router[i].path"
        style="width: 60px">
        <span class="tab">{{ item.label }}</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
import router from "./router";
import {getStatus} from "../assets/js/api/user/user-api";
import {hasRoles} from "../assets/js/api/user/role-api";

export default {
  name: "navi",
  methods: {
    checkRole(router) {
      if (!router.label) {
        return false;
      }
      if (!router.requiredRoles) {
        return true;
      }
      if (!this.GLOBAL.roles) {
        return false;
      }
      let r = this.GLOBAL.roles.map(role => role.name)
      for (let i = 0; i < r.length; i++) {
        if (router.requiredRoles.includes(r[i])) {
          return true;
        }
      }
      return false
    },
    clear() {
      if (confirm("清除缓存?")) {
        localStorage.clear();
        sessionStorage.clear();
        window.location.reload();
      }
    },
    select(e) {
      if (e !== undefined && e !== null) {
        window.location.href = "#" + e;
      }
    },
    getStatus(route) {
      // if (route.path !== '/me') {
      getStatus()
        .then((res) => {
          this.GLOBAL.logged = res.code === 2000;

          hasRoles().then(res => {

            // this.GLOBAL.roles = res.data;
            this.$set(this.GLOBAL,"roles",res.data);

            this.$forceUpdate()


          })
        })
        .catch(() => {
          this.select('/me')
        })
      // }
    }
  },
  data() {
    return {
      router: router,
    }
  },
  mounted() {
    this.getStatus(this.$route)
  },
  watch: {
    "$route": {
      handler(route) {
        console.clear();
        this.getStatus(route)

      }
    }
  }
}
</script>

<style scoped>
.tab {
  cursor: pointer;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
</style>
