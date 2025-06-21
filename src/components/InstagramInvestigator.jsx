import React, { useState, useEffect } from 'react';
import { Line, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import MatrixBackground from './MatrixBackground';
import WelcomePop from './WelcomePop';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const InstagramInvestigator = () => {
  const [username, setUsername] = useState('');
  const [sessionId, setSessionId] = useState('');
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Efeito de partículas flutuantes
  useEffect(() => {
    const createParticle = () => {
      const particle = document.createElement('div');
      particle.className = 'floating-particle';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.animationDuration = (Math.random() * 3 + 2) + 's';
      particle.style.animationDelay = Math.random() * 2 + 's';
      document.body.appendChild(particle);
      
      setTimeout(() => {
        document.body.removeChild(particle);
      }, 5000);
    };

    const interval = setInterval(createParticle, 300);
    return () => clearInterval(interval);
  }, []);

  const investigateProfile = async () => {
    if (!username || !sessionId) {
      setError('Username e Session ID são obrigatórios');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Tentar usar a API real primeiro
      try {
        const response = await fetch('http://localhost:5001/api/instagram/investigate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: username,
            session_id: sessionId
          })
        });

        if (response.ok) {
          const result = await response.json();
          if (result.success && result.data) {
            // Processar dados reais da API
            const processedData = processRealData(result.data);
            setResults(processedData);
            return;
          } else {
            throw new Error(result.error || 'Erro na API');
          }
        }
      } catch (apiError) {
        console.log('API não disponível, usando dados simulados:', apiError.message);
        setError('API não disponível. Iniciando servidor Python backend...');
      }

      // Fallback para dados simulados apenas se API falhar
      setError('⚠️ Usando dados simulados - API não disponível. Para dados reais, inicie o backend Python.');
      
      const mockData = {
        username: username,
        userID: Math.floor(Math.random() * 1000000000) + 100000000,
        full_name: username.charAt(0).toUpperCase() + username.slice(1),
        is_verified: Math.random() > 0.8,
        is_business: Math.random() > 0.7,
        is_private: Math.random() > 0.6,
        follower_count: Math.floor(Math.random() * 1000000) + 10000,
        following_count: Math.floor(Math.random() * 1000) + 50,
        media_count: Math.floor(Math.random() * 500) + 50,
        total_igtv_videos: Math.floor(Math.random() * 50),
        public_email: Math.random() > 0.7 ? `${username}@example.com` : null,
        public_phone_number: Math.random() > 0.8 ? `+55${Math.floor(Math.random() * 900000000) + 100000000}` : null,
        public_phone_country_code: '55',
        obfuscated_email: Math.random() > 0.7 ? `${username.charAt(0)}***@example.com` : null,
        obfuscated_phone: Math.random() > 0.8 ? `+55 *** *** ${Math.floor(Math.random() * 9000) + 1000}` : null,
        is_whatsapp_linked: Math.random() > 0.6,
        external_url: Math.random() > 0.5 ? `https://${username}.com` : null,
        biography: generateRandomBio(username),
        hd_profile_pic_url_info: {
          url: `https://via.placeholder.com/150/random?text=${username.charAt(0).toUpperCase()}`
        },
        account_created: generateRandomDate(),
        name_changes: Math.floor(Math.random() * 5),
        associated_phones: Math.random() > 0.7 ? [`+55${Math.floor(Math.random() * 900000000) + 100000000}`] : [],
        associated_emails: Math.random() > 0.7 ? [`${username}@gmail.com`] : [],
        facebook_id: Math.random() > 0.6 ? `1000${Math.floor(Math.random() * 100000000000)}` : null,
        last_post: generateRandomPost(username),
        recent_comments: generateRandomComments(),
        engagement_rate: (Math.random() * 10 + 2).toFixed(1),
        average_likes: Math.floor(Math.random() * 5000) + 500,
        average_comments: Math.floor(Math.random() * 500) + 50,
        peak_hours: generatePeakHours(),
        post_frequency: generatePostFrequency(),
        hashtags_used: generateRandomHashtags(),
        location: generateRandomLocation(),
        timezone: 'GMT-3',
        peak_time: '2:00 PM - 4:00 PM',
        account_age_days: Math.floor(Math.random() * 2000) + 100,
        name_change_history: generateNameChangeHistory(username),
        device_info: generateDeviceInfo(),
        security_info: generateSecurityInfo(),
        is_simulated: true, // Marca como dados simulados
        analysis_timestamp: new Date().toISOString()
      };

      // Simular delay de API
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setResults(mockData);
    } catch (err) {
      setError('Erro na investigação: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const processRealData = (user) => {
    return {
      username: user.username || '',
      userID: user.id || user.userID || '',
      full_name: user.full_name || user.username || '',
      is_verified: user.is_verified || false,
      is_business: user.is_business || false,
      is_private: user.is_private || false,
      follower_count: user.follower_count || 0,
      following_count: user.following_count || 0,
      media_count: user.media_count || 0,
      total_igtv_videos: user.total_igtv_videos || 0,
      public_email: user.public_email || null,
      public_phone_number: user.public_phone_number || null,
      public_phone_country_code: user.public_phone_country_code || null,
      obfuscated_email: user.obfuscated_email || null,
      obfuscated_phone: user.obfuscated_phone || null,
      is_whatsapp_linked: user.is_whatsapp_linked || false,
      external_url: user.external_url || null,
      biography: user.biography || '',
      hd_profile_pic_url_info: user.hd_profile_pic_url_info || { url: '' },
      account_created: user.account_created || null,
      name_changes: user.name_changes || 0,
      associated_phones: user.associated_phones || [],
      associated_emails: user.associated_emails || [],
      facebook_id: user.facebook_id || null,
      last_post: user.last_post || null,
      recent_comments: user.recent_comments || [],
      engagement_rate: user.engagement_rate || 0,
      average_likes: user.average_likes || 0,
      average_comments: user.average_comments || 0,
      peak_hours: user.peak_hours || [],
      post_frequency: user.post_frequency || '',
      hashtags_used: user.hashtags_used || [],
      location: user.location || '',
      timezone: user.timezone || 'GMT',
      peak_time: user.peak_time || '',
      account_age_days: user.account_age_days || 0,
      name_change_history: user.name_change_history || [],
      device_info: user.device_info || {},
      security_info: user.security_info || {},
      is_simulated: false, // Marca como dados reais
      analysis_timestamp: user.analysis_timestamp || new Date().toISOString()
    };
  };

  // Funções não utilizadas (comentadas para evitar warnings ESLint)
  /*
  const processLastPost = (posts) => {
    if (!posts || posts.length === 0) return null;
    
    const lastPost = posts[0];
    return {
      id: lastPost.id || lastPost.pk,
      caption: lastPost.caption?.text || lastPost.caption || 'Sem descrição',
      likes: lastPost.like_count || lastPost.likes || 0,
      comments: lastPost.comment_count || lastPost.comments || 0,
      timestamp: lastPost.taken_at_timestamp || lastPost.timestamp || new Date().toISOString(),
      media_type: lastPost.media_type || 'IMAGE'
    };
  };

  const processComments = (comments) => {
    if (!comments || comments.length === 0) return [];
    
    return comments.map(comment => ({
      id: comment.id || comment.pk,
      username: comment.user?.username || comment.username,
      user_id: comment.user?.id || comment.user_id,
      comment: comment.text || comment.comment,
      timestamp: comment.created_at || comment.timestamp || new Date().toISOString()
    }));
  };

  const calculateEngagementRate = (data) => {
    if (!data.follower_count || data.follower_count === 0) return 0;
    const engagement = ((data.average_likes || 0) + (data.average_comments || 0)) / data.follower_count * 100;
    return Math.round(engagement * 100) / 100;
  };

  const extractHashtags = (bio) => {
    const hashtags = bio.match(/#\w+/g) || [];
    return hashtags.map(tag => ({ tag, count: Math.floor(Math.random() * 20) + 1 }));
  };

  const calculateAccountAge = (createdDate) => {
    if (!createdDate) return 0;
    const created = new Date(createdDate);
    const now = new Date();
    return Math.floor((now - created) / (1000 * 60 * 60 * 24));
  };
  */

  // Funções auxiliares para dados simulados

  const generatePeakHours = () => {
    return {
      '14:00': Math.floor(Math.random() * 50) + 20,
      '15:00': Math.floor(Math.random() * 50) + 30,
      '16:00': Math.floor(Math.random() * 50) + 25,
      '17:00': Math.floor(Math.random() * 50) + 15,
      '18:00': Math.floor(Math.random() * 50) + 10
    };
  };

  const generatePostFrequency = () => {
    return {
      'Segunda': Math.floor(Math.random() * 5) + 1,
      'Terça': Math.floor(Math.random() * 5) + 1,
      'Quarta': Math.floor(Math.random() * 5) + 1,
      'Quinta': Math.floor(Math.random() * 5) + 1,
      'Sexta': Math.floor(Math.random() * 5) + 1,
      'Sábado': Math.floor(Math.random() * 5) + 1,
      'Domingo': Math.floor(Math.random() * 5) + 1
    };
  };

  const generateRandomDate = () => {
    const start = new Date(2015, 0, 1);
    const end = new Date();
    const randomDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    return randomDate.toISOString();
  };

  const generateRandomBio = (username) => {
    const bios = [
      `Olá! Sou ${username} 👋`,
      `Vivendo a vida como ${username} ✨`,
      `${username} - Explorando o mundo 🌍`,
      `Apaixonado por tecnologia e inovação 💻`,
      `Fotógrafo amador e viajante 📸✈️`,
      `Música, arte e criatividade 🎨🎵`,
      `${username} - Sempre em busca de novas aventuras 🚀`,
      `Fitness e estilo de vida saudável 💪🥗`,
      `Empreendedor e visionário 💼💡`,
      `Família, amigos e momentos especiais ❤️👨‍👩‍👧‍👦`
    ];
    return bios[Math.floor(Math.random() * bios.length)];
  };

  const generateRandomPost = (username) => {
    const captions = [
      `Momentos especiais com ${username} ✨`,
      `Aproveitando a vida ao máximo 🌟`,
      `Novo projeto em andamento 💼`,
      `Viagem incrível! 📸✈️`,
      `Trabalho duro, resultados incríveis 💪`,
      `Celebrando pequenas vitórias 🎉`,
      `Inspiração do dia 💭`,
      `Conectando com pessoas incríveis 🤝`,
      `Explorando novos horizontes 🌅`,
      `Gratidão por cada momento 🙏`
    ];
    
    return {
      id: Math.floor(Math.random() * 1000000000),
      caption: captions[Math.floor(Math.random() * captions.length)],
      likes: Math.floor(Math.random() * 1000) + 50,
      comments: Math.floor(Math.random() * 100) + 5,
      timestamp: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
      media_type: 'IMAGE'
    };
  };

  const generateRandomComments = () => {
    const comments = [
      { username: 'maria_silva', comment: 'Incrível! 👏', timestamp: new Date(Date.now() - Math.random() * 24 * 60 * 60 * 1000).toISOString() },
      { username: 'joao_santos', comment: 'Parabéns! 🎉', timestamp: new Date(Date.now() - Math.random() * 24 * 60 * 60 * 1000).toISOString() },
      { username: 'ana_costa', comment: 'Muito bom! 👍', timestamp: new Date(Date.now() - Math.random() * 24 * 60 * 60 * 1000).toISOString() },
      { username: 'pedro_oliveira', comment: 'Inspiring! ✨', timestamp: new Date(Date.now() - Math.random() * 24 * 60 * 60 * 1000).toISOString() },
      { username: 'lucia_ferreira', comment: 'Amazing work! 🌟', timestamp: new Date(Date.now() - Math.random() * 24 * 60 * 60 * 1000).toISOString() }
    ];
    return comments.slice(0, Math.floor(Math.random() * 3) + 2);
  };

  const generateRandomHashtags = () => {
    const hashtags = [
      { tag: '#vida', count: Math.floor(Math.random() * 20) + 5 },
      { tag: '#tech', count: Math.floor(Math.random() * 15) + 3 },
      { tag: '#design', count: Math.floor(Math.random() * 12) + 2 },
      { tag: '#fotografia', count: Math.floor(Math.random() * 10) + 1 },
      { tag: '#criatividade', count: Math.floor(Math.random() * 8) + 1 }
    ];
    return hashtags.slice(0, Math.floor(Math.random() * 3) + 2);
  };

  const generateRandomLocation = () => {
    const locations = [
      'São Paulo, Brazil',
      'Rio de Janeiro, Brazil',
      'Belo Horizonte, Brazil',
      'Curitiba, Brazil',
      'Salvador, Brazil',
      'Brasília, Brazil',
      'Fortaleza, Brazil',
      'Recife, Brazil'
    ];
    return locations[Math.floor(Math.random() * locations.length)];
  };

  const generateNameChangeHistory = (username) => {
    const changes = Math.floor(Math.random() * 3);
    const history = [];
    
    for (let i = 0; i < changes; i++) {
      const oldName = `${username}_old_${i + 1}`;
      const newName = i === changes - 1 ? username : `${username}_new_${i + 1}`;
      const date = new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000);
      
      history.push({
        from: oldName,
        to: newName,
        date: date.toISOString().split('T')[0]
      });
    }
    
    return history;
  };

  const generateDeviceInfo = () => {
    const devices = [
      { type: 'iPhone', os: 'iOS 17.2', app: 'Instagram 302.0' },
      { type: 'Android', os: 'Android 14', app: 'Instagram 301.0' },
      { type: 'iPhone', os: 'iOS 16.5', app: 'Instagram 300.0' },
      { type: 'Android', os: 'Android 13', app: 'Instagram 299.0' }
    ];
    const device = devices[Math.floor(Math.random() * devices.length)];
    
    return {
      last_login: new Date(Date.now() - Math.random() * 24 * 60 * 60 * 1000).toISOString(),
      device_type: device.type,
      os_version: device.os,
      app_version: device.app
    };
  };

  const generateSecurityInfo = () => {
    return {
      two_factor_enabled: Math.random() > 0.3,
      last_password_change: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString(),
      suspicious_activity: Math.random() > 0.8
    };
  };

  return (
    <div className="max-w-7xl mx-auto p-2 sm:p-4 md:p-6 relative min-h-screen bg-[#10151a] overflow-hidden">
      <MatrixBackground />
      <WelcomePop />
      {/* Fundo escuro translúcido, sem gradiente colorido */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>
      {/* Partículas flutuantes */}
      <style jsx>{`
        .floating-particle {
          position: fixed;
          width: 4px;
          height: 4px;
          background: linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4);
          border-radius: 50%;
          pointer-events: none;
          z-index: 1;
          animation: float 5s ease-in-out infinite;
        }
        
        @keyframes float {
          0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-100px) rotate(360deg);
            opacity: 0;
          }
        }
        
        .glow-effect {
          box-shadow: 0 0 20px rgba(59, 130, 246, 0.5);
          transition: all 0.3s ease;
        }
        
        .glow-effect:hover {
          box-shadow: 0 0 30px rgba(59, 130, 246, 0.8);
          transform: translateY(-2px);
        }
        
        .card-hover {
          transition: all 0.3s ease;
          transform: perspective(1000px) rotateX(0deg);
        }
        
        .card-hover:hover {
          transform: perspective(1000px) rotateX(5deg) translateY(-5px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
        }
        
        .pulse-animation {
          animation: pulse 2s infinite;
        }
        
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.7;
          }
        }
        
        .typing-effect {
          overflow: hidden;
          border-right: 2px solid #3b82f6;
          white-space: nowrap;
          animation: typing 3s steps(40, end), blink-caret 0.75s step-end infinite;
        }
        
        @keyframes typing {
          from { width: 0; }
          to { width: 100%; }
        }
        
        @keyframes blink-caret {
          from, to { border-color: transparent; }
          50% { border-color: #3b82f6; }
        }
      `}</style>

      <div className="relative z-10">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2 typing-effect">
            🔍 Instagram OSINT Investigator
          </h1>
          <p className="text-gray-600 text-lg">Investigue perfis do Instagram com dados reais da API</p>
          <div className="mt-4 flex justify-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full pulse-animation"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full pulse-animation" style={{animationDelay: '0.5s'}}></div>
            <div className="w-3 h-3 bg-green-500 rounded-full pulse-animation" style={{animationDelay: '1s'}}></div>
          </div>
        </div>

        {/* Input Form */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 shadow-xl rounded-xl p-4 sm:p-6 mb-8 card-hover glow-effect">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                👤 Username do Instagram
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Ex: instagram, cristiano, etc."
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:border-blue-300"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                🔑 Session ID (opcional - para dados reais)
              </label>
              <input
                type="password"
                value={sessionId}
                onChange={(e) => setSessionId(e.target.value)}
                placeholder="Cole o session ID do Instagram"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:border-blue-300"
              />
            </div>
          </div>
          <div className="mt-6">
            <button
              onClick={investigateProfile}
              disabled={loading || !username}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
            >
              {loading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>🔍 Investigando...</span>
                </div>
              ) : (
                <span>🚀 Iniciar Investigação</span>
              )}
            </button>
          </div>
          <div className="mt-4 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-300 text-yellow-800 rounded-lg">
            ⚠️ <strong>IMPORTANTE:</strong> Mantenha seu session ID seguro e não compartilhe!
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {/* Results */}
        {results && (
          <div className="space-y-8">
            {/* Data Source Indicator */}
            <div className={`rounded-xl p-6 ${results.is_simulated ? 'bg-gradient-to-r from-yellow-100 to-orange-100 border-2 border-yellow-400' : 'bg-gradient-to-r from-green-100 to-emerald-100 border-2 border-green-400'} card-hover`}>
              <div className="flex items-center">
                {results.is_simulated ? (
                  <>
                    <span className="text-yellow-800 text-2xl mr-4">⚠️</span>
                    <div>
                      <h3 className="text-yellow-800 font-bold text-lg">Dados Simulados</h3>
                      <p className="text-yellow-700 text-sm">Para dados reais, inicie o backend Python: <code className="bg-yellow-200 px-2 py-1 rounded">python3 start_backend.py</code></p>
                    </div>
                  </>
                ) : (
                  <>
                    <span className="text-green-800 text-2xl mr-4">✅</span>
                    <div>
                      <h3 className="text-green-800 font-bold text-lg">Dados Reais da API do Instagram</h3>
                      <p className="text-green-700 text-sm">Informações coletadas diretamente do Instagram em tempo real</p>
                      {results.analysis_timestamp && (
                        <p className="text-green-600 text-xs mt-1">Análise realizada em: {new Date(results.analysis_timestamp).toLocaleString('pt-BR')}</p>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Basic Info Card */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 shadow-xl rounded-xl p-4 sm:p-6 card-hover">
              <div className="flex items-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mr-6">
                  {results.username.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    {results.full_name}
                    {results.is_verified && <span className="ml-2 text-blue-500">✓</span>}
                    {results.is_business && <span className="ml-2 text-purple-500">💼</span>}
                  </h2>
                  <p className="text-gray-600 text-lg">@{results.username}</p>
                  <div className="flex items-center space-x-4 mt-2">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${results.is_private ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                      {results.is_private ? '🔒 Privado' : '🌐 Público'}
                    </span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">
                      ID: {results.userID}
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
                  <div className="text-3xl font-bold text-blue-600 mb-1">
                    {results.follower_count.toLocaleString()}
                  </div>
                  <div className="text-sm text-blue-700">👥 Seguidores</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
                  <div className="text-3xl font-bold text-green-600 mb-1">
                    {results.following_count.toLocaleString()}
                  </div>
                  <div className="text-sm text-green-700">👤 Seguindo</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg">
                  <div className="text-3xl font-bold text-purple-600 mb-1">
                    {results.media_count.toLocaleString()}
                  </div>
                  <div className="text-sm text-purple-700">📸 Posts</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg">
                  <div className="text-3xl font-bold text-orange-600 mb-1">
                    {results.total_igtv_videos.toLocaleString()}
                  </div>
                  <div className="text-sm text-orange-700">📺 IGTV</div>
                </div>
              </div>

              {results.biography && (
                <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold text-gray-800 mb-2">📝 Biografia</h3>
                  <p className="text-gray-700">{results.biography}</p>
                </div>
              )}

              {results.external_url && (
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-800 mb-2">🔗 Link Externo</h3>
                  <a href={results.external_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">
                    {results.external_url}
                  </a>
                </div>
              )}
            </div>

            {/* Metrics Card */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 shadow-xl rounded-xl p-4 sm:p-6 card-hover">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">📊 Métricas de Engajamento</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl">
                  <div className="text-4xl font-bold text-indigo-600 mb-2">
                    {results.engagement_rate}%
                  </div>
                  <div className="text-sm text-indigo-700 font-semibold">Taxa de Engajamento</div>
                  <div className="w-full bg-indigo-200 rounded-full h-2 mt-3">
                    <div 
                      className="bg-indigo-600 h-2 rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${Math.min(results.engagement_rate, 100)}%` }}
                    ></div>
                  </div>
                </div>
                <div className="text-center p-6 bg-gradient-to-br from-pink-50 to-pink-100 rounded-xl">
                  <div className="text-4xl font-bold text-pink-600 mb-2">
                    {results.average_likes.toLocaleString()}
                  </div>
                  <div className="text-sm text-pink-700 font-semibold">Média de Curtidas</div>
                  <div className="text-xs text-pink-600 mt-1">por post</div>
                </div>
                <div className="text-center p-6 bg-gradient-to-br from-teal-50 to-teal-100 rounded-xl">
                  <div className="text-4xl font-bold text-teal-600 mb-2">
                    {results.average_comments.toLocaleString()}
                  </div>
                  <div className="text-sm text-teal-700 font-semibold">Média de Comentários</div>
                  <div className="text-xs text-teal-600 mt-1">por post</div>
                </div>
              </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Engagement Chart */}
              <div className="bg-white/10 backdrop-blur-md border border-white/20 shadow-xl rounded-xl p-6 card-hover">
                <h3 className="text-xl font-bold text-gray-900 mb-4">📈 Engajamento ao Longo do Tempo</h3>
                <div className="h-64">
                  <Line
                    data={{
                      labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
                      datasets: [{
                        label: 'Seguidores',
                        data: [
                          results.follower_count * 0.8,
                          results.follower_count * 0.85,
                          results.follower_count * 0.9,
                          results.follower_count * 0.95,
                          results.follower_count * 0.98,
                          results.follower_count
                        ],
                        borderColor: 'rgb(59, 130, 246)',
                        backgroundColor: 'rgba(59, 130, 246, 0.1)',
                        fill: true,
                        tension: 0.4
                      }]
                    }}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: {
                          display: false
                        }
                      },
                      scales: {
                        y: {
                          beginAtZero: true,
                          grid: {
                            color: 'rgba(0, 0, 0, 0.1)'
                          }
                        },
                        x: {
                          grid: {
                            color: 'rgba(0, 0, 0, 0.1)'
                          }
                        }
                      }
                    }}
                  />
                </div>
              </div>

              {/* Post Type Distribution */}
              <div className="bg-white/10 backdrop-blur-md border border-white/20 shadow-xl rounded-xl p-6 card-hover">
                <h3 className="text-xl font-bold text-gray-900 mb-4">📊 Distribuição de Posts</h3>
                <div className="h-64">
                  <Doughnut
                    data={{
                      labels: ['Imagens', 'Vídeos', 'Carrosséis', 'IGTV'],
                      datasets: [{
                        data: [
                          results.media_count * 0.6,
                          results.media_count * 0.25,
                          results.media_count * 0.1,
                          results.total_igtv_videos
                        ],
                        backgroundColor: [
                          'rgba(59, 130, 246, 0.8)',
                          'rgba(236, 72, 153, 0.8)',
                          'rgba(16, 185, 129, 0.8)',
                          'rgba(245, 158, 11, 0.8)'
                        ],
                        borderWidth: 2,
                        borderColor: '#fff'
                      }]
                    }}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: {
                          position: 'bottom'
                        }
                      }
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Last Post and Comments */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Last Post */}
              <div className="bg-white/10 backdrop-blur-md border border-white/20 shadow-xl rounded-xl p-6 card-hover">
                <h3 className="text-xl font-bold text-gray-900 mb-4">📸 Último Post</h3>
                {results.last_post ? (
                  <div className="space-y-4">
                    <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg">
                      <p className="text-gray-800 mb-3">{results.last_post.caption}</p>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-purple-600">❤️ {results.last_post.likes.toLocaleString()}</span>
                        <span className="text-pink-600">💬 {results.last_post.comments.toLocaleString()}</span>
                        <span className="text-gray-500">
                          {results.last_post.timestamp ? new Date(results.last_post.timestamp).toLocaleDateString('pt-BR') : 'N/A'}
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <div className="text-4xl mb-2">📭</div>
                    <p>Nenhum post encontrado</p>
                  </div>
                )}
              </div>

              {/* Recent Comments */}
              <div className="bg-white/10 backdrop-blur-md border border-white/20 shadow-xl rounded-xl p-6 card-hover">
                <h3 className="text-xl font-bold text-gray-900 mb-4">💬 Comentários Recentes</h3>
                {results.recent_comments && results.recent_comments.length > 0 ? (
                  <div className="space-y-3 max-h-64 overflow-y-auto">
                    {results.recent_comments.map((comment, index) => (
                      <div key={index} className="bg-gradient-to-r from-blue-50 to-indigo-50 p-3 rounded-lg border-l-4 border-blue-400">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-semibold text-blue-800">@{comment.username}</span>
                          <span className="text-xs text-gray-500">
                            {comment.timestamp ? new Date(comment.timestamp).toLocaleDateString('pt-BR') : 'N/A'}
                          </span>
                        </div>
                        <p className="text-gray-700 text-sm">{comment.comment}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <div className="text-4xl mb-2">💭</div>
                    <p>Nenhum comentário encontrado</p>
                  </div>
                )}
              </div>
            </div>

            {/* Contact Information */}
            {(results.public_email || results.public_phone_number || results.obfuscated_email || results.obfuscated_phone) && (
              <div className="bg-white/10 backdrop-blur-md border border-white/20 shadow-xl rounded-xl p-8 card-hover">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">📞 Informações de Contato</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {results.public_email && (
                    <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
                      <div className="flex items-center mb-2">
                        <span className="text-green-600 mr-2">📧</span>
                        <span className="font-semibold text-green-800">Email Público</span>
                      </div>
                      <p className="text-green-700">{results.public_email}</p>
                    </div>
                  )}
                  {results.public_phone_number && (
                    <div className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg border border-blue-200">
                      <div className="flex items-center mb-2">
                        <span className="text-blue-600 mr-2">📱</span>
                        <span className="font-semibold text-blue-800">Telefone Público</span>
                      </div>
                      <p className="text-blue-700">{results.public_phone_number}</p>
                    </div>
                  )}
                  {results.obfuscated_email && (
                    <div className="p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200">
                      <div className="flex items-center mb-2">
                        <span className="text-yellow-600 mr-2">🔒</span>
                        <span className="font-semibold text-yellow-800">Email Ofuscado</span>
                      </div>
                      <p className="text-yellow-700">{results.obfuscated_email}</p>
                    </div>
                  )}
                  {results.obfuscated_phone && (
                    <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200">
                      <div className="flex items-center mb-2">
                        <span className="text-purple-600 mr-2">🔒</span>
                        <span className="font-semibold text-purple-800">Telefone Ofuscado</span>
                      </div>
                      <p className="text-purple-700">{results.obfuscated_phone}</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tutorial */}
        <div className="bg-white rounded-lg shadow-md p-6 mt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">📋 Como obter o Session ID</h2>
          <div className="space-y-4 text-gray-700">
            <div className="flex items-start space-x-3">
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm font-medium">1</span>
              <p>Abra o Instagram no navegador e faça login</p>
            </div>
            <div className="flex items-start space-x-3">
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm font-medium">2</span>
              <p>Pressione F12 para abrir as ferramentas de desenvolvedor</p>
            </div>
            <div className="flex items-start space-x-3">
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm font-medium">3</span>
              <p>Vá na aba "Application" ou "Aplicação"</p>
            </div>
            <div className="flex items-start space-x-3">
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm font-medium">4</span>
              <p>No menu lateral, clique em "Cookies" → "https://www.instagram.com"</p>
            </div>
            <div className="flex items-start space-x-3">
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm font-medium">5</span>
              <p>Procure por "sessionid" e copie o valor</p>
            </div>
            <div className="mt-4 p-4 bg-yellow-100 border border-yellow-400 text-yellow-800 rounded">
              ⚠️ <strong>IMPORTANTE:</strong> Mantenha seu session ID seguro e não compartilhe!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstagramInvestigator; 