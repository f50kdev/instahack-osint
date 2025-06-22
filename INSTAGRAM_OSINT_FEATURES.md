# 🔍 Instagram OSINT - Funcionalidades Avançadas

## 📋 Visão Geral

O Instagram OSINT Investigator agora inclui funcionalidades avançadas para análise completa de perfis do Instagram, incluindo:

- **Posts Recentes**: Últimos 10 posts com análise detalhada
- **Comentários com Mais Likes**: Top 10 comentários mais populares
- **Detecção de Comentários Ofensivos**: Análise de sentimentos e identificação de conteúdo tóxico
- **Novos Seguidores**: Últimos 10 seguidores com informações completas
- **Análise de Engajamento**: Métricas detalhadas de interação

## 🚀 Funcionalidades Principais

### 1. 📸 Posts Recentes
- **Quantidade**: Últimos 10 posts do perfil
- **Informações**: Likes, comentários, data, legenda, link direto
- **Visualização**: Grid responsivo com imagens e métricas
- **Interação**: Links diretos para os posts no Instagram

### 2. 🔥 Comentários com Mais Likes
- **Ranking**: Top 10 comentários ordenados por likes
- **Detalhes**: Username, ID, nome completo, verificação
- **Análise**: Sentimento do comentário (positivo/negativo/neutro/ofensivo)
- **Contexto**: Informações do post onde foi feito o comentário

### 3. ⚠️ Detecção de Comentários Ofensivos
- **Algoritmo**: Análise de palavras-chave ofensivas em português e inglês
- **Identificação**: Usuários que fazem comentários tóxicos
- **Dados**: ID do usuário, username, verificação, likes
- **Contexto**: Post onde foi feito o comentário ofensivo

### 4. 👥 Novos Seguidores
- **Lista**: Últimos 10 seguidores do perfil
- **Informações**: Foto, username, nome, verificação, privacidade
- **Métricas**: Número de seguidores, seguindo, posts
- **Bio**: Biografia do seguidor

### 5. 💬 Análise de Comentários
- **Resumo**: Total de comentários analisados
- **Categorização**: Positivos, negativos, neutros, ofensivos
- **Métricas**: Média de likes por comentário
- **Visualização**: Cards coloridos com estatísticas

## 🔧 Como Usar

### Dados Simulados (Recomendado para Testes)
```bash
# Deixe o campo Session ID vazio
Username: qualquer_username
Session ID: (deixe vazio)
```

### Dados Reais (Requer Session ID)
```bash
# Para dados reais do Instagram
Username: username_real
Session ID: seu_session_id_aqui
```

## 📊 Estrutura dos Dados

### Posts
```json
{
  "id": "post_123456789",
  "caption": "Legenda do post #instagram",
  "likes": 1500,
  "comments": 89,
  "timestamp": 1640995200,
  "media_type": "IMAGE",
  "media_url": "https://...",
  "permalink": "https://www.instagram.com/p/..."
}
```

### Comentários
```json
{
  "id": "comment_123456789",
  "username": "user_123",
  "user_id": 987654321,
  "full_name": "Nome Completo",
  "comment": "Texto do comentário",
  "likes": 25,
  "timestamp": 1640995200,
  "sentiment": "positive",
  "post_id": "post_123456789",
  "post_caption": "Legenda do post",
  "post_likes": 1500
}
```

### Seguidores
```json
{
  "id": 123456789,
  "username": "follower_123",
  "full_name": "Nome do Seguidor",
  "is_verified": false,
  "is_private": false,
  "profile_pic_url": "https://...",
  "follower_count": 1000,
  "following_count": 500,
  "media_count": 50,
  "biography": "Bio do seguidor"
}
```

## 🎯 Casos de Uso

### 1. Análise de Influenciadores
- Identificar padrões de engajamento
- Analisar qualidade dos comentários
- Detectar fake followers
- Monitorar crescimento da audiência

### 2. Moderação de Conteúdo
- Identificar comentários ofensivos
- Encontrar usuários problemáticos
- Analisar sentimento da comunidade
- Monitorar qualidade das interações

### 3. Pesquisa de Mercado
- Analisar concorrentes
- Identificar tendências
- Estudar comportamento da audiência
- Avaliar estratégias de conteúdo

### 4. Investigação Digital
- Coletar informações de perfis
- Analisar conexões entre usuários
- Identificar padrões de atividade
- Documentar evidências digitais

## 🔒 Segurança e Privacidade

### Dados Simulados
- ✅ Totalmente seguro
- ✅ Sem acesso a dados reais
- ✅ Ideal para demonstrações
- ✅ Não requer credenciais

### Dados Reais
- ⚠️ Requer Session ID válido
- ⚠️ Respeite os limites da API
- ⚠️ Use apenas para fins legítimos
- ⚠️ Não compartilhe credenciais

## 🛠️ Configuração Técnica

### Backend (Python/Flask)
```bash
cd backend
python3 start_backend.py
```

### Frontend (React)
```bash
npm start
```

### APIs Utilizadas
- Instagram Graph API (dados reais)
- Análise de sentimentos customizada
- Detecção de conteúdo ofensivo
- Geolocalização de IPs

## 📈 Métricas Disponíveis

### Engajamento
- Taxa de engajamento geral
- Média de likes por post
- Média de comentários por post
- Horários de pico de atividade

### Comentários
- Total de comentários analisados
- Distribuição por sentimento
- Comentários com mais likes
- Comentários ofensivos detectados

### Seguidores
- Novos seguidores recentes
- Perfil demográfico
- Taxa de crescimento
- Qualidade da audiência

## 🎨 Interface do Usuário

### Design Responsivo
- ✅ Mobile-first design
- ✅ Adaptação automática para tablets
- ✅ Interface otimizada para desktop
- ✅ Navegação intuitiva

### Elementos Visuais
- 📊 Cards informativos
- 🎨 Cores por categoria
- 📱 Ícones expressivos
- 🔄 Animações suaves

### Feedback em Tempo Real
- ⏳ Indicador de carregamento
- ✅ Status do backend
- ❌ Tratamento de erros
- 📋 Mensagens informativas

## 🔄 Atualizações Futuras

### Funcionalidades Planejadas
- [ ] Análise de Stories
- [ ] Detecção de bots
- [ ] Análise de hashtags
- [ ] Relatórios em PDF
- [ ] API pública
- [ ] Integração com outras redes sociais

### Melhorias Técnicas
- [ ] Cache inteligente
- [ ] Rate limiting avançado
- [ ] Análise de imagens com IA
- [ ] Detecção de deepfakes
- [ ] Análise de vídeos

## 📞 Suporte

Para dúvidas, sugestões ou problemas:
- 📧 Email: suporte@instahack-osint.com
- 💬 Discord: [Link do servidor]
- 📖 Documentação: [Link da wiki]
- 🐛 Issues: [Link do GitHub]

---

**⚠️ Aviso Legal**: Este tool é destinado apenas para fins educacionais e de pesquisa. Respeite sempre os termos de serviço do Instagram e as leis de privacidade aplicáveis. 