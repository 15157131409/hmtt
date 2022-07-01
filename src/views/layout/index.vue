<template>
  <div>
    <!-- keep-alive  缓存  跳转网页的时候使用 -->
    <keep-alive :include="['Home']">
      <router-view class="main" />
    </keep-alive>

    <van-tabbar route>
      <van-tabbar-item replace to="/home" icon="home-o"
        >首页
        <template #icon>
          <i class="toutiao toutiao-shouye"></i>
        </template>
      </van-tabbar-item>
      <van-tabbar-item replace to="/video" icon="home-o"
        >视频
        <template #icon>
          <i class="toutiao toutiao-shipin"></i>
        </template>
      </van-tabbar-item>
      <van-tabbar-item replace to="/qa" icon="home-o"
        >问答
        <template #icon>
          <i class="toutiao toutiao-wenda"></i>
        </template>
      </van-tabbar-item>
      <van-tabbar-item replace to="/my" icon="home-o"
        >我的
        <template #icon>
          <i class="toutiao toutiao-wode"></i>
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  created () { },
  data () {
    return {}
  },
  methods: {},
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.toutiao {
  font-size: 40px;
}
/deep/.van-tabbar-item__text {
  font-size: 20px;
}
.main {
  padding-bottom: 100px;
  background-color: #f5f7f9;
}
</style>
