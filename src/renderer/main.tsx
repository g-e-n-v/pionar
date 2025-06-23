import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

export function App() {
  return (
    <div>
      OK
      <div>kjhklj</div>
      <div>kjhklj</div>
      <div>kjhklj</div>
      <div>kjhklj</div>
      <div>kjhklj</div>
    </div>
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
)
