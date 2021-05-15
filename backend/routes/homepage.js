// 用来展示博客主页。
import { Router } from 'express'
import { get_homepage_HTML, get_homepage_list, update_homepages } from '../db/homepage'

export const homepage_router = Router()

homepage_router.get('/homepage', async (req, res) => {
  if (req.query.lang === 'all') {
    res.send(await get_homepage_list())
  } else {
    res.send({ HTML: await get_homepage_HTML(req.query.lang) })
  }
})

homepage_router.post('/homepage', async (req, res) => {
  await update_homepages(req.body)
  res.end()
})
