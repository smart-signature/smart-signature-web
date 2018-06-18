import request from '../request';

export default {
  async create({ userId, itemId = 0, value, msg = '' }) {
    const like = await request(
      {
        path: '/likes',
        method: 'post',
      }, {
        userId,
        itemId,
        value,
        msg,
      });
    return like;
  },

  // 根据filter(to: 接收like的用户id)，获取likes列表
  async list({ to, limit = 25, offset = 0 }) {
    const { total, list } = await request('/likes', {
      to,
      limit,
      offset,
    });
    return {
      total,
      limit,
      offset,
      list,
    };
  },
};
