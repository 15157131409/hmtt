import request from '@/utils/request'

// 评论列表
export const getCommentList = ({ type, source, offset, limit }) => {
  return request({
    url: 'comments',
    params: {
      type,
      source,
      offset,
      limit
    }
  })
}

// 点赞   参数是id
export const addLike = (target) => {
  return request({
    method: 'POST',
    url: 'comment/likings',
    data: {
      target
    }
  })
}

// 取消点赞  参数是id
export const delLike = (target) => {
  return request({
    method: 'DELETE',
    url: `comment/likings/${target}`
  })
}

// 回复评论
// target 稳扎那个id或者评论的id
// content 内容
// art_id 文章id 对评论内容发表回复是，需要传递此参数 表明所属文章id 对文章进行评论 不要传此参数
export const addComment = (data) => {
  return request({
    method: 'POST',
    url: 'comments',
    data
  })
}
