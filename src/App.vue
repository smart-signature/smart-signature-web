<template>
  <div id="app">
    <router-view></router-view>
    <tabbar style="position:fixed; bottom:0;">
      <tabbar-item>
        <span slot="label">发现</span>
      </tabbar-item>
      <tabbar-item>
        <span slot="label">创建</span>
      </tabbar-item>
      <tabbar-item>
        <span slot="label">消息</span>
      </tabbar-item>
      <tabbar-item :link="'/people/'+currentUserId">
        <span slot="label">我的</span>
      </tabbar-item>
    </tabbar>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { Tabbar, TabbarItem, Group, Cell } from 'vux';

export default {
  name: 'app',
  components: {
    Tabbar,
    TabbarItem,
    Group,
    Cell,
  },
  computed: {
    ...mapGetters({
      currentUserId: 'session/getUserId',
    }),
  },
  methods: {
    ...mapActions({
      fetchCurrentUser: 'session/fetchUser',
    }),
  },
  async created() {
    this.fetchCurrentUser();
  },
};
</script>

<style lang="less">
@import "~vux/src/styles/reset.less";
@import "~vux/src/styles/close.less";

body {
  color: #333;
  background-color: #f2f2f2;
}

/* User View */
.LikeDialog {
  .weui-dialog {
    max-width: 900px;
    width: 92%;
  }
}
</style>
