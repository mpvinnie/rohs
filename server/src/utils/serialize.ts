import { Manager, Provider } from '@prisma/client'

import { exclude } from './exclude'

type ModelType = Partial<Manager> & Partial<Provider>

type UrlType = 'avatar' | 'document' | 'subpart'

export function single<Model extends ModelType>(
  model: Model,
  exposeUrl?: UrlType
) {
  const modelWithoutPassword = exclude(model, 'password')

  if (!exposeUrl) {
    return modelWithoutPassword
  }

  if (exposeUrl === 'avatar') {
    return {
      ...modelWithoutPassword,
      avatar_url: model.avatar
        ? `${process.env.APP_API_URL}/files/avatars/${model.avatar}`
        : null
    }
  }
}

export function many<Model extends ModelType>(
  models: Model[],
  exposeUrl?: UrlType
) {
  const serializedModels = models.map(model => single(model, exposeUrl))

  return serializedModels
}
