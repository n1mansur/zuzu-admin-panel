import { Route, Routes } from 'react-router-dom'
import './App.css'
import DinamicTable from './components/Table'
import Form from './components/Form/Form'
import { QueryClient, QueryClientProvider } from 'react-query'
import Layout from './components/Layout'
import Home from './components/Home'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/:slug" element={<DinamicTable />} />
          <Route path="/:slug/create" element={<Form />} />
          <Route path="/:slug/update/:id" element={<Form />} />
        </Route>
      </Routes>
    </QueryClientProvider>
  )
}

export default App
