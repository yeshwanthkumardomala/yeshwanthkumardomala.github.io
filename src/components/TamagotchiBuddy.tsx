import { useState, useEffect, useRef, useCallback } from 'react';
import { MessageCircle, X } from 'lucide-react';

// Robot expressions
const IDLE_FRAMES = ['🤖', '🔧', '⚡', '🤖', '💡'];
const WALK_FRAMES = ['🤖💨', '⚡🤖', '🤖💨'];
const EMOTIONS = {
  happy: '😊🤖',
  thinking: '🤔🤖',
  wave: '👋🤖',
  love: '❤️🤖',
  cool: '😎🤖',
};

const CHAT_RESPONSES: Record<string, string> = {
  hello: "Hey there! I'm Yesh's IoT buddy. Ask me about his projects! 🤖",
  hi: "Hi! I'm a little robot assistant. How can I help? ⚡",
  projects: "Yesh has built UGV robots, 3D printers, surveillance systems, and more! Check the Projects section 🔧",
  skills: "Yesh knows Arduino, Python, Raspberry Pi, 3D Printing, IoT, and lots more! Check Skills section 💡",
  contact: "You can reach Yesh at domalayeshwanthkumar@gmail.com or scroll to the Contact section! 📧",
  robot: "I'm powered by pure CSS energy and good vibes! Beep boop 🤖⚡",
  help: "Try asking about: projects, skills, contact, or just say hi! I'm here to help navigate 🗺️",
};

const getResponse = (input: string): string => {
  const lower = input.toLowerCase().trim();
  for (const [key, val] of Object.entries(CHAT_RESPONSES)) {
    if (lower.includes(key)) return val;
  }
  return "Beep boop! I'm not sure about that. Try asking about projects, skills, or contact! 🤖";
};

