<template>
  <div>
    <van-nav-bar :title="title" left-arrow @click-left="$emit('close')" fixed>
      <template #left>
        <van-icon name="cross"></van-icon>
      </template>
    </van-nav-bar>
    <CommentItem :item="comment" class="comment"></CommentItem>
    <van-cell title="全部回复"></van-cell>
    <CommentItem
      :item="item"
      v-for="item in list"
      :key="item.com_id"
      class="comment1"
    ></CommentItem>
    <div class="comment1"></div>
    <div class="buttom">
      <van-button
        type="primary"
        block
        round
        plain
        @click="isAddCommentShow = true"
      >
        大块的
      </van-button>
    </div>

    <!-- 新添加评论 -->
    <van-popup position="bottom" v-model="isAddCommentShow">
      <AddComment
        :target="comment.com_id"
        :art_id="$route.params.article_id"
        v-if="isAddCommentShow"
        @add-comment="
          list.unshift($event);
          isAddCommentShow = false;
          comment.reply_count++;
        "
      ></AddComment>
    </van-popup>
  </div>
</template>

<script>
import { getCommentList } from '@/api/comment'
import CommentItem from './CommentItem.vue'
import AddComment from './AddComment.vue'
export default {
  props: {
    comment: {
      type: Object,
      default: () => ({})
    }
  },
  created () {
    this.getCommentList()
  },
  data () {
    return {
      offset: null,
      limit: 10,
      list: [],
      isAddCommentShow: false
    }
  },
  methods: {
    async getCommentList () {
      try {
        const res = await getCommentList({ type: 'c', source: this.comment.com_id, offset: this.offset, limit: this.limit })
        this.list = res.data.data.results
        console.log(res)
      } catch (err) {
        console.log(err)
      }
    }
  },
  computed: {
    title () {
      const count = this.comment.reply_count
      if (count === 0) {
        return '没有回复'
      } else {
        return count + '条回复'
      }
    }
  },
  watch: {},
  filters: {},
  components: { CommentItem, AddComment }
}
</script>

<style scoped lang='less'>
.comment {
  margin-top: 92px;
}
.comment1 {
  margin-bottom: 100px;
}
.buttom {
  width: 750px;
  position: fixed;
  bottom: 0;
  padding: 10px 30px;
  box-sizing: border-box;
  background-color: pink;
}
</style>
