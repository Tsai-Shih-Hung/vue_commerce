import Vue from 'vue'
import VueRouter from 'vue-router'
import Helloworld from'@/components/HelloWorld'
import login from'@/components/pages/Login'
import dashboard from'@/components/dashboard'
import products from'@/components/pages/products'
import order from'@/components/pages/order'
import coupon from'@/components/pages/coupon'


Vue.use( VueRouter)

export default new  VueRouter({
    routes:[
        {
            path:'*',
            redirect:'/login'
        }
        ,
        {
            path:'/enter',
            name:'Helloworld',
            component:Helloworld,
            meta:{requiresAuth:true},
        },
        {
            path:'/',
            name:'login',
            component:login,
        },
        {
            path:'/dashboard',
            name:'dashboard',
            component:dashboard,
            children:[
                {
                path:'/products',
                name:'products',
                component:products,
            },
            {
                path:'/order',
                name:'order',
                component:order,
            },
            {
                path:'/coupon',
                name:'coupon',
                component:coupon,
            }
        ]
          
        },
        ]
});