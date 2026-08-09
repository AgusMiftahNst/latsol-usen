import React, { useState } from 'react';
import { ExamResultSummary, ExamSession, Question, PASSING_GRADES } from '../types';
import { 
  Award, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  Sparkles, 
  ChevronDown, 
  ChevronUp, 
  Zap, 
  FileText,
  Clock,
  ShieldCheck,
  AlertTriangle
} from 'lucide-react';

interface ExamResultProps {
  result: ExamResultSummary;
  session: ExamSession;
  onRestart: () => void;
  onAskAI: (question: Question, selectedKey?: string) => void;
}

export const ExamResult: React.FC<ExamResultProps> = ({
  result,
  session,
  onRestart,
  onAskAI,
}) => {
  const [filterMode, setFilterMode] = useState<'ALL' | 'CORRECT' | 'WRONG' | 'FLAGGED'>('ALL');
  const [expandedQuestions, setExpandedQuestions] = useState<Record<string, boolean>>({});

  const toggleExpand = (id: string) => {
    setExpandedQuestions((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredQuestions = session.questions.filter((q) => {
    const userAns = session.userAnswers[q.id];
    const isFlagged = session.flaggedQuestions[q.id];

    if (filterMode === 'FLAGGED') return isFlagged;

    if (q.category === 'TKP') {
      if (filterMode === 'CORRECT') return !!userAns;
      if (filterMode === 'WRONG') return !userAns;
    } else {
      const isCorrect = userAns === q.correctAnswer;
      if (filterMode === 'CORRECT') return isCorrect;
      if (filterMode === 'WRONG') return !isCorrect;
    }
    return true;
  });

  return (
    <div className="space-y-8 pb-12">
      {/* Overall Pass/Fail Hero Banner */}
      <div className={`rounded-2xl p-6 sm:p-8 border shadow-xl relative overflow-hidden ${
        result.passedAll
          ? 'bg-gradient-to-br from-emerald-950 via-slate-900 to-teal-950 border-emerald-500/50'
          : 'bg-gradient-to-br from-slate-900 via-slate-900 to-rose-950/60 border-rose-500/40'
      }`}>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 text-center sm:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-slate-800/80 border border-slate-700">
              <Clock className="w-3.5 h-3.5 text-teal-400" />
              <span>{result.date} • Waktu Pengerjaan: {Math.floor(result.timeSpentSeconds / 60)} Menit</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-white">
              {result.passedAll ? (
                <span className="text-emerald-400 flex items-center gap-2">
                  <Award className="w-8 h-8 text-amber-400" />
                  SELAMAT! ANDA LULUS PASSING GRADE SKD
                </span>
              ) : (
                <span className="text-amber-300 flex items-center gap-2">
                  <AlertTriangle className="w-8 h-8 text-amber-400" />
                  BELUM MEMENUHI PASSING GRADE SKD
                </span>
              )}
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              {result.passedAll
                ? 'Performa Anda sangat memuaskan dan memenuhi seluruh ambang batas nilai (Passing Grade) resmi BKN!'
                : 'Jangan berkecil hati. Evaluasi subkategori yang masih di bawah ambang batas dan coba simulasi kembali.'}
            </p>
          </div>

          {/* Big Score Counter Badge */}
          <div className="bg-slate-950/80 border border-slate-800 p-5 rounded-2xl text-center min-w-[180px] shadow-inner">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Total Skor SKD
            </div>
            <div className="text-4xl font-black text-white mt-1">
              {result.totalScore}
              <span className="text-xs font-normal text-slate-400"> / 550</span>
            </div>
            <div className={`mt-2 text-xs font-extrabold px-2.5 py-0.5 rounded-full inline-block ${
              result.passedAll ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
            }`}>
              {result.passedAll ? 'LULUS AMBANG BATAS' : 'TIDAK LULUS'}
            </div>
          </div>
        </div>
      </div>

      {/* Passing Grade Breakdown Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* TWK Breakdown */}
        <div className={`p-5 rounded-2xl border bg-slate-900 space-y-3 ${
          result.passedTWK ? 'border-emerald-500/40' : 'border-rose-500/40'
        }`}>
          <div className="flex items-center justify-between">
            <span className="px-2.5 py-0.5 rounded text-xs font-extrabold bg-blue-500/20 text-blue-400">
              TWK (Nilai Min: 65)
            </span>
            <span className={`text-xs font-bold px-2 py-0.5 rounded ${
              result.passedTWK ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'
            }`}>
              {result.passedTWK ? 'Lulus' : 'Di Bawah Min'}
            </span>
          </div>

          <div>
            <div className="text-3xl font-black text-white">
              {result.scoreTWK} <span className="text-xs font-normal text-slate-400">/ 150</span>
            </div>
            <div className="w-full bg-slate-800 h-2 rounded-full mt-2 overflow-hidden">
              <div 
                className={`h-full transition-all duration-500 ${result.passedTWK ? 'bg-emerald-500' : 'bg-rose-500'}`}
                style={{ width: `${Math.min(100, (result.scoreTWK / 150) * 100)}%` }}
              />
            </div>
          </div>
          <p className="text-[11px] text-slate-400">
            Tes Wawasan Kebangsaan menguji pemahaman ideologi negara, konstitusi, dan sejarah nasional.
          </p>
        </div>

        {/* TIU Breakdown */}
        <div className={`p-5 rounded-2xl border bg-slate-900 space-y-3 ${
          result.passedTIU ? 'border-emerald-500/40' : 'border-rose-500/40'
        }`}>
          <div className="flex items-center justify-between">
            <span className="px-2.5 py-0.5 rounded text-xs font-extrabold bg-amber-500/20 text-amber-400">
              TIU (Nilai Min: 80)
            </span>
            <span className={`text-xs font-bold px-2 py-0.5 rounded ${
              result.passedTIU ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'
            }`}>
              {result.passedTIU ? 'Lulus' : 'Di Bawah Min'}
            </span>
          </div>

          <div>
            <div className="text-3xl font-black text-white">
              {result.scoreTIU} <span className="text-xs font-normal text-slate-400">/ 175</span>
            </div>
            <div className="w-full bg-slate-800 h-2 rounded-full mt-2 overflow-hidden">
              <div 
                className={`h-full transition-all duration-500 ${result.passedTIU ? 'bg-emerald-500' : 'bg-rose-500'}`}
                style={{ width: `${Math.min(100, (result.scoreTIU / 175) * 100)}%` }}
              />
            </div>
          </div>
          <p className="text-[11px] text-slate-400">
            Tes Intelegensi Umum mengukur logika verbal, numerik berhitung cepat, dan figural.
          </p>
        </div>

        {/* TKP Breakdown */}
        <div className={`p-5 rounded-2xl border bg-slate-900 space-y-3 ${
          result.passedTKP ? 'border-emerald-500/40' : 'border-rose-500/40'
        }`}>
          <div className="flex items-center justify-between">
            <span className="px-2.5 py-0.5 rounded text-xs font-extrabold bg-emerald-500/20 text-emerald-400">
              TKP (Nilai Min: 166)
            </span>
            <span className={`text-xs font-bold px-2 py-0.5 rounded ${
              result.passedTKP ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'
            }`}>
              {result.passedTKP ? 'Lulus' : 'Di Bawah Min'}
            </span>
          </div>

          <div>
            <div className="text-3xl font-black text-white">
              {result.scoreTKP} <span className="text-xs font-normal text-slate-400">/ 225</span>
            </div>
            <div className="w-full bg-slate-800 h-2 rounded-full mt-2 overflow-hidden">
              <div 
                className={`h-full transition-all duration-500 ${result.passedTKP ? 'bg-emerald-500' : 'bg-rose-500'}`}
                style={{ width: `${Math.min(100, (result.scoreTKP / 225) * 100)}%` }}
              />
            </div>
          </div>
          <p className="text-[11px] text-slate-400">
            Tes Karakteristik Pribadi menilai integritas, pelayanan publik, TIK, dan kepemimpinan.
          </p>
        </div>
      </div>

      {/* Review Questions Section */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <h3 className="font-bold text-white text-base flex items-center gap-2">
              <FileText className="w-5 h-5 text-teal-400" />
              <span>Evaluasi & Pembahasan Soal Ujian</span>
            </h3>
            <p className="text-xs text-slate-400">
              Pelajari kunci jawaban dan manfaatkan AI Tutor untuk memperdalam soal yang salah.
            </p>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            {(['ALL', 'CORRECT', 'WRONG', 'FLAGGED'] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setFilterMode(mode)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                  filterMode === mode
                    ? 'bg-teal-500 text-slate-950'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {mode === 'ALL' && 'Semua'}
                {mode === 'CORRECT' && 'Benar'}
                {mode === 'WRONG' && 'Salah'}
                {mode === 'FLAGGED' && 'Ragu-ragu'}
              </button>
            ))}
          </div>
        </div>

        {/* Question Review List */}
        <div className="space-y-4">
          {filteredQuestions.map((q, idx) => {
            const userAns = session.userAnswers[q.id];
            const isTKP = q.category === 'TKP';
            const isCorrect = !isTKP && userAns === q.correctAnswer;
            const isExpanded = !!expandedQuestions[q.id];

            return (
              <div
                key={q.id}
                className="bg-slate-950 border border-slate-800 rounded-xl p-4 sm:p-5 space-y-3 transition-all"
              >
                <div 
                  className="flex items-start justify-between gap-4 cursor-pointer"
                  onClick={() => toggleExpand(q.id)}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs">
                      <span className="font-bold text-teal-400">Soal #{idx + 1}</span>
                      <span className="px-2 py-0.2 bg-slate-800 text-slate-300 rounded">
                        {q.category} - {q.subCategory}
                      </span>
                    </div>
                    <p className="text-slate-200 text-sm font-medium line-clamp-2">
                      {q.question}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    {isTKP ? (
                      <span className="px-2.5 py-1 rounded text-xs font-bold bg-amber-500/20 text-amber-300">
                        TKP Selected
                      </span>
                    ) : isCorrect ? (
                      <span className="flex items-center gap-1 px-2.5 py-1 rounded text-xs font-bold bg-emerald-500/20 text-emerald-400">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Benar (+5)
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 px-2.5 py-1 rounded text-xs font-bold bg-rose-500/20 text-rose-400">
                        <XCircle className="w-3.5 h-3.5" /> Salah (+0)
                      </span>
                    )}

                    <button className="text-slate-400 hover:text-white">
                      {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="pt-4 border-t border-slate-800/80 space-y-4 animate-fadeIn text-xs sm:text-sm">
                    {/* Options list */}
                    <div className="space-y-2">
                      {q.options.map((opt) => {
                        const isChosen = userAns === opt.key;
                        const isRightOpt = !isTKP && q.correctAnswer === opt.key;

                        let optBg = 'bg-slate-900 border-slate-800 text-slate-300';
                        if (isRightOpt) optBg = 'bg-emerald-950/60 border-emerald-500/80 text-emerald-200 font-bold';
                        else if (isChosen && !isRightOpt) optBg = 'bg-rose-950/60 border-rose-500/80 text-rose-200';

                        return (
                          <div
                            key={opt.key}
                            className={`p-3 rounded-lg border flex items-center justify-between gap-3 ${optBg}`}
                          >
                            <span className="font-semibold">{opt.key}. {opt.text}</span>
                            {isTKP && <span className="text-[11px] text-amber-300 font-bold">Skor: {opt.score}</span>}
                            {!isTKP && isRightOpt && <span className="text-[11px] text-emerald-400 font-extrabold">KUNCI</span>}
                          </div>
                        );
                      })}
                    </div>

                    {/* Pembahasan & AI Trigger */}
                    <div className="bg-slate-900 p-4 rounded-xl space-y-3 border border-slate-800">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-white text-xs">Pembahasan Resmi:</span>
                        <button
                          onClick={() => onAskAI(q, userAns)}
                          className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-bold"
                        >
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>Tanyakan AI Tutor</span>
                        </button>
                      </div>
                      <p className="text-slate-300 leading-relaxed text-xs">{q.explanation}</p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Restart Simulation Button */}
      <div className="flex justify-center pt-4">
        <button
          onClick={onRestart}
          className="flex items-center gap-2.5 px-6 py-3 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-slate-950 font-bold text-sm shadow-lg shadow-teal-500/20 transition-all"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Ulangi Simulasi Ujian</span>
        </button>
      </div>
    </div>
  );
};
