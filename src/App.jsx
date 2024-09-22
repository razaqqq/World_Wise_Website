
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { lazy } from 'react'

import CityList from './components/CityList'
import CountriesList from './components/CountriesList'
import City from './components/City'
import Form from './components/Form'
import { AuthProvider } from './contexts/FakeAuthContext'
import { CitiesProvider } from './contexts/CitiesContext'
import { ProtectedRoute } from './pages/ProtectedRoute'
import { Suspense } from 'react'
import SpinnerFullPage from './components/SpinnerFullPage'

// import Product from './pages/product'
// import Pricing from './pages/Pricing'
// import HomePage from './pages/HomePage'
// import PageNotFound from './pages/PageNotFound'
// import AppLayout from './pages/AppLayout'
// import Login from './pages/Login'

const HomePage = lazy(() => import('./pages/HomePage'))
const Product = lazy(() => import('./pages/product'))
const Pricing = lazy(() => import('./pages/Pricing'))
const PageNotFound = lazy(() => import('./pages/PageNotFound'))
const AppLayout = lazy(() => import('./pages/AppLayout'))
const Login = lazy(() => import('./pages/Login'))







export default function App() {




  return (
    <AuthProvider>
      <CitiesProvider>
        <BrowserRouter>
          <Suspense
            fallback={
              <SpinnerFullPage />
            }
          >
            <Routes>
              <Route path='/' element={<HomePage />} />
              <Route path='product' element={<Product />} />
              <Route path='pricing' element={<Pricing />} />
              <Route path='login' element={<Login />} />

              <Route path='app' element={
                <ProtectedRoute><AppLayout /></ProtectedRoute>
              } >
                <Route index element={<Navigate replace to={'cities'} />} />
                <Route path='cities' element={<CityList />} />
                <Route path='cities/:id' element={<City />} />
                <Route path='countries' element={<CountriesList />} />

                <Route path='form' element={<Form />} />
              </Route>

              <Route path='*' element={<PageNotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </CitiesProvider>
    </AuthProvider>
  )
}
