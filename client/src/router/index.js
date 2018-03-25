import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/Login'
import Weather from '@/components/Weather'
import AllData from '@/components/AllData'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/Weather',
      name: 'Weather',
      component: Weather
    },
    {
      path: '/AllData',
      name: 'AllData',
      component: AllData
    }
  ]
})
