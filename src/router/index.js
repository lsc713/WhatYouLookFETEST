import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ListView from '@/views/ListView.vue'
import Weather from '@/components/weather/Weather.vue'
import ClothRecommend from '@/components/cloth/ClothRecommend.vue'
import UploadView from '@/views/UploadView.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      children :[
        {
          path: "",
          name:"Weather",
          component: Weather
        },
        {
          path: "",
          name:"ClothRecommend",
          component: ClothRecommend
        },
      ]
    },
    {
      path: '/list',
      name: 'list',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: ListView,
    },
    {
      path: '/upload',
      name: 'upload',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: UploadView,
    },
    
  ],
})

export default router
