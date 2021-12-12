import Vue from 'vue'
import VueRouter from 'vue-router'
import { nextTick } from 'vue/types/umd'
import store from '../store'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue')
  },
  {
    path: '/Profile',
    name: 'Profile',
    component: () => import('../views/Profile.vue'),
    beforeEnter: (to, from, next) => {
      if (!store.getters['auth/authenticated']) {
        return nextTick({
          name: 'Login'
        })
      }
      next()
    }
  },
  {
    path:'/Administration',
    name: 'Administration',
    component: () => import('../components/Administration.vue'),
    beforeEnter: (to, from, next) => {
      if (!store.getters['auth/authenticated']) {
      return next({
        name: 'Login'
      })
    }
    next()
  }
},
{
  path: '/NewPost',
  name: 'NewPost',
  component: () => import('../views/NewPost.vue'),
  beforeEnter: (to, from, next) => {
    if (!store.getters['auth/authenticated']) {
      return next({
        name: 'Login'
      })
    }
    next()
  }
},
{
  path: '/post/:id',
  name: 'Post',
  component: () => import('../views/Post.vue'),
  beforeEnter: (to, from, next) => {
    if (!store.getters['auth/authenticated']) {
      return next({
        name: 'Login'
      })
    }
    next()
  }
},
{
  path: '/UpdateProfile/:id',
  name: 'UpdateProfile',
  component: () => import('../views/UpdateProfile.vue'),
  beforeEnter: (to, from, next) => {
    if (!store.getters['auth/authenticated']) {
      return next({
        name: 'Login'
      })
    }
    next()
  }
},
{
  path: '/UpdateComment/:id',
  name: 'UpdateComment',
  component: () => import('../views/UpdateComment.vue'),
  beforeEnter: (to, from, next) => {
    if (!store.getters['auth/authenticated']) {
      return next({
        name: 'Login'
      })
    }
    next()
  }
},
{
  path: '/UpdatePost/:id',
  name: 'UpdatePost',
  component: () => import('../views/UpdatePost.vue'),
  beforeEnter: (to, from, next) => {
    if (!store.getters['auth/authenticated']) {
      return next({
        name: 'Login'
      })
    }
    next()
  }
},
]

const router = new VueRouter({
  routes
})

export default router
