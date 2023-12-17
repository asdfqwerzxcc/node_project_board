import { createRouter, createWebHistory } from 'vue-router'
import PageHome from '@/views/PageHome.vue'
import Login_form from '@/views/common/Login_form'
import register_form from '@/views/common/register_form'
import Board_form from '@/views/common/Board_form'
import store from '../store/index'

const routes = [
  {
    path: '/',
    name: 'PageHome',
    component: PageHome,
    meta: {
      auth: true
    }
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/PageAbout.vue')
  },
  //게시판 보기
  {
    path: '/board/list/:page',
    name: 'BoardlistWithPage',
    meta: {
      auth: true
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import(/* webpackChunkName: "about" */ '../views/PageAbout.vue')
    component: Board_form
  },
  {
    path: '/board/list',
    name: 'BoardlistWithoutPage',
    meta: {
      auth: true
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import(/* webpackChunkName: "about" */ '../views/PageAbout.vue')
    component: Board_form
  },

  //로그인
  {
    path: '/login',
    name: 'Login',
    component: Login_form  //로그인 컴포넌트 추가
  },
  //회원가입
  {
    path: '/register',
    name: 'register',
    component: register_form
  },
  //글보기
  {
    path: '/getBoard/:index',
    name: 'getBoard',
    component: () => import(/* webpackChunkName: "about" */ '../views/common/getBoard_form.vue')
  },
  //글쓰기
  {
    path: '/newBoard',
    name: 'newBoard',
    component: () => import('../views/common/newBoard_form.vue')
  },
  //수정
  {
    path: '/reboard/:index',
    name: 'ReboardComponent',
    component: () => import('../views/common/update_form.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.auth && !store.getters.iscookie) {
    console.log(store.getters.iscookie)
    next('/login')
    return
  }
  next()
})

export default router