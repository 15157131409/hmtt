<template>
  <div>
    <!-- 登录后 -->
    <div class="header" id="header-login" v-if="user && user.token">
      <div class="avatar">
        <div class="left">
          <van-image
            width="1.76rem"
            height="1.76rem"
            round
            :src="userInfo.photo"
          />
          <span>{{ userInfo.name }}</span>
        </div>
        <div class="button">编辑资料</div>
      </div>
      <ul class="list">
        <li>
          <p>{{ userInfo.art_count }}</p>
          <p>头条</p>
        </li>
        <li>
          <p>{{ userInfo.fans_count }}</p>
          <p>粉丝</p>
        </li>
        <li>
          <p>{{ userInfo.follow_count }}</p>
          <p>关注</p>
        </li>
        <li>
          <p>{{ userInfo.like_count }}</p>
          <p>获赞</p>
        </li>
      </ul>
    </div>
    <!-- 登录后 -->
    <!-- 未登录 -->
    <div class="header header-notlogin" v-else>
      <div class="inner" @click="$router.push('/login')">
        <img src="@/assets/mobile.png" alt="" />
        <p>登录/注册</p>
      </div>
    </div>
    <!-- 未登录 -->
    <van-grid :column-num="2">
      <van-grid-item text="历史">
        <template #icon>
          <i class="toutiao toutiao-lishi"></i>
        </template>
      </van-grid-item>
      <van-grid-item text="收藏">
        <template #icon>
          <i class="toutiao toutiao-shoucang"></i>
        </template>
      </van-grid-item>
    </van-grid>

    <!-- 历史 -->
    <van-cell-group>
      <van-cell title="单元格" is-link />
      <van-cell title="单元格" is-link />
    </van-cell-group>
    <!-- 按钮 -->
    <van-button class="logout" type="default" block @click="logout"
      >删你号</van-button
    >
  </div>
</template>

<script>
import { getUserInfo } from '@/api/user'
import { mapState } from 'vuex'
export default {
  name: 'My',
  async created () {
    if (this.user && this.user.token) {
      try {
        const res = await getUserInfo()
        // console.log('res', res)
        this.userInfo = res.data.data
      } catch (err) {
        console.log(err)
      }
    }
  },
  data () {
    return {
      userInfo: []
    }
  },
  methods: {
    // 退出登录的方法
    async logout () {
      try {
        // 内置的api
        await this.$dialog.confirm({ message: '认真的吗' })
        // vuex的方法
        this.$store.commit('setUser', [])
      } catch (err) {
        console.log(err)
      }
    }
  },
  computed: {
    ...mapState(['user'])
  },
  watch: {},
  filters: {},
  components: {}
}
</script>
<style scoped lang='less'>
.header {
  width: 750px;
  height: 401px;
  // background-color: #3296fa;
  opacity: 0.7;
  background: hsla(210, 62%, 45%, 0.7) url("@/assets/banner.png") no-repeat;
  background-size: cover;
}
.header-notlogin {
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 132px;
    height: 132px;
    margin-bottom: 15px;
  }
  p {
    font-size: 28px;
    font-weight: normal;
    color: #ffffff;
    padding-left: 9px;
  }
}
#header-login {
  padding-top: 116px;
  // margin-top: 116px;
}

.avatar {
  margin-bottom: 55px;
  padding-left: 32px;
  padding-right: 33px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .button {
    width: 115px;
    height: 32px;
    line-height: 32px;
    text-align: center;
    background: #ffffff;
    border-radius: 16px;
    font-size: 20px;
    font-weight: 400;
    color: #6666;
  }
  .left {
    display: flex;
    align-items: center;
    span {
      margin-left: 22px;
      font-size: 30px;
      font-weight: 400;
      color: #fff;
    }
  }
}
.list {
  display: flex;
  justify-content: space-between;
  li {
    flex: 1;
    text-align: center;
    p {
      color: #fff;
      font-weight: 400;
      &:nth-child(1) {
        font-size: 36px;
      }
      &:nth-child(2) {
        font-size: 23px;
      }
    }
  }
}
.toutiao {
  font-size: 45px;
}
.van-grid-item {
  color: #eb5253;
}
&:nth-child(2) {
  color: #ff9d1d;
}
.van-cell-group {
  margin: 9px 0;
}
.logout {
  color: #d86262;
}
</style>
