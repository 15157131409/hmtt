<template>
  <div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <!-- <van-cell v-for="(item, index) in commentList" :key="index">
        <van-image
          slot="icon"
          round
          width="30"
          height="30"
          style="margin-right: 10px"
          :src="item.aut_photo"
        />

        <span style="color: #466b9d" slot="title">hello</span>
        <div slot="label">
          <p style="color: #363636">{{ item.content }}</p>

          <p>
            <span style="margin-right: 10px">{{
              item.pubdate | dataformat
            }}</span>
            <van-button size="mini" type="default">回复</van-button>
          </p>
        </div>
        <van-icon slot="right-icon" name="like-o" />
      </van-cell> -->

      <CommentItem
        v-for="(item, index) in commentList"
        :key="index"
        :item="item"
        @replay-show="$emit('replay-show', $event)"
      ></CommentItem>
    </van-list>
  </div>
</template>

<script>
import CommentItem from './CommentItem.vue'
import { getCommentList } from '@/api/comment.js'
export default {
  props: {
    type: {
      type: String,
      required: true,
      validator (value) {
        return ['a', 'c'].includes(value) // 数据只能是a或者c才能验证通过
      }
    },
    source: {
      type: [Number, String],
      required: true
    },
    commentList: {
      type: Array,
      required: true
    }
  },
  created () {
    console.log(this.type)
    console.log(this.source)
    this.getCommentList()
  },
  data () {
    return {
      paramsObj: {
        source: this.source,
        type: this.type,
        limit: 10

      },
      // commentList: [], // 获取到的评论数据
      loading: false, // list 组件的转圈
      finished: false // list组件的刷新
    }
  },
  methods: {
    async getCommentList () {
      try {
        const res = await getCommentList(this.paramsObj)
        // 数据全部加载完毕之后  直接将finished设置为true即可
        if (res.data.data.results.length === 0) {
          this.finished = true
        }
        // 获取文章评论数量  传给父组件
        this.$emit('set-count', res.data.data.total_count)
        // 保留每一页的数据
        this.commentList.push(...res.data.data.results)
        // console.log(res)
        // 本次返回结果的最后一个评论的id ，作为请求下一页数据的offset参数  ，若本次无具体数据 则值为null
        this.paramsObj.offset = res.data.data.last_id
        this.loading = false // 每次当前页面数据拿回来了  ，就把loading转圈效果关掉
      } catch (err) {
        console.log(err)
      }
    },
    onLoad () {
      this.getCommentList() // 获取下一页数据
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: { CommentItem }
}
</script>

<style scoped lang='less'>
.publish-wrap {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
}

.van-list {
  margin-bottom: 45px;
}
</style>
