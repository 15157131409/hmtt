import request from '@/utils/request'

// 根据id查找文章
export const getArticle = (article_id) => {
  return request({
    url: `/articles/${article_id}`
  })
}

// 添加用户
export const addUser = (target) => {
  return request({
    method: 'POST',
    url: 'user/followings',
    data: {
      target
    }
  })
}

// 取消用户
export const delUser = (target) => {
  return request({
    method: 'DELETE',
    url: 'user/followings/$(target)'
  })
}

// 收藏
export const addCollect = (target) => {
  return request({
    method: 'POst',
    url: 'article/collections',
    data: {
      target
    }
  })
}

// 取消收藏
export const delCollect = (target) => {
  return request({
    method: 'DELETE',
    url: `article/collections/${target}`
  })
}
