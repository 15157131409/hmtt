<template>
  <div>
    <!-- 顶部导航 -->
    <van-nav-bar class="bar" fixed>
      <template #title>
        <van-button type="info" icon="search" round class="search-btn" to="/search"
          >搜索</van-button
        >
      </template>
    </van-nav-bar>
    <!-- 顶部导航 -->

    <!-- tab栏 -->
    <van-tabs v-model="active" animated>
      <van-tab :title="item.name" v-for="item in channels" :key="item.id">
        <!-- 父向子传值  子组件要获取数据 需要根据父组件的id来确定哪一条 -->
        <ArticleList :id="item.id"></ArticleList>
      </van-tab>

      <template #nav-right>
        <div class="nenu" @click="isChannelPanelShow = true">
          <i class="toutiao toutiao-gengduo"></i>
        </div>
        <div class="nenu1"></div>
      </template>
    </van-tabs>
    <!-- tab栏 -->
    <van-popup
      v-model="isChannelPanelShow"
      position="bottom"
      :style="{ height: '98%', paddingTop: '1rem' }"
      closeable
      close-icon-position="top-left"
    >
      <ChannelPanel
        :channels="channels"
        :active="active"
        @change-active="
          active = $event;
          isChannelPanelShow = false;
        "
        @del-event="active = $event"
      ></ChannelPanel>
    </van-popup>
  </div>
</template>

<script>
import ArticleList from '@/components/ArticleList.vue'
import { getMyChannerls } from '@/api/home'
import ChannelPanel from './components/ChannelPanel.vue'
import { getItem } from '@/utils/storage'
const CHANNELS = 'CHANNELS'
export default {
  name: 'Home',
  created () {
    this.getMyChannerls()
  },
  data () {
    return {
      active: 0, // 打开页面显示第几个的索引
      channels: [], // 获取的数据
      isChannelPanelShow: false

    }
  },
  methods: {
    async getMyChannerls () {
      const channels = getItem(CHANNELS)
      if (!(this.$store.state.user && this.$store.state.user.token) && channels) {
        // console.log(this.channels)
        this.channels = channels
      } else {
        try {
          const res = await getMyChannerls()
          // console.log('res', res)
          this.channels = res.data.data.channels
        } catch (err) {
          console.log(err)
        }
      }
    }
  },
  computed: {},

  filters: {},
  components: { ArticleList, ChannelPanel }
}
</script>

<style scoped lang="less">
.search-btn {
  width: 555px;
  height: 64px;
  background: rgb(255, 255, 255, 0.2);
  border-radius: 32px;
  color: #3296fa;
}
.bar {
  background: #3296fa;
}
/deep/.van-nav-bar__title {
  // unset:把本来设置的属性去掉
  max-width: unset;
}
/deep/ .van-tabs__wrap--scrollable .van-tab {
  padding: 0 69px;
  border-right: 1px solid #edeff3;
}
/deep/.van-tabs__line {
  width: 31px;
  // height: 6px;
  background-color: #3296fa;
}
/deep/.nenu {
  min-width: 100px;
  width: 66px;
  height: 82px;
  background: rgba(255, 252, 252, 0.9);
  position: fixed;
  right: 0;
  text-align: center;
  line-height: 82px;
  z-index: 1;
}
.nenu1 {
  min-width: 100px;
  width: 66px;
  background: rgba(255, 255, 255, 0.9);
  i {
    min-width: 100px;
    width: 66px;
    font-size: 33px;
    color: red;
  }
}
/deep/.toutiao {
  font-size: 33px;
}
/deep/.van-tabs__wrap {
  width: 100%;
  position: fixed;
  top: 92px;
  z-index: 1;
  border-bottom: 1px solid #edeff3;
}
/deep/.van-pull-refresh {
  height: calc(100vh - 274px);
  overflow: auto;
}
</style>
