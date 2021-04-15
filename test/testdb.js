const mongo = require('mongodb')
const url = 'mongodb://localhost:27017'
const client = new mongo.MongoClient(url)

async function init () {
  // Use connect method to connect to the server
  await client.connect()
  console.log('Connected successfully to server')
  const articles = client.db('nboat3').collection('articles')

  const last_blog_index = await articles.find({ _id: mongo.ObjectID.createFromHexString('60745bf90935842544416304') }, { article: { $slice: -1 } }).toArray()
  console.log(last_blog_index.article)
}

init()
