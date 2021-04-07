import { ObjectID } from 'mongodb'
import { collections } from '../connection'

export async function get_blog_by_id (target_blog_hex_id) {
  return await collections.articles.findOne({ _id: ObjectID.createFromHexString(target_blog_hex_id) })
}
