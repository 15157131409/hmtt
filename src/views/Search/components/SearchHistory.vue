<template>
  <div class="search-history">
    <van-cell title="搜索历史">
      <template v-if="isDlete">
        <span @click="$store.commit('delAllHistory')">全部删除</span> &nbsp;
        <span @click="isDlete = false">完成</span>
      </template>
      <van-icon name="delete" @click="isDlete = true" v-else />
    </van-cell>
    <van-cell
      :title="item"
      v-for="(item, index) in searchHistoryList"
      :key="index"
      @click="$emit('search', item)"
    >
      <van-icon
        name="close"
        v-if="isDlete"
        @click.stop="$store.commit('delHistory', index)"
      />
    </van-cell>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'SearchHistory',
  components: {},
  props: {},
  data () {
    return {
      isDlete: false
    }
  },
  computed: {
    ...mapState(['searchHistoryList'])
  },
  watch: {},
  created () { },
  mounted () { },
  methods: {}
}
</script>

<style scoped lang="less"></style>
