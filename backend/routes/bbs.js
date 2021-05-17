import { Router } from 'express'
import { celebrate } from 'celebrate'
import config from 'config'
import { schema_comment, schema_page, schema_only_admin } from '../schema'
import { commit_new_message, get_message_list, get_bbs_message_count } from '../db/bbs'

export const bbs_router = Router()

export async function bbs_total_pages () {
  const count = await get_bbs_message_count()
  return Math.ceil(count / config.get('page_items.bbs'))
}

bbs_router.get('/bbs', celebrate({ ...schema_page }), async (req, res) => {
  if (req.query.page > await bbs_total_pages()) {
    res.status(404).end()
  }
  res.send((await get_message_list((req.query.page - 1) * config.get('page_items.bbs'), config.get('page_items.bbs'))).map(obj => {
    delete obj._id
    return obj
  }))
})

bbs_router.get('/bbs/pages', async (req, res) => {
  res.send({ total_page: await bbs_total_pages() })
})

bbs_router.post('/bbs', celebrate(config.get('admin_message_only') ? { ...schema_comment, ...schema_only_admin } : schema_comment),
  async (req, res) => {
    await commit_new_message(req.body.content, req.body.issuer)
    res.end()
  }
)
