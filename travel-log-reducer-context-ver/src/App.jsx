import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import CityList from './components/app_components/CityList'
import CountryList from './components/app_components/CountryList'
import City from './components/app_components/City'
import Login from './pages/Login'
import Form from './components/app_components/Form'
import ProtectedRoute from './pages/ProtectedRoute'
import { CityProvider } from './context/CityContext'
import { AuthProvider } from './context/AuthContext'
import './App.css'

const HomePage = lazy(() => import('./pages/HomePage'))
const ProductPage = lazy(() => import('./pages/ProductPage'))
const PricingPage = lazy(() => import('./pages/PricingPage'))
const AppPage = lazy(() => import('./pages/AppPage'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'))

// import HomePage from './pages/HomePage'
// import ProductPage from './pages/ProductPage'
// import PricingPage from './pages/PricingPage'
// import AppPage from './pages/AppPage'
// import NotFoundPage from './pages/NotFoundPage'

function App() {

  return (
    <div className='page_container'>
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <AuthProvider>
            <CityProvider>
              <Routes>
                <Route index element={<HomePage />} />
                <Route path="/products" element={<ProductPage />} />
                <Route path="/pricing" element={<PricingPage />} />
                <Route path="/app" element={
                  <ProtectedRoute>
                    <AppPage />
                  </ProtectedRoute>
                }>
                  <Route index element={<p>Hei maailma!</p>} />
                  <Route path="cities" element={<CityList />} />
                  <Route path="cities/:cityId" element={<City />} />
                  <Route path="countries" element={<CountryList />} />
                  <Route path="form" element={<Form />} />
                </Route>
                <Route path="/login" element={<Login />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </CityProvider>
          </AuthProvider>
        </Suspense>
      </BrowserRouter>
    </div>
  )
}

export default App
