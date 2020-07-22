import { asyncRoutersMap, defalutRoutersMap } from '../router'
import api from '../api/apiList'


function hasPermission(roleid, route) {
  if (route.meta && route.meta.roleid) {
    //indexof区分大小写
    return roleid.some(role => route.meta.roleid.indexOf(role) >= 0)
  } else {
    return true
  }
}

const permission = {
  namespaced: true,
  state: {
    addRouters: [],
    allRouters: defalutRoutersMap,
    roleid:[],
  },
  getters: {
    routers: state => state.routers,
    addRouters: state => state.addRouters,
    roleid: state => state.roleid,
  },
  mutations: {
    SET_ROUTES: (state, routers) => {
      state.addRouters = routers,
        state.allRouters = defalutRoutersMap.concat(routers)
    }
  },
  actions: {
    getRoles({ commit }, resquestData) {
      return new Promise((resolve, reject) => {
        api.user.userinfo().then(res => {
          let roleid = res.data.user.roleid
          console.log('rledddddddd'+roleid)   //work
          resolve(roleid)
        })
      })
    },
    createRouter({ commit }, data) {
      return new Promise((resolve, reject) => {
        let roleid = data
        let addRouters = []
        if (roleid.includes('0')) {
          addRouters = asyncRoutersMap
        } else {
          addRouters = asyncRoutersMap.filter(item => {

            if (hasPermission(roleid, item)) {
              return item
            }
            /* if(roleid.includes(item.meta.roleid)){
              return item
            } */
          })
        }
        commit('SET_ROLEID', addRouters)
        resolve()
      })
    }
  }
}

export default permission