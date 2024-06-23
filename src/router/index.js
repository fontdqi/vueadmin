import { createRouter, createWebHistory } from 'vue-router'
import  {useTokenStore}  from '@/stores/tokenStore'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/home/index.vue'),
      meta: {
        name: 'Home',
        authRequired: true
      }

    },
    {
      path: '/login',
      name: 'Login',
      // meta: {
      //   title: 'Login',
      //   authRequired: true
      // },

      component: () => import('../views/login/index.vue')
    }
  ]
});


// 全局前置守卫
router.beforeEach((to, from, next) => {
  const tokenStore = useTokenStore();
  console.log('得到了',tokenStore.accessToken);
  if (to.meta.authRequired) {
    if (tokenStore.accessToken) {
      next();
    } else {
      next( '/login' );
    }
  } else {
    next();
  }
});

export default router
