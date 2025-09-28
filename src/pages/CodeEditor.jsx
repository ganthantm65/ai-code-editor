import React, { useState } from 'react'
import "../index.css"
import { CodeSquare, Play, Sun, Moon } from 'lucide-react'

function CodeEditor() {
    const code_example = {
        python: { code: `print("Hello World")`, file: "main.py" },
        java: { code: `public class Main{\n    public static void main(String[] args){\n        System.out.println("Hello World");\n    }\n}`, file: "Main.java" },
        cpp: { code: `#include <iostream>\nint main(){\n    std::cout << "Hello World";\n    return 0;\n}`, file: "main.cpp" },
        js: { code: `console.log("Hello World")`, file: "main.js" }
    }

    const [language, setLanguage] = useState("python")
    const [output, setOutput] = useState("")
    const [code, setCode] = useState(code_example[language].code || "")
    const [theme, setTheme] = useState("dark")
    const [loading, setLoading] = useState(false)

    const updateOutput = (newOutput) => setOutput(newOutput || "")
    const updateCode = (e) => setCode(e.target.value)
    const updateLanguage = (e) => {
        const lang = e.target.value
        setLanguage(lang)
        setCode(code_example[lang]?.code || "")
        setOutput("")
    }
    const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark")

    const runCode = async () => {
        setLoading(true)
        setOutput("")
        const url = `http://localhost:8080/code/run?language=${language}`
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ code: code })
            })
            const data = await response.json()
            updateOutput(data.output)
        } catch (err) {
            updateOutput("Error running code!")
        } finally {
            setLoading(false)
        }
    }

    const themeClasses = theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
    const editorBg = theme === "dark" ? "bg-gray-900" : "bg-gray-200"
    const panelBg = theme === "dark" ? "bg-gray-800" : "bg-gray-300"
    const selectBg = theme === "dark" ? "bg-gray-700 text-white" : "bg-gray-200 text-gray-900"

    return (
        <div className={`w-screen h-screen flex flex-col gap-2 pt-0 font-poppins ${themeClasses}`}>
            <div className={`w-full h-15 ${panelBg} flex items-center justify-between px-4`}>
                <h1 className='text-2xl font-bold flex items-center gap-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-blue-500'>
                    <CodeSquare size={25} className="text-blue-500" />
                    <span>CodoMeter</span>
                </h1>
                <div className='flex gap-2 items-center'>
                    <button onClick={toggleTheme} className='bg-yellow-500 p-2 rounded-md hover:bg-yellow-600'>
                        {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
                    </button>
                    <button
                        className='bg-green-600 px-4 py-2 cursor-pointer rounded-md hover:bg-green-700 flex items-center gap-2'
                        onClick={runCode}
                        disabled={loading}
                    >
                        {loading ? (
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        ) : (
                            <Play size={20} />
                        )}
                        <span className='font-bold'>{loading ? "Running..." : "Run"}</span>
                    </button>
                </div>
            </div>
            <div className='w-full h-[90vh] flex flex-row items-center justify-center gap-2'>
                <div className={`w-[805px] h-full ${panelBg} rounded-md p-4`}>
                    <div className='w-full h-10 flex flex-row items-center justify-between'>
                        <h1 className='font-bold'>{code_example[language]?.file || ""}</h1>
                        <div className={`w-40 h-8 ${selectBg} rounded-md flex items-center justify-center`}>
                            <select
                                className='w-full h-full bg-gray-700 rounded-lg pl-2 outline-none'
                                onChange={updateLanguage}
                                value={language}
                            >
                                <option value="python" className='font-poppins'>Python</option>
                                <option value="java" className='font-poppins'>Java</option>
                                <option value="cpp" className='font-poppins'>C++</option>
                                <option value="js" className='font-poppins'>Node js</option>
                            </select>
                        </div>
                    </div>
                    <div className={`w-full h-[92%] ${editorBg} rounded-lg mt-4 p-4 font-mono text-sm overflow-auto`}>
                        <textarea
                            value={code || ""}
                            onChange={updateCode}
                            className='w-full h-full bg-transparent outline-none resize-none'
                            spellCheck="false"
                        />
                    </div>
                </div>
                <div className={`w-[805px] h-full ${panelBg} rounded-md p-4 flex flex-col gap-5`}>
                    <h1 className='font-bold text-2xl'>Output:</h1>
                    <textarea
                        value={output || ""}
                        className={`w-full h-[92%] ${editorBg} rounded-lg p-4 font-mono text-sm outline-none resize-none`}
                        spellCheck="false"
                        readOnly
                    />
                </div>
            </div>
        </div>
    )
}

export default CodeEditor
