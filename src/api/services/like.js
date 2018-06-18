import request from '../request';

export default {
  async create({ toUserId, itemId = 0, value, digiccy = 'ETH', message = '' }) {
    const like = await request(
      {
        path: '/likes',
        method: 'post',
      }, {
        toUserId,
        itemId,
        value,
        digiccy,
        message,
      });
    return like;
  },

  // 根据filter(to: 接收like的用户id)，获取likes列表
  async list({ toUserId, limit = 25, offset = 0 }) {
    const { count, rows } = await request('/likes', {
      toUserId,
      limit,
      offset,
    });
    return {
      total: count,
      limit,
      offset,
      list: rows,
    };
  },
};
