# 🔍 InstaHack OSINT - Análise Profunda de Imagens

![InstaHack OSINT](https://img.shields.io/badge/InstaHack-OSINT-red)
![React](https://img.shields.io/badge/React-18.0-blue)
![Python](https://img.shields.io/badge/Python-3.9+-green)
![Flask](https://img.shields.io/badge/Flask-2.0-lightgrey)
![AI](https://img.shields.io/badge/AI-CLIP%2BOCR-orange)

> **Ferramenta avançada de análise de imagens com foco em OSINT (Open Source Intelligence) e geolocalização**

## 🚀 Funcionalidades

### 📸 Análise Profunda de Imagens
- **EXIF Extraction**: Metadados completos (GPS, data, câmera, software)
- **OCR (Optical Character Recognition)**: Extração de texto de imagens
- **IA/CLIP**: Descrição automática de imagens e reconhecimento de locais
- **Geolocalização**: Conversão de coordenadas GPS em endereços
- **Hash Analysis**: Geração de hash SHA-256 para busca reversa
- **Shadow Analysis**: Análise de sombras para estimativa de horário/posição

### 🔍 Investigação de Perfis
- **Instagram OSINT**: Análise completa de perfis do Instagram
- **Phone Lookup**: Busca de informações de números de telefone
- **Email Finder**: Descoberta de emails associados
- **Domain Analysis**: Análise de domínios e informações relacionadas

### 📊 Visualização e Relatórios
- **Interactive Maps**: Visualização de localizações no mapa
- **Progress Tracking**: Barra de progresso em tempo real
- **Report Export**: Exportação de relatórios em JSON/PDF
- **Real-time Analysis**: Análise em tempo real com feedback visual

## 🛠️ Tecnologias Utilizadas

### Frontend
- **React 18** - Interface moderna e responsiva
- **TailwindCSS** - Estilização rápida e consistente
- **Leaflet** - Mapas interativos
- **Chart.js** - Gráficos e visualizações

### Backend
- **Python 3.9+** - Lógica de análise
- **Flask** - API REST
- **EasyOCR** - Reconhecimento de texto
- **CLIP (Transformers)** - Análise de imagem com IA
- **OpenCV** - Processamento de imagem
- **ExifRead/Piexif** - Extração de metadados EXIF
- **Geopy** - Geocodificação

## 📦 Instalação

### Pré-requisitos
- Node.js 16+
- Python 3.9+
- Git

### 1. Clone o repositório
```bash
git clone https://github.com/seu-usuario/instahack-osint.git
cd instahack-osint
```

### 2. Instale as dependências do Frontend
```bash
npm install
```

### 3. Instale as dependências do Backend
```bash
pip3 install -r backend/requirements.txt
```

### 4. Configure o ambiente
```bash
# Crie um arquivo .env se necessário
cp .env.example .env
```

## 🚀 Como Usar

### 1. Inicie o Backend
```bash
python3 backend/image_api.py
```
O backend estará disponível em `http://localhost:3001`

### 2. Inicie o Frontend
```bash
npm start
```
O frontend estará disponível em `http://localhost:3000`

### 3. Use a aplicação
- Acesse `http://localhost:3000`
- Faça upload de uma imagem para análise
- Veja os resultados em tempo real

## 📋 Funcionalidades Detalhadas

### Análise de Imagens
```
✅ Extração de metadados EXIF
✅ Geolocalização GPS
✅ OCR em múltiplos idiomas
✅ Descrição automática com IA
✅ Análise de sombras
✅ Geração de hash
✅ Busca reversa sugerida
```

### Investigação OSINT
```
✅ Análise de perfis Instagram
✅ Busca de números de telefone
✅ Descoberta de emails
✅ Análise de domínios
✅ Relatórios exportáveis
```

## 🖼️ Screenshots

### Investigação Instagram OSINT
![Instagram OSINT](screenshots/Screenshot%202025-06-22%20at%201.18.08%E2%80%AFAM.png)

### Análise de Perfil e Comentários
![Análise de Perfil](screenshots/Screenshot%202025-06-22%20at%201.18.51%E2%80%AFAM.png)

### Detecção de Comentários Ofensivos
![Comentários Ofensivos](screenshots/Screenshot%202025-06-22%20at%201.21.14%E2%80%AFAM.png)

### Relatório e Seguidores Recentes
![Relatório e Seguidores](screenshots/Screenshot%202025-06-22%20at%202.21.59%E2%80%AFAM.png)

### Mapa e Atividades
![Mapa e Atividades](screenshots/Screenshot%202025-06-22%20at%202.22.04%E2%80%AFAM.png)

### Exportação de Relatórios
![Exportação de Relatórios](screenshots/Screenshot%202025-06-22%20at%202.22.08%E2%80%AFAM.png)

### Painel de Atividades
![Painel de Atividades](screenshots/Screenshot%202025-06-22%20at%202.35.07%E2%80%AFAM.png)

## 📁 Estrutura do Projeto

```
instahack-osint/
├── backend/
│   ├── deep_image_analyzer.py    # Script de análise profunda
│   ├── image_api.py             # API Flask
│   ├── instagram_api.py         # API do Instagram
│   └── requirements.txt         # Dependências Python
├── src/
│   ├── components/
│   │   ├── GeoMap.jsx           # Mapa interativo
│   │   ├── InstagramInvestigator.jsx
│   │   ├── PhoneLookup.jsx
│   │   └── ...                  # Outros componentes
│   ├── App.js
│   └── index.js
├── public/
├── package.json
└── README.md
```

## 🔧 Configuração Avançada

### Variáveis de Ambiente
```bash
# Backend
FLASK_ENV=development
FLASK_DEBUG=1

# Frontend
REACT_APP_API_URL=http://localhost:3001
```

### Personalização
- Edite `src/components/GeoMap.jsx` para customizar a análise de imagens
- Modifique `backend/deep_image_analyzer.py` para adicionar novos tipos de análise
- Ajuste `src/components/InstagramInvestigator.jsx` para outras redes sociais

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## ⚠️ Aviso Legal

Esta ferramenta é destinada apenas para fins educacionais e de pesquisa. O uso deve estar em conformidade com as leis locais e políticas de privacidade. Os desenvolvedores não se responsabilizam pelo uso inadequado desta ferramenta.

## 🆘 Suporte

- **Issues**: [GitHub Issues](https://github.com/seu-usuario/instahack-osint/issues)
- **Documentação**: [Wiki](https://github.com/seu-usuario/instahack-osint/wiki)
- **Email**: seu-email@exemplo.com

## 🙏 Agradecimentos

- [OpenAI CLIP](https://github.com/openai/CLIP) - Modelo de IA para análise de imagens
- [EasyOCR](https://github.com/JaidedAI/EasyOCR) - OCR em múltiplos idiomas
- [React Leaflet](https://react-leaflet.js.org/) - Mapas interativos
- [TailwindCSS](https://tailwindcss.com/) - Framework CSS

---

**⭐ Se este projeto te ajudou, considere dar uma estrela no GitHub!**
