import home from "../components/rootTab/home";
import me from "../components/rootTab/me";
import management from "../components/rootTab/management";


let router = [
  {path: '/', redirect: "/home"},
  {path: '/home', name: 'home', component: home,label:'主页'},
  {path: '/management', name: 'management', component: management,label:'管理'},
  {path: '/me', name: 'me', component: me,label:'我的'},
]

export default router;
