<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
};
</script>

<style lang="less">
@import "~vux/src/styles/reset.less";
@import '~vux/src/styles/close.less';

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
