import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger';
import user from './modules/user';
import like from './modules/like';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  modules: {
    user,
    like,
  },
  strict: debug,
  plugins: debug ? [createLogger()] : [],
});
