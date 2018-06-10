import api from '@/api';

const initialState = {};

const getters = {};

const actions = {
  async createLike({ commit }, { user_id, value }) {
    const tx = await api.like.createLike({ user_id, value });
    return tx;
  },
};

const mutations = {};

export default {
  namespaced: true,
  state: initialState,
  getters,
  actions,
  mutations,
};
