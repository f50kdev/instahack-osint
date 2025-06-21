# 🔍 Instagram OSINT Investigator

## 📋 Visão Geral

O Instagram OSINT Investigator é uma ferramenta avançada de investigação de perfis do Instagram integrada ao dashboard F50HACK. Baseada no script do Bruno Fraga, oferece análise detalhada e visualização gráfica de dados de perfis do Instagram.

## 🚀 Funcionalidades Principais

### 📊 **Análise Completa de Perfil**
- **Informações Básicas:** Nome, username, ID, verificação, tipo de conta
- **Estatísticas:** Seguidores, seguindo, posts, vídeos IGTV
- **Engajamento:** Taxa de engajamento, média de curtidas e comentários
- **Localização:** Cidade, fuso horário, horário de pico

### 📱 **Informações de Contato**
- **Emails:** Públicos e ofuscados
- **Telefones:** Números associados e ofuscados
- **Redes Sociais:** Facebook ID, WhatsApp vinculado
- **URLs Externas:** Links em bio

### 📈 **Análise de Atividade**
- **Gráficos Interativos:** Estatísticas, atividade por hora, posts por dia
- **Hashtags:** Análise de hashtags mais usadas
- **Padrões:** Frequência de posts e horários de pico
- **Engajamento:** Taxa de engajamento e métricas

### 📅 **Histórico da Conta**
- **Idade da Conta:** Dias desde a criação
- **Mudanças de Nome:** Histórico completo de alterações
- **Informações de Dispositivo:** Tipo, OS, versão do app
- **Segurança:** 2FA, mudanças de senha, atividade suspeita

### 📸 **Posts e Comentários**
- **Último Post:** Caption, curtidas, comentários, tipo de mídia
- **Comentários Recentes:** Usuários, IDs, timestamps
- **Análise de Conteúdo:** Padrões e engajamento

## 🛠️ Como Usar

### 1. **Obter Session ID**
```
1. Abra o Instagram no navegador e faça login
2. Pressione F12 para abrir as ferramentas de desenvolvedor
3. Vá na aba "Application" ou "Aplicação"
4. No menu lateral, clique em "Cookies" → "https://www.instagram.com"
5. Procure por "sessionid" e copie o valor
```

### 2. **Investigar Perfil**
```
1. Acesse o dashboard F50HACK
2. Vá para a aba "Instagram Investigator"
3. Digite o username (sem @)
4. Cole o Session ID
5. Clique em "Iniciar Investigação"
```

## 📊 Dados Coletados

### **Informações Básicas**
```json
{
  "username": "brunofraga",
  "full_name": "Bruno Fraga",
  "userID": "123456789",
  "is_verified": true,
  "is_business": false,
  "is_private": false,
  "follower_count": 1540,
  "following_count": 320,
  "media_count": 20,
  "total_igtv_videos": 5
}
```

### **Informações de Contato**
```json
{
  "public_email": "bruno@example.com",
  "public_phone_number": "+5511999999999",
  "obfuscated_email": "b***@example.com",
  "obfuscated_phone": "+55 *** *** 9999",
  "is_whatsapp_linked": true,
  "facebook_id": "100012345678901",
  "external_url": "https://brunofraga.com"
}
```

### **Análise de Atividade**
```json
{
  "engagement_rate": 4.2,
  "average_likes": 180,
  "average_comments": 12,
  "peak_hours": {
    "14:00": 45,
    "15:00": 52,
    "16:00": 38
  },
  "post_frequency": {
    "Segunda": 3,
    "Terça": 2,
    "Quarta": 4
  }
}
```

### **Histórico da Conta**
```json
{
  "account_age_days": 1350,
  "name_changes": 3,
  "name_change_history": [
    {
      "from": "bruno_fraga_old",
      "to": "bruno_fraga_new",
      "date": "2023-06-15"
    }
  ],
  "device_info": {
    "last_login": "2024-01-15T10:30:00Z",
    "device_type": "iPhone",
    "os_version": "iOS 17.2",
    "app_version": "Instagram 302.0"
  }
}
```

## 🔧 Arquitetura

### **Frontend (React)**
- `InstagramInvestigator.jsx` - Componente principal
- Chart.js para visualizações gráficas
- Tailwind CSS para estilização
- Integração com API Python

### **Backend (Python)**
- `instagram_api.py` - API Flask
- Baseado no script do Bruno Fraga
- Endpoints REST para investigação
- Processamento de dados do Instagram

### **Integração**
```
Frontend (React) ←→ Backend (Python Flask) ←→ Instagram API
```

## 📈 Gráficos e Visualizações

### **1. Estatísticas do Perfil (Doughnut)**
- Seguidores, seguindo, posts, vídeos IGTV
- Cores diferentes para cada categoria

### **2. Atividade por Hora (Line)**
- Gráfico de linha mostrando atividade
- Picos de engajamento identificados

### **3. Posts por Dia da Semana (Bar)**
- Frequência de posts por dia
- Padrões de atividade semanal

### **4. Hashtags Mais Usadas (Doughnut)**
- Análise de hashtags da bio
- Contagem de uso

## 🔒 Segurança e Privacidade

### **⚠️ Avisos Importantes**
- **Session ID:** Mantenha seguro e não compartilhe
- **Rate Limiting:** Respeite os limites da API
- **Uso Ético:** Apenas para investigações autorizadas
- **Dados Públicos:** Apenas informações publicamente disponíveis

### **Proteções**
- Validação de entrada
- Tratamento de erros
- Fallback para dados simulados
- Logs de auditoria

## 🚀 Executando o Sistema

### **1. Frontend (React)**
```bash
cd instahack-osint
npm start
# Acesse: http://localhost:3000
```

### **2. Backend (Python)**
```bash
cd backend
pip install -r requirements.txt
python instagram_api.py
# API disponível em: http://localhost:5000
```

### **3. Teste Completo**
```bash
# 1. Inicie o backend Python
python backend/instagram_api.py

# 2. Inicie o frontend React
npm start

# 3. Acesse o dashboard
# 4. Vá para "Instagram Investigator"
# 5. Teste com um username real
```

## 📝 Exemplo de Uso

### **Investigação de @brunofraga**
```
Username: brunofraga
Session ID: [cole seu session ID aqui]

Resultados:
- Nome: Bruno Fraga
- Seguidores: 1,540
- Posts: 20
- Taxa de Engajamento: 4.2%
- Localização: São Paulo, Brazil
- Idade da Conta: 1,350 dias
- 2FA: Ativado
- Último Login: iPhone, iOS 17.2
```

## 🔄 Atualizações e Melhorias

### **Versão Atual**
- ✅ Integração com script do Bruno Fraga
- ✅ Interface gráfica moderna
- ✅ Análise completa de perfis
- ✅ Visualizações interativas
- ✅ Histórico de mudanças
- ✅ Informações de segurança

### **Próximas Funcionalidades**
- 🔄 Análise de stories
- 🔄 Detecção de bots
- 🔄 Análise de seguidores
- 🔄 Exportação de relatórios
- 🔄 Comparação de perfis
- 🔄 Alertas de mudanças

## 📞 Suporte

Para dúvidas ou problemas:
- **GitHub:** Abra uma issue
- **Email:** [seu-email@exemplo.com]
- **Documentação:** Consulte este README

---

**⚠️ AVISO LEGAL:** Esta ferramenta é destinada apenas para uso ético e legal em investigações autorizadas. Os usuários são responsáveis por cumprir todas as leis aplicáveis em suas jurisdições. 