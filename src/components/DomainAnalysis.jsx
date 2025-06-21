import React, { useState } from 'react';

const DomainAnalysis = () => {
  const [domain, setDomain] = useState('');
  const [domainInfo, setDomainInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const analyzeDomain = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      // Usando ipapi.co para geolocalização (gratuito)
      const response = await fetch(`https://ipapi.co/${domain}/json/`);
      const data = await response.json();
      
      if (data.error) {
        throw new Error('Domínio não encontrado ou inválido');
      }
      
      setDomainInfo({
        domain: domain,
        ip: data.ip,
        city: data.city,
        region: data.region,
        country: data.country_name,
        latitude: data.latitude,
        longitude: data.longitude,
        timezone: data.timezone,
        org: data.org,
        asn: data.asn,
        isp: data.org
      });
    } catch (err) {
      setError(err.message || 'Erro ao analisar domínio');
      setDomainInfo(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-900 rounded-lg p-6 mb-6">
      <h2 className="text-2xl font-bold text-white mb-4">🔍 Domain Analysis</h2>
      
      <form onSubmit={analyzeDomain} className="mb-6">
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Digite um domínio (ex: google.com)"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            className="flex-1 bg-gray-800 text-gray-100 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-orange-500 hover:bg-orange-600 disabled:bg-gray-600 text-white px-6 py-2 rounded font-semibold transition"
          >
            {loading ? 'Analisando...' : 'Analisar'}
          </button>
        </div>
      </form>

      {error && (
        <div className="bg-red-900 border border-red-700 text-red-200 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {domainInfo && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-800 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-white mb-3">📍 Informações de Localização</h3>
            <div className="space-y-2 text-gray-300">
              <p><span className="font-medium">Cidade:</span> {domainInfo.city}</p>
              <p><span className="font-medium">Região:</span> {domainInfo.region}</p>
              <p><span className="font-medium">País:</span> {domainInfo.country}</p>
              <p><span className="font-medium">Latitude:</span> {domainInfo.latitude}</p>
              <p><span className="font-medium">Longitude:</span> {domainInfo.longitude}</p>
              <p><span className="font-medium">Fuso Horário:</span> {domainInfo.timezone}</p>
            </div>
          </div>
          
          <div className="bg-gray-800 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-white mb-3">🌐 Informações de Rede</h3>
            <div className="space-y-2 text-gray-300">
              <p><span className="font-medium">IP:</span> {domainInfo.ip}</p>
              <p><span className="font-medium">ASN:</span> {domainInfo.asn}</p>
              <p><span className="font-medium">ISP/Organização:</span> {domainInfo.isp}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DomainAnalysis; 