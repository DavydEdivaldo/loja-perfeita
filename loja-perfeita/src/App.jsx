import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './componentes/Login';
import DashboardSupervisor from './componentes/DashboardSupervisor';
import DashboardPromotor from './componentes/DashboardPromotor';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/supervisor" element={<DashboardSupervisor />} />
        <Route path="/promotor" element={<DashboardPromotor />} />
        {/* Se digitar uma rota que não existe, volta pro login */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
