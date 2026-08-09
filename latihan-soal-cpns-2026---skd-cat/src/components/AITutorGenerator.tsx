import React, { useState, useEffect } from 'react';
import { Question, QuestionCategory, ChatMessage } from '../types';
import { SUBTOPIC_LIST } from '../data/cpnsQuestions';
import { 
  Sparkles, 
  Send, 
  PlusCircle, 
  Loader2, 
  MessageSquare, 
  Bot, 
  User, 
  CheckCircle2, 
  Zap, 
  HelpCircle,
  Play
} from 'lucide-react';

interface AITutorGeneratorProps {
  onAddGeneratedQuestions: (questions: Question[]) => void;
  initialQuestionToExplain?: { question: Question; userAns?: string };
}

export const AITutorGenerator: React.FC<AITutorGeneratorProps> = ({
  onAddGeneratedQuestions,
  initialQuestionToExplain,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'chat' | 'generator'>('chat');

  // Chat State
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-0',
      sender: 'ai',
      text: 'Halo Pejuang ASN! Saya adalah **Coach CPNS AI**. Siap membantu Anda memahami kisi-kisi resmi MenPAN-RB & BKN, rumus cepat TIU, jembatan keledai TWK, hingga trik nilai 5 pada TKP. Ada materi atau soal yang ingin didiskusikan?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      suggestedQuestions: [
        'Bagaimana rumus cepat mengerjakan deret angka bertingkat?',
        'Trik skor 5 TKP Pelayanan Publik & Professionalisme?',
        'Rangkuman pasal-pasal UUD 1945 yang sering keluar SKD',
        'Strategi manajemen waktu 100 menit untuk 110 soal CAT',
      ],
    },
  ]);

  const [inputMessage, setInputMessage] = useState<string>('');
  const [isChatLoading, setIsChatLoading] = useState<boolean>(false);

  // Generator State
  const [genCategory, setGenCategory] = useState<QuestionCategory>('TWK');
  const [genSubtopic, setGenSubtopic] = useState<string>('Pancasila & Lambang Negara');
  const [genCount, setGenCount] = useState<number>(3);
  const [genDifficulty, setGenDifficulty] = useState<'Mudah' | 'Sedang' | 'HOTS'>('HOTS');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generatedQuestionsList, setGeneratedQuestionsList] = useState<Question[]>([]);
  const [genUserAnswers, setGenUserAnswers] = useState<Record<string, 'A' | 'B' | 'C' | 'D' | 'E'>>({});

  // Auto-fill chat if triggered from question review
  useEffect(() => {
    if (initialQuestionToExplain) {
      const q = initialQuestionToExplain.question;
      const userAns = initialQuestionToExplain.userAns;
      const promptText = `Tolong jelaskan secara rinci soal CPNS Kategori ${q.category} (${q.subCategory}) berikut ini:

Soal: "${q.question}"
Kunci/Jawaban: ${q.correctAnswer || 'Sesuai Bobot TKP'}
${userAns ? `Jawaban saya sebelumnya: ${userAns}` : ''}

Bagaimana trik cepat dan penjelasan solutifnya?`;

      handleSendMessage(promptText);
    }
  }, [initialQuestionToExplain]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || inputMessage;
    if (!query.trim() || isChatLoading) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setIsChatLoading(true);

    try {
      const response = await fetch('/api/gemini/tutor-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: messages,
          userQuestion: query,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Gagal merespons');
      }

      const aiMsg: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: 'ai',
        text: data.reply || 'Maaf, Coach AI tidak dapat memproses pertanyaan saat ini.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err: any) {
      console.error(err);
      const errorMsg: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: 'ai',
        text: `⚠️ Maaf, terjadi kendala koneksi AI: ${err?.message || 'Gagal menghubungi server'}. Silakan coba kembali.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsChatLoading(false);
    }
  };

  const handleGenerateCustomQuestions = async () => {
    setIsGenerating(true);
    setGeneratedQuestionsList([]);
    setGenUserAnswers({});

    try {
      const response = await fetch('/api/gemini/generate-questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          category: genCategory,
          subCategory: genSubtopic,
          count: genCount,
          difficulty: genDifficulty,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Gagal membuat soal');
      }

      if (Array.isArray(data.questions) && data.questions.length > 0) {
        setGeneratedQuestionsList(data.questions);
      } else {
        throw new Error('Format soal yang dihasilkan tidak valid');
      }
    } catch (err: any) {
      console.error(err);
      alert(`Gagal membuat soal: ${err?.message || 'Terjadi kesalahan server'}`);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSaveToBank = () => {
    if (generatedQuestionsList.length > 0) {
      onAddGeneratedQuestions(generatedQuestionsList);
      alert(`Berhasil menyimpan ${generatedQuestionsList.length} soal baru ke Bank Soal Utama!`);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Tab Switcher */}
      <div className="flex items-center justify-between bg-slate-900 border border-slate-800 rounded-2xl p-2">
        <button
          onClick={() => setActiveSubTab('chat')}
          className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
            activeSubTab === 'chat'
              ? 'bg-amber-500 text-slate-950 shadow-md'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>Tanya Coach AI CPNS</span>
        </button>

        <button
          onClick={() => setActiveSubTab('generator')}
          className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
            activeSubTab === 'generator'
              ? 'bg-amber-500 text-slate-950 shadow-md'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <PlusCircle className="w-4 h-4" />
          <span>AI Generator Soal HOTS</span>
        </button>
      </div>

      {/* Content Area 1: Chat Assistant */}
      {activeSubTab === 'chat' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-xl overflow-hidden flex flex-col h-[650px]">
          {/* Chat Header */}
          <div className="bg-slate-950 p-4 border-b border-slate-800 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-white text-sm flex items-center gap-2">
                <span>Coach CPNS Master AI</span>
                <span className="text-[10px] font-black px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300">
                  ONLINE
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                Konsultan Akademik Resmi Persiapan SKD CPNS 2026
              </p>
            </div>
          </div>

          {/* Messages Scroll Area */}
          <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-3 max-w-3xl ${
                  m.sender === 'user' ? 'ml-auto flex-row-reverse' : ''
                }`}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${
                  m.sender === 'user' ? 'bg-teal-500 text-slate-950' : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                }`}>
                  {m.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                <div className="space-y-2">
                  <div className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-teal-600 text-slate-950 font-medium rounded-tr-none'
                      : 'bg-slate-950 border border-slate-800 text-slate-200 rounded-tl-none'
                  }`}>
                    <p className="whitespace-pre-wrap">{m.text}</p>
                  </div>

                  {/* Preset Suggestions */}
                  {m.suggestedQuestions && m.suggestedQuestions.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-2">
                      {m.suggestedQuestions.map((sq, i) => (
                        <button
                          key={i}
                          onClick={() => handleSendMessage(sq)}
                          className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-teal-300 border border-slate-700 text-xs font-medium text-left transition-all"
                        >
                          ✨ {sq}
                        </button>
                      ))}
                    </div>
                  )}

                  <span className="text-[10px] text-slate-500 block px-1">
                    {m.timestamp}
                  </span>
                </div>
              </div>
            ))}

            {isChatLoading && (
              <div className="flex items-center gap-2 text-xs text-amber-400 bg-slate-950 p-3 rounded-xl border border-slate-800 w-fit">
                <Loader2 className="w-4 h-4 animate-spin text-amber-400" />
                <span>Coach CPNS sedang berpikir & menyusun penjelasan...</span>
              </div>
            )}
          </div>

          {/* Chat Input Bar */}
          <div className="p-3 sm:p-4 bg-slate-950 border-t border-slate-800 flex items-center gap-2">
            <input
              type="text"
              placeholder="Ketik pertanyaan materi CPNS, rumus cepat TIU, atau soal yang kurang dipahami..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              disabled={isChatLoading}
              className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500"
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={!inputMessage.trim() || isChatLoading}
              className="p-3 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl disabled:opacity-40 font-bold transition-all shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Content Area 2: AI Question Generator */}
      {activeSubTab === 'generator' && (
        <div className="space-y-6">
          {/* Generator Config Form */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl">
            <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center font-bold">
                <PlusCircle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-white text-base">Buat Soal Latihan Baru dengan AI</h3>
                <p className="text-xs text-slate-400">Generasi otomatis soal-soal HOTS BKN berdasarkan topik pilihan Anda</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              {/* Category selector */}
              <div className="space-y-1.5">
                <label className="font-bold text-slate-300">Kategori Ujian:</label>
                <select
                  value={genCategory}
                  onChange={(e) => {
                    const cat = e.target.value as QuestionCategory;
                    setGenCategory(cat);
                    setGenSubtopic(SUBTOPIC_LIST[cat][0]);
                  }}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200 font-semibold focus:outline-none focus:border-amber-500"
                >
                  <option value="TWK">TWK (Tes Wawasan Kebangsaan)</option>
                  <option value="TIU">TIU (Tes Intelegensi Umum)</option>
                  <option value="TKP">TKP (Tes Karakteristik Pribadi)</option>
                </select>
              </div>

              {/* Subtopic selector */}
              <div className="space-y-1.5">
                <label className="font-bold text-slate-300">Subtopik / Materi:</label>
                <select
                  value={genSubtopic}
                  onChange={(e) => setGenSubtopic(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200 font-semibold focus:outline-none focus:border-amber-500"
                >
                  {SUBTOPIC_LIST[genCategory].map((sub) => (
                    <option key={sub} value={sub}>{sub}</option>
                  ))}
                </select>
              </div>

              {/* Difficulty & Count */}
              <div className="space-y-1.5">
                <label className="font-bold text-slate-300">Tingkat Kesulitan & Jumlah:</label>
                <div className="flex gap-2">
                  <select
                    value={genDifficulty}
                    onChange={(e) => setGenDifficulty(e.target.value as any)}
                    className="flex-1 bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200 font-semibold focus:outline-none"
                  >
                    <option value="Mudah">Mudah</option>
                    <option value="Sedang">Sedang</option>
                    <option value="HOTS">HOTS BKN</option>
                  </select>

                  <select
                    value={genCount}
                    onChange={(e) => setGenCount(Number(e.target.value))}
                    className="w-20 bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200 font-semibold focus:outline-none"
                  >
                    <option value={3}>3 Soal</option>
                    <option value={5}>5 Soal</option>
                    <option value={10}>10 Soal</option>
                  </select>
                </div>
              </div>
            </div>

            <button
              onClick={handleGenerateCustomQuestions}
              disabled={isGenerating}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Gemini AI Sedang Membuat Soal HOTS CPNS...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Generasi Soal Baru Sekarang</span>
                </>
              )}
            </button>
          </div>

          {/* Generated Questions Interactive Area */}
          {generatedQuestionsList.length > 0 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-white text-base flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  <span>Hasil Generasi AI ({generatedQuestionsList.length} Soal)</span>
                </h3>

                <button
                  onClick={handleSaveToBank}
                  className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-slate-950 font-bold text-xs shadow-md"
                >
                  Simpan ke Bank Soal
                </button>
              </div>

              <div className="space-y-4">
                {generatedQuestionsList.map((q, idx) => (
                  <div key={q.id || idx} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-md">
                    <div className="flex items-center gap-2 text-xs">
                      <span className="font-bold text-amber-400">Soal AI #{idx + 1}</span>
                      <span className="px-2 py-0.2 bg-slate-800 text-slate-300 rounded font-semibold">
                        {q.category} - {q.subCategory}
                      </span>
                    </div>

                    <p className="text-slate-100 text-base font-medium">{q.question}</p>

                    <div className="space-y-2">
                      {q.options.map((opt) => {
                        const isSelected = genUserAnswers[q.id || idx] === opt.key;
                        const isCorrect = q.category !== 'TKP' && q.correctAnswer === opt.key;

                        let style = 'bg-slate-950 border-slate-800 text-slate-300';
                        if (isSelected) {
                          style = 'bg-teal-900/40 border-teal-500 text-teal-200';
                        }

                        return (
                          <button
                            key={opt.key}
                            onClick={() => setGenUserAnswers((prev) => ({ ...prev, [q.id || idx]: opt.key }))}
                            className={`w-full p-3 rounded-xl border text-left text-xs sm:text-sm flex items-center justify-between gap-3 ${style}`}
                          >
                            <span><strong>{opt.key}.</strong> {opt.text}</span>
                            {genUserAnswers[q.id || idx] && isCorrect && (
                              <span className="text-emerald-400 font-bold text-xs">KUNCI BENAR</span>
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {genUserAnswers[q.id || idx] && (
                      <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 space-y-2 animate-fadeIn">
                        <div className="font-bold text-teal-300">Pembahasan AI:</div>
                        <p>{q.explanation}</p>
                        {q.quickTrick && (
                          <div className="text-amber-300 font-medium">Trik Cepat: {q.quickTrick}</div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
