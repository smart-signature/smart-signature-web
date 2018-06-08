<template>
  <div class="ProfileView">

    <div class="ProfileHeader">
      <x-img :src="headimgurl"
             class="ProfileHeader-avatar">
      </x-img>

      <h1 class="ProfileHeader-name">麻油炒饭</h1>

      <div class="ProfileHeader-info">
        <div class="ProfileHeader-infoItem">
          男
          <div class="ProfileHeader-divider"></div>
          上海 浦东
        </div>
        <div class="ProfileHeader-infoItem">这个作者很懒，没有写个人签名</div>
      </div>

      <div class="ProfileHeader-footer">
        <x-button @click.native="onShowDialogLike"
                  class="LikeBtn"
                  mini
                  plain
                  type="warn">喜欢作者</x-button>
      </div>
    </div>

    <x-dialog v-model="showDialogLike"
              class="LikeDialog">
      <div class="LikeDialogInner">

        <div class="LikeDialogHeader">
          <h6 class="LikeDialogHeader-title">喜欢作者</h6>
          <span class="vux-close LikeDialogHeader-action"
                @click="showDialogLike=false"></span>
        </div>

        <div class="LikeDialogBody">
          <flexbox :gutter=0
                   wrap="wrap">
            <flexbox-item v-for="i in 6"
                          :key="i"
                          :span="1/3">
              <div class="LikeValueBtn-Wrapper">
                <x-button class="LikeValueBtn"
                          plain
                          type="warn">11{{i}}
                  <sup>ETH</sup>
                </x-button>
              </div>
            </flexbox-item>
          </flexbox>
        </div>

        <x-button mini
                  class="LinkText">其他金额</x-button>
      </div>
    </x-dialog>

  </div>
</template>

<script>
import {
  Group,
  Cell,
  XTextarea,
  XInput,
  Grid,
  GridItem,
  Flexbox,
  FlexboxItem,
  XButton,
  Divider,
  XImg,
  XDialog,
  Actionsheet,
  Tabbar,
  TabbarItem,
} from 'vux';

export default {
  components: {
    Group,
    Cell,
    XTextarea,
    XInput,
    Grid,
    GridItem,
    XDialog,
    Flexbox,
    FlexboxItem,
    Divider,
    XButton,
    XImg,
    Actionsheet,
    Tabbar,
    TabbarItem,
  },
  data() {
    return {
      showDialogLike: false,
      headimgurl:
        'http://thirdwx.qlogo.cn/mmopen/vi_32/PiajxSqBRaEJvbmjxQ5m7JyTXFhf0HEVJgC4IHSuhUOFseI2rMoAqtQ9aACohkYINm50OM4icU4tiaKw8hTu8ZmlQ/132',
    };
  },
  methods: {
    onShowDialogLike() {
      this.showDialogLike = true;
    },
  },
};
</script>

<style lang="less" scoped>
.ProfileHeader {
  text-align: center;
  background: #ffffff;
  padding: 6vw 0;

  .ProfileHeader-avatar {
    width: 20vw;
    max-width: 80px;
    border-radius: 3px;
  }

  .ProfileHeader-name {
    font-size: 18px;
  }
  .ProfileHeader-infoItem {
    margin: 15px 0;
    color: #999;
    font-size: 14px;
  }
  .ProfileHeader-divider {
    display: inline-block;
    width: 1px;
    height: 10px;
    margin: 0 8px;
    background: #ebebeb;
  }
}

.LikeDialogInner {
  padding: 20px 10px;
}

.LikeDialogHeader {
  overflow: hidden;
  margin: 0 5px;
  .LikeDialogHeader-title {
    font-size: 16px;
    font-weight: 600;
    float: left;
  }
  .LikeDialogHeader-action {
    float: right;
    transform: scale(0.7);
    color: black;
  }
}

.LikeDialogBody {
  margin: 28px 0 18px 0;
  .LikeValueBtn-Wrapper {
    margin: 5px;
  }
}

.LikeBtn {
  margin-top: 10px;
  padding: 0 1.3em;
  line-height: 2.3;
  font-size: 15px;
  color: #fa624a;
  border-color: #fa624a;
  border-radius: 3px;
}

.LinkText {
  background: none !important;
  margin: auto !important;
  display: block !important;
  color: #576b95;
  &:after {
    border: none;
  }
}

.LikeValueBtn {
  color: #fa624a;
  border: 1.5px solid #fcb0a4 !important;
  font-weight: 900;
  font-size: 21px;
  background: none !important;
  sup {
    font-size: 10px;
  }
}
</style>
