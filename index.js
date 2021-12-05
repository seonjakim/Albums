import React from 'react'
import ReactDOM from 'react-dom'
import { ThemeProvider } from 'styled-components'
import App from './src/App'
import GlobalStyles from './src/style/GlobalStyle'

const theme = {
  border: {
    main: '1px solid #dbdbdb',
  },
}

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <GlobalStyles />
    <App />
  </ThemeProvider>,
  document.getElementById('root')
)
