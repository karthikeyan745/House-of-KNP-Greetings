# House of KNP Greetings

An elegant, premium dark-green themed multilingual greetings web application presented by **House of KNP**. The website delivers a visually stunning, responsive greeting card interface supporting multiple languages with zero layout distortion.

---

## ✨ Features

* **Premium Theme:** Modern forest-green background gradients with gold accent highlights and glowing aura light effects.
* **House of KNP Branding:** Clean, high-contrast transparent logo integration aligned to the top-left of the viewport.
* **Multilingual Selector:** Seamlessly switch greeting card languages from the dropdown in the top-right:
  * English
  * தமிழ் (Tamil)
  * తెలుగు (Telugu)
  * Malayalam (മലയാളம்)
* **Adaptive Card Container:** Custom responsive resizing system that reads raw image ratios on load and dynamically scales the container, preventing blank spaces, cropping, or distortion.
* **Large Monitor Legibility:** Optimized desktop layout utilizing 70% to 80% viewport height bounds for clear card readability.
* **Scrollbar-Free Viewport:** Fits perfectly on both mobile screens and high-resolution desktop viewports.

---

## 🛠️ Tech Stack

* **Core Structure:** Semantic HTML5
* **Styling & Theme:** Vanilla CSS3 (Custom Variables, Flexbox, Transitions)
* **Logic & Sizing:** Native Vanilla JavaScript (ES6)
* **Bundler & Dev Server:** Vite

---

## 🚀 Running Locally

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed.

### 1. Install Dependencies
Navigate to your project root folder and run:
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
Open the local address (usually `http://localhost:5173/` or `http://localhost:5174/`) in your browser to view the site.

### 3. Build for Production
To bundle the project for hosting:
```bash
npm run build
```
The compiled assets will be built into the `dist/` directory.
