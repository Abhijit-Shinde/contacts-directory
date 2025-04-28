import './App.css'
import AddContact from './components/AddContact'
import EditContact from './components/EditContact'
import Home from './components/Home'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {

  return (
    <>
       <BrowserRouter>
          <Routes>
              <Route path="/" element={<Home/>} />
              <Route path="/add" element={<AddContact />} />
              <Route path="/edit/:contactId" element={<EditContact />} />
          </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
