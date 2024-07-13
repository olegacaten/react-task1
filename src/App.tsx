import { Component, ReactNode } from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Home from './pages/Home'
import MainLayout from './layout/MainLayout'

class App extends Component {
  render():ReactNode {
    return (
      <Router>
        <MainLayout>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
          </MainLayout>
      </Router>
    )
  }
}

export default App