import { collections } from '../connection'

export async function commit_new_message (content, issuer) {
  await collections.bbs.insertOne({
    time: new Date(),
    issuer,
    content
  })
}

export async function get_message_list (start, length) {
  return await collections.bbs.find({}).sort({ _id: -1 }).skip(start).limit(length).toArray() // 不需要进行错误检验，因为没必要检验。
}

export async function get_bbs_message_count () {
  return await collections.bbs.estimatedDocumentCount()
}
