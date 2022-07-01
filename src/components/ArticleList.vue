<template>
  <van-cell-group>
    <van-pull-refresh
      v-model="refreshing"
      @refresh="onRefresh"
      ref="pullrefresh"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <!-- <van-cell
          :title="item.title"
          value="内容"
          label="描述信息"
          v-for="(item, index) in articleList"
          :key="index"
        /> -->
        <ArticleItem
          v-for="(item, index) in articleList"
          :key="index"
          :article="item"
        ></ArticleItem>
      </van-list>
    </van-pull-refresh>
  </van-cell-group>
</template>

<script>

import { getArticleList } from '@/api/home'
import ArticleItem from './ArticleItem.vue'
let ele = null
let scrollTop = 0
export default {
  name: 'ArticleList',
  props: {
    id: {
      type: Number,
      required: true

    }
  },
  created () {
    this.getArticleList()
  },
  mounted () {
    ele = this.$refs.pullrefresh.$el

    this.$refs.pullrefresh.$el.addEventListener('scroll', function () {
      // console.log(this.scrollTop)
      // 把页面滚动的距离 赋值给全局遍历scrollTop
      scrollTop = this.scrollTop
    })
  },
  // 页面跳转执行
  activated () {
    // ele是元素  scrollTop是元素的滚动事件
    // 执行这个函数的时候 把页面滚动的距离从新赋值
    ele.scrollTop = scrollTop
  },
  data () {
    return {
      //  定义一个当前时间  这个接口需要传值
      timestamp: Date.now(),
      articleList: [],
      loading: false,
      finished: false,
      refreshing: false

    }
  },
  methods: {
    // 获取文章列表的接口
    async getArticleList () {
      if (this.refreshing) {
        this.articleList = []
        this.refreshing = false
      }
      try {
        // 接口需要两个参数  第一个是父组件的id  第二个是时间戳
        const res = await getArticleList({ channel_id: this.id, timestamp: this.timestamp })
        // console.log(res)
        // 每次传完时间戳之后 需要把时间戳更新  接口里面会有更新  所以只需要赋值就行
        this.timestamp = res.data.data.pre_timestamp

        // 如果数据的时间戳是null   就是加载完完毕了
        // 我们就做一个判断停止他
        if (this.timestamp == null) {
          this.finished = true
        }

        // 拿到接口里面的数据 赋值
        this.articleList.push(...res.data.data.results)

        // 数据加载完毕 把list组件的加载中刷新
        this.loading = false
      } catch (err) {
        console.log(err)
      }
    },
    onLoad () {
      this.getArticleList()
    },
    onRefresh () {
      // console.log('刷新了')
      this.finished = false // 防止用户把加载更多搞结束了
      this.loading = true // 从新加载数据

      this.timestamp = Date.now()
      this.getArticleList()
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: { ArticleItem }
}
</script>

<style scoped lang="less">
.van-cell-group {
  margin-top: 174px;
}
</style>
