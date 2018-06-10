import Vue from 'vue';
import api from '@/api';

const initialState = {
  userMap: {}, // user_id => user
};

const getters = {};

const actions = {
  async getUserById({ commit }, userId) {
    const user = await api.user.getUserById(userId);
    commit('setUser', user);
    return user;
  },
};

const mutations = {
  setUser(state, user) {
    Vue.set(state.userMap, user.id, user);
  },
};

export default {
  namespaced: true,
  state: initialState,
  getters,
  actions,
  mutations,
};
