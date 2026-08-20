import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { FiMapPin, FiLogOut, FiClipboard } from 'react-icons/fi';

export default function DashboardPromotor() {
  const navigate = useNavigate();
  const usuario = JSON.parse(localStorage.getItem('usuarioLogado'));
  const [rotas, setRotas] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function buscarRotas() {
      // Busca as rotas e já traz os dados da loja vinculada a ela
      const { data, error } = await supabase
        .from('rotas')
        .select(`
          id,
          dia_da_semana,
          loja_id,
          lojas (
            nome,
            endereco
          )
        `)
        .eq('promotor_id', usuario.id);

      if (!error && data) {
        setRotas(data);
      }
      setCarregando(false);
    }

    if (usuario) buscarRotas();
  }, [usuario]);

  const sair = () => {
    localStorage.removeItem('usuarioLogado');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center">
      <div className="w-full max-w-md bg-white min-h-screen shadow-sm">
        
        {/* Cabeçalho */}
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Roteiro</h1>
            <p className="text-sm text-gray-500">Olá, {usuario?.nome}</p>
          </div>
          <button onClick={sair} className="p-2 text-gray-400 hover:text-red-500 transition-colors">
            <FiLogOut size={20} />
          </button>
        </div>

        {/* Lista de Lojas */}
        <div className="p-6 space-y-4">
          <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
            Lojas de Hoje
          </h2>

          {carregando ? (
            <p className="text-center text-gray-500 text-sm py-4">Buscando rotas...</p>
          ) : rotas.length === 0 ? (
            <p className="text-center text-gray-500 text-sm py-4">Nenhuma loja para visitar hoje.</p>
          ) : (
            rotas.map((rota) => (
              <div key={rota.id} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:border-blue-500 transition-colors">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg">{rota.lojas.nome}</h3>
                    <div className="flex items-center text-gray-500 text-sm mt-1">
                      <FiMapPin className="mr-1" />
                      {rota.lojas.endereco}
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={() => navigate(`/avaliacao/${rota.loja_id}`)}
                  className="w-full flex items-center justify-center py-2.5 px-4 bg-blue-50 text-blue-700 rounded-lg font-medium hover:bg-blue-100 transition-colors"
                >
                  <FiClipboard className="mr-2" />
                  Iniciar Avaliação
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}