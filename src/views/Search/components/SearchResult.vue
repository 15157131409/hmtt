<template>
  <div class="container">
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <ArticleItem
          v-for="(item, index) in list"
          :key="index"
          :article="item"
        ></ArticleItem>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getSearchResult } from '@/api/search'
import ArticleItem from '@/components/ArticleItem.vue'
export default {
  name: 'SearchResult',
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  created () {
    this.getSearchResult()
  },
  data () {
    return {
      page: 1,
      per_page: 20,
      list: [],
      // list下拉
      loading: false,
      finished: false,
      // 下拉更新
      isLoading: false
    }
  },
  methods: {
    // 搜所跟新
    async getSearchResult () {
      try {
        const res = await getSearchResult({ page: this.page, per_page: this.per_page, q: this.searchText })
        // console.log(res)
        // 数据加载完了需要把finished 变成true
        if (res.data.data.results.length === 0) {
          this.finished = true
        }
        // 新的把旧的何在一起 用push

        this.list.push(...res.data.data.results)
        this.loading = false
        this.isLoading = false
      } catch (err) {
        console.log(err)
      }
    },
    // list组件函数
    onLoad () {
      this.page++
      this.getSearchResult()
    },
    // 下拉刷新函数
    onRefresh () {
      this.list = []
      this.page = 1
      this.getSearchResult()
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: { ArticleItem }
}
</script>

<style scoped lang='less'>
.container {
  overflow: auto;
  height: calc(100vh - 108px);
}
</style>
