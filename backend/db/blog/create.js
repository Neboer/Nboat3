import assert from 'assert'
import { collections } from '../connection'

/**
 * @param {{title: String,big_cover: String,
    small_cover: String,
    description: String,
    article: String,
    HTML: String
    visible: boolean,
    tags: Array}} small_in 用户输入的新的小博客的原型
 * @return Promise, promise中你收到的第一个参数是新创建博客的hex id。
 */

export function create_simple_blog (small_in) {
  const small_db = {
    ...small_in, ...{
      create_time: new Date(),
      last_modified_time: new Date(),
      views: 0,
      type: 0,
      comment: []
    }
  }
  return collections.articles.insertOne(small_db).then(result => {
    assert.strictEqual(result.insertedCount, 1)
    return result.insertedId.toHexString()
  })
}

/**
 * @param {{title: String,big_cover: String,
    small_cover: String,
    description: String,
    article: String,
    HTML: String,
    visible: boolean,
    tags: Array}} big_in 用户输入的新的大博客的原型
 */
export function create_big_blog (big_in) {
  const big_db = {
    ...big_in, ...{
      create_time: new Date(),
      last_modified_time: new Date(),
      views: 0,
      type: 1,
      comment: []
    }
  }
  big_db.article = [{
    content: big_in.article,
    HTML: big_in.HTML,
    index: 0,
    create_time: new Date(),
    last_modified_time: new Date()
  }]
  delete big_db.HTML
  return collections.articles.insertOne(big_db).then(result => {
    assert.strictEqual(result.insertedCount, 1)
    return result.insertedId.toHexString()
  })
}
