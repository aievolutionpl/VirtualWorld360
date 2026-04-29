# 🌐 VirtualWorld 360

<div align="center">

**Created with ❤️ by [AI Evolution Polska](https://aievolutionpolska.pl)**

[![GitHub](https://img.shields.io/badge/GitHub-aievolutionpl%2FVirtualWorld360-181717?style=for-the-badge&logo=github)](https://github.com/aievolutionpl/VirtualWorld360)
[![License: MIT](https://img.shields.io/badge/License-MIT-a855f7?style=for-the-badge)](LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933?style=for-the-badge&logo=node.js)](https://nodejs.org/)
[![OpenAI](https://img.shields.io/badge/OpenAI-gpt--image--2-412991?style=for-the-badge&logo=openai)](https://openai.com/)
[![Website](https://img.shields.io/badge/Website-aievolutionpolska.pl-a855f7?style=for-the-badge&logo=google-chrome)](https://aievolutionpolska.pl)

*Generate, explore and share immersive AI-powered 360° virtual worlds*

</div>

---

> ⚠️ **You need your own OpenAI API key** to generate worlds. Get one at [platform.openai.com](https://platform.openai.com/api-keys) — each user runs the app with their own key. Image generation costs apply per OpenAI pricing.

---

## 🇬🇧 English

### What is VirtualWorld 360?

VirtualWorld 360 is a free, open-source platform for generating and exploring **immersive 360° panoramic environments** using AI. Powered by OpenAI's `gpt-image-2` model and Three.js, it lets you create stunning virtual worlds from text prompts or reference photos — no 3D skills needed.

### ✨ Key Features

| Feature | Description |
|---|---|
| 🤖 **AI Generator** | Create 360° panoramas from text prompts using `gpt-image-2` |
| 📸 **Reference Images** | Upload up to 4 reference photos to guide the AI |
| 🗂 **30+ Templates** | Sci-Fi, Nature, Architecture, Fantasy, Business, Abstract |
| 🌍 **10 Built-in Worlds** | Tokyo Neon, Arctic Aurora, Royal Palace, Jungle Temple & more |
| 🎮 **Immersive Viewer** | Three.js 360° viewer — mouse, touch, keyboard, VR-ready |
| 📍 **Interactive Hotspots** | Clickable points of interest in every environment |
| 🗺 **Auto-Tour** | Automatically cycle through all environments |
| 🎛 **Live Controls** | Brightness, contrast, saturation, FOV in real time |
| 🌐 **EN / PL** | Bilingual interface — English and Polish |
| 💾 **Screenshot Export** | Save your current view as PNG |

### 📋 Requirements

- **[Node.js](https://nodejs.org/) 18 or newer**
- **Your own [OpenAI API Key](https://platform.openai.com/api-keys)** — required for AI image generation
- A modern browser (Chrome, Edge, Firefox, Safari)

### 🚀 Quick Start (3 steps)

**Step 1 — Clone & Install**
```bash
git clone https://github.com/aievolutionpl/VirtualWorld360.git
cd VirtualWorld360
npm install
```

**Step 2 — Add your OpenAI API Key**
```bash
# Copy the example file
cp .env.example .env

# Open .env and paste your key:
# OPENAI_API_KEY=sk-proj-your-key-here
```

> Get your API key at: https://platform.openai.com/api-keys

**Step 3 — Run**
```bash
npm start
```

Then open **`index.html`** in your browser (or use [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) in VS Code).

The API server runs on `http://localhost:3001` by default.

### 🗂 Project Structure

```
VirtualWorld360/
│
├── 📄 index.html           # Main dashboard — all your worlds
├── 📄 generator.html       # AI world generator interface
├── 📄 viewer360.html       # Immersive 360° panoramic viewer
├── 📄 api-server.js        # Node.js backend (OpenAI integration)
│
├── 📁 assets/
│   ├── styles.css          # Design system, UI tokens, animations
│   ├── i18n.js             # EN/PL bilingual module
│   ├── templates.js        # 30+ world template library
│   ├── api-client.js       # Frontend API client
│   └── motion.js           # Scroll animations & micro-interactions
│
├── 📁 generated/           # Your AI-generated images (git-ignored)
│
├── 🖼 env-*.jpg            # Built-in 360° environment photos
├── ⚙️ .env.example         # Environment variables template
├── 📄 CONTRIBUTING.md      # How to contribute
└── 📄 LICENSE              # MIT License
```

### 🌍 Built-in Environments

| Icon | Name | Category |
|---|---|---|
| 🖥️ | AI Evolution HQ | Business |
| ⚡ | Quantum Server | Sci-Fi |
| 🎨 | Creative Studio | Business |
| 💼 | Executive Boardroom | Business |
| 🛸 | LEO Space Orbit | Sci-Fi |
| 🗼 | Tokyo Neon Rooftop | Sci-Fi |
| 🌴 | Jungle Temple Ruins | Nature |
| ❄️ | Arctic Aurora Station | Nature |
| 👑 | Royal Palace Hall | Architecture |
| 🌴 | Vaporwave Neon Grid | Abstract |

### ⚙️ API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/generate` | Generate from text prompt |
| `POST` | `/api/generate-with-reference` | Generate with reference images |
| `GET` | `/api/list` | List all generated images |
| `GET` | `/api/stats` | Usage statistics |
| `DELETE` | `/api/images/:filename` | Delete an image |

### 🔧 Environment Variables

```env
# .env — NEVER commit this file!
OPENAI_API_KEY=sk-proj-your-key-here   # Required
PORT=3001                               # Optional (default: 3001)
```

### 💰 API Costs

World generation uses OpenAI's `gpt-image-2` model. Approximate costs:

| Quality | Resolution | Cost per image |
|---|---|---|
| Fast | 1024×1024 | ~$0.02 |
| Standard | 1536×1024 | ~$0.07 |
| Premium ✨ | 1536×1024 HD | ~$0.19 |

*Prices are approximate. Check [OpenAI pricing](https://openai.com/pricing) for current rates.*

### 🤝 Contributing

We welcome contributions! See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

```bash
# Fork → clone → branch → PR
git checkout -b feature/my-feature
```

### 📄 License

**MIT** — free to use, modify and distribute. See [LICENSE](LICENSE).

---

## 🇵🇱 Polski

### Czym jest VirtualWorld 360?

VirtualWorld 360 to darmowa platforma open-source do generowania i eksplorowania **immersyjnych środowisk panoramicznych 360°** przy użyciu AI. Zbudowana na modelu `gpt-image-2` OpenAI i bibliotece Three.js.

### ⚠️ Wymagany własny klucz API OpenAI

Każdy użytkownik musi posiadać własny klucz API od OpenAI. Klucz możesz uzyskać na: **https://platform.openai.com/api-keys**

Koszty generowania obrazów są pobierane zgodnie z cennikiem OpenAI.

### 🚀 Szybki start

**Krok 1 — Klonowanie i instalacja**
```bash
git clone https://github.com/aievolutionpl/VirtualWorld360.git
cd VirtualWorld360
npm install
```

**Krok 2 — Konfiguracja klucza API**
```bash
# Skopiuj plik przykładowy
cp .env.example .env

# Otwórz .env i wklej swój klucz:
# OPENAI_API_KEY=sk-proj-twoj-klucz-tutaj
```

**Krok 3 — Uruchomienie**
```bash
npm start
```

Następnie otwórz plik **`index.html`** w przeglądarce. Serwer API działa na `http://localhost:3001`.

### 💡 Jak to działa?

1. Wybierz szablon świata (np. Cyberpunk City, Enchanted Forest)
2. Opcjonalnie wgraj do 4 zdjęć referencyjnych
3. Dostosuj opis tekstowy
4. Kliknij **"Generate 360° World"**
5. Poczekaj ~20-35 sekund
6. Eksploruj wygenerowany świat w przeglądarce 360°!

### 🌐 Strona projektu

**[aievolutionpolska.pl](https://aievolutionpolska.pl)**

---

## 🤖 O AI Evolution Polska

**VirtualWorld 360** to projekt stworzony przez **AI Evolution Polska** — polskie studio innowacji AI budujące narzędzia, platformy i doświadczenia kreatywne nowej generacji.

<div align="center">

🌐 [aievolutionpolska.pl](https://aievolutionpolska.pl) · 
💼 [github.com/aievolutionpl](https://github.com/aievolutionpl)

---

*Stworzony z ❤️ w Polsce przez AI Evolution Polska · Licencja MIT*

</div>
