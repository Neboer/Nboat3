import { ObjectID } from 'mongodb'
import { collections } from '../connection'

const by_id = (blog_id) => {
  return {
    _id: ObjectID.createFromHexString(blog_id)
  }
}

export async function update_blog_by_id (blog_id, meta_obj) {
  await collections.articles.findOneAndUpdate(by_id(blog_id), { $set: meta_obj })
}

export async function upgrade_small_blog_to_big_blog_by_hex_id (small_blog_hex_id) {
  const small_blog_content = await collections.articles.findOne({ _id: ObjectID.createFromHexString(small_blog_hex_id) })
  const new_article_array = [{
    content: small_blog_content.article,
    HTML: small_blog_content.HTML,
    index: 0,
    create_time: small_blog_content.create_time,
    last_modified_time: small_blog_content.last_modified_time,
    comments: []
  }]
  await collections.articles.findOneAndUpdate(by_id(small_blog_hex_id), {
    $set: {
      article: new_article_array,
      blog_type: 1
    },
    $unset: {
      content: '',
      HTML: '',
      comment: ''
    }
  })
}

// new_content: {content: String, HTML: String}
export async function update_article_content_by_id (blog_hex_id, new_content, index) {
  // page可以留空，此时意为修改小博文的文章内容。
  if (!isNaN(index)) {
    // 修改大博文中的一个小文章的内容
    await collections.articles.findOneAndUpdate(by_id(blog_hex_id), {
      $set: {
        'article.$[art].content': new_content.content,
        'article.$[art].HTML': new_content.HTML,
        'article.$[art].last_modified_time': new Date()
      }
    }, { arrayFilters: [{ 'art.index': index }] })
  } else {
    // 修改小博文中的文章。
    await collections.articles.findOneAndUpdate(by_id(blog_hex_id), {
      $set: {
        article: new_content.content,
        HTML: new_content.HTML,
        last_modified_time: new Date()
      }
    })
  }
}
