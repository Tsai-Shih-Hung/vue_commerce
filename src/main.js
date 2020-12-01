// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.config.productionTip = false;
axios.defaults.withCredentials=true;
Vue.use(VueAxios, axios)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  router,
})


router.beforeEach((to, from, next) => {
 if(to.meta.requiresAuth){
   console.log('here')
  const api=`${process.env.AIRPATH}/api/user/check`;
  const vm=this;
  axios.post(api).then((response) => {
  console.log(response.data)
  if(response.data.success){
    console.log('成功登入')
    next();
  }else{
    console.log('登入失敗導回');
    next({  path:'/login'})
  }
  })
  }
  else{  next(); }
});

