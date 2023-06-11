import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.scss'
import App from './App'
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter } from 'react-router-dom'
import { StyledEngineProvider } from '@mui/material'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <BrowserRouter>
    <StyledEngineProvider injectFirst>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </StyledEngineProvider>
  </BrowserRouter>
)
