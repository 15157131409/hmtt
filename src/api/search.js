import request from '@/utils/request'

// 搜索关键词

export const getSuggestList = q => {
  return request({
    url: 'suggestion',
    params: {
      q
    }
  })
}

// 搜索结果
// page = 1 是当前第几页
// per_page是每页的数量
// q是搜索关键字
// eslint-disable-next-line camelcase
export const getSearchResult = ({ page = 1, per_page, q }) => {
  return request({
    url: '/search',
    params: {
      page, per_page, q
    }
  })
}
