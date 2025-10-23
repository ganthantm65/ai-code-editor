# 🖥️ AI Code Editor - React Frontend

A modern **AI-powered code editor** frontend built with **React, Tailwind CSS, and Lucide icons**. Supports **code explanation, fixing, and optimization** using AI, with Markdown-rendered outputs. ✨

## 🚀 Features

* 💡 **AI Code Explanation** – Get detailed explanations for your code snippets.
* 🛠️ **AI Code Fix** – Automatically fix errors or improve existing code.
* ⚡ **AI Code Optimization** – Suggest cleaner and optimized code versions.
* 📝 **Markdown Rendering** – Beautifully rendered explanations with **React Markdown + GFM**.
* 🌙 **Theme Support** – Switch between light and dark modes.
* 🔀 **Navigation** – Seamless routing between editor, explain, fix, and optimize pages.

## 🛠️ Tech Stack

* **React 18** ⚛️
* **Tailwind CSS** 🎨
* **Lucide React** 🖼️
* **React Router DOM** 🔗
* **React Markdown + Remark GFM** 📝
* **Vite** ⚡
* **Node.js & npm** 📦

## 📁 Folder Structure

```
react/
├─ node_modules/
├─ public/
├─ src/
│  ├─ assets/
│  │  └─ fonts/
│  ├─ pages/
│  │  ├─ ExplainPage.jsx
│  │  ├─ FixPage.jsx
│  │  ├─ OptimizePage.jsx
│  └─ App.jsx
├─ package.json
├─ package-lock.json
└─ vite.config.js
```

## ⚡ Installation

1. Clone the repo:

```bash
git clone https://github.com/ganthantm65/ai-code-editor.git
cd ai-code-editor/react
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

Open the app at `http://localhost:5173` 🌐

## 📄 Pages

1. **Editor Page** – ✏️ Write your code and select language.
2. **Explain Page** – 💡 View AI-generated explanations.
3. **Fix Page** – 🛠️ Get AI-generated fixes for errors.
4. **Optimize Page** – ⚡ Get AI-optimized code suggestions.

> Each page receives **code and language** via React Router `state`.

## 🔗 Dependencies

* `react-markdown` 📝
* `remark-gfm` ✅
* `react-router-dom` 🔀
* `lucide-react` 🖼️

## 💡 Notes

* Ensure Node.js 18+ is installed.
* Run `npm audit fix` if there are vulnerabilities. ⚠️
* Tailwind classes are used for responsive design and theme toggling.
