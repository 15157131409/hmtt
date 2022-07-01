import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import relativveTime from 'dayjs/plugin/relativeTime'
dayjs.locale('zh-cn')
dayjs.extend(relativveTime)

export const dataformat = (tiem) => {
  return dayjs(tiem).fromNow()
}
