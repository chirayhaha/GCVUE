import Vue from 'vue'
import Router from 'vue-router'

//导入或定义路由组件
import index from '../view/index'
import shopping from '../view/shopping'
import my from '../view/my'
import register from '@/components/register'
import login from '@/components/login'
import userinfo from '../view/userinfo'
import uploading from '../view/uploading'
import sregister from '@/components/sregister'
import slogin from '@/components/slogin'
import share from '../view/share'
import cookbooks from '../view/cookboos'
import err from '../view/404'
import mybooks from '../view/mybooks'
import goodsdetail from '../view/goodsdetail';
import addaddress from '../view/address'
import adds from '../view/adds';
import orderconfirm from '../view/orderconfirm'
import orderpage from '../view/orderpage';

//在一个模块化工程中使用vue-router，要通过 Vue.use() 明确地安装路由功能
Vue.use(Router)

// 2.创建一个路由器实例
// 并且配置路由规则，每个路由应该映射一个组件。
export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {path: '/',name: 'index',component: index},
    {path: '/shopping',name: 'shopping',component: shopping,meta:{role:['user']}},
    {path: '/my',name: 'my',component: my,meta:{role:['seller']}},
    {path:'/register',name:'register',component:register},
    {path:'/login',name:'login',component:login},
    {path:'/userinfo',name:'userinfo',component:userinfo,meta:{role:['user']}},
    {path:'/uploading',name:'uploading',component:uploading,meta:{role:['seller']}},
    {path:'/sregister',name:'sregister',component:sregister,},
    {path:'/slogin',name:'slogin',component:slogin,},
    {path:'/share',name:'share',component:share,meta:{role:['user']}},
    {path:'/cookbooks/:title/:userid',name:'cookbooks',component:cookbooks,},
    {path:'/404',name:'404',component:err},
    {path:'/mybooks',name:'mybooks',component:mybooks},
    {path:'/goodsdetail/:id',name:'goodsdetail',component:goodsdetail},
    {path:'/addaddress',name:'addaddress',component:addaddress},
    {path:'/adds',name:'adds',component:adds},
    {path:'/orderconfirm',name:'orderconfirm',component:orderconfirm},
    {path:'/orderpage',name:'orderpage',component:orderpage},
  ]
})
