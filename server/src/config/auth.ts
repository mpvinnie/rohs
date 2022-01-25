export const jwt = {
  manager_auth_secret:
    process.env.MANAGER_AUTH_SECRET || 'default_manager_auth_secret',
  provider_auth_secret:
    process.env.PROVIDER_AUTH_SECRET || 'default_manater_auth_secret',
  expiresIn: '1d'
}
