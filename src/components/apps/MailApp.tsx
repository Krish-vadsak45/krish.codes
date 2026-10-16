import React, { useState } from "react";
import { WindowFrame } from "../desktop/WindowFrame";
import { 
  Send, 
  Mail, 
  CheckCircle2, 
  Github, 
  Linkedin 
} from "lucide-react";

export const MailApp: React.FC = React.memo(() => {
  const [senderName, setSenderName] = useState("");
  const [senderEmail, setSenderEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isSent, setIsSent] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderEmail || !message) {
      alert("Please enter your email and a message!");
      return;
    }

    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      setIsSent(true);
    }, 1000);
  };

  return (
    <WindowFrame id="mail">
      <div className="flex-1 flex flex-col bg-neutral-950/80 text-xs">
        {/* Mail Toolbar */}
        <div className="h-10 bg-neutral-900/60 border-b border-white/10 px-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-sky-400" />
            <span className="font-semibold text-white">New Message</span>
          </div>

          <button
            onClick={handleSubmit}
            disabled={isSending || isSent}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm active:scale-95 cursor-pointer ${
              isSent
                ? "bg-emerald-600 text-white shadow-emerald-600/30"
                : "bg-blue-600 hover:bg-blue-500 text-white shadow-blue-600/30"
            }`}
          >
            {isSent ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Message Sent!</span>
              </>
            ) : isSending ? (
              <span>Sending...</span>
            ) : (
              <>
                <Send className="w-3.5 h-3.5" />
                <span>Send</span>
              </>
            )}
          </button>
        </div>

        {/* Form Body */}
        {isSent ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/40 shadow-lg shadow-emerald-500/20">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-base font-bold text-white">Thanks for reaching out!</h3>
            <p className="text-neutral-200 max-w-sm text-xs leading-relaxed">
              Your message has been received. I'll get back to you as soon as possible.
            </p>
            <button
              onClick={() => {
                setIsSent(false);
                setMessage("");
                setSubject("");
              }}
              className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-all shadow-lg shadow-blue-600/30 active:scale-95 text-xs cursor-pointer"
            >
              Compose Another Message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex-1 flex flex-col p-4 space-y-3">
            {/* Header inputs */}
            <div className="space-y-2 sm:space-y-2.5 border-b border-white/10 pb-3">
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                <span className="text-neutral-300 font-medium w-16 sm:w-20 flex-shrink-0">To:</span>
                <span className="font-semibold text-blue-300 bg-blue-500/15 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md border border-blue-500/30 font-mono text-[10px] sm:text-[11px] truncate inline-block">
                  Krish Vadsak &lt;krish.vadsak45@gmail.com&gt;
                </span>
              </div>

              <div className="flex items-center gap-2 sm:gap-3">
                <span className="text-neutral-300 font-medium w-16 sm:w-20 flex-shrink-0">Name:</span>
                <input
                  type="text"
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  placeholder="e.g. Alex Tech Lead"
                  className="flex-1 bg-transparent border-none text-white focus:outline-none placeholder-neutral-400 font-medium text-xs"
                />
              </div>

              <div className="flex items-center gap-2 sm:gap-3">
                <span className="text-neutral-300 font-medium w-16 sm:w-20 flex-shrink-0">Email:</span>
                <input
                  type="email"
                  value={senderEmail}
                  onChange={(e) => setSenderEmail(e.target.value)}
                  placeholder="e.g. alex@company.com"
                  required
                  className="flex-1 bg-transparent border-none text-white focus:outline-none placeholder-neutral-400 font-medium text-xs"
                />
              </div>

              <div className="flex items-center gap-2 sm:gap-3">
                <span className="text-neutral-300 font-medium w-16 sm:w-20 flex-shrink-0">Subject:</span>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="e.g. Collaboration / Hiring"
                  className="flex-1 bg-transparent border-none text-white focus:outline-none placeholder-neutral-400 font-medium text-xs"
                />
              </div>
            </div>

            {/* Message Body */}
            <div className="flex-1 flex flex-col">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Hi Krish, I saw your portfolio and would love to chat about..."
                required
                className="flex-1 w-full bg-transparent border-none text-neutral-100 focus:outline-none resize-none p-1 placeholder-neutral-400 leading-relaxed font-sans text-xs min-h-[100px]"
              />
            </div>

            {/* Social Links Footer */}
            <div className="pt-2 border-t border-white/10 flex flex-col sm:flex-row gap-2 sm:gap-0 items-start sm:items-center justify-between text-neutral-400 text-[10px] sm:text-[11px]">
              <span className="truncate">Direct: krish.vadsak45@gmail.com</span>
              <div className="flex items-center space-x-3">
                <a
                  href="https://github.com/Krish-vadsak45"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                </a>
                <a
                  href="https://www.linkedin.com/in/krish-vadsak45"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1"
                >
                  <Linkedin className="w-3.5 h-3.5" />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>
          </form>
        )}
      </div>
    </WindowFrame>
  );
});
