import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './componentes/Login';
import DashboardSupervisor from './componentes/DashboardSupervisor';
import DashboardPromotor from './componentes/DashboardPromotor';
import Avaliacao from './componentes/Avaliacao';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/supervisor" element={<DashboardSupervisor />} />
        <Route path="/promotor" element={<DashboardPromotor />} />
        
        
        <Route path="/avaliacao/:lojaId" element={<Avaliacao />} />
        
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
