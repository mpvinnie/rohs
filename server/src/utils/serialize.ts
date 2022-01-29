import { Manager, Provider } from '@prisma/client'

type ModelType = Partial<Manager> & Partial<Provider>

type UrlType = 'avatar' | 'document' | 'subpart'

export function exclude<Model, Key extends keyof Model>(
  model: Model,
  ...keys: Key[]
): Omit<Model, Key> {
  for (const key of keys) {
    delete model[key]
  }

  return model
}

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
