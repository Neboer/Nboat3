import { collections } from '../connection'

// 查询博客列表

export function get_document_count (include_invisible) {
  if (include_invisible) {
    return collections.articles.estimatedDocumentCount()
  } else {
    return collections.articles.countDocuments({ visible: true })
  }
}

export async function get_blog_list (start, length, show_invisible) {
  const find_object = show_invisible ? {} : { visible: true }
  return await collections.articles.find(find_object).sort({ _id: -1 }).skip(start).limit(length).toArray() // 不需要进行错误检验，因为没必要检验。
}

export async function get_all_visible_blog () {
  return await collections.articles.find({ visible: true }).toArray()
}
