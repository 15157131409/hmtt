import request from '@/utils/request'

// 我的评到
export const getMyChannerls = () => {
  return request({
    url: 'user/channels'
  })
}

// 获取文章列表
// eslint-disable-next-line camelcase
export const getArticleList = ({ channel_id, timestamp }) => {
  return request({
    url: 'articles',
    params: {
      channel_id,
      timestamp
    }
  })
}

// 获取所有频道数据
export const getAllArticleList = () => {
  return request({
    url: 'channels'

  })
}

// 频道数据持久化
export const saveChannels = (channels) => {
  return request({
    url: 'user/channels',
    method: 'PUT',
    data: {
      channels
    }
  })
}
