import React, { useState } from 'react';

const EmailFinder = () => {
  const [domain, setDomain] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const findEmails = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      // Simulação de busca de emails (em produção, usar APIs como Hunter.io)
      // Por enquanto, vamos simular com dados mockados
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mockEmails = [
        {
          email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${domain}`,
          confidence: 85,
          sources: ['LinkedIn', 'Company Website'],
          verified: true
        },
        {
          email: `${firstName.toLowerCase()}@${domain}`,
          confidence: 75,
          sources: ['GitHub', 'Twitter'],
          verified: false
        },
        {
          email: `${firstName[0].toLowerCase()}${lastName.toLowerCase()}@${domain}`,
          confidence: 65,
          sources: ['Company Directory'],
          verified: false
        }
      ];
      
      setEmails(mockEmails);
    } catch (err) {
      setError('Erro ao buscar emails');
      setEmails([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-900 rounded-lg p-6 mb-6">
      <h2 className="text-2xl font-bold text-white mb-4">📧 Email Finder</h2>
      
      <form onSubmit={findEmails} className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <input
            type="text"
            placeholder="Primeiro nome"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="bg-gray-800 text-gray-100 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
            required
          />
          <input
            type="text"
            placeholder="Sobrenome"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="bg-gray-800 text-gray-100 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
            required
          />
          <input
            type="text"
            placeholder="Domínio (ex: company.com)"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            className="bg-gray-800 text-gray-100 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="bg-orange-500 hover:bg-orange-600 disabled:bg-gray-600 text-white px-6 py-2 rounded font-semibold transition"
        >
          {loading ? 'Buscando...' : 'Buscar Emails'}
        </button>
      </form>

      {error && (
        <div className="bg-red-900 border border-red-700 text-red-200 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {emails.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">📋 Emails Encontrados</h3>
          {emails.map((email, index) => (
            <div key={index} className="bg-gray-800 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-orange-400 font-mono text-lg">{email.email}</span>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    email.verified ? 'bg-green-900 text-green-200' : 'bg-yellow-900 text-yellow-200'
                  }`}>
                    {email.verified ? 'Verificado' : 'Não verificado'}
                  </span>
                  <span className="bg-blue-900 text-blue-200 px-2 py-1 rounded text-xs">
                    {email.confidence}% confiança
                  </span>
                </div>
              </div>
              <div className="text-gray-400 text-sm">
                <p><span className="font-medium">Fontes:</span> {email.sources.join(', ')}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-6 p-4 bg-gray-800 rounded-lg">
        <h4 className="text-white font-semibold mb-2">💡 Dicas para busca de emails:</h4>
        <ul className="text-gray-300 text-sm space-y-1">
          <li>• Use o nome completo da pessoa</li>
          <li>• Verifique o domínio da empresa</li>
          <li>• Padrões comuns: nome.sobrenome@empresa.com</li>
          <li>• Considere variações: n.sobrenome@empresa.com</li>
        </ul>
      </div>
    </div>
  );
};

export default EmailFinder; 