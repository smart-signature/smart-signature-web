import Vue from 'vue';
import api from '@/api';

const initialState = {
  data: {},
  errors: {},
  status: {},
  creating: { // 正在被创建
    data: undefined,
    error: undefined,
    status: undefined, // creating, created,failed
  },
};

const getters = {
  getById: (state, _getters, rootState, rootGetters) => (likeId) => {
    const like = state.data[likeId];
    if (like) {
      like.toUser = rootGetters['entities/users/getById'](like.toUser.id);
      like.fromUser = rootGetters['entities/users/getById'](like.fromUser.id);
    }
    return {
      data: like,
      error: state.errors[likeId],
      status: state.status[likeId],
    };
  },
  getCreating: state => state.creating,
};

const actions = {
  // 打赏（创建一个like）
  async create({ commit, dispatch }, { toUserId, itemId = 0, value, digiccy = 'ETH', message = '' }) {
    commit('startCreating');
    try {
      const like = await api.like.create({ toUserId, itemId, value, digiccy, message });
      commit('createSuccess', like);
      // 打赏成功了，更新用户(toUserId)收到的最新打赏
      dispatch('latestLikesToUser/fetch', toUserId, { root: true });
    } catch (error) {
      commit('createFailed', error);
    }
  },
};

/* eslint no-param-reassign: ["error", { "props": false }] */

const mutations = {
  startCreating(state) {
    state.creating.status = 'creating';
  },
  createSuccess(state, like) {
    state.creating.error = undefined;
    state.creating.data = like;
    state.creating.status = 'created';
  },
  createFailed(state, error) {
    state.creating.error = error;
    state.creating.status = 'failed';
  },
  setData(state, like) {
    const likeId = like.id;
    Vue.set(state.data, likeId, like);
    Vue.set(state.errors, likeId, undefined);
    Vue.set(state.status, likeId, 'loaded');
  },
};

export default {
  namespaced: true,
  state: initialState,
  getters,
  actions,
  mutations,
};
