import Vue from 'vue';
import api from '@/api';

const initialState = {
  data: {},
  errors: {},
  status: {}, // undefined, loading, loaded, failed
};

const getters = {
  // 根据userId获取用户信息（data,error,status)
  getById: state => userId => ({
    data: state.data[userId],
    error: state.errors[userId],
    status: state.status[userId],
  }),
};

const actions = {
  // 获取某用户信息
  async fetch({ commit }, userId) {
    commit('startFetching', userId);
    try {
      const user = await api.user.get(userId);
      commit('setData', user);
    } catch (error) {
      commit('fetchFailed', { userId, error });
    }
  },
};

const mutations = {
  // 开始获取某用户信息（更新状态为loading，以前的error清空）
  startFetching(state, userId) {
    Vue.set(state.errors, userId, undefined);
    Vue.set(state.status, userId, 'loading');
  },

  // 设置某用户信息(data => user，status => loaded, error => undefined)
  setData(state, user) {
    const userId = user.id;
    const extend = user.wechat_nickname ? {
      nickname: user.wechat_nickname,
      avatarUrl: user.wechat_headimgurl,
      sex: ['', '男', '女'][user.wechat_sex],
      bio: user.bio || 'TA 有点懒，木有写个人签名',
      location: `${user.wechat_province} ${user.wechat_city}`,
    } : {};
    const exist = state.data[userId] || {};
    Vue.set(state.data, userId, { ...exist, ...user, ...extend });
    Vue.set(state.errors, userId, undefined);
    Vue.set(state.status, userId, 'loaded');
  },

  // 获取某用户信息失败 (data => undefined, status => failed, error => error)
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
