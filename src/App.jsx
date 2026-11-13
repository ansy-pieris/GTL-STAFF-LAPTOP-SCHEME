// Brings in a React tool that runs code when something changes
import { useEffect } from 'react'
// Brings in navigation tools: the list of pages, one page, and the current address
import { Routes, Route, useLocation } from 'react-router-dom'
// Brings in the home page
import Home from './pages/Home'
// Brings in the laptop details page
import Details from './pages/Details'

// The shared frame around every page
function App() {
  // Get the current page address
  const location = useLocation()

  // Every time the page address changes, scroll back to the top
  useEffect(() => {
    // Jump to the top of the page
    window.scrollTo(0, 0)
    // Run again whenever the address path changes
  }, [location.pathname])

  // Return the content to display
  return (
    // Full-screen page (at least the full device height), dark forest-green gradient, white text, layout in a column
    <main className="relative flex min-h-dvh w-full flex-col overflow-hidden bg-linear-to-br from-emerald-950 via-green-950 to-emerald-900 font-sans text-white">
      {/* Layer for background decorations; clicks pass straight through it */}
      <div className="pointer-events-none absolute inset-0">
        {/* Soft emerald glow in the top-left corner */}
        <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-emerald-400/15 blur-3xl" />
        {/* Soft light-green glow in the bottom-right corner */}
        <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-green-300/10 blur-3xl" />
      </div>

      {/* Middle area that grows to fill the screen and shows the current page; small top gap, bigger bottom gap */}
      <div className="relative z-10 mx-auto w-full max-w-6xl flex-1 px-5 pb-10 pt-4 sm:px-8">
        {/* The list of pages: shows the one that matches the address */}
        <Routes>
          {/* Home page at the main address */}
          <Route path="/" element={<Home />} />
          {/* Details page; ":id" is the laptop's id, e.g. option1 */}
          <Route path="/laptop/:id" element={<Details />} />
          {/* Any unknown address shows the home page */}
          <Route path="*" element={<Home />} />
        </Routes>
      </div>

      {/* Footer that always sits at the bottom of the screen */}
      <footer className="relative z-10 border-t border-white/10 py-5 text-center text-xs text-emerald-100/50">
        {/* Shows © plus the current year automatically, then the company name */}
        © {new Date().getFullYear()} Global Transportation & Logistics Pvt Ltd. All rights reserved.
      </footer>
    </main>
  )
}

// Makes App available so main.jsx can load it
export default App