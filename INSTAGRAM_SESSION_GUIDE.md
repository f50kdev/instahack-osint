# 🔑 Guia para Obter Session ID do Instagram

## 📋 O que é o Session ID?

O Session ID é um token de autenticação que permite acessar dados reais da API do Instagram. É necessário para obter informações detalhadas de perfis.

## 🛡️ Segurança

⚠️ **IMPORTANTE**: 
- Mantenha seu Session ID seguro e não compartilhe
- Não use em sites não confiáveis
- O Session ID expira periodicamente

## 📱 Como Obter o Session ID

### Método 1: Via Navegador (Recomendado)

1. **Acesse o Instagram**
   - Vá para [instagram.com](https://instagram.com)
   - Faça login na sua conta

2. **Abra as Ferramentas do Desenvolvedor**
   - Pressione `F12` ou `Ctrl+Shift+I` (Windows/Linux)
   - Pressione `Cmd+Option+I` (Mac)

3. **Vá para a aba Application/Storage**
   - Clique na aba "Application" (Chrome) ou "Storage" (Firefox)
   - No painel esquerdo, expanda "Cookies"
   - Clique em "https://www.instagram.com"

4. **Encontre o Session ID**
   - Procure pela linha "sessionid"
   - Copie o valor (será uma string longa de caracteres)

### Método 2: Via Console do Navegador

1. **Acesse o Instagram e faça login**
2. **Abra o Console**
   - Pressione `F12` → Console
3. **Execute o comando:**
   ```javascript
   document.cookie.split('; ').find(row => row.startsWith('sessionid=')).split('=')[1]
   ```
4. **Copie o resultado**

### Método 3: Via Extensão (Mais Fácil)

1. **Instale a extensão "Cookie Editor"**
   - [Chrome Web Store](https://chrome.google.com/webstore/detail/cookie-editor/hlkenndednhfkekhgcdicdfddnkalmdm)
   - [Firefox Add-ons](https://addons.mozilla.org/en-US/firefox/addon/cookie-editor/)

2. **Acesse o Instagram e faça login**
3. **Clique na extensão Cookie Editor**
4. **Procure por "sessionid" e copie o valor**

## 🔄 Renovação do Session ID

O Session ID expira periodicamente. Para renovar:

1. Faça logout do Instagram
2. Faça login novamente
3. Obtenha o novo Session ID seguindo os passos acima

## 🚀 Como Usar no Instagram OSINT

1. **Inicie o backend Python:**
   ```bash
   python3 start_backend.py
   ```

2. **Acesse o frontend:**
   - Vá para http://localhost:3000
   - Navegue até "Instagram OSINT Investigator"

3. **Insira os dados:**
   - Username: nome do perfil a investigar
   - Session ID: cole o valor obtido

4. **Clique em "Iniciar Investigação"**

## 📊 Dados Disponíveis com Session ID

Com um Session ID válido, você terá acesso a:

- ✅ Informações reais do perfil
- ✅ Contadores de seguidores/seguindo
- ✅ Posts recentes
- ✅ Comentários
- ✅ Taxa de engajamento real
- ✅ Histórico de atividades
- ✅ Informações de contato (se públicas)
- ✅ Dados de localização
- ✅ Informações de segurança

## ⚠️ Limitações

- Rate limiting da API do Instagram
- Alguns dados podem estar privados
- Session ID pode expirar durante o uso
- Uso excessivo pode resultar em bloqueio temporário

## 🆘 Solução de Problemas

### "Session ID inválido"
- Verifique se copiou corretamente
- Tente obter um novo Session ID
- Certifique-se de estar logado no Instagram

### "Rate limit atingido"
- Aguarde alguns minutos
- Use um Session ID diferente
- Reduza a frequência de consultas

### "Usuário não encontrado"
- Verifique se o username está correto
- Alguns perfis podem estar privados
- Tente sem o @ no início

## 📞 Suporte

Se encontrar problemas:
1. Verifique se o backend está rodando
2. Confirme se o Session ID é válido
3. Teste com um username conhecido
4. Verifique os logs do backend

---

**🔒 Lembre-se**: Use esta ferramenta de forma responsável e respeite a privacidade dos usuários! 