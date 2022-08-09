import { AuthProvider } from './AuthContext'

export const AppProvider: React.FC = ({ children }) => (
  <AuthProvider>{children}</AuthProvider>
)
