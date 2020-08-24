import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import Home from '../views/Home.vue';
import Profile from '../views/Profile.vue';

Vue.use(VueRouter)

  const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Login',
    component: Login,
    meta: {
      guest: true
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: {
      guest: true
    }
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: {
      requiresAuth: true
    }
  },

]

const router = new VueRouter({
  mode: 'history',
  routes
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('@todoToday:token')
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if (token == null) {
      next({
          path: '/',
          params: { nextUrl: to.fullPath }
      })
    } else {
      next()
    }
  } 
  else if(to.matched.some(record => record.meta.guest)){
    if (token == null) {
      next()
    }
    else {
      next({name: 'Home' })
    }
  }
  else {
    next()
  }
})

export default router
