import { Route, Routes } from 'react-router-dom'
import './App.css'
import DinamicTable from './components/Table'
import Form from './components/Form/Form'

function App() {
  return (
    <>
      <Routes>
        <Route path="/:slug" element={<DinamicTable />} />
        <Route path="/:slug/create" element={<Form />} />
      </Routes>
    </>
  )
}

export default App