const TamagotchiBuddy = () => {
  const [pos, setPos] = useState({ x: 100, y: 100 });
  const [isMoving, setIsMoving] = useState(false);
  const [frame, setFrame] = useState(0);
  const [emotion, setEmotion] = useState<keyof typeof EMOTIONS | null>(null);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState<Array<{ from: 'user' | 'bot'; text: string }>>([
    { from: 'bot', text: "Hi! I'm Yesh's robot buddy 🤖 Press C anytime to chat! Ask me about projects, skills, or just say hi!" },
  ]);
  const targetRef = useRef({ x: 100, y: 100 });
  const animRef = useRef<number>(0);
  const moveTimerRef = useRef<ReturnType<typeof setTimeout>>();
  const currentPos = useRef({ x: 100, y: 100 });
  const chatEndRef = useRef<HTMLDivElement>(null);

  const animate = useCallback(() => {
    const dx = targetRef.current.x - currentPos.current.x;
    const dy = targetRef.current.y - currentPos.current.y;
    currentPos.current.x += dx * 0.08;
    currentPos.current.y += dy * 0.08;
    setPos({ x: currentPos.current.x, y: currentPos.current.y });
    animRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, [animate]);

  // Mouse tracking
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!chatOpen) {
        targetRef.current = { x: e.clientX + 25, y: e.clientY + 25 };
      }
      setIsMoving(true);
      if (moveTimerRef.current) clearTimeout(moveTimerRef.current);
      moveTimerRef.current = setTimeout(() => setIsMoving(false), 150);
    };
    window.addEventListener('mousemove', onMove);
    return () => {
      window.removeEventListener('mousemove', onMove);
      if (moveTimerRef.current) clearTimeout(moveTimerRef.current);
    };
  }, [chatOpen]);

  // C key toggle
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'c' || e.key === 'C') {
        if (document.activeElement?.tagName === 'INPUT' || document.activeElement?.tagName === 'TEXTAREA') return;
        setChatOpen((prev) => !prev);
      }
      if (e.key === 'Escape') setChatOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Random emotions
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isMoving && !chatOpen) {
        const emotions = Object.keys(EMOTIONS) as Array<keyof typeof EMOTIONS>;
        setEmotion(emotions[Math.floor(Math.random() * emotions.length)]);
        setTimeout(() => setEmotion(null), 2000);
      }
    }, 8000);
    return () => clearInterval(interval);
  }, [isMoving, chatOpen]);

  // Frame cycling
  useEffect(() => {
    const interval = setInterval(() => {
      setFrame((f) => (f + 1) % (isMoving ? WALK_FRAMES.length : IDLE_FRAMES.length));
    }, isMoving ? 150 : 600);
    return () => clearInterval(interval);
  }, [isMoving]);

  // Auto-scroll chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const handleSend = () => {
    if (!chatInput.trim()) return;
    const userMsg = chatInput.trim();
    setChatMessages((prev) => [...prev, { from: 'user', text: userMsg }]);
    setChatInput('');
    setTimeout(() => {
      setChatMessages((prev) => [...prev, { from: 'bot', text: getResponse(userMsg) }]);
    }, 500);
  };

  const face = emotion
    ? EMOTIONS[emotion]
    : isMoving
    ? WALK_FRAMES[frame % WALK_FRAMES.length]
    : IDLE_FRAMES[frame % IDLE_FRAMES.length];

  return (
    <>
      {/* Robot buddy */}
      <div
        className="fixed z-[9998] pointer-events-none select-none hidden md:block"
        style={{
          left: chatOpen ? undefined : pos.x,
          top: chatOpen ? undefined : pos.y,
          right: chatOpen ? '24px' : undefined,
          bottom: chatOpen ? '100px' : undefined,
          transform: chatOpen ? 'none' : 'translate(-50%, -50%)',
          transition: chatOpen ? 'all 0.3s ease' : 'none',
        }}
      >
        <div className={`relative ${isMoving && !chatOpen ? '' : 'animate-pet-bounce'}`}>
          {/* Robot body */}
          <div className="bg-card border-2 border-primary/60 rounded-2xl px-3 py-2 shadow-lg shadow-primary/20 pointer-events-auto cursor-pointer robot-glow"
            onClick={() => setChatOpen(!chatOpen)}
          >
            <span className="text-xl leading-none">{face}</span>
          </div>
          {/* Status bubble */}
          {!isMoving && !chatOpen && (
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-primary/10 border border-primary/30 rounded-lg px-2 py-0.5 animate-fade-in whitespace-nowrap">
              <span className="text-[10px] font-mono text-primary/70">Press C to chat!</span>
            </div>
          )}
        </div>
      </div>

      {/* Chat window */}
      {chatOpen && (
        <div className="fixed z-[9999] bottom-4 right-4 w-80 max-h-[400px] bg-card border border-border rounded-2xl shadow-2xl shadow-primary/10 flex flex-col overflow-hidden animate-in slide-in-from-bottom-4 duration-300 hidden md:flex">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-card">
            <div className="flex items-center gap-2">
              <span className="text-lg">🤖</span>
              <div>
                <p className="text-sm font-mono font-bold text-foreground">Yesh's Robot</p>
                <p className="text-[10px] text-secondary font-mono">● Online</p>
              </div>
            </div>
            <button onClick={() => setChatOpen(false)} className="text-muted-foreground hover:text-foreground transition-colors">
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3 space-y-2 max-h-[260px]">
            {chatMessages.map((msg, i) => (
              <div key={i} className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] px-3 py-2 rounded-xl text-xs ${
                  msg.from === 'user'
                    ? 'bg-primary text-primary-foreground rounded-br-none'
                    : 'bg-muted text-foreground rounded-bl-none'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          {/* Input */}
          <div className="border-t border-border p-2 flex gap-2">
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask about projects..."
              className="flex-1 bg-muted text-foreground text-xs rounded-lg px-3 py-2 outline-none focus:ring-1 focus:ring-primary font-mono placeholder:text-muted-foreground"
            />
            <button
              onClick={handleSend}
              className="bg-primary text-primary-foreground px-3 py-2 rounded-lg text-xs font-mono hover:opacity-90 transition-opacity"
            >
              Send
            </button>
          </div>
        </div>
      )}

      {/* Mobile chat button */}
      <button
        onClick={() => setChatOpen(!chatOpen)}
        className="fixed bottom-4 right-4 z-[9997] md:hidden w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center shadow-lg glow-primary"
      >
        {chatOpen ? <X className="w-5 h-5" /> : <MessageCircle className="w-5 h-5" />}
      </button>

      {/* Mobile chat */}
      {chatOpen && (
        <div className="fixed z-[9999] bottom-20 right-4 left-4 max-h-[350px] bg-card border border-border rounded-2xl shadow-2xl flex flex-col overflow-hidden md:hidden animate-in slide-in-from-bottom-4 duration-300">
          <div className="flex items-center justify-between px-4 py-3 border-b border-border">
            <div className="flex items-center gap-2">
              <span className="text-lg">🤖</span>
              <p className="text-sm font-mono font-bold text-foreground">Yesh's Robot</p>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-3 space-y-2 max-h-[200px]">
            {chatMessages.map((msg, i) => (
              <div key={i} className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] px-3 py-2 rounded-xl text-xs ${
                  msg.from === 'user'
                    ? 'bg-primary text-primary-foreground rounded-br-none'
                    : 'bg-muted text-foreground rounded-bl-none'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>
          <div className="border-t border-border p-2 flex gap-2">
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask about projects..."
              className="flex-1 bg-muted text-foreground text-xs rounded-lg px-3 py-2 outline-none focus:ring-1 focus:ring-primary font-mono placeholder:text-muted-foreground"
            />
            <button onClick={handleSend} className="bg-primary text-primary-foreground px-3 py-2 rounded-lg text-xs font-mono">
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default TamagotchiBuddy;
