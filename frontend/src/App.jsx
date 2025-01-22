import React from 'react'
import Navbar from './components/Navbar'
import Products from './pages/Products'
import Footer from './components/Footer'

const App = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Products />
      </main>
      <Footer />
    </div>
  )
}

export default App
