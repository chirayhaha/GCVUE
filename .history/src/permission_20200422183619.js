import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import('nprogress/nprogress.css')
import { getLocalStorage, setLocalStorage } from '@/utils/localStorage' // 验权(从localstorage中获取)


import api from './api/apiList'
import { Message } from 'element-ui'

const whiteList = ['/login', '/register', '/', '/sregister', '/slogin', '/index',]
router.beforeEach((to, from, next) => {  //全局前置守卫，导航切换触发时守卫按顺序调用
  /* NProgress.start() */
  // 点击登录时，拿到了token并存入了localstorage,保证页面刷新时,始终可以拿到token
  if (getLocalStorage('Token')) {
    if (to.path === '/login') {
      next({ path: '/' })
      /* NProgress.done() */
    }
    else {
      api.user.userinfo().then(res => {
        /*  console.log(res.data)*/
        if(res.data){
          let user = res.data.user;
          let roles = res.data.user.roles
          console.log('roleid'+user.roles)
          store.commit("user/SET_USERName", user.username) //同步
          store.commit("user/SET_USERID", user.userid)
          store.commit("user/SET_ROLES", user.roles) 
          /*store.dispatch('GenerateRoutes', {roleid}).then(() => {
            router.addRoutes(store.getters.addRoutes)
            next(to)
          })  */
          setLocalStorage("userid", JSON.stringify(user.userid))
          /*setLocalStorage("username", JSON.stringify(user.username))
          setLocalStorage("roleid", JSON.stringify(user.roleid)) */
        }


        next()
      }).catch((err) => {
        console.log(err)
        store.dispatch('user/LogOut').then(() => { //异步调用
          next({ path: '/' })
        })
      })/* 
        if(to.path === '/orderconfirm' && from.path === '/addaddress'){
          next()
        }else{
          next({path:'/changeadd'})
        } */
    }
    
  }
  else {
    if (whiteList.indexOf(to.path) !== -1) { //whitelist中存在的页面
      // 点击退出时,会定位到这里
      next()
    } else {
      Message.success('请登录')
      next('/login')
      /* NProgress.done() */
    }
  }
  
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})

