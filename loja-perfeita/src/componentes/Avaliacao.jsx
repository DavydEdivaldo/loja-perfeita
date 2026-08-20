import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { FiArrowLeft, FiCheck } from 'react-icons/fi';

export default function Avaliacao() {
  const navigate = useNavigate();
  const { lojaId } = useParams(); // Pega o ID da loja pela URL
  const usuario = JSON.parse(localStorage.getItem('usuarioLogado'));
  
  const [nota, setNota] = useState('');
  const [enviando, setEnviando] = useState(false);

  const finalizarAvaliacao = async (e) => {
    e.preventDefault();
    setEnviando(true);

    const { error } = await supabase
      .from('avaliacoes')
      .insert([
        {
          loja_id: lojaId,
          promotor_id: usuario.id,
          nota: parseFloat(nota)
        }
      ]);

    setEnviando(false);

    if (!error) {
      alert('Avaliação enviada com sucesso!');
      navigate('/promotor');
    } else {
      alert('Erro ao salvar avaliação.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center">
      <div className="w-full max-w-md bg-white min-h-screen shadow-sm relative">
        
        {/* Cabeçalho Voltar */}
        <div className="flex items-center p-4 border-b border-gray-100">
          <button onClick={() => navigate(-1)} className="p-2 text-gray-500 hover:text-gray-900">
            <FiArrowLeft size={24} />
          </button>
          <h1 className="text-lg font-bold text-gray-900 ml-2">Auditoria de Loja</h1>
        </div>

        {/* Formulário */}
        <form onSubmit={finalizarAvaliacao} className="p-6 space-y-6">
          
          {/* Pergunta Simulada de Protótipo */}
          <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nota geral da execução (0 a 100)
            </label>
            <input
              type="number"
              min="0"
              max="100"
              required
              value={nota}
              onChange={(e) => setNota(e.target.value)}
              className="block w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none bg-white"
              placeholder="Ex: 85"
            />
          </div>

          <button
            type="submit"
            disabled={enviando}
            className="w-full flex items-center justify-center py-3 px-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 mt-8"
          >
            {enviando ? 'Enviando...' : (
              <>
                <FiCheck className="mr-2" size={20} />
                Finalizar Visita
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}