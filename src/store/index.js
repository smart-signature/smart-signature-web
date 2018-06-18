import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger';
import entities from './modules/entities/index.js';
import latestLikesToUser from './modules/latestLikesToUser';
import session from './modules/session';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  modules: {
    entities,
    session,
    latestLikesToUser,
  },
  strict: debug,
  plugins: debug ? [createLogger()] : [],
});
