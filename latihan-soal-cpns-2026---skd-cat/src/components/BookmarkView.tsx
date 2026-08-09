import React from 'react';
import { Question } from '../types';
import { Bookmark, Sparkles, Trash2, Zap, BookOpen } from 'lucide-react';

interface BookmarkViewProps {
  questions: Question[];
  bookmarkedIds: string[];
  onToggleBookmark: (questionId: string) => void;
  onAskAI: (q: Question) => void;
}

export const BookmarkView: React.FC<BookmarkViewProps> = ({
  questions,
  bookmarkedIds,
  onToggleBookmark,
  onAskAI,
}) => {
  const bookmarkedQuestions = questions.filter((q) => bookmarkedIds.includes(q.id));

  return (
    <div className="space-y-6 pb-12">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center font-bold">
            <Bookmark className="w-5 h-5 fill-amber-400" />
          </div>
          <div>
            <h2 className="font-bold text-white text-base">Soal Favorit & Tersimpan ({bookmarkedQuestions.length})</h2>
            <p className="text-xs text-slate-400">Kumpulan soal tersimpan untuk direvisi sebelum hari H ujian SKD</p>
          </div>
        </div>
      </div>

      {bookmarkedQuestions.length === 0 ? (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center space-y-3">
          <BookOpen className="w-12 h-12 text-slate-600 mx-auto" />
          <p className="text-slate-300 font-medium">Belum ada soal yang disimpan ke daftar Favorit.</p>
          <p className="text-xs text-slate-500">Klik ikon tandai/bookmark pada saat latihan untuk menyimpan soal-soal tersulit Anda.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {bookmarkedQuestions.map((q, idx) => (
            <div key={q.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-md">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs">
                    <span className="font-bold text-amber-400">Favorit #{idx + 1}</span>
                    <span className="px-2 py-0.2 bg-slate-800 text-slate-300 rounded font-semibold">
                      {q.category} - {q.subCategory}
                    </span>
                  </div>
                  <h3 className="text-slate-100 font-semibold text-base leading-relaxed">{q.question}</h3>
                </div>

                <button
                  onClick={() => onToggleBookmark(q.id)}
                  className="p-2 rounded-xl bg-rose-500/20 text-rose-300 border border-rose-500/30 hover:bg-rose-500/30"
                  title="Hapus dari favorit"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {/* Options */}
              <div className="space-y-2">
                {q.options.map((opt) => {
                  const isTKP = q.category === 'TKP';
                  const isCorrect = !isTKP && q.correctAnswer === opt.key;

                  return (
                    <div
                      key={opt.key}
                      className={`p-3 rounded-xl border text-xs sm:text-sm flex items-center justify-between gap-3 ${
                        isCorrect ? 'bg-emerald-950/60 border-emerald-500/80 text-emerald-200 font-bold' : 'bg-slate-950/60 border-slate-800 text-slate-300'
                      }`}
                    >
                      <span>{opt.key}. {opt.text}</span>
                      {isTKP && <span className="text-amber-300 font-bold">Skor: {opt.score}</span>}
                      {isCorrect && <span className="text-emerald-400 font-bold">KUNCI</span>}
                    </div>
                  );
                })}
              </div>

              {/* Explanation & AI */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3 text-xs sm:text-sm">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white">Pembahasan:</span>
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
                  <div className="text-teal-300 font-medium">Trik Cepat: {q.quickTrick}</div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
