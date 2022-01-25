export function exclude<Model, Key extends keyof Model>(
  model: Model,
  ...keys: Key[]
): Omit<Model, Key> {
  for (const key of keys) {
    delete model[key]
  }

  return model
}
