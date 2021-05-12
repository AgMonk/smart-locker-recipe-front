import home from "../components/rootTab/home";
import me from "../components/rootTab/me";
import management from "../components/rootTab/management";
import goods from "../components/rootTab/goods";
import goodsManagement from "../components/management/goods/goods-management"
import inventoryManagement from "../components/management/goods/inventory-management"
import inventoryRecipeManagement from "../components/management/goods/inventory-recipe-management"
import roleManagement from "../components/management/user/role-management"
import userManagement from "../components/management/user/user-management"
import permManagement from "../components/management/user/perm-management"

// export const router = [
//   {path: '/', redirect: "/home"},
//   {path: '/home', name: 'home', component: home, label: '主页'},
//   {path: '/me', name: 'me', component: me, label: '我的'},
//   {path: '/goods', name: 'goods', component: goods, label: '商品', requiredRoles: ["admin", "assignor", "inspectors"]},
//   {path: '/management', name: 'management', component: management, label: '管理', requiredRoles: ["admin"]},
//   // {path: '/test', name: 'test', component: test,label:'测试'},
// ]

export const router2 = [
  {path: '/', redirect: "/home"},
  {path: '/home', component: home, label: '主页'},
  {path: '/me', component: me, label: '我的'},
  {
    path: '/goods', label: '商品', component: {template: '<router-view/>'},
    children: [
      {path: 'goods',label: '商品', component: goodsManagement, requiredPermissions:"Goods:query:page"},
      {path: 'inventory',label: '库存', component: inventoryManagement, requiredPermissions: "Inventory:query:page"},
      {path: 'inventoryRecipe',label: '单据', component: inventoryRecipeManagement, requiredPermissions: "InventoryRecipe:query:page"},
    ]
  },
  {
    path: "/user", label: '用户', component: {template: '<router-view/>'},
    children: [
      {path: 'user', label: '用户', component: userManagement, requiredPermissions: "user:query:page"},
      {path: 'role', label: '角色', component: roleManagement, requiredPermissions: "role:update:*"},
      {path: 'perm', label: '权限', component: permManagement, requiredPermissions: "permission:update:*"},
    ]
  }

]
