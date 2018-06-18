import request from '../request';

export default {
  // 根据user_id,获取用户信息
  async get(id) {
    const user = await request(`/users/${id}`);
    return user;
  },

  // 当前用户信息
  async current() {
    const user = await request('/user');
    return user;
  },
};
