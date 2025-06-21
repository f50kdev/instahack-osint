# 🧠 F50HACK - OSINT Dashboard

Uma ferramenta avançada de **Open Source Intelligence (OSINT)** desenvolvida em React, com interface moderna e funcionalidades reais de análise de dados públicos.

## 🎯 **Funcionalidades Implementadas**

### 🔍 **Dashboard Principal**
- Busca por usernames com simulação de análise OSINT
- Exibição de perfil com dados mockados
- Gráfico de atividade por horário
- Mapa de geolocalização interativo

### 🌐 **Domain Analysis**
- Análise real de domínios usando API pública (ipapi.co)
- Geolocalização de IPs
- Informações de ISP e ASN
- Detecção de localização geográfica

### 📧 **Email Finder**
- Busca de emails por nome e domínio
- Simulação de diferentes padrões de email
- Indicadores de confiança e verificação
- Sugestões de fontes de dados

### 📱 **Phone Lookup**
- Análise de números de telefone brasileiros
- Detecção automática de DDD
- Identificação de operadora por região
- Verificação de validade
- **Suporte a 50+ países** incluindo:
  - 🇧🇷 **Brasil** (+55) - Operadoras: Vivo, Claro, TIM, Oi, etc.
  - 🇮🇳 **Índia** (+91) - Operadoras: Airtel, Vodafone, Jio, etc.
  - 🇦🇴 **Angola** (+244) - Operadoras: Unitel, Movicel
  - 🇺🇸 **Estados Unidos/Canadá** (+1)
  - 🇬🇧 **Reino Unido** (+44)
  - 🇫🇷 **França** (+33)
  - 🇩🇪 **Alemanha** (+49)
  - 🇮🇹 **Itália** (+39)
  - 🇪🇸 **Espanha** (+34)
  - E muito mais...

#### Funcionalidades do Phone Lookup:
- ✅ Detecção automática do país pelo código
- ✅ Identificação da operadora
- ✅ Localização geográfica específica
- ✅ Informações do proprietário (estilo Truecaller)
- ✅ Tipo de proprietário (Pessoa Física/Empresa)
- ✅ Fuso horário
- ✅ Avaliação de risco

#### Exemplos de Números Angolanos:
- `+244921234567` - Unitel, Luanda Centro, João Silva
- `+244931234567` - Unitel, Luanda Talatona, Maria Santos
- `+244961234567` - Movicel, Luanda Cazenga, Pedro Oliveira
- `+244981234567` - Movicel, Benguela Centro, Manuel Rodrigues

### 📄 **Report Exporter**
- Exportação em formato JSON
- Geração de relatórios PDF com jsPDF
- Inclusão de todos os dados coletados
- Formatação profissional

## ⚙️ **Tecnologias Utilizadas**

- **Frontend**: React 19.1.0
- **Styling**: Tailwind CSS 3.4.17
- **Maps**: React-Leaflet + Leaflet.js
- **Charts**: Chart.js + react-chartjs-2
- **PDF Generation**: jsPDF + html2canvas
- **APIs**: ipapi.co (geolocalização)

## 🚀 **Como Executar**

### Pré-requisitos
- Node.js (versão 16 ou superior)
- npm ou yarn

### Instalação
```bash
# Clone o repositório
git clone <repository-url>
cd instahack-osint

# Instale as dependências
npm install

# Execute o projeto
npm start
```

O projeto estará disponível em `http://localhost:3000`

## 📁 **Estrutura do Projeto**

```
src/
├── App.js                 # Componente principal
├── components/
│   ├── Sidebar.jsx        # Menu de navegação
│   ├── ProfileCard.jsx    # Card de perfil do usuário
│   ├── GeoMap.jsx         # Mapa interativo
│   ├── ActivityChart.jsx  # Gráfico de atividade
│   ├── DomainAnalysis.jsx # Análise de domínios
│   ├── EmailFinder.jsx    # Busca de emails
│   ├── PhoneLookup.jsx    # Análise de telefones
│   └── ReportExporter.jsx # Exportação de relatórios
└── assets/
```

## 🔧 **Funcionalidades por Seção**

### Dashboard
- Busca por username
- Visualização de perfil simulado
- Gráfico de atividade temporal
- Mapa com localizações

### Domain Analysis
- Input para domínio
- Geolocalização real via API
- Informações de rede e ISP
- Coordenadas geográficas

### Email Finder
- Busca por nome e domínio
- Múltiplos padrões de email
- Indicadores de confiança
- Fontes de dados

### Phone Lookup
- Análise de números brasileiros
- Detecção de DDD e operadora
- Informações de localização
- Verificação de validade

## 📊 **APIs Utilizadas**

- **ipapi.co**: Geolocalização de IPs e domínios
- **Mock APIs**: Simulação de dados para demonstração

## 🔮 **Funcionalidades Futuras**

- [ ] Integração com Instagram Graph API
- [ ] Scraping real de perfis sociais
- [ ] Autenticação de usuários
- [ ] Banco de dados para histórico
- [ ] Mais APIs de OSINT
- [ ] Análise de imagens
- [ ] Detecção de padrões avançados

## 🛡️ **Considerações de Segurança**

- Este projeto é para fins educacionais
- Respeite os termos de serviço das APIs
- Use apenas dados públicos
- Não abuse das APIs gratuitas

## 📝 **Licença**

Este projeto é desenvolvido para fins educacionais e de demonstração.

## 🤝 **Contribuição**

Contribuições são bem-vindas! Sinta-se à vontade para:
- Reportar bugs
- Sugerir novas funcionalidades
- Enviar pull requests

---

**Desenvolvido com ❤️ para a comunidade OSINT**
