import api from '@/api';
import _ from 'lodash';

const initialState = {
  // 当前用户
  user: undefined,
};

const getters = {
  getUserId: state => (
    _.get(state, 'user.id')
  ),

  getUser: state => (
    state.user
  ),
};

const actions = {
  // 获取当前用户
  async fetchUser({ commit }) {
    const user = await api.user.current();
    commit('setUser', user);
  },
};

const mutations = {
  setUser(state, user) {
    state.user = user;
  },
};

export default {
  namespaced: true,
  state: initialState,
  getters,
  actions,
  mutations,
};
