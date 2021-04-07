import { MongoClient } from 'mongodb'
// Connection URL
const url = 'mongodb://localhost:27017'
const client = new MongoClient(url)

export const collections = {}

// Database Name
const dbName = 'nboat3'

export async function init () {
  // Use connect method to connect to the server
  await client.connect()
  console.log('Connected successfully to server')
  collections.articles = client.db(dbName).collection('articles')
}
