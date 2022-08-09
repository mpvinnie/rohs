import { createContext, ReactNode, useContext, useState } from 'react'
import { toast } from 'react-toastify'

import { api } from '../services/api'
import { Provider } from '../types/Provider'

type AuthState = {
  token: string
  provider: Provider
}

export type SignInCredentials = {
  id: number
  password: string
}

type AuthContextData = {
  signIn(createntials: SignInCredentials): Promise<void>
  signOut(): void
  updateProvider(provider: Provider): void
  isAuthenticated: boolean
  provider: Provider
}

type AuthProviderProps = {
  children: ReactNode
}

const AuthContext = createContext({} as AuthContextData)

export function AuthProvider({ children }: AuthProviderProps): JSX.Element {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@RoHS:token')
    const provider = localStorage.getItem('@RoHS:provider')

    if (token && provider) {
      api.defaults.headers.authorization = `Bearer ${token}`
      return { token, provider: JSON.parse(provider) }
    }

    return {} as AuthState
  })

  const isAuthenticated = !!data.provider

  async function signIn({ id, password }: SignInCredentials) {
    try {
      const response = await api.post('/providers/authenticate', {
        id: String(id),
        password
      })

      const { provider, token } = response.data

      localStorage.setItem('@RoHS:token', token)
      localStorage.setItem('@RoHS:provider', JSON.stringify(provider))

      setData({ token, provider })

      api.defaults.headers.authorization = `Bearer ${token}`

      console.log(provider)
    } catch (err) {
      toast.error(err.response.data.message)
    }
  }

  async function signOut() {
    localStorage.removeItem('@RoHS:token')
    localStorage.removeItem('@ROHS:provider')

    setData({} as AuthState)
  }

  function updateProvider(provider: Provider): void {
    localStorage.setItem('@RoHS:provider', JSON.stringify(provider))

    setData({
      token: data.token,
      provider
    })
  }

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signOut,
        isAuthenticated,
        updateProvider,
        provider: data.provider
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext)

  return context
}
