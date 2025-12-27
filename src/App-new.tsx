import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/stays" element={<div>Stays Results - Coming Soon!</div>} />
        <Route path="/flights" element={<div>Flights Results - Coming Soon!</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
