import { useNavigate } from 'react-router-dom';

export default function DashboardPromotor() {
  const navigate = useNavigate();
  const usuario = JSON.parse(localStorage.getItem('usuarioLogado'));

  const sair = () => {
    localStorage.removeItem('usuarioLogado');
    navigate('/');
  };

  return (
    <div className="p-8 max-w-md mx-auto bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold">Minhas Rotas</h1>
        <button onClick={sair} className="text-red-500 font-medium text-sm">Sair</button>
      </div>
      <p className="mb-6 text-sm text-gray-600">Promotor: {usuario?.nome}</p>
      
      {/* Aqui entrará a lista de lojas específicas que ele tem que visitar */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
        <h2 className="font-semibold mb-2">Lojas de Hoje</h2>
        <p className="text-gray-500 text-sm">Buscando suas rotas no banco...</p>
      </div>
    </div>
  );
}