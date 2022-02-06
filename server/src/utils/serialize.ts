import { Manager, Part, Provider, Subpart } from '@prisma/client'

type Model = Partial<Manager> &
  Partial<Provider> &
  Partial<Part> &
  Partial<Subpart>
type Type = 'manager' | 'provider' | 'part' | 'subpart' | 'partWithProvider'

function exclude<Model, Key extends keyof Model>(
  model: Model,
  ...keys: Key[]
): Omit<Model, Key> {
  for (const key of keys) {
    delete model[key]
  }

  return model
}

function serializeManager(manager: Manager) {
  const secureManager = exclude(manager, 'password')
  return secureManager
}

function serializeProvider(provider: Provider) {
  const secureProvider = exclude(provider, 'password')
  return {
    ...secureProvider,
    avatar_url: provider.avatar
      ? `${process.env.APP_API_URL}/files/avatars/${provider.avatar}`
      : null
  }
}

function serializePart(part: Part & { subparts: Subpart[] }) {
  let serialiazedSubparts
  if (part.subparts) {
    serialiazedSubparts = part.subparts.map(subpart => {
      return serializeSubpart(subpart)
    })
  }

  const serializedPart = {
    ...part,
    subparts: serialiazedSubparts || part.subparts
  }

  return serializedPart
}

function serializePartWithProvider(part: Part & { provider: Provider }) {
  const serializedPart = {
    ...part,
    provider: serializeProvider(part.provider)
  }

  return serializedPart
}

function serializeSubpart(subpart: Subpart) {
  return {
    ...subpart,
    gw1_11a1_url: `${process.env.APP_API_URL}/files/subparts/${subpart.gwi_11a1}`,
    fisp_msds_url: `${process.env.APP_API_URL}/files/subparts/${subpart.fisp_msds}`,
    rohs_report_url: `${process.env.APP_API_URL}/files/subparts/${subpart.rohs_report}`
  }
}

export function serializeModel(model: Model, type: Type) {
  if (type === 'manager') {
    const manager = model as Manager
    return serializeManager(manager)
  }

  if (type === 'provider') {
    const provider = model as Provider
    return serializeProvider(provider)
  }

  if (type === 'part') {
    const part = model as Part & { subparts: Subpart[] }
    return serializePart(part)
  }

  if (type === 'partWithProvider') {
    const part = model as Part & { provider: Provider }
    return serializePartWithProvider(part)
  }

  if (type === 'subpart') {
    const subpart = model as Subpart
    return serializeSubpart(subpart)
  }
}

export function serializeModels(models: Model[], type: Type) {
  const serializedModels = models.map(model => {
    return serializeModel(model, type)
  })

  return serializedModels
}
