<template>
  <div>
    <!-- 登录头部 -->
    <van-nav-bar title="标题" left-arrow @click-left="$router.back()">
      <van-icon name="cross" slot="left" />
    </van-nav-bar>
    <!-- 登录头部 -->

    <!-- 登录表单 -->
    <van-form @submit="onSubmit" ref="form">
      <van-field
        v-model.trim="mobile"
        name="mobile"
        placeholder="千万别输手机号"
        :rules="[
          { required: true, message: '别填手机号' },
          {
            pattern: /^(?:(?:\+|00)86)?1\d{10}$/,
            message: '手机号都不会写，彩笔',
          },
        ]"
      >
        <!-- <i class="toutiao toutiao-shouji" slot="left-icon"></i> -->
        <Myicon name="shouji" slot="left-icon"></Myicon>
      </van-field>
      <van-field
        v-model.trim="code"
        type="password"
        name="code"
        placeholder="千万别输验证码"
        :rules="[
          { required: true, message: '别写验证码' },
          { pattern: /^\d{6}$/, message: '验证码错啦' },
        ]"
      >
        <i class="toutiao toutiao-yanzhengma" slot="left-icon"></i>
        <template #button>
          <!-- 倒计时 -->
          <!-- vant倒计时里面自带的事件 @finish  到时间了自动执行 -->
          <van-count-down
            :time="time"
            format=" ss s"
            v-if="isCountDownShow"
            @finish="isCountDownShow = false"
          />
          <!-- 倒计时 -->

          <!-- 验证码的框 -->
          <van-button
            @click="onSendSms"
            size="small"
            class="yzm"
            native-type="button"
            v-else
            >发送验证码</van-button
          >
          <!-- 验证码的框 -->
        </template>
      </van-field>
      <div style="margin: 16px">
        <van-button round block native-type="submit" class="login-btn"
          >提交</van-button
        >
      </div>
    </van-form>
    <!-- 登录表单 -->
  </div>
</template>

<script>
import { getSmsCode, login } from '@/api/user.js'

export default {
  created () { },
  data () {
    return {
      mobile: '15157131409', // 手机号13911111111
      code: '246810', // 验证码
      time: 5 * 1000,
      isCountDownShow: false

    }
  },
  methods: {
    async onSubmit (values) {
      try {
        const res = await login(values)
        // console.log(res)
        this.$store.commit('setUser', res.data.data)
        this.$router.push({ name: 'my' })
      } catch (err) {
        console.log(err)
      }
    },
    async onSendSms () {
      try {
        await this.$refs.form.validate('mobile')
        this.isCountDownShow = true // 显示倒计时
        try {
          await getSmsCode(this.mobile)
          this.$toast.success('发送成功')
        } catch (err) {
          this.$toast.fail('发送失败')
        }
      } catch (err) {
        console.log('失败了小辣鸡', err)
        this.$toast('你错了')
      }
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
/deep/.van-nav-bar {
  background-color: red;
}
/deep/.toutiao {
  font-size: 37px;
}
.yzm {
  width: 152px;
  height: 46px;
  line-height: 50px;
  background-color: #ccc;
  border-radius: 23px;
  color: #666;
  position: fixed;
  right: 10px;

  .van-button__text {
    zoom: 0.96;
  }
}
.login-btn {
  width: 694px;
  height: 88px;
  background-color: rgb(0, 255, 64, 0.1);
  border-radius: 10px;
  font-size: 30px;
  color: #fff;
}
.van-count-down {
  position: fixed;
  right: 20px;
}
</style>
