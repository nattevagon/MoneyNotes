import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { registerSW } from 'virtual:pwa-register'

const updateSW = registerSW({
  onNeedRefresh() {
    // Logika saat ada pembaruan konten (opsional)
    if (confirm('Konten baru tersedia. Perbarui sekarang?')) {
      updateSW(true)
    }
  },
  onOfflineReady() {
    console.log('Aplikasi siap digunakan secara offline!')
  },
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className="relative overflow-hidden w-full h-screen">
      <App />
    </div>
  </StrictMode>,
)
