import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { Provider } from 'react-redux'
import store from './store'
import { Container } from 'react-bootstrap'

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <Container>
    <Provider store={store}>
      <App />
    </Provider>
  </Container>
)
