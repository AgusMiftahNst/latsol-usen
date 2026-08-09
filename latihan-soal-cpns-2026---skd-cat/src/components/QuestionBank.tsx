import React, { useState } from 'react';
import { Question, QuestionCategory } from '../types';
import { SUBTOPIC_LIST } from '../data/cpnsQuestions';
import { 
  Search, 
  Filter, 
  Bookmark, 
  Sparkles, 
  ChevronDown, 
  ChevronUp, 
  Zap,
  BookOpen,
  FileText
} from 'lucide-react';

interface QuestionBankProps {
  questions: Question[];
  bookmarkedIds: string[];
  onToggleBookmark: (questionId: string) => void;
  onAskAI: (q: Question) => void;
}

export const QuestionBank: React.FC<QuestionBankProps> = ({
  questions,
  bookmarkedIds,
  onToggleBookmark,
  onAskAI,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<QuestionCategory | 'ALL'>('ALL');
  const [selectedSubtopic, setSelectedSubtopic] = useState<string>('ALL');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('ALL');
  const [expandedMap, setExpandedMap] = useState<Record<string, boolean>>({});

  const toggleExpand = (id: string) => {
    setExpandedMap((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredQuestions = questions.filter((q) => {
    if (selectedCategory !== 'ALL' && q.category !== selectedCategory) return false;
    if (selectedSubtopic !== 'ALL' && q.subCategory !== selectedSubtopic) return false;
    if (selectedDifficulty !== 'ALL' && q.difficulty !== selectedDifficulty) return false;
    if (searchTerm.trim() !== '') {
      const term = searchTerm.toLowerCase();
      const matchQ = q.question.toLowerCase().includes(term);
      const matchExp = q.explanation.toLowerCase().includes(term);
      const matchSub = q.subCategory.toLowerCase().includes(term);
      if (!matchQ && !matchExp && !matchSub) return false;
    }
    return true;
  });

  const availableSubtopics = selectedCategory !== 'ALL' ? SUBTOPIC_LIST[selectedCategory] : [];

  return (
    <div className="space-y-6 pb-12">
      {/* Search & Filter Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-lg">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-teal-400" />
            <div>
              <h2 className="font-bold text-white text-base">Bank Soal SPMB & SKD CPNS</h2>
              <p className="text-xs text-slate-400">Pencarian dan eksplorasi ribuan kisi-kisi resmi BKN</p>
            </div>
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari kata kunci (e.g. Pancasila, Silogisme, Silabus)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-teal-500"
            />
          </div>
        </div>

        {/* Category & Difficulty Filters */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-800">
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            {(['ALL', 'TWK', 'TIU', 'TKP'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setSelectedSubtopic('ALL');
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-teal-500 text-slate-950 shadow-sm'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {cat === 'ALL' ? 'Semua Kategori' : cat}
              </button>
            ))}
          </div>

          {/* Difficulty filter */}
          <div className="flex items-center gap-1 text-xs text-slate-400">
            <span>Tingkat:</span>
            {(['ALL', 'Mudah', 'Sedang', 'HOTS'] as const).map((diff) => (
              <button
                key={diff}
                onClick={() => setSelectedDifficulty(diff)}
                className={`px-2 py-1 rounded text-[11px] font-semibold ${
                  selectedDifficulty === diff
                    ? 'bg-slate-700 text-teal-300 border border-teal-500/40'
                    : 'bg-slate-800/60 text-slate-400 hover:text-slate-200'
                }`}
              >
                {diff === 'ALL' ? 'Semua' : diff}
              </button>
            ))}
          </div>
        </div>

        {/* Subtopic Filters */}
        {selectedCategory !== 'ALL' && availableSubtopics.length > 0 && (
          <div className="flex items-center gap-2 overflow-x-auto pt-2 border-t border-slate-800/80 no-scrollbar">
            <span className="text-xs text-slate-400 whitespace-nowrap font-medium">Subtopik:</span>
            <button
              onClick={() => setSelectedSubtopic('ALL')}
              className={`px-2.5 py-1 rounded text-xs font-medium whitespace-nowrap ${
                selectedSubtopic === 'ALL'
                  ? 'bg-slate-700 text-teal-300 border border-teal-500/30'
                  : 'bg-slate-800/60 text-slate-400'
              }`}
            >
              Semua
            </button>
            {availableSubtopics.map((sub) => (
              <button
                key={sub}
                onClick={() => setSelectedSubtopic(sub)}
                className={`px-2.5 py-1 rounded text-xs font-medium whitespace-nowrap ${
                  selectedSubtopic === sub
                    ? 'bg-slate-700 text-teal-300 border border-teal-500/30'
                    : 'bg-slate-800/60 text-slate-400'
                }`}
              >
                {sub}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Results counter */}
      <div className="flex items-center justify-between text-xs text-slate-400 px-1">
        <span>Menampilkan <strong className="text-white">{filteredQuestions.length}</strong> soal ditemukan</span>
      </div>

      {/* Questions list */}
      <div className="space-y-4">
        {filteredQuestions.map((q, idx) => {
          const isBookmarked = bookmarkedIds.includes(q.id);
          const isExpanded = !!expandedMap[q.id];

          return (
            <div
              key={q.id}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-4 shadow-md transition-all hover:border-slate-700"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-2 flex-1">
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className="px-2.5 py-0.5 rounded font-extrabold bg-slate-800 text-slate-200 border border-slate-700">
                      Soal #{idx + 1}
                    </span>
                    <span className={`px-2.5 py-0.5 rounded font-bold text-[11px] ${
                      q.category === 'TWK' 
                        ? 'bg-blue-500/20 text-blue-400' 
                        : q.category === 'TIU' 
                        ? 'bg-amber-500/20 text-amber-400' 
                        : 'bg-emerald-500/20 text-emerald-400'
                    }`}>
                      {q.category} • {q.subCategory}
                    </span>
                    <span className="text-[10px] text-amber-300 px-2 py-0.5 bg-amber-500/10 rounded border border-amber-500/20">
                      {q.difficulty}
                    </span>
                  </div>

                  <h3 className="text-slate-100 text-base font-semibold leading-relaxed">
                    {q.question}
                  </h3>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => onToggleBookmark(q.id)}
                    className={`p-2 rounded-xl transition-all ${
                      isBookmarked
                        ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                        : 'bg-slate-800 text-slate-400 hover:text-white border border-slate-700'
                    }`}
                  >
                    <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-amber-400' : ''}`} />
                  </button>

                  <button
                    onClick={() => toggleExpand(q.id)}
                    className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white border border-slate-700"
                  >
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Options Preview or Full Expanded View */}
              {isExpanded && (
                <div className="pt-4 border-t border-slate-800/80 space-y-4 animate-fadeIn">
                  <div className="space-y-2">
                    {q.options.map((opt) => {
                      const isTKP = q.category === 'TKP';
                      const isCorrect = !isTKP && q.correctAnswer === opt.key;

                      return (
                        <div
                          key={opt.key}
                          className={`p-3 rounded-xl border text-xs sm:text-sm flex items-center justify-between gap-3 ${
                            isCorrect 
                              ? 'bg-emerald-950/60 border-emerald-500/80 text-emerald-200 font-bold' 
                              : 'bg-slate-950/60 border-slate-800 text-slate-300'
                          }`}
                        >
                          <span>{opt.key}. {opt.text}</span>
                          {isTKP && <span className="text-amber-300 font-bold">Skor: {opt.score}</span>}
                          {isCorrect && <span className="text-emerald-400 font-bold">KUNCI</span>}
                        </div>
                      );
                    })}
                  </div>

                  {/* Explanation & AI Button */}
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3 text-xs sm:text-sm">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white">Pembahasan Lengkap:</span>
                      <button
                        onClick={() => onAskAI(q)}
                        className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-bold"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Pembahasan AI</span>
                      </button>
                    </div>

                    <p className="text-slate-300 leading-relaxed">{q.explanation}</p>

                    {q.quickTrick && (
                      <div className="p-2.5 rounded-lg bg-teal-950/50 border border-teal-500/30 text-teal-300 text-xs flex items-start gap-2">
                        <Zap className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-amber-300">Trik Cepat BKN: </strong>
                          <span>{q.quickTrick}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
