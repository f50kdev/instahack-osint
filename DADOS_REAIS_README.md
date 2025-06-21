# 🔍 Como Obter Dados Reais do Instagram

## ⚠️ **IMPORTANTE: Dados Reais vs Simulados**

O sistema F50HACK agora suporta **dados reais** da API do Instagram, mas também tem um fallback para dados simulados quando a API não está disponível.

## 🚀 **Para Obter Dados Reais:**

### **1. Iniciar o Backend Python**
```bash
# Opção 1: Usar o script automático
python3 start_backend.py

# Opção 2: Manual
cd backend
pip3 install -r requirements.txt
python3 instagram_api.py
```

### **2. Obter Session ID do Instagram**
```
1. Abra o Instagram no navegador
2. Faça login na sua conta
3. Pressione F12 (Ferramentas de Desenvolvedor)
4. Vá na aba "Application" ou "Aplicação"
5. No menu lateral: Cookies → https://www.instagram.com
6. Procure por "sessionid" e copie o valor
```

### **3. Testar no Dashboard**
```
1. Acesse: http://localhost:3000
2. Vá para "Instagram Investigator"
3. Digite um username real (ex: "instagram")
4. Cole o Session ID
5. Clique em "Iniciar Investigação"
```

## ✅ **Indicadores Visuais:**

### **Dados Reais (Verde)**
```
✅ Dados Reais da API
Informações coletadas diretamente do Instagram
```

### **Dados Simulados (Amarelo)**
```
⚠️ Dados Simulados
Para dados reais, inicie o backend Python: python3 start_backend.py
```

## 📊 **Dados Reais Coletados:**

### **Informações Básicas (Reais)**
- ✅ Nome completo real
- ✅ Username real
- ✅ ID do usuário real
- ✅ Número de seguidores real
- ✅ Número de posts real
- ✅ Conta verificada/business/privada
- ✅ Biografia real
- ✅ URL externa real

### **Posts e Comentários (Reais)**
- ✅ Último post real com caption
- ✅ Número real de curtidas
- ✅ Número real de comentários
- ✅ Comentários reais com usernames
- ✅ Timestamps reais

### **Informações de Contato (Se Públicas)**
- ✅ Email público (se disponível)
- ✅ Telefone público (se disponível)
- ✅ WhatsApp vinculado (se disponível)

### **Métricas Calculadas (Baseadas em Dados Reais)**
- ✅ Taxa de engajamento real
- ✅ Média de curtidas dos posts reais
- ✅ Média de comentários dos posts reais
- ✅ Hashtags extraídas da bio real

## 🔧 **Troubleshooting:**

### **Erro: "API não disponível"**
```bash
# Solução: Iniciar o backend
python3 start_backend.py
```

### **Erro: "Acesso negado - verifique o session ID"**
```
# Solução: Obter novo session ID
1. Faça logout do Instagram
2. Faça login novamente
3. Obtenha novo session ID
```

### **Erro: "Rate limit atingido"**
```
# Solução: Aguardar
- Aguarde 15-30 minutos
- Use um session ID diferente
- Reduza o número de pesquisas
```

### **Erro: "Usuário não encontrado"**
```
# Possíveis causas:
- Username incorreto
- Conta privada
- Conta deletada
- Session ID inválido
```

## 📋 **Exemplo de Uso Real:**

### **1. Iniciar Backend**
```bash
python3 start_backend.py
```

### **2. Testar com Username Real**
```
Username: instagram
Session ID: [seu session ID aqui]
```

### **3. Resultados Reais**
```
✅ Dados Reais da API

👤 Instagram (@instagram)
📊 600M+ seguidores | 0 seguindo | 1,234 posts
📍 San Francisco, CA
📝 Sharing moments with friends and family
🔗 instagram.com
```

## 🛡️ **Segurança e Privacidade:**

### **⚠️ Avisos Importantes**
- **Session ID:** Mantenha seguro e não compartilhe
- **Rate Limiting:** Respeite os limites da API
- **Uso Ético:** Apenas para investigações autorizadas
- **Dados Públicos:** Apenas informações publicamente disponíveis

### **Proteções Implementadas**
- ✅ Validação de entrada
- ✅ Tratamento de erros
- ✅ Logs de auditoria
- ✅ Timeouts de segurança
- ✅ Headers de autenticação

## 🔄 **Sistema Híbrido:**

### **Quando Usa Dados Reais:**
- ✅ Backend Python rodando
- ✅ Session ID válido
- ✅ Username existente
- ✅ API do Instagram acessível

### **Quando Usa Dados Simulados:**
- ❌ Backend Python não rodando
- ❌ Session ID inválido
- ❌ Erro de rate limit
- ❌ Problemas de rede

## 📞 **Suporte:**

Para problemas com dados reais:
1. Verifique se o backend está rodando
2. Confirme se o session ID é válido
3. Teste com um username público conhecido
4. Verifique os logs do backend Python

---

**🎯 Objetivo:** Fornecer dados reais e precisos do Instagram para investigações OSINT legítimas. 