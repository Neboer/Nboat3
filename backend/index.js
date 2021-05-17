import express from 'express'
import { json } from 'body-parser'
import cookieParser from 'cookie-parser'
import config from 'config'
import { init } from './db/connection'
import { blog_router } from './routes/blog'
import { homepage_router } from './routes/homepage'
import { bbs_router } from './routes/bbs'
import { blog_list_addr_generator, list_and_bbs_addr_generator } from './seo_list_generator'

const app = express()

init()

app.use(json())
app.use(cookieParser())

app.get('/_seo', async (req, res) => {
  res.send([...(await blog_list_addr_generator()), ...(await list_and_bbs_addr_generator())])
})

app.use((req, res, next) => {
  req.admin = req.cookies.secret === config.get('secret')
  next()
})

app.use(blog_router)
app.use(homepage_router)
app.use(bbs_router)

app.use(function (err, req, res, next) {
  console.error(err.details)
  res.status(500).send('Something broke!')
})

export default app
