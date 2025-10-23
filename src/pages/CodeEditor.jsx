import React, { useState, useEffect } from "react";
import { Code2, Play, Sun, Moon, Trash2, ChevronDown, Terminal } from "lucide-react";

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
  const [language, setLanguage] = useState("python");
  const [output, setOutput] = useState("");
  const [code, setCode] = useState(code_example[language].code || "");
  const [theme, setTheme] = useState("light");
  const [loading, setLoading] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const updateOutput = (newOutput) => setOutput(newOutput || "");
  const updateCode = (e) => setCode(e.target.value);
  const updateLanguage = (lang) => {
    setLanguage(lang);
    setCode(code_example[lang]?.code || "");
    setOutput("");
    setDropdownOpen(false);
  };

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

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

  useEffect(() => {
    const handleKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") runCode();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [code, language]);

  const themeClasses =
    theme === "dark" 
      ? "bg-[#0d1117] text-gray-100" 
      : "bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 text-gray-900";
  
  const headerBg = theme === "dark" 
    ? "bg-[#161b22] border-b border-[#30363d]" 
    : "bg-white/90 backdrop-blur-xl border-b border-gray-200";
  
  const editorBg = theme === "dark" 
    ? "bg-[#0d1117]" 
    : "bg-white";
  
  const panelBg = theme === "dark" 
    ? "bg-[#161b22]" 
    : "bg-white";
  
  const dropdownBg = theme === "dark" 
    ? "bg-[#1c2128] border-[#30363d]" 
    : "bg-white border-gray-200";

  const languageColors = {
    python: theme === "dark" ? "from-blue-500 to-cyan-500" : "from-blue-600 to-cyan-600",
    java: theme === "dark" ? "from-cyan-500 to-blue-500" : "from-cyan-600 to-blue-600",
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
            <h1 className="text-xl font-semibold tracking-tight">CodoMeter</h1>
            <p className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
              Professional Code Editor
            </p>
          </div>
        </div>
        
        <div className="flex gap-3 items-center">
          <button 
            onClick={toggleTheme} 
            className={`p-2.5 rounded-lg transition-all ${
              theme === "dark" 
                ? "bg-[#21262d] hover:bg-[#30363d] text-gray-300" 
                : "bg-gray-100 hover:bg-gray-200 text-gray-700"
            }`}
          >
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          
          <button
            className={`px-5 py-2.5 rounded-lg font-medium flex items-center gap-2 transition-all ${
              loading 
                ? "opacity-50 cursor-not-allowed" 
                : "hover:scale-[1.02] active:scale-[0.98]"
            } ${
              theme === "dark"
                ? "bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white shadow-lg shadow-emerald-900/50"
                : "bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white shadow-lg shadow-emerald-500/30"
            }`}
            onClick={runCode}
            disabled={loading}
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <Play size={18} fill="currentColor" />
            )}
            <span className="text-sm">{loading ? "Running..." : "Run Code"}</span>
            {!loading && (
              <kbd className={`ml-1 px-1.5 py-0.5 rounded text-xs font-mono ${
                theme === "dark" ? "bg-white/10" : "bg-black/10"
              }`}>
                ⌘↵
              </kbd>
            )}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex gap-4 p-4 overflow-hidden">
        {/* Code Editor Panel */}
        <div className={`flex-1 ${panelBg} rounded-xl shadow-lg flex flex-col overflow-hidden ${
          theme === "dark" 
            ? "border border-[#30363d]" 
            : "border border-gray-200"
        }`}>
          {/* Editor Header */}
          <div className={`flex items-center justify-between px-4 py-3 border-b ${
            theme === "dark" ? "border-[#30363d] bg-[#0d1117]" : "border-gray-200 bg-gray-50"
          }`}>
            <div className="flex items-center gap-2">
              <Code2 size={18} className={theme === "dark" ? "text-gray-400" : "text-gray-600"} />
              <span className={`text-sm font-medium ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                {code_example[language]?.file || ""}
              </span>
            </div>
            
            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-sm font-medium transition-all ${dropdownBg} ${
                  theme === "dark"
                    ? "hover:bg-[#21262d] text-gray-200"
                    : "hover:bg-gray-50 text-gray-700"
                }`}
              >
                <span className="text-base">
                  {language === "python" && "🐍"}
                  {language === "java" && "☕"}
                  {language === "cpp" && "⚙️"}
                  {language === "js" && "⚡"}
                </span>
                <span>
                  {language === "python" && "Python"}
                  {language === "java" && "Java"}
                  {language === "cpp" && "C++"}
                  {language === "js" && "Node.js"}
                </span>
                <ChevronDown size={16} className={`transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
              </button>
              
              {dropdownOpen && (
                <div className={`absolute right-0 mt-2 w-48 rounded-lg shadow-xl border overflow-hidden z-10 ${dropdownBg} ${
                  theme === "dark" ? "shadow-black/50" : "shadow-gray-300"
                }`}>
                  {[
                    { key: "python", icon: "🐍", name: "Python" },
                    { key: "java", icon: "☕", name: "Java" },
                    { key: "cpp", icon: "⚙️", name: "C++" },
                    { key: "js", icon: "⚡", name: "Node.js" },
                  ].map((lang, idx) => (
                    <button
                      key={lang.key}
                      onClick={() => updateLanguage(lang.key)}
                      className={`w-full px-4 py-2.5 text-left flex items-center gap-3 text-sm transition-colors ${
                        language === lang.key
                          ? theme === "dark"
                            ? "bg-blue-600 text-white"
                            : "bg-blue-500 text-white"
                          : theme === "dark"
                          ? "hover:bg-[#21262d] text-gray-200"
                          : "hover:bg-gray-100 text-gray-700"
                      }`}
                    >
                      <span className="text-lg">{lang.icon}</span>
                      <span className="font-medium">{lang.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          {/* Code Editor */}
          <textarea
            value={code || ""}
            onChange={updateCode}
            placeholder="// Start coding..."
            className={`flex-1 ${editorBg} p-6 font-mono text-sm leading-relaxed outline-none resize-none ${
              theme === "dark" 
                ? "text-gray-100 placeholder-gray-600" 
                : "text-gray-900 placeholder-gray-400"
            }`}
            spellCheck="false"
          />
        </div>

        {/* Output Panel */}
        <div className={`flex-1 ${panelBg} rounded-xl shadow-lg flex flex-col overflow-hidden ${
          theme === "dark" 
            ? "border border-[#30363d]" 
            : "border border-gray-200"
        }`}>
          {/* Output Header */}
          <div className={`flex items-center justify-between px-4 py-3 border-b ${
            theme === "dark" ? "border-[#30363d] bg-[#0d1117]" : "border-gray-200 bg-gray-50"
          }`}>
            <div className="flex items-center gap-2">
              <Terminal size={18} className={theme === "dark" ? "text-gray-400" : "text-gray-600"} />
              <span className={`text-sm font-medium ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                Console Output
              </span>
            </div>
            
            <button 
              onClick={clearOutput} 
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                theme === "dark"
                  ? "text-red-400 hover:bg-red-500/10 hover:text-red-300"
                  : "text-red-500 hover:bg-red-50 hover:text-red-600"
              }`}
            >
              <Trash2 size={16} />
              <span>Clear</span>
            </button>
          </div>
          <div className={`flex-1 ${editorBg} p-6 overflow-auto`}>
            {output ? (
              <pre className={`font-mono text-sm leading-relaxed whitespace-pre-wrap ${
                theme === "dark" ? "text-emerald-400" : "text-gray-900"
              }`}>{output}</pre>
            ) : (
              <div className={`flex flex-col items-center justify-center h-full ${
                theme === "dark" ? "text-gray-600" : "text-gray-400"
              }`}>
                <Terminal size={48} className="mb-3 opacity-50" />
                <p className="text-sm font-medium">No output yet</p>
                <p className="text-xs mt-1">Run your code to see results here</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className={`h-8 ${headerBg} flex items-center justify-between px-6 text-xs ${
        theme === "dark" ? "text-gray-400" : "text-gray-600"
      }`}>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${loading ? "bg-yellow-500 animate-pulse" : "bg-green-500"}`} />
            <span>{loading ? "Running" : "Ready"}</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span>UTF-8</span>
          <span>•</span>
          <span className="font-medium">{language.toUpperCase()}</span>
        </div>
      </div>
    </div>
  );
}

export default CodeEditor;