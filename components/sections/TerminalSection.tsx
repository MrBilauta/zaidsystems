"use client";

import { useState, useRef, useEffect } from "react";
import { FadeIn } from "@/components/animations/FadeIn";
import { Terminal } from "lucide-react";

interface CommandOutput {
  command: string;
  output: React.ReactNode;
}

export function TerminalSection() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<CommandOutput[]>([
    {
      command: "welcome",
      output: (
        <div className="text-white/60 mb-4">
          <p className="text-primary font-bold">Zaid Systems (v2.4.0)</p>
          <p>Initializing secure connection to infrastructure...</p>
          <p>Type <span className="text-primary underline">'help'</span> to explore the system.</p>
        </div>
      )
    }
  ]);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    
    if (!cmd) return;

    let output: React.ReactNode = "";

    switch (cmd) {
      case "help":
        output = (
          <div className="grid grid-cols-[120px_1fr] gap-x-4 gap-y-1 text-sm">
            <span className="text-primary font-bold">help</span> <span className="text-white/50">Show this menu</span>
            <span className="text-primary font-bold">about</span> <span className="text-white/50">Engineering profile</span>
            <span className="text-primary font-bold">projects</span> <span className="text-white/50">System showcases</span>
            <span className="text-primary font-bold">github</span> <span className="text-white/50">Open GitHub profile</span>
            <span className="text-primary font-bold">linkedin</span> <span className="text-white/50">Open LinkedIn profile</span>
            <span className="text-primary font-bold">hackerrank</span> <span className="text-white/50">Open HackerRank</span>
            <span className="text-primary font-bold">contact</span> <span className="text-white/50">Inbound protocols</span>
            <span className="text-primary font-bold">clear</span> <span className="text-white/50">Wipe screen buffer</span>
          </div>
        );
        break;
      case "about":
        output = "AI Systems Developer & Automation Engineer. Focused on production-grade infrastructure, LLM orchestration, and high-performance backend systems.";
        break;
      case "projects":
        output = "DEPLOYED SYSTEMS:\n- AI Debate Bot [STABLE]\n- Rust Micropayment API [STABLE]\n- Automation Studio [BETA]\n- E-commerce Analytics [LIVE]\n- Trading Signal System [ALPHA]\n- Enterprise Monitoring [BETA]";
        break;
      case "github":
        output = "OPENING: https://github.com/mrbilauta";
        window.open("https://github.com/mrbilauta", "_blank");
        break;
      case "linkedin":
        output = "OPENING: https://www.linkedin.com/in/khanmohammedzaid";
        window.open("https://www.linkedin.com/in/khanmohammedzaid", "_blank");
        break;
      case "hackerrank":
        output = "OPENING: https://www.hackerrank.com/profile/khanmohammedzaid";
        window.open("https://www.hackerrank.com/profile/khanmohammedzaid", "_blank");
        break;
      case "architecture":
        output = "ROUTING TO: #architecture";
        setTimeout(() => { document.getElementById('architecture')?.scrollIntoView({ behavior: 'smooth' }); }, 500);
        break;
      case "metrics":
        output = "ROUTING TO: #metrics";
        setTimeout(() => { document.getElementById('metrics')?.scrollIntoView({ behavior: 'smooth' }); }, 500);
        break;
      case "contact":
        output = "ENDPOINT: hello@zaidsystems.dev\nGITHUB: https://github.com/mrbilauta\nLINKEDIN: https://www.linkedin.com/in/khanmohammedzaid";
        break;
      case "clear":
        setHistory([]);
        setInput("");
        return;
      default:
        output = <span className="text-destructive">[ERROR] Command not found: {cmd}</span>;
    }

    setHistory((prev) => [...prev, { command: cmd, output }]);
    setInput("");
  };

  return (
    <section id="terminal" className="relative section-padding overflow-hidden">
      <div className="section-container relative z-10">
        <FadeIn>
          <div className="mb-16 text-center flex flex-col items-center">
            <h2>
              System <span className="text-primary">Console</span>
            </h2>
            <p className="mt-6 max-w-2xl text-lg text-muted-foreground/90 md:text-xl text-center">
              A functional terminal interface to interact directly with the systems infrastructure.
            </p>
          </div>

          <div className="mx-auto max-w-4xl rounded-2xl border border-white/10 bg-black/80 backdrop-blur-3xl shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden font-mono text-sm group">
            <div className="flex items-center justify-between border-b border-white/10 bg-white/5 px-4 py-3">
              <div className="flex gap-2">
                <div className="h-3 w-3 rounded-full bg-white/10" />
                <div className="h-3 w-3 rounded-full bg-white/10" />
                <div className="h-3 w-3 rounded-full bg-white/10" />
              </div>
              <div className="text-[10px] text-white/30 uppercase tracking-[0.2em] font-bold">zaid@systems: ~ (zsh)</div>
              <div className="w-12" />
            </div>
            
            <div 
              className="h-[450px] overflow-y-auto p-6 cursor-text custom-scrollbar"
              onClick={() => inputRef.current?.focus()}
            >
              {history.map((item, i) => (
                <div key={i} className="mb-5 animate-in fade-in slide-in-from-left-2 duration-300">
                  <div className="flex gap-3 text-white/80 mb-2">
                    <span className="text-primary font-bold">❯</span>
                    <span className="text-white/40">~</span>
                    <span className="font-bold">{item.command}</span>
                  </div>
                  <div className="text-white/60 whitespace-pre-wrap pl-6 border-l border-white/5">{item.output}</div>
                </div>
              ))}
              
              <form onSubmit={handleCommand} className="flex gap-3 text-white/80">
                <span className="text-primary font-bold">❯</span>
                <span className="text-white/40">~</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="flex-1 bg-transparent outline-none border-none focus:ring-0 p-0 m-0 font-bold"
                  spellCheck={false}
                  autoComplete="off"
                  autoFocus
                />
              </form>
              <div ref={bottomRef} />
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
