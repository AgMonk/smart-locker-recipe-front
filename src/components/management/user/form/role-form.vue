<template>
  <el-form :model="role" label-width="50px">
    <el-form-item label="ID" v-if="role.id">{{ role.id }}</el-form-item>
    <el-form-item label="名称">
      <el-input v-model="role.name"/>
    </el-form-item>
    <el-form-item label="昵称">
      <el-input v-model="role.nickname"/>
    </el-form-item>
    <el-form-item label="权限">
      <el-table :data="permissions" ref="multipleTable" @selection-change="role.permissions = $event">
        <el-table-column type="selection" width="55"/>
        <el-table-column label="备注" prop="remark"
                         :filters="remarkFilters"
                         :filter-method="remarkFilterMethod"
        />
        <el-table-column label="权限字符串">
          <template slot-scope="scope">
            {{ scope.row.namespace }}:{{ scope.row.action }}:{{ scope.row.target }}
          </template>
        </el-table-column>
      </el-table>
    </el-form-item>
    <el-form-item label-width="0">
      <el-button v-if="!role.id" type="danger" @click="perm={}">重置</el-button>
      <el-button type="success" @click="save">确认</el-button>
    </el-form-item>
  </el-form>

</template>

<script>
import {copyObj} from "../../../../assets/js/utils";
import {baseFindAll, baseSave} from "../../../../assets/js/api/baseApi";

export default {
  name: "role-form",
  data() {
    return {
      role: {
        id: undefined,
        name: undefined,
        nickname: undefined,
        permissions: [],
      },
      permissions: [],
      remarkFilters:[
      ],
    }
  },
  methods: {
    save(){
      baseSave("/role", this.role, (res) => this.$message(res.message)).then(() => {
        this.$emit("success");
      })
    },
    remarkFilterMethod(value, row) {
      return row.remark.includes(value);
    },
    findAll(){
      let permId = this.role.permissions.map(p=>p.id)

      baseFindAll("/permission").then(res => {
        this.permissions = res;

        setTimeout(()=>{
          this.permissions.forEach(perm=>{
            if (permId.includes(perm.id)){
              this.$refs.multipleTable.toggleRowSelection(perm)
            }
          },1000)
        })
      })
    }
  },
  mounted() {
    this.role = copyObj(this.data)
    this.role.permissions = this.role.permissions ? this.role.permissions : [];

    this.findAll();

    this.remarkFilters = [];
    let a = ["所有","用户","角色","权限","商品","库存","单据","订单"];
    a.forEach(v=>this.remarkFilters.push({text: v, value: v}));
  },
  watch: {
    "data": {
      handler: function (e) {
        this.role = copyObj(e)
        this.role.permissions = this.role.permissions ? this.role.permissions : [];

        this.findAll();
      }
    }
  },
  props: ["data"],
}

</script>

<style scoped>

</style>
