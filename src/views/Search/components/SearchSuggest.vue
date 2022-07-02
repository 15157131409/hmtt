<template>
  <div>
    <van-cell v-for="(item, index) in list" :key="index" icon="search" @click="$emit('search',item)">
      <template #title>
        <span v-html="highlight(item)"></span>
      </template>
    </van-cell>
  </div>
</template>

<script>
// 响应式数据写在data   非响应式写在上面  这样性能高一点
import { getSuggestList } from '@/api/search'
let timer = null
export default {
  name: 'SearchSuggest',
  props: {
    searchText: {
      type: String,
      required: true
    }
  },

  created () { },
  data () {
    return {
      list: []
    }
  },
  methods: {
    highlight (str) {
      const reg = new RegExp(this.searchText, 'g')
      return str.replace(reg, `<span style='color:red'>${this.searchText}</span>`)
    }
  },
  computed: {},
  watch: {
    searchText: {
      handler (val) {
        clearInterval(timer)
        timer = setTimeout(async () => {
          try {
            const res = await getSuggestList(val)
            this.list = res.data.data.options
          } catch (err) {
            console.log(err)
          }
        }, 900)
      },
      immediate: true
    }
  },
  // 组件被销毁了。 要清理定时器  避免内存泄漏
  beforeDestroy () {
    clearInterval(timer)
  },
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
</style>
