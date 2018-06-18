import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger';
import entities from './modules/entities/index.js';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  modules: {
    entities,
  },
  strict: debug,
  plugins: debug ? [createLogger()] : [],
});
