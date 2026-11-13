// Brings in React's strict mode, which warns about common mistakes while developing
import { StrictMode } from 'react'
// Brings in the tool that puts the React app onto the web page
import { createRoot } from 'react-dom/client'
// Brings in page navigation; HashRouter works on any server without extra settings
import { HashRouter } from 'react-router-dom'
// Brings in the styles (Tailwind and our font)
import './index.css'
// Brings in the main app frame
import App from './App.jsx'

// Find the empty box with id "root" in index.html and start the app inside it
createRoot(document.getElementById('root')).render(
  // Turn on extra warnings while developing
  <StrictMode>
    {/* Turn on page navigation for the whole app */}
    <HashRouter>
      {/* The app itself */}
      <App />
    </HashRouter>
  </StrictMode>,
)