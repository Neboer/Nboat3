import { Joi, Segments } from 'celebrate'
import { ObjectID } from 'mongodb'
import config from 'config'

export const schema_only_admin = {
  [Segments.COOKIES]: Joi.object({
    secret: Joi.equal(config.get('secret')).required()
  })
}

export const schema_blog_id = {
  [Segments.PARAMS]: Joi.object({
    blog_id: Joi.custom((value, helpers) => {
      if (ObjectID.isValid(value)) {
        return value
      } else {
        helpers.error('any.invalid')
      }
    }).required()
  })
}

export const schema_article_index_loose = {
  [Segments.QUERY]: Joi.object({
    index: Joi.number().integer().min(0)
  })
}

export const schema_article_index_strict = {
  [Segments.QUERY]: Joi.object({
    index: Joi.number().integer().min(0).required()
  })
}

export const schema_single_article = {
  [Segments.BODY]: Joi.object({
    content: Joi.string().required(),
    HTML: Joi.string().required()
  })
}

export const schema_comment = {
  [Segments.BODY]: Joi.object({
    content: Joi.string().max(config.get('max_length.comment'), 'utf8'),
    issuer: Joi.string().max(config.get('max_length.username'), 'utf8')
  })
}

export const schema_page = {
  [Segments.QUERY]: Joi.object({
    page: Joi.number().min(1).default(1)
  })
}
