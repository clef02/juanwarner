import { Routes, Route, Navigate } from 'react-router'
import SmoothScroll from './components/SmoothScroll'
import Seo from './seo/Seo'
import { ContactProvider } from './components/ContactModal'
import Home from './pages/Home'
import QuienSoy from './pages/QuienSoy'
import Planes from './pages/Planes'
import Alianzas from './pages/Alianzas'
import Sponsors from './pages/Sponsors'
import NotFound from './pages/NotFound'

function App() {
  return (
    <SmoothScroll>
      <ContactProvider>
        <Seo />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quien-soy" element={<QuienSoy />} />
          <Route path="/planes" element={<Planes />} />
          <Route path="/alianzas" element={<Navigate to="/alianzas/youngla" replace />} />
          <Route path="/alianzas/:slug" element={<Alianzas />} />
          <Route path="/sponsors" element={<Sponsors />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </ContactProvider>
    </SmoothScroll>
  )
}

export default App
