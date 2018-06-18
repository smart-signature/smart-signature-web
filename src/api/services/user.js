import request from '../request';

export default {
  // 根据user_id,获取用户信息
  async get(id) {
    const user = await request(`/users/${id}`);
    return {
      id: user.id,
      nickname: user.wechat_nickname,
      avatarUrl: user.wechat_headimgurl,
      sex: ['', '男', '女'][user.wechat_sex],
      bio: user.bio || 'TA 有点懒，木有写个人签名',
      location: `${user.wechat_province} ${user.wechat_city}`,
    };
  },

  // 当前用户信息
  async current() {
    const user = await request('/user');
    return user;
  },
};
