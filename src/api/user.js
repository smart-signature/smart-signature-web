import Promise from 'bluebird';

export default {
  async getUserById(userId) {
    await Promise.delay(2000);
    return {
      id: userId,
      nickname: '麻油炒饭',
      sex: '男',
      location: '上海 虹口',
      avatarUrl: 'http://thirdwx.qlogo.cn/mmopen/vi_32/PiajxSqBRaEJvbmjxQ5m7JyTXFhf0HEVJgC4IHSuhUOFseI2rMoAqtQ9aACohkYINm50OM4icU4tiaKw8hTu8ZmlQ/132',
      bio: '这个作者很懒，没有写个人签名',
    };
  },
};
