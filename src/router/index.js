import Vue from 'vue';
import Router from 'vue-router';
import UserView from '@/components/UserView';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/people/:userId',
      name: 'User',
      component: UserView,
    },
  ],
});
