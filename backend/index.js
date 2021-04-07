import express from 'express'
import { init } from './db/connection'
import { get_blog_list } from './db/blog/list'
import { get_blog_by_id } from './db/blog/get'

const app = express()

init()

app.get('/article', async (req, res) => {
  const page = parseInt(req.params.page)
  res.send((await get_blog_list((page - 1) * 5, 5, true)))
})

app.get('/blog/:id', async (req, res, next) => {
  try {
    res.send(await get_blog_by_id(req.params.id))
  } catch (e) {
    next(e)
  }
})

app.use(function (err, req, res, next) {
  console.error(err.message)
  res.status(500).send('Something broke!')
})

export default app
