import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App.tsx'
import { HomeLanding } from './pages/HomeLanding.tsx'
import { StaysResults } from './pages/StaysResults.tsx'
import { HotelDetails } from './pages/HotelDetails.tsx'
import { FlightsResults } from './pages/FlightsResults'
import { FlightDetails } from './pages/FlightDetails.tsx'
import { CarsResults } from './pages/CarsResults'
import { CarDetails } from './pages/CarDetails.tsx'
import { ExperiencesResults } from './pages/ExperiencesResults'
import { ExperienceDetails } from './pages/ExperienceDetails.tsx'
import { EvisaRequirements } from './pages/EvisaRequirements.tsx'
import { EvisaApplication } from './pages/EvisaApplication.tsx'
import { EvisaConfirmation } from './pages/EvisaConfirmation.tsx'
import { StaysConfirmation } from './pages/StaysConfirmation.tsx'
import { FlightsConfirmation } from './pages/FlightsConfirmation.tsx'
import { CarsConfirmation } from './pages/CarsConfirmation.tsx'
import { ExperiencesConfirmation } from './pages/ExperiencesConfirmation.tsx'
import { AiTripPlanner } from './pages/AiTripPlanner.tsx'
import { DiaSearchResults } from './pages/DiaSearchResults.tsx'
import { Payment } from './pages/Payment.tsx'
import { Checkout } from './pages/Checkout.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Routes>
        <Route path="/" element={<HomeLanding />} />
        <Route path="/home-old" element={<App />} />
        <Route path="/stays/results" element={<StaysResults />} />
        <Route path="/stays/:id" element={<HotelDetails />} />
        <Route path="/stays/confirmation" element={<StaysConfirmation />} />
        <Route path="/flights/results" element={<FlightsResults />} />
        <Route path="/flights/:id" element={<FlightDetails />} />
        <Route path="/flights/confirmation" element={<FlightsConfirmation />} />
        <Route path="/cars/results" element={<CarsResults />} />
        <Route path="/cars/:id" element={<CarDetails />} />
        <Route path="/cars/confirmation" element={<CarsConfirmation />} />
        <Route path="/experiences/results" element={<ExperiencesResults />} />
        <Route path="/experiences/:id" element={<ExperienceDetails />} />
        <Route path="/experiences/confirmation" element={<ExperiencesConfirmation />} />
        <Route path="/evisa/requirements" element={<EvisaRequirements />} />
        <Route path="/evisa" element={<EvisaApplication />} />
        <Route path="/evisa/confirmation" element={<EvisaConfirmation />} />
        <Route path="/ai-trip-planner" element={<AiTripPlanner />} />
        <Route path="/dia-search" element={<DiaSearchResults />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
