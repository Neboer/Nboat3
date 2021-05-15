import { MongoClient, ObjectID } from 'mongodb'
// Connection URL
const url = 'mongodb://localhost:27017'
const client = new MongoClient(url)
export const collections = {}

// Database Name
const dbName = 'nboat3'

export async function init () {
  // Use connect method to connect to the server
  await client.connect()
  console.log('Connected successfully to server');
  ['articles', 'homepage', 'bbs'].forEach(v => {
    collections[v] = client.db(dbName).collection(v)
  })
}

export const by_id = (blog_id) => {
  return {
    _id: ObjectID.createFromHexString(blog_id)
  }
}
