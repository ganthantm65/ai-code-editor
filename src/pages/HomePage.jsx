import React, { useState } from "react";
import { Code2, Zap, Cpu, Rocket, Github, Sun, Moon, Play } from "lucide-react";
import { Link } from "react-router-dom";

function LandingPage() {
  const [theme, setTheme] = useState("light");
  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  const themeClasses =
    theme === "dark"
      ? "bg-[#0d1117] text-gray-100"
      : "bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 text-gray-900";

  const buttonGradient =
    theme === "dark"
      ? "bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white"
      : "bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white";

  const navBg =
    theme === "dark"
      ? "bg-[#161b22] border-b border-[#30363d]"
      : "bg-white/90 backdrop-blur-xl border-b border-gray-200";

  return (
    <div className={`w-screen min-h-screen flex flex-col ${themeClasses}`}>
      <header className={`w-full ${navBg} flex items-center justify-between px-8 py-4 shadow-sm`}>
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-600">
            <Code2 size={24} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">CodoMeter</h1>
        </div>
        <div className="flex gap-5 items-center">
          <a href="#features" className={`text-sm font-medium ${theme === "dark" ? "text-gray-300 hover:text-white" : "text-gray-700 hover:text-black"}`}>Features</a>
          <a href="#ai" className={`text-sm font-medium ${theme === "dark" ? "text-gray-300 hover:text-white" : "text-gray-700 hover:text-black"}`}>AI Power</a>
          <a href="#about" className={`text-sm font-medium ${theme === "dark" ? "text-gray-300 hover:text-white" : "text-gray-700 hover:text-black"}`}>About</a>
          <button onClick={toggleTheme} className={`p-2.5 rounded-lg transition-all ${theme === "dark" ? "bg-[#21262d] hover:bg-[#30363d] text-gray-300" : "bg-gray-100 hover:bg-gray-200 text-gray-700"}`}>
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </header>

      <section className="flex flex-col items-center justify-center flex-1 text-center px-6 py-20">
        <h2 className="text-5xl sm:text-6xl font-bold tracking-tight mb-6">Code Smarter. Build Faster. 🚀</h2>
        <p className={`max-w-2xl mx-auto text-lg ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
          CodoMeter is your AI-powered development companion — run, debug, and optimize your code with real-time insights, syntax support, and AI code fixes.
        </p>
        <div className="flex gap-4 mt-10">
          <Link to="/editor" className={`px-6 py-3 rounded-lg font-medium flex items-center gap-2 ${buttonGradient} shadow-lg`}>
            <Play size={18} />
            Try the Editor
          </Link>
          <a href="https://github.com/" target="_blank" rel="noreferrer" className={`px-6 py-3 rounded-lg font-medium flex items-center gap-2 border ${theme === "dark" ? "border-gray-600 hover:bg-[#21262d]" : "border-gray-300 hover:bg-gray-100"}`}>
            <Github size={18} />
            GitHub
          </a>
        </div>
      </section>

      <section id="features" className={`py-20 border-t ${theme === "dark" ? "border-[#30363d]" : "border-gray-200"}`}>
        <h3 className="text-3xl font-bold text-center mb-12">Editor Features</h3>
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-10 px-6">
          {[
            { icon: <Zap className="text-yellow-400" size={28} />, title: "Instant Execution", desc: "Run Python, Java, C++, and JS code instantly." },
            { icon: <Cpu className="text-blue-400" size={28} />, title: "Syntax Highlighting", desc: "Modern syntax highlighting for all popular languages." },
            { icon: <Rocket className="text-emerald-400" size={28} />, title: "AI Assistance", desc: "Get AI-powered code suggestions and optimizations." },
          ].map((feature, idx) => (
            <div key={idx} className={`flex flex-col items-center text-center p-6 rounded-xl shadow-lg ${theme === "dark" ? "bg-[#161b22]" : "bg-white"}`}>
              {feature.icon}
              <h4 className="mt-4 text-xl font-semibold">{feature.title}</h4>
              <p className={`mt-2 text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="ai" className="py-20 text-center px-6">
        <h3 className="text-3xl font-bold mb-6">AI-Powered Code Optimization</h3>
        <p className={`max-w-2xl mx-auto text-lg ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
          CodoMeter leverages AI to analyze your code, suggest optimizations, detect errors, and improve efficiency in real time.
        </p>
      </section>

      <section id="about" className={`py-20 border-t ${theme === "dark" ? "border-[#30363d]" : "border-gray-200"} text-center px-6`}>
        <h3 className="text-3xl font-bold mb-6">About CodoMeter</h3>
        <p className={`max-w-3xl mx-auto text-lg ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
          CodoMeter is a modern code editor built for developers who want speed, accuracy, and AI-powered intelligence. Write, run, and optimize your code with a smooth and interactive interface.
        </p>
      </section>

      <footer className={`w-full py-8 ${theme === "dark" ? "bg-[#161b22] border-t border-[#30363d]" : "bg-white/90 border-t border-gray-200"} text-center`}>
        <p className={`text-sm ${theme === "dark" ? "text-gray-500" : "text-gray-600"}`}>
          &copy; {new Date().getFullYear()} CodoMeter. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

export default LandingPage;
