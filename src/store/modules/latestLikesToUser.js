import Vue from 'vue';
import api from '@/api';
import config from '@/config';

const initialState = {
  // 用户收到的最新的config.limitOfLatestLikesToUser个likes
  data: {}, // userId => [{id:likeId}]
  errors: {},
  status: {},
};

const getters = {
  // 获取用户收到的最新的limit个likes
  getByUserId: (state, _getters, rootState, rootGetters) => (userId) => {
    const likes = state.data[userId] || [];
    likes.map(({ id }) => rootGetters['entities/likes/getById'](id));
    return {
      data: likes,
      error: state.errors[userId],
      status: state.status[userId],
    };
  },
};

const actions = {
  // 获取某用户(userId)收到的最新的limit个likes
  async fetch({ commit }, userId) {
    const limit = config.limitOfLatestLikesToUser;
    commit('startFetching', userId);
    try {
      const { total, list } = await api.like.list({ toUserId: userId, limit, offset: 0, order: 'DESC' });
      commit('setData', { likes: list, userId });
      list.forEach((like) => {
        commit('entities/likes/setData', like, { root: true });
        commit('entities/users/setData', like.toUser, { root: true });
        commit('entities/users/setData', like.fromUser, { root: true });
      });
      commit('entities/users/setData', { id: userId, totalOfReceivedLikes: total }, { root: true });
    } catch (error) {
      commit('fetchFailed', { userId, error });
    }
  },
};

const mutations = {
  startFetching(state, userId) {
    Vue.set(state.errors, userId, undefined);
    Vue.set(state.status, userId, 'loading');
  },
  setData(state, { likes, userId }) {
    Vue.set(state.data, userId, likes);
    Vue.set(state.errors, userId, undefined);
    Vue.set(state.status, userId, 'loaded');
  },
  fetchFailed(state, { userId, error }) {
    Vue.set(state.errors, userId, error);
    Vue.set(state.data, userId, undefined);
    Vue.set(state.status, userId, 'failed');
  },
};

export default {
  namespaced: true,
  state: initialState,
  getters,
  actions,
  mutations,
};
