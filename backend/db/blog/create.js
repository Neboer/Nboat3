import { collections, by_id } from '../connection'

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

export async function create_simple_blog (small_in) {
  const small_db = {
    ...small_in, ...{
      create_time: new Date(),
      last_modified_time: new Date(),
      views: 0,
      comment: []
    }
  }
  const result = await collections.articles.insertOne(small_db)
  return result.insertedId.toHexString()
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
export async function create_big_blog (big_in) {
  const big_db = {
    ...big_in, ...{
      create_time: new Date(),
      last_modified_time: new Date(),
      views: 0,
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
  const result = await collections.articles.insertOne(big_db)
  return result.insertedId.toHexString()
}

export async function add_article_to_big_blog_by_id (blog_id, content) {
  // mongodb默认找最后的一篇文章的index + 1，作为下一篇文章的index。
  const article_list = (await collections.articles.findOne(by_id(blog_id))).article
  const max_article_index = article_list[article_list.length - 1].index
  const result = await collections.articles.findOneAndUpdate(by_id(blog_id), {
    $push: {
      article: {
        content: content.content,
        HTML: content.HTML,
        index: max_article_index + 1,
        create_time: new Date(),
        last_modified_time: new Date()
      }
    },
    $set: {
      last_modified_time: new Date()
    }
  })
  console.log(result)
}
