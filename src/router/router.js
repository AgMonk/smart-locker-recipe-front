import home from "../components/rootTab/home";
import me from "../components/rootTab/me";
import management from "../components/rootTab/management";
import goods from "../components/rootTab/goods";


let router = [
  {path: '/', redirect: "/home"},
  {path: '/home', name: 'home', component: home,label:'主页'},
  {path: '/me', name: 'me', component: me,label:'我的'},
  {path: '/goods', name: 'goods', component: goods,label:'商品',requiredRoles:["admin","assignor","inspectors"]},
  {path: '/management', name: 'management', component: management,label:'管理',requiredRoles:["admin"]},
  // {path: '/test', name: 'test', component: test,label:'测试'},
]

export default router;
