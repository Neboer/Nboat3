import { collections, by_id } from '../connection'

export async function remove_blog (blog_id) {
  await collections.articles.deleteOne(by_id(blog_id))
}

export async function remove_article_from_big_blog (blog_id, article_index) {
  return await collections.articles.updateOne(by_id(blog_id), { $pull: { article: { index: article_index } } })
}
