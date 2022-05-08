import Vue from 'vue'
import App from'./App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '../src/assets/less/index.less'

import store from "../src/store/index.js"
import router from'../router/index.js'
import axios from'axios'
import '../api/mock.js'

Vue.prototype.$axios=axios
Vue.config.productionTip = false
Vue.use(ElementUI)

router.beforeEach((to,from,next)=>{
  store.commit('getToken')
  const token=store.state.user.token
  if(!token&&to.name!=="login"){
    next({name:'login'})
  }
  else if(token&&to.name==='login'){
     next({path:'/home'})
  }
  else{
    next()
  }
}
)
new Vue({
  store,
  router,
  render: h => h(App),
  created(){
    store.commit('addMenu',router)
  }
}).$mount('#app')
