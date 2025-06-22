import React, { useState, useEffect } from 'react';
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
  const [backendStatus, setBackendStatus] = useState('checking');

  // Verificar status do backend
  useEffect(() => {
    const checkBackendStatus = async () => {
      try {
        console.log('🔍 Verificando status do backend...');
        const response = await fetch('http://localhost:5001/api/instagram/health');
        console.log('📡 Resposta do backend:', response.status, response.statusText);
        if (response.ok) {
          const data = await response.json();
          console.log('✅ Backend online:', data);
          setBackendStatus('online');
        } else {
          console.log('❌ Backend offline - status:', response.status);
          setBackendStatus('offline');
        }
      } catch (err) {
        console.log('❌ Erro ao conectar com backend:', err.message);
        setBackendStatus('offline');
      }
    };

    checkBackendStatus();
    const interval = setInterval(checkBackendStatus, 10000); // Verificar a cada 10 segundos
    
    return () => clearInterval(interval);
  }, []);

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
    if (!username) {
      return;
    }

    setLoading(true);

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
            session_id: sessionId || null
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
        } else {
          const errorData = await response.json();
          throw new Error(errorData.error || `Erro HTTP ${response.status}`);
        }
      } catch (apiError) {
        console.log('API não disponível, usando dados simulados:', apiError.message);
        
        // Se não tiver session ID, mostrar aviso
        if (!sessionId) {
          console.log('⚠️ Para dados reais, forneça um Session ID válido. Usando dados simulados.');
        } else {
          console.log(`⚠️ Erro na API: ${apiError.message}. Usando dados simulados.`);
        }
      }

      // Fallback para dados simulados apenas se API falhar
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
        analysis_timestamp: new Date().toISOString(),
        // Novos campos
        posts: generateMockPosts(username),
        top_comments: generateMockTopComments(),
        offensive_comments: generateMockOffensiveComments(),
        recent_followers: generateMockRecentFollowers(),
        comment_analysis: {
          total_comments: 45,
          positive_comments: 38,
          negative_comments: 2,
          neutral_comments: 5,
          offensive_comments: 3,
          avg_likes_per_comment: 12.5
        }
      };

      // Simular delay de API
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setResults(mockData);
    } catch (err) {
      console.error('Erro na investigação: ' + err.message);
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
      hd_profile_pic_url_info: user.hd_profile_pic_url_info || { url: null },
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
      location: user.location || null,
      timezone: user.timezone || 'GMT-3',
      peak_time: user.peak_time || '2:00 PM - 4:00 PM',
      account_age_days: user.account_age_days || 0,
      name_change_history: user.name_change_history || [],
      device_info: user.device_info || {},
      security_info: user.security_info || {},
      is_simulated: user.is_simulated || false,
      analysis_timestamp: user.analysis_timestamp || new Date().toISOString(),
      // Novos campos
      posts: user.posts || [],
      top_comments: user.top_comments || [],
      offensive_comments: user.offensive_comments || [],
      recent_followers: user.recent_followers || [],
      comment_analysis: user.comment_analysis || {
        total_comments: 0,
        positive_comments: 0,
        negative_comments: 0,
        neutral_comments: 0,
        offensive_comments: 0,
        avg_likes_per_comment: 0
      }
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
      two_factor_enabled: Math.random() > 0.7,
      login_activity: [
        { date: '2024-01-15', location: 'São Paulo, BR', device: 'iPhone 14' },
        { date: '2024-01-10', location: 'Rio de Janeiro, BR', device: 'MacBook Pro' }
      ],
      suspicious_activity: Math.random() > 0.8 ? ['Login from unknown device'] : []
    };
  };

  const generateMockPosts = (username) => {
    const posts = [];
    for (let i = 0; i < 10; i++) {
      posts.push({
        id: `post_${Math.floor(Math.random() * 1000000000)}`,
        caption: `Post #${i + 1} do ${username} 📸 #instagram #vida #feliz`,
        likes: Math.floor(Math.random() * 5000) + 100,
        comments: Math.floor(Math.random() * 200) + 10,
        timestamp: Math.floor((Date.now() - (i * 24 * 60 * 60 * 1000)) / 1000),
        media_type: 'IMAGE',
        media_url: `https://via.placeholder.com/400x400/random?text=Post+${i + 1}`,
        permalink: `https://www.instagram.com/p/post_${Math.floor(Math.random() * 1000000000)}/`
      });
    }
    return posts;
  };

  const generateMockTopComments = () => {
    const comments = [];
    const commentTexts = [
      "Muito lindo! 😍", "Adorei! ❤️", "Perfeito! 👏", "Maravilhoso! ✨",
      "Que foto incrível! 📸", "Amei! 🥰", "Fantástico! 🌟", "Demais! 🔥",
      "Que legal! 😊", "Incrível! 🤩", "Muito bom! 👍", "Excelente! 💯"
    ];
    
    for (let i = 0; i < 10; i++) {
      comments.push({
        id: `comment_${Math.floor(Math.random() * 1000000000)}`,
        username: `user_${Math.floor(Math.random() * 10000)}`,
        user_id: Math.floor(Math.random() * 1000000000),
        full_name: `User ${Math.floor(Math.random() * 10000)}`,
        comment: commentTexts[Math.floor(Math.random() * commentTexts.length)],
        likes: Math.floor(Math.random() * 50) + 5,
        timestamp: Math.floor((Date.now() - (Math.random() * 24 * 60 * 60 * 1000)) / 1000),
        sentiment: 'positive',
        post_id: `post_${Math.floor(Math.random() * 1000000000)}`,
        post_caption: `Post do Instagram #${Math.floor(Math.random() * 10) + 1}`,
        post_likes: Math.floor(Math.random() * 5000) + 100
      });
    }
    return comments.sort((a, b) => b.likes - a.likes);
  };

  const generateMockOffensiveComments = () => {
    const comments = [];
    const offensiveTexts = [
      "Que feio! 😒", "Não gostei! 👎", "Péssimo! 😤", "Horrível! 🤮",
      "Idiota! 🤬", "Burro! 😡", "Estúpido! 😠", "Nojo! 🤢"
    ];
    
    for (let i = 0; i < 3; i++) {
      comments.push({
        id: `comment_${Math.floor(Math.random() * 1000000000)}`,
        username: `troll_${Math.floor(Math.random() * 10000)}`,
        user_id: Math.floor(Math.random() * 1000000000),
        full_name: `Troll ${Math.floor(Math.random() * 10000)}`,
        comment: offensiveTexts[Math.floor(Math.random() * offensiveTexts.length)],
        likes: Math.floor(Math.random() * 5),
        timestamp: Math.floor((Date.now() - (Math.random() * 24 * 60 * 60 * 1000)) / 1000),
        sentiment: 'offensive',
        post_id: `post_${Math.floor(Math.random() * 1000000000)}`,
        post_caption: `Post do Instagram #${Math.floor(Math.random() * 10) + 1}`,
        post_likes: Math.floor(Math.random() * 5000) + 100,
        is_verified: false
      });
    }
    return comments;
  };

  const generateMockRecentFollowers = () => {
    const followers = [];
    for (let i = 0; i < 10; i++) {
      followers.push({
        id: Math.floor(Math.random() * 1000000000),
        username: `follower_${Math.floor(Math.random() * 10000)}`,
        full_name: `Follower ${Math.floor(Math.random() * 10000)}`,
        is_verified: Math.random() > 0.9,
        is_private: Math.random() > 0.7,
        profile_pic_url: `https://via.placeholder.com/50/random?text=F${i + 1}`,
        follower_count: Math.floor(Math.random() * 10000) + 10,
        following_count: Math.floor(Math.random() * 1000) + 50,
        media_count: Math.floor(Math.random() * 500),
        biography: `Olá! Sou follower ${i + 1} 👋`
      });
    }
    return followers;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            🔍 Instagram OSINT Investigator
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Análise avançada de perfis do Instagram com detecção de comentários ofensivos, 
            análise de engajamento e monitoramento de novos seguidores
          </p>
        </div>

        {/* Status do Backend */}
        <div className="mb-6">
          <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${
            backendStatus === 'connected' 
              ? 'bg-green-100 text-green-800' 
              : backendStatus === 'connecting' 
                ? 'bg-yellow-100 text-yellow-800' 
                : 'bg-red-100 text-red-800'
          }`}>
            <div className={`w-2 h-2 rounded-full mr-2 ${
              backendStatus === 'connected' ? 'bg-green-500' : 
              backendStatus === 'connecting' ? 'bg-yellow-500' : 'bg-red-500'
            }`}></div>
            {backendStatus === 'connected' ? '✅ Backend Conectado' : 
             backendStatus === 'connecting' ? '⏳ Conectando...' : '❌ Backend Desconectado'}
          </div>
        </div>

        {/* Formulário de Análise */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 shadow-xl rounded-xl p-6 mb-8">
          <form onSubmit={investigateProfile} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-white mb-2">
                  Username do Instagram
                </label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="ex: instagram"
                  className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label htmlFor="sessionId" className="block text-sm font-medium text-white mb-2">
                  Session ID (Opcional)
                </label>
                <input
                  type="text"
                  id="sessionId"
                  value={sessionId}
                  onChange={(e) => setSessionId(e.target.value)}
                  placeholder="Para dados reais"
                  className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <p className="text-xs text-gray-300 mt-1">
                  Deixe vazio para dados simulados
                </p>
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Analisando...
                </div>
              ) : (
                '🔍 Investigar Perfil'
              )}
            </button>
          </form>
        </div>

        {/* Resultados */}
        {results && (
          <div className="space-y-8">
            {/* Informações Básicas */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 shadow-xl rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold text-white">📊 Resultados da Análise</h2>
                {results.is_simulated && (
                  <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                    📋 Dados Simulados
                  </span>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white/20 rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-white">{results.follower_count?.toLocaleString() || 0}</div>
                  <div className="text-gray-300">Seguidores</div>
                </div>
                <div className="bg-white/20 rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-white">{results.following_count?.toLocaleString() || 0}</div>
                  <div className="text-gray-300">Seguindo</div>
                </div>
                <div className="bg-white/20 rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-white">{results.media_count?.toLocaleString() || 0}</div>
                  <div className="text-gray-300">Posts</div>
                </div>
                <div className="bg-white/20 rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-white">{results.engagement_rate?.toFixed(1) || 0}%</div>
                  <div className="text-gray-300">Engajamento</div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white/20 rounded-lg p-4">
                  <h3 className="text-xl font-bold text-white mb-4">👤 Informações do Perfil</h3>
                  <div className="space-y-2 text-gray-300">
                    <div><strong>Nome:</strong> {results.full_name}</div>
                    <div><strong>ID:</strong> {results.userID}</div>
                    <div><strong>Verificado:</strong> {results.is_verified ? '✅ Sim' : '❌ Não'}</div>
                    <div><strong>Privado:</strong> {results.is_private ? '🔒 Sim' : '🌐 Não'}</div>
                    <div><strong>Business:</strong> {results.is_business ? '💼 Sim' : '👤 Não'}</div>
                    {results.biography && (
                      <div><strong>Bio:</strong> {results.biography}</div>
                    )}
                  </div>
                </div>
                
                <div className="bg-white/20 rounded-lg p-4">
                  <h3 className="text-xl font-bold text-white mb-4">📈 Métricas de Engajamento</h3>
                  <div className="space-y-2 text-gray-300">
                    <div><strong>Média de Likes:</strong> {results.average_likes?.toLocaleString() || 0}</div>
                    <div><strong>Média de Comentários:</strong> {results.average_comments?.toLocaleString() || 0}</div>
                    <div><strong>Vídeos IGTV:</strong> {results.total_igtv_videos || 0}</div>
                    {results.hashtags_used && results.hashtags_used.length > 0 && (
                      <div>
                        <strong>Hashtags na Bio:</strong>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {results.hashtags_used.map((tag, index) => (
                            <span key={index} className="bg-blue-500 text-white px-2 py-1 rounded text-xs">
                              {tag.tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Posts Recentes */}
            {results.posts && results.posts.length > 0 && (
              <div className="bg-white/10 backdrop-blur-md border border-white/20 shadow-xl rounded-xl p-6">
                <h3 className="text-2xl font-bold text-white mb-6">📸 Posts Recentes</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {results.posts.slice(0, 6).map((post, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-200">
                      <div className="relative">
                        <img 
                          src={post.media_url || `https://via.placeholder.com/300x300/random?text=Post+${index+1}`} 
                          alt={`Post ${index + 1}`}
                          className="w-full h-48 object-cover"
                        />
                        <div className="absolute top-2 right-2 bg-black/50 text-white px-2 py-1 rounded text-sm">
                          #{index + 1}
                        </div>
                      </div>
                      <div className="p-4">
                        <p className="text-gray-800 text-sm mb-3 line-clamp-2">
                          {post.caption || "Sem legenda"}
                        </p>
                        <div className="flex justify-between items-center text-sm text-gray-600">
                          <span>❤️ {post.likes?.toLocaleString() || 0}</span>
                          <span>💬 {post.comments?.toLocaleString() || 0}</span>
                          <span>📅 {post.timestamp ? new Date(post.timestamp * 1000).toLocaleDateString('pt-BR') : 'N/A'}</span>
                        </div>
                        {post.permalink && (
                          <a 
                            href={post.permalink} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="block mt-2 text-blue-600 hover:text-blue-800 text-sm font-medium"
                          >
                            Ver no Instagram →
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Análise de Comentários */}
            {results.comment_analysis && (
              <div className="bg-white/10 backdrop-blur-md border border-white/20 shadow-xl rounded-xl p-6">
                <h3 className="text-2xl font-bold text-white mb-6">💬 Análise de Comentários</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="text-center p-4 bg-green-50 rounded-lg transform hover:scale-105 transition-transform duration-200">
                    <div className="text-2xl font-bold text-green-600">{results.comment_analysis.positive_comments}</div>
                    <div className="text-sm text-green-700">Positivos</div>
                  </div>
                  <div className="text-center p-4 bg-red-50 rounded-lg transform hover:scale-105 transition-transform duration-200">
                    <div className="text-2xl font-bold text-red-600">{results.comment_analysis.offensive_comments}</div>
                    <div className="text-sm text-red-700">Ofensivos</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg transform hover:scale-105 transition-transform duration-200">
                    <div className="text-2xl font-bold text-blue-600">{results.comment_analysis.total_comments}</div>
                    <div className="text-sm text-blue-700">Total</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg transform hover:scale-105 transition-transform duration-200">
                    <div className="text-2xl font-bold text-purple-600">{results.comment_analysis.avg_likes_per_comment}</div>
                    <div className="text-sm text-purple-700">Média Likes</div>
                  </div>
                </div>
              </div>
            )}

            {/* Comentários com Mais Likes */}
            {results.top_comments && results.top_comments.length > 0 && (
              <div className="bg-white/10 backdrop-blur-md border border-white/20 shadow-xl rounded-xl p-6">
                <h3 className="text-2xl font-bold text-white mb-6">🔥 Comentários com Mais Likes</h3>
                <div className="space-y-4">
                  {results.top_comments.slice(0, 10).map((comment, index) => (
                    <div key={index} className="bg-white rounded-lg p-4 shadow-md transform hover:scale-102 transition-transform duration-200">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center mb-2">
                            <span className="text-lg font-bold text-gray-400 mr-2">#{index + 1}</span>
                            <span className="font-semibold text-gray-900">@{comment.username}</span>
                            {comment.is_verified && <span className="ml-1 text-blue-500">✓</span>}
                            <span className="ml-2 text-sm text-gray-500">({comment.user_id})</span>
                          </div>
                          <p className="text-gray-800 mb-2">{comment.comment}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <span>❤️ {comment.likes} likes</span>
                            <span>📅 {comment.timestamp ? new Date(comment.timestamp * 1000).toLocaleDateString('pt-BR') : 'N/A'}</span>
                            <span className={`px-2 py-1 rounded text-xs ${
                              comment.sentiment === 'positive' ? 'bg-green-100 text-green-800' :
                              comment.sentiment === 'negative' ? 'bg-red-100 text-red-800' :
                              comment.sentiment === 'offensive' ? 'bg-red-200 text-red-900' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {comment.sentiment === 'positive' ? 'Positivo' :
                               comment.sentiment === 'negative' ? 'Negativo' :
                               comment.sentiment === 'offensive' ? 'Ofensivo' : 'Neutro'}
                            </span>
                          </div>
                          {comment.post_caption && (
                            <div className="mt-2 p-2 bg-gray-50 rounded text-sm text-gray-600">
                              <strong>Post:</strong> {comment.post_caption.substring(0, 100)}...
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Comentários Ofensivos */}
            {results.offensive_comments && results.offensive_comments.length > 0 && (
              <div className="bg-white/10 backdrop-blur-md border border-white/20 shadow-xl rounded-xl p-6">
                <h3 className="text-2xl font-bold text-red-400 mb-6">⚠️ Comentários Ofensivos Detectados</h3>
                <div className="space-y-4">
                  {results.offensive_comments.map((comment, index) => (
                    <div key={index} className="bg-red-50 border border-red-200 rounded-lg p-4 transform hover:scale-102 transition-transform duration-200">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center mb-2">
                            <span className="text-red-600 font-bold mr-2">🚨</span>
                            <span className="font-semibold text-red-900">@{comment.username}</span>
                            <span className="ml-2 text-sm text-red-600">({comment.user_id})</span>
                            {comment.is_verified && <span className="ml-1 text-blue-500">✓</span>}
                          </div>
                          <p className="text-red-800 mb-2 font-medium">{comment.comment}</p>
                          <div className="flex items-center space-x-4 text-sm text-red-600">
                            <span>❤️ {comment.likes} likes</span>
                            <span>📅 {comment.timestamp ? new Date(comment.timestamp * 1000).toLocaleDateString('pt-BR') : 'N/A'}</span>
                            <span className="bg-red-200 text-red-900 px-2 py-1 rounded text-xs font-semibold">
                              OFENSIVO
                            </span>
                          </div>
                          {comment.post_caption && (
                            <div className="mt-2 p-2 bg-red-100 rounded text-sm text-red-700">
                              <strong>Post:</strong> {comment.post_caption.substring(0, 100)}...
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Novos Seguidores */}
            {results.recent_followers && results.recent_followers.length > 0 && (
              <div className="bg-white/10 backdrop-blur-md border border-white/20 shadow-xl rounded-xl p-6">
                <h3 className="text-2xl font-bold text-white mb-6">👥 Novos Seguidores (Últimos 10)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {results.recent_followers.map((follower, index) => (
                    <div key={index} className="bg-white rounded-lg p-4 shadow-md transform hover:scale-105 transition-transform duration-200">
                      <div className="flex items-center mb-3">
                        <img 
                          src={follower.profile_pic_url || `https://via.placeholder.com/50/random?text=${follower.username[0]}`}
                          alt={follower.username}
                          className="w-12 h-12 rounded-full mr-3"
                        />
                        <div>
                          <div className="flex items-center">
                            <span className="font-semibold text-gray-900">@{follower.username}</span>
                            {follower.is_verified && <span className="ml-1 text-blue-500">✓</span>}
                            {follower.is_private && <span className="ml-1 text-gray-500">🔒</span>}
                          </div>
                          <p className="text-sm text-gray-600">{follower.full_name}</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-xs text-gray-600">
                        <div className="text-center">
                          <div className="font-semibold">{follower.follower_count?.toLocaleString() || 0}</div>
                          <div>Seguidores</div>
                        </div>
                        <div className="text-center">
                          <div className="font-semibold">{follower.following_count?.toLocaleString() || 0}</div>
                          <div>Seguindo</div>
                        </div>
                        <div className="text-center">
                          <div className="font-semibold">{follower.media_count?.toLocaleString() || 0}</div>
                          <div>Posts</div>
                        </div>
                      </div>
                      {follower.biography && (
                        <p className="text-xs text-gray-500 mt-2 line-clamp-2">{follower.biography}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Instruções */}
        {!results && (
          <div className="bg-white/10 backdrop-blur-md border border-white/20 shadow-xl rounded-xl p-6 text-center">
            <h3 className="text-2xl font-bold text-white mb-4">🚀 Como Usar</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
              <div className="bg-white/20 rounded-lg p-4">
                <h4 className="text-lg font-bold text-white mb-2">📋 Dados Simulados</h4>
                <p className="text-gray-300 text-sm">
                  Deixe o campo Session ID vazio para testar com dados simulados. 
                  Você verá posts, comentários e seguidores fictícios para demonstrar as funcionalidades.
                </p>
              </div>
              <div className="bg-white/20 rounded-lg p-4">
                <h4 className="text-lg font-bold text-white mb-2">🔐 Dados Reais</h4>
                <p className="text-gray-300 text-sm">
                  Para dados reais, você precisa de um Session ID válido do Instagram. 
                  Consulte o guia para obter o seu Session ID.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InstagramInvestigator;