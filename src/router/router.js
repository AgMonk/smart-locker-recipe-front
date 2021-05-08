import home from "../components/rootTab/home";
import me from "../components/rootTab/me";
import management from "../components/rootTab/management";
import goods from "../components/rootTab/goods";


let router = [
  {path: '/', redirect: "/home"},
  {path: '/home', name: 'home', component: home,label:'主页'},
  {path: '/goods', name: 'goods', component: goods,label:'商品'},
  {path: '/management', name: 'management', component: management,label:'管理'},
  // {path: '/test', name: 'test', component: test,label:'测试'},
  {path: '/me', name: 'me', component: me,label:'我的'},
]

export default router;
