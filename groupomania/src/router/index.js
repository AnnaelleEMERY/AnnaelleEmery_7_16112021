import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import Home from '../views/Home.vue'
import Login from '@/components/Login.vue'
import Register from '@/components/Register.vue'


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
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/Profile',
    name: 'Profile',
    component: () => import('../views/Profile.vue'),
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
  component: () => import('../components/UpdateProfile.vue'),
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
  component: () => import('../components/UpdateComment.vue'),
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
  component: () => import('../components/UpdatePost.vue'),
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
