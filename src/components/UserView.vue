<template>
  <div class="ProfileView">

    <loading :show="user.status === 'loading' || likeCreating.status==='creating'"></loading>
    <alert v-if="user.status==='failed'"
           :value="true"
           :title="user.error.code">{{user.error.message}}</alert>

    <alert v-if="likeCreating.status === 'failed'"
           :value="true"
           :title="likeCreating.error.code">{{likeCreating.error.message}}</alert>

    <div v-if="user.status === 'loaded'"
         class="ProfileHeader">
      <x-img :src="user.data.avatarUrl"
             class="ProfileHeader-avatar">
      </x-img>

      <h1 class="ProfileHeader-name">{{user.data.nickname}}</h1>

      <div class="ProfileHeader-info">
        <div class="ProfileHeader-infoItem">
          {{user.data.sex}}
          <div class="ProfileHeader-divider"></div>
          {{user.data.location}}
        </div>
        <div class="ProfileHeader-infoItem">{{user.data.bio}}</div>
      </div>

      <div class="ProfileHeader-footer">
        <x-button @click.native="onShowDialogLike"
                  class="LikeBtn"
                  mini
                  plain
                  type="warn">{{likeText}}</x-button>
      </div>

      <div>
        <divider style="width:50%; margin: 12px auto 0 auto;">
          <span style="font-size:13px;">
            <span style="color:#576b95;">{{user.data.totalOfReceivedLikes}}</span> 人喜欢</span>
        </divider>

        <div style="width:70%; margin: auto;">
          <flexbox :gutter="0"
                   wrap="wrap">
            <flexbox-item v-for="like in latestLikesToUser.data"
                          v-if="like"
                          :key="like.id"
                          :span="1/7">
              <div style="padding:10%;">
                <x-img :src="like.fromUser.data.avatarUrl"
                       class="avatar"
                       style="display:block; border-radius:2px;"> </x-img>
              </div>
            </flexbox-item>
          </flexbox>
        </div>
      </div>

    </div>

    <panel header="文章"
           :list="list"
           type="1"></panel>

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
            <flexbox-item v-for="i in [0.002,0.004,0.008,0.016,0.032,0.064]"
                          :key="i"
                          :span="1/3">
              <div class="LikeValueBtn-Wrapper">
                <x-button @click.native="()=>{onCreateLike(i)}"
                          class="LikeValueBtn"
                          plain
                          type="warn">{{i}}
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
import { mapActions, mapGetters } from 'vuex';
import {
  Alert,
  Loading,
  Panel,
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
  TransferDomDirective as TransferDom,
} from 'vux';

export default {
  directives: {
    TransferDom,
  },
  components: {
    Alert,
    Loading,
    Panel,
    Group,
    Cell,
    GridItem,
    XTextarea,
    XInput,
    Grid,
    XDialog,
    Flexbox,
    FlexboxItem,
    Divider,
    XButton,
    XImg,
    Actionsheet,
    Tabbar,
  },
  data() {
    return {
      show: true,
      showDialogLike: false,
      list: [
        {
          src: 'http://placehold.it//60x60/3cc51f/ffffff',
          title: '标题一',
          desc:
            '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。',
          // url: '/component/cell',
        },
        {
          src: 'http://placehold.it//60x60/3cc51f/ffffff',
          title: '标题二',
          desc:
            '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。',
          url: {
            // path: '/component/radio',
            replace: false,
          },
          meta: {
            source: '来源信息',
            date: '时间',
            other: '其他信息',
          },
        },
      ],
    };
  },
  computed: {
    ...mapGetters({
      getUserById: 'entities/users/getById',
      getLatestLikesToUser: 'latestLikesToUser/getByUserId',
      likeCreating: 'entities/likes/getCreating',
    }),
    likeText() {
      const list = ['喜欢 TA', 'PICK TA', '稀罕 TA', '点赞 TA'];
      return list[Math.floor(Math.random() * list.length)];
    },
    user() {
      return this.getUserById(this.userId);
    },
    userId() {
      return this.$route.params.userId;
    },
    latestLikesToUser() {
      return this.getLatestLikesToUser(this.userId);
    },
  },
  async created() {
    window.kk = this;
    // 获取用户信息
    this.fetchUser(this.userId);
    // 获取用户收到的最新25个打赏
    this.fetchLatestLikesToUser(this.userId);
  },
  methods: {
    ...mapActions({
      fetchUser: 'entities/users/fetch',
      fetchLatestLikesToUser: 'latestLikesToUser/fetch',
      createLike: 'entities/likes/create',
    }),
    onShowDialogLike() {
      this.showDialogLike = true;
    },
    onCreateLike(value) {
      this.createLike({ toUserId: this.userId, value });
      this.showDialogLike = false;
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
  font-size: 17px;
  background: none !important;
  sup {
    font-size: 9px;
  }
}
</style>
