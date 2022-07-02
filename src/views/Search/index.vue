<template>
  <div>
    <form action="/">
      <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        background="#3296fa"
        @cancel="$router.back()"
        autofocus
        @focus="isSearch = false"
        @search="onSearch"
      />
    </form>
    <!-- 当搜索框是空的时候 显示搜索历史 -->
    <!-- 当搜索框中有值的时候 显示搜索建议  当回车的时候显示结果 -->
    <SearchHistory v-if="searchText === ''" @search='onSearch'></SearchHistory>
    <template v-else>
      <SearchResult v-if="isSearch" :searchText='searchText'></SearchResult>
      <SearchSuggest
        v-else
        :searchText="searchText"
        @search="onSearch"
      ></SearchSuggest>
    </template>
  </div>
</template>

<script>
import SearchHistory from './components/SearchHistory.vue'
import SearchResult from './components/SearchResult.vue'
import SearchSuggest from './components/SearchSuggest.vue'
export default {
  name: 'Search',
  created () { },
  data () {
    return {
      searchText: '',
      isSearch: false // 默认没有回车
    }
  },
  methods: {
    onSearch (str) {
      this.isSearch = true
      this.searchText = str
      this.$store.commit('setSearchHistoryList', str)
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: { SearchHistory, SearchResult, SearchSuggest }
}
</script>

<style scoped lang='less'>
</style>
