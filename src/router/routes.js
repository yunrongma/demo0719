import {createRouter, createWebHashHistory} from 'vue-router';
import articleList from '../components/ArticleList.vue';
import submitNews from '../components/Submit.vue'

const routes = [
    {
      path: '/',
      name: 'article-list',
      component: articleList,
    },
    {
      path: '/submit',
      name: 'submit-news',
      component: submitNews,
    },
  ]

  const router = createRouter({
    history: createWebHashHistory(),
    routes,
  });

  export default router;