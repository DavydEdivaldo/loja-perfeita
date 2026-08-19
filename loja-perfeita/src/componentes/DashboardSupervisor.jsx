import { useNavigate } from 'react-router-dom';

export default function DashboardSupervisor() {
  const navigate = useNavigate();
  // Recupera quem está logado
  const usuario = JSON.parse(localStorage.getItem('usuarioLogado'));

  const sair = () => {
    localStorage.removeItem('usuarioLogado');
    navigate('/');
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Painel do Supervisor</h1>
        <button onClick={sair} className="text-red-500 font-medium">Sair</button>
      </div>
      <p className="mb-4">Olá, {usuario?.nome}. Aqui você verá <strong>todas</strong> as lojas, equipes e avaliações.</p>
      
      {/* Aqui entrarão os cards do Tailwind com o resumo geral depois */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h2 className="font-semibold text-lg mb-2">Visão Geral (Loja Perfeita)</h2>
        <p className="text-gray-500">Módulos de dados serão carregados aqui...</p>
      </div>
    </div>
  );
}