import { Joi, Segments } from 'celebrate'
import { ObjectID } from 'mongodb'

export const schema_only_admin = {
  [Segments.COOKIES]: Joi.object({
    secret: Joi.equal(process.env.secret).required()
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

// export const schema_blog_object = {
//
// }
