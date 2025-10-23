import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Code2, Play, Sun, Moon, Trash2, ChevronDown, Terminal, Sparkles } from "lucide-react";

const code_example = {
  python: { code: `print("Hello World")`, file: "main.py" },
  java: {
    code: `public class Main {
    public static void main(String[] args){
        System.out.println("Hello World");
    }
}`,
    file: "Main.java",
  },
  cpp: {
    code: `#include <iostream>
int main(){
    std::cout << "Hello World";
    return 0;
}`,
    file: "main.cpp",
  },
  js: { code: `console.log("Hello World")`, file: "main.js" },
};

function CodeEditor() {
  const navigate = useNavigate();
  const [language, setLanguage] = useState("python");
  const [output, setOutput] = useState("");
  const [code, setCode] = useState(code_example[language].code || "");
  const [theme, setTheme] = useState("light");
  const [loading, setLoading] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [aiModalOpen, setAiModalOpen] = useState(false);

  const updateOutput = (newOutput) => setOutput(newOutput || "");
  const updateCode = (e) => setCode(e.target.value);
  const updateLanguage = (lang) => {
    setLanguage(lang);
    setCode(code_example[lang]?.code || "");
    setOutput("");
    setDropdownOpen(false);
  };

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  const runCode = async () => {
    setLoading(true);
    setOutput("");
    const url = `http://localhost:8080/code/run?language=${language}`;
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: code }),
      });
      const data = await response.json();
      updateOutput(data.output);
    } catch {
      updateOutput("⚠️ Error running code!");
    } finally {
      setLoading(false);
    }
  };

  const clearOutput = () => setOutput("");

  const handleAiOption = async (option) => {
    setAiModalOpen(false);
    navigate(`/${option}`, { state: { code, language,output, theme } });
  };

  useEffect(() => {
    const handleKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") runCode();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [code, language]);

  const themeClasses = theme === "dark" ? "bg-[#0d1117] text-gray-100" : "bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 text-gray-900";
  const headerBg = theme === "dark" ? "bg-[#161b22] border-b border-[#30363d]" : "bg-white/90 backdrop-blur-xl border-b border-gray-200";
  const editorBg = theme === "dark" ? "bg-[#0d1117]" : "bg-white";
  const panelBg = theme === "dark" ? "bg-[#161b22]" : "bg-white";
  const dropdownBg = theme === "dark" ? "bg-[#1c2128] border-[#30363d]" : "bg-white border-gray-200";
  const languageColors = {
    python: theme === "dark" ? "from-blue-500 to-cyan-500" : "from-blue-600 to-cyan-600",
    java: theme === "dark" ? "from-orange-500 to-red-500" : "from-orange-600 to-red-600",
    cpp: theme === "dark" ? "from-indigo-500 to-purple-500" : "from-indigo-600 to-purple-600",
    js: theme === "dark" ? "from-yellow-500 to-amber-500" : "from-yellow-600 to-amber-600",
  };

  return (
    <div className={`w-screen h-screen flex flex-col ${themeClasses}`}>
      <div className={`w-full h-16 ${headerBg} flex items-center justify-between px-6 shadow-sm`}>
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg bg-gradient-to-br ${languageColors[language]}`}>
            <Code2 size={24} className="text-white" />
          </div>
          <div>
            <h1 className="text-xl font-semibold tracking-tight">CodeRunner</h1>
            <p className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
              Professional Code Editor
            </p>
          </div>
        </div>
        <div className="flex gap-3 items-center">
          <button onClick={toggleTheme} className={`p-2.5 rounded-lg transition-all ${theme === "dark" ? "bg-[#21262d] hover:bg-[#30363d] text-gray-300" : "bg-gray-100 hover:bg-gray-200 text-gray-700"}`}>
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button onClick={() => setAiModalOpen(true)} className="flex items-center gap-2 bg-cyan-500 hover:bg-blue-600 text-white p-2 rounded-lg">
            AI Enhance <Sparkles size={18} />
          </button>
          <button className={`px-5 py-2.5 rounded-lg font-medium flex items-center gap-2 transition-all ${loading ? "opacity-50 cursor-not-allowed" : "hover:scale-[1.02] active:scale-[0.98]"} ${theme === "dark" ? "bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white shadow-lg shadow-emerald-900/50" : "bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white shadow-lg shadow-emerald-500/30"}`} onClick={runCode} disabled={loading}>
            {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Play size={18} fill="currentColor" />}
            <span className="text-sm">{loading ? "Running..." : "Run Code"}</span>
          </button>
        </div>
      </div>

      <div className="flex-1 flex gap-4 p-4 overflow-hidden">
        <div className={`flex-1 ${panelBg} rounded-xl shadow-lg flex flex-col overflow-hidden ${theme === "dark" ? "border border-[#30363d]" : "border border-gray-200"}`}>
          <div className={`flex items-center justify-between px-4 py-3 border-b ${theme === "dark" ? "border-[#30363d] bg-[#0d1117]" : "border-gray-200 bg-gray-50"}`}>
            <div className="flex items-center gap-2">
              <Code2 size={18} className={theme === "dark" ? "text-gray-400" : "text-gray-600"} />
              <span className={`text-sm font-medium ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>{code_example[language]?.file || ""}</span>
            </div>
            <div className="relative">
              <button onClick={() => setDropdownOpen(!dropdownOpen)} className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-sm font-medium transition-all ${dropdownBg} ${theme === "dark" ? "hover:bg-[#21262d] text-gray-200" : "hover:bg-gray-50 text-gray-700"}`}>
                <span className="text-base">{language === "python" ? "🐍" : language === "java" ? "☕" : language === "cpp" ? "⚙️" : "⚡"}</span>
                <span>{language === "python" ? "Python" : language === "java" ? "Java" : language === "cpp" ? "C++" : "Node.js"}</span>
                <ChevronDown size={16} className={`transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
              </button>
              {dropdownOpen && (
                <div className={`absolute right-0 mt-2 w-48 rounded-lg shadow-xl border overflow-hidden z-10 ${dropdownBg} ${theme === "dark" ? "shadow-black/50" : "shadow-gray-300"}`}>
                  {["python","java","cpp","js"].map((lang) => (
                    <button key={lang} onClick={() => updateLanguage(lang)} className={`w-full px-4 py-2.5 text-left flex items-center gap-3 text-sm transition-colors ${language===lang ? "bg-blue-600 text-white" : theme==="dark" ? "hover:bg-[#21262d] text-gray-200" : "hover:bg-gray-100 text-gray-700"}`}>{lang}</button>
                  ))}
                </div>
              )}
            </div>
          </div>
          <textarea value={code || ""} onChange={updateCode} placeholder="// Start coding..." className={`flex-1 ${editorBg} p-6 font-mono text-sm leading-relaxed outline-none resize-none ${theme==="dark"?"text-gray-100 placeholder-gray-600":"text-gray-900 placeholder-gray-400"}`} spellCheck="false"/>
        </div>
        <div className={`flex-1 ${panelBg} rounded-xl shadow-lg flex flex-col overflow-hidden ${theme==="dark"?"border border-[#30363d]":"border border-gray-200"}`}>
          <div className={`flex items-center justify-between px-4 py-3 border-b ${theme==="dark"?"border-[#30363d] bg-[#0d1117]":"border-gray-200 bg-gray-50"}`}>
            <div className="flex items-center gap-2">
              <Terminal size={18} className={theme==="dark"?"text-gray-400":"text-gray-600"}/>
              <span className={`text-sm font-medium ${theme==="dark"?"text-gray-300":"text-gray-700"}`}>Console Output</span>
            </div>
            <button onClick={clearOutput} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${theme==="dark"?"text-red-400 hover:bg-red-500/10 hover:text-red-300":"text-red-500 hover:bg-red-50 hover:text-red-600"}`}>
              <Trash2 size={16}/>Clear
            </button>
          </div>
          <div className={`flex-1 ${editorBg} p-6 overflow-auto`}>
            {output ? <pre className={`font-mono text-sm leading-relaxed whitespace-pre-wrap ${theme==="dark"?"text-emerald-400":"text-gray-900"}`}>{output}</pre> : <div className={`flex flex-col items-center justify-center h-full ${theme==="dark"?"text-gray-600":"text-gray-400"}`}><Terminal size={48} className="mb-3 opacity-50"/><p className="text-sm font-medium">No output yet</p><p className="text-xs mt-1">Run your code to see results here</p></div>}
          </div>
        </div>
      </div>

      {aiModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black opacity-50" onClick={()=>setAiModalOpen(false)}/>
          <div className={`relative z-50 w-80 p-6 rounded-xl ${panelBg} flex flex-col items-center gap-4`}>
            <h2 className="text-lg font-semibold mb-2">AI Actions</h2>
            {["explain","fix","optimize"].map(opt=>(
              <button key={opt} onClick={()=>handleAiOption(opt)} className="w-full py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-medium">{opt.charAt(0).toUpperCase()+opt.slice(1)}</button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default CodeEditor;
