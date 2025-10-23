import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { ArrowLeft, Copy } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

function FixPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { code, language, theme: passedTheme, output } = location.state || {};
  const [fixedCode, setFixedCode] = useState("");
  const [loading, setLoading] = useState(true);
  const theme = passedTheme || "dark";

  useEffect(() => {
    if (!code || !language) return;

    const fetchFixedCode = async () => {
      setLoading(true);
      setFixedCode("");
      try {
        const res = await fetch("http://localhost:8080/ai/fix", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ code, language, output }),
        });
        const data = await res.json();
        setFixedCode(data.fixedCode);
      } catch {
        setFixedCode("⚠️ Failed to fix code. Please check your connection or try later.");
      } finally {
        setLoading(false);
      }
    };

    fetchFixedCode();
  }, [code, language, output]);

  const panelBg = theme === "dark" ? "bg-[#161b22]" : "bg-white";
  const textColor = theme === "dark" ? "text-gray-100" : "text-gray-900";
  const bg = theme === "dark"
    ? "bg-[#0d1117]"
    : "bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50";
  const buttonBg = theme === "dark"
    ? "bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white"
    : "bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(fixedCode);
  };

  if (!code || !language) {
    return (
      <div className={`w-screen h-screen flex flex-col items-center justify-center ${bg} ${textColor}`}>
        <p className="text-lg mb-4">No code or language provided.</p>
        <button onClick={() => navigate("/")} className={`px-6 py-2 rounded-lg font-medium ${buttonBg} shadow-lg`}>
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className={`w-screen h-screen flex flex-col ${bg} ${textColor}`}>
      <header className={`w-full h-16 ${theme === "dark" ? "bg-[#161b22] border-b border-[#30363d]" : "bg-white/90 backdrop-blur-xl border-b border-gray-200"} flex items-center px-6`}>
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm font-medium p-2 rounded-lg hover:bg-gray-200/10">
          <ArrowLeft size={18} />
          Back
        </button>
        <h1 className="ml-4 text-xl font-semibold tracking-tight">Fixed Code</h1>
      </header>

      <main className="flex-1 p-6 overflow-auto">
        {loading ? (
          <div className="flex items-center justify-center h-full text-sm font-medium">Loading AI fixed code...</div>
        ) : (
          <div className={`p-6 rounded-xl ${panelBg} shadow-lg overflow-auto text-sm leading-relaxed`}>
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl font-bold">Fixed Code</h1>
              <button
                onClick={copyToClipboard}
                className="flex items-center gap-1 px-3 py-1 rounded-md bg-gray-700 text-white hover:bg-gray-600 text-sm"
              >
                <Copy size={16} />
                Copy
              </button>
            </div>
            <ReactMarkdown
              children={fixedCode}
              remarkPlugins={[remarkGfm]}
              components={{
                h1: ({ node, ...props }) => <h1 className="text-3xl font-extrabold mt-6 mb-4 border-b border-gray-500/30 pb-2" {...props} />,
                h2: ({ node, ...props }) => <h2 className="text-2xl font-bold mt-5 mb-3 text-emerald-500" {...props} />,
                h3: ({ node, ...props }) => <h3 className="text-xl font-semibold mt-4 mb-2 text-cyan-400" {...props} />,
                p: ({ node, ...props }) => <p className="text-base my-2 leading-relaxed" {...props} />,
                code: ({ node, inline, className, children, ...props }) =>
                  inline ? (
                    <code className={`bg-gray-700 text-emerald-400 px-1 py-0.5 rounded font-mono text-sm`} {...props}>
                      {children}
                    </code>
                  ) : (
                    <pre className={`${theme === "dark" ? "bg-gray-900" : "bg-gray-100"} text-green-600 p-4 rounded my-3 overflow-auto font-mono text-sm`} {...props}>
                      <code>{children}</code>
                    </pre>
                  ),
                blockquote: ({ node, ...props }) => (
                  <blockquote className="border-l-4 border-yellow-400 pl-4 italic text-yellow-200 my-2" {...props} />
                ),
                a: ({ node, ...props }) => <a className="text-cyan-400 hover:underline" {...props} />,
              }}
            />
          </div>
        )}
      </main>
    </div>
  );
}

export default FixPage;
