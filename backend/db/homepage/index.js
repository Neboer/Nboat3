import { collections } from '../connection'

export async function get_homepage_HTML (lang) {
  let { HTML } = await collections.homepage.findOne({ lang })
  return HTML
}

export async function get_homepage_list () {
  return (await collections.homepage.find({}).toArray()).map(val => ({
    lang: val.lang,
    HTML: val.HTML
  }))
}

export async function update_homepages (content) {
  // content: [{lang: 'zh', HTML: '<h1>大家好</h1>'}]
  await collections.homepage.deleteMany({})
  await collections.homepage.insertMany(content)
}
