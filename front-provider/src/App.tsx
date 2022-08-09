import { BrowserRouter as Router } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import { AppProvider } from './hooks'
import { Routes } from './routes'
import { GlobalStyle } from './styles/global'

export function App(): JSX.Element {
  return (
    <Router>
      <AppProvider>
        <Routes />
        <ToastContainer autoClose={5000} />
      </AppProvider>

      <GlobalStyle />
    </Router>
  )
}
