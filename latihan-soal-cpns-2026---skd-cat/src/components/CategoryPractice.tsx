import React, { useState } from 'react';
import { Question, QuestionCategory } from '../types';
import { SUBTOPIC_LIST } from '../data/cpnsQuestions';
import { 
  CheckCircle2, 
  XCircle, 
  Sparkles, 
  Bookmark, 
  ChevronLeft, 
  ChevronRight, 
  RotateCcw,
  HelpCircle,
  Zap,
  Filter,
  Check
} from 'lucide-react';

interface CategoryPracticeProps {
  questions: Question[];
  bookmarkedIds: string[];
  onToggleBookmark: (questionId: string) => void;
  onAskAI: (q: Question, selectedKey?: string) => void;
  initialCategory?: QuestionCategory | 'ALL';
}

export const CategoryPractice: React.FC<CategoryPracticeProps> = ({
  questions,
  bookmarkedIds,
  onToggleBookmark,
  onAskAI,
  initialCategory = 'ALL',
}) => {
  const [selectedCategory, setSelectedCategory] = useState<QuestionCategory | 'ALL'>(initialCategory);
  const [selectedSubtopic, setSelectedSubtopic] = useState<string>('ALL');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, 'A' | 'B' | 'C' | 'D' | 'E'>>({});
  const [showExplanation, setShowExplanation] = useState<Record<string, boolean>>({});

  // Filter questions based on category and subtopic
  const filteredQuestions = questions.filter((q) => {
    if (selectedCategory !== 'ALL' && q.category !== selectedCategory) return false;
    if (selectedSubtopic !== 'ALL' && q.subCategory !== selectedSubtopic) return false;
    return true;
  });

  const currentQuestion = filteredQuestions[currentIndex] || filteredQuestions[0];

  const handleSelectOption = (key: 'A' | 'B' | 'C' | 'D' | 'E') => {
    if (!currentQuestion) return;
    setUserAnswers((prev) => ({ ...prev, [currentQuestion.id]: key }));
    setShowExplanation((prev) => ({ ...prev, [currentQuestion.id]: true }));
  };

  const isBookmarked = currentQuestion ? bookmarkedIds.includes(currentQuestion.id) : false;
  const currentAnswer = currentQuestion ? userAnswers[currentQuestion.id] : undefined;

  const availableSubtopics = selectedCategory !== 'ALL' 
    ? SUBTOPIC_LIST[selectedCategory] 
    : [];

  return (
    <div className="space-y-6 pb-12">
      {/* Top Filter Controls */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-4 shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-teal-400" />
            <h2 className="font-bold text-white text-sm sm:text-base">Pilih Modul Latihan</h2>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            {(['ALL', 'TWK', 'TIU', 'TKP'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setSelectedSubtopic('ALL');
                  setCurrentIndex(0);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-teal-500 text-slate-950 shadow-sm'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {cat === 'ALL' ? 'Semua (SKD)' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Subtopic Filters if Category selected */}
        {selectedCategory !== 'ALL' && availableSubtopics.length > 0 && (
          <div className="flex items-center gap-2 overflow-x-auto pt-2 border-t border-slate-800 no-scrollbar">
            <span className="text-xs text-slate-400 whitespace-nowrap font-medium">Subtopik:</span>
            <button
              onClick={() => {
                setSelectedSubtopic('ALL');
                setCurrentIndex(0);
              }}
              className={`px-2.5 py-1 rounded-md text-xs font-medium whitespace-nowrap ${
                selectedSubtopic === 'ALL'
                  ? 'bg-slate-700 text-teal-300 border border-teal-500/30'
                  : 'bg-slate-800/60 text-slate-400 hover:text-slate-200'
              }`}
            >
              Semua Subtopik
            </button>
            {availableSubtopics.map((sub) => (
              <button
                key={sub}
                onClick={() => {
                  setSelectedSubtopic(sub);
                  setCurrentIndex(0);
                }}
                className={`px-2.5 py-1 rounded-md text-xs font-medium whitespace-nowrap ${
                  selectedSubtopic === sub
                    ? 'bg-slate-700 text-teal-300 border border-teal-500/30'
                    : 'bg-slate-800/60 text-slate-400 hover:text-slate-200'
                }`}
              >
                {sub}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* No Question Fallback */}
      {!currentQuestion ? (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center space-y-4">
          <HelpCircle className="w-12 h-12 text-slate-600 mx-auto" />
          <p className="text-slate-300 font-medium">Tidak ada soal untuk kategori / subtopik yang dipilih.</p>
          <button
            onClick={() => {
              setSelectedCategory('ALL');
              setSelectedSubtopic('ALL');
            }}
            className="px-4 py-2 bg-teal-600 text-slate-950 font-bold rounded-xl text-xs"
          >
            Reset Filter
          </button>
        </div>
      ) : (
        /* Question Card & Interactive Area */
        <div className="space-y-4">
          {/* Question Index Bar */}
          <div className="flex items-center justify-between text-xs text-slate-400 px-1">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded font-bold bg-slate-800 text-slate-200 border border-slate-700">
                Soal {currentIndex + 1} dari {filteredQuestions.length}
              </span>
              <span className={`px-2 py-0.5 rounded font-bold text-[10px] ${
                currentQuestion.category === 'TWK' 
                  ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                  : currentQuestion.category === 'TIU'
                  ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                  : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
              }`}>
                {currentQuestion.category} - {currentQuestion.subCategory}
              </span>
              <span className="text-[10px] text-slate-400 px-2 py-0.5 bg-slate-800/80 rounded border border-slate-700">
                {currentQuestion.difficulty}
              </span>
            </div>

            <button
              onClick={() => onToggleBookmark(currentQuestion.id)}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                isBookmarked
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                  : 'bg-slate-800 text-slate-400 hover:text-white border border-slate-700'
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-amber-400 text-amber-400' : ''}`} />
              <span>{isBookmarked ? 'Tersimpan' : 'Simpan'}</span>
            </button>
          </div>

          {/* Question Content Box */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
            <div className="text-slate-100 text-base sm:text-lg font-medium leading-relaxed">
              {currentQuestion.question}
            </div>

            {currentQuestion.codeOrTable && (
              <div className="p-4 rounded-xl bg-slate-950 font-mono text-xs text-amber-300 border border-slate-800 overflow-x-auto whitespace-pre">
                {currentQuestion.codeOrTable}
              </div>
            )}

            {/* Options List A-E */}
            <div className="space-y-3 pt-2">
              {currentQuestion.options.map((opt) => {
                const isSelected = currentAnswer === opt.key;
                const isTKP = currentQuestion.category === 'TKP';
                const isCorrect = !isTKP && currentQuestion.correctAnswer === opt.key;
                const isWrongSelected = !isTKP && isSelected && !isCorrect;

                let optClass = 'bg-slate-800/60 border-slate-700 text-slate-200 hover:bg-slate-800 hover:border-slate-600';

                if (currentAnswer) {
                  if (isTKP) {
                    if (isSelected) {
                      optClass = 'bg-teal-900/40 border-teal-500 text-teal-200 shadow-md';
                    }
                  } else {
                    if (isCorrect) {
                      optClass = 'bg-emerald-950/60 border-emerald-500 text-emerald-200 font-semibold';
                    } else if (isWrongSelected) {
                      optClass = 'bg-rose-950/60 border-rose-500 text-rose-200';
                    }
                  }
                }

                return (
                  <button
                    key={opt.key}
                    onClick={() => handleSelectOption(opt.key)}
                    className={`w-full p-4 rounded-xl border text-left transition-all flex items-start gap-3.5 relative group ${optClass}`}
                  >
                    <span className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${
                      isSelected
                        ? 'bg-teal-500 text-slate-950'
                        : 'bg-slate-800 text-slate-400 group-hover:bg-slate-700 group-hover:text-white'
                    }`}>
                      {opt.key}
                    </span>

                    <span className="text-sm leading-relaxed pt-0.5 flex-1">
                      {opt.text}
                    </span>

                    {/* Feedback Badges if answered */}
                    {currentAnswer && (
                      <div className="shrink-0 flex items-center gap-2">
                        {isTKP ? (
                          <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                            Skor: {opt.score ?? '-'}
                          </span>
                        ) : isCorrect ? (
                          <span className="flex items-center gap-1 text-xs text-emerald-400 font-bold">
                            <CheckCircle2 className="w-4 h-4" /> Kunci
                          </span>
                        ) : isWrongSelected ? (
                          <span className="flex items-center gap-1 text-xs text-rose-400 font-bold">
                            <XCircle className="w-4 h-4" /> Jawaban Anda
                          </span>
                        ) : null}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Instant Pembahasan & Explanation Section */}
            {currentAnswer && (
              <div className="mt-6 pt-6 border-t border-slate-800 space-y-4 animate-fadeIn">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-teal-400" />
                    <h3 className="font-bold text-white text-sm sm:text-base">Pembahasan & Analisis Soal</h3>
                  </div>

                  <button
                    onClick={() => onAskAI(currentQuestion, currentAnswer)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-bold transition-all shadow-sm"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Tanyakan Pembahasan AI</span>
                  </button>
                </div>

                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs sm:text-sm text-slate-300 space-y-3 leading-relaxed">
                  <p>{currentQuestion.explanation}</p>

                  {currentQuestion.quickTrick && (
                    <div className="p-3 rounded-lg bg-teal-950/50 border border-teal-500/30 text-teal-300 flex items-start gap-2 text-xs">
                      <Zap className="w-4 h-4 shrink-0 text-amber-400 mt-0.5" />
                      <div>
                        <span className="font-bold text-amber-300">Trik Cepat BKN: </span>
                        <span>{currentQuestion.quickTrick}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
              disabled={currentIndex === 0}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed text-xs font-semibold"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Sebelumnya</span>
            </button>

            <button
              onClick={() => {
                setUserAnswers({});
                setShowExplanation({});
              }}
              className="flex items-center gap-1 px-3 py-2 text-xs text-slate-400 hover:text-slate-200"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Jawaban</span>
            </button>

            <button
              onClick={() => setCurrentIndex((prev) => Math.min(filteredQuestions.length - 1, prev + 1))}
              disabled={currentIndex >= filteredQuestions.length - 1}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-slate-950 font-bold disabled:opacity-40 disabled:cursor-not-allowed text-xs transition-colors"
            >
              <span>Selanjutnya</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
