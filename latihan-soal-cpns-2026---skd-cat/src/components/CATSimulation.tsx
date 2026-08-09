import React, { useState, useEffect } from 'react';
import { Question, ExamSession, ExamResultSummary, PASSING_GRADES } from '../types';
import { 
  Clock, 
  Flag, 
  CheckCircle2, 
  ChevronLeft, 
  ChevronRight, 
  AlertTriangle, 
  Award,
  Grid,
  X
} from 'lucide-react';

interface CATSimulationProps {
  allQuestions: Question[];
  onFinishExam: (result: ExamResultSummary, session: ExamSession) => void;
  onExit: () => void;
}

export const CATSimulation: React.FC<CATSimulationProps> = ({
  allQuestions,
  onFinishExam,
  onExit,
}) => {
  // Setup exam session (use 110 or available questions)
  const [questions] = useState<Question[]>(() => {
    // Duplicate or shuffle to simulate 110 items if available, or use current set
    if (allQuestions.length >= 10) return allQuestions;
    return allQuestions;
  });

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, 'A' | 'B' | 'C' | 'D' | 'E'>>({});
  const [flagged, setFlagged] = useState<Record<string, boolean>>({});
  const [secondsRemaining, setSecondsRemaining] = useState<number>(6000); // 100 minutes BKN standard
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
  const [showNavDrawer, setShowNavDrawer] = useState<boolean>(false);

  // Timer countdown
  useEffect(() => {
    if (secondsRemaining <= 0) {
      calculateAndFinish();
      return;
    }
    const timer = setInterval(() => {
      setSecondsRemaining((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [secondsRemaining]);

  const currentQuestion = questions[currentIndex];

  const handleSelectOption = (key: 'A' | 'B' | 'C' | 'D' | 'E') => {
    if (!currentQuestion) return;
    setUserAnswers((prev) => ({ ...prev, [currentQuestion.id]: key }));
  };

  const handleToggleFlag = () => {
    if (!currentQuestion) return;
    setFlagged((prev) => ({
      ...prev,
      [currentQuestion.id]: !prev[currentQuestion.id],
    }));
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const answeredCount = Object.keys(userAnswers).length;
  const flaggedCount = Object.values(flagged).filter(Boolean).length;

  const calculateAndFinish = () => {
    let twkScore = 0;
    let tiuScore = 0;
    let tkpScore = 0;

    questions.forEach((q) => {
      const userAns = userAnswers[q.id];
      if (!userAns) return;

      if (q.category === 'TWK') {
        if (userAns === q.correctAnswer) twkScore += 5;
      } else if (q.category === 'TIU') {
        if (userAns === q.correctAnswer) tiuScore += 5;
      } else if (q.category === 'TKP') {
        const opt = q.options.find((o) => o.key === userAns);
        if (opt && typeof opt.score === 'number') {
          tkpScore += opt.score;
        } else {
          tkpScore += 1;
        }
      }
    });

    const passedTWK = twkScore >= PASSING_GRADES.TWK;
    const passedTIU = tiuScore >= PASSING_GRADES.TIU;
    const passedTKP = tkpScore >= PASSING_GRADES.TKP;
    const passedAll = passedTWK && passedTIU && passedTKP;

    const sessionData: ExamSession = {
      id: `session-${Date.now()}`,
      mode: 'simulasi_cat',
      questions,
      userAnswers,
      flaggedQuestions: flagged,
      startTime: Date.now() - (6000 - secondsRemaining) * 1000,
      timeLimitSeconds: 6000,
      timeRemainingSeconds: secondsRemaining,
      completedAt: Date.now(),
    };

    const resultSummary: ExamResultSummary = {
      sessionId: sessionData.id,
      date: new Date().toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }),
      modeName: 'Simulasi CAT SKD CPNS BKN',
      totalQuestions: questions.length,
      answeredCount,
      timeSpentSeconds: 6000 - secondsRemaining,
      scoreTWK: twkScore,
      maxTWK: 150,
      scoreTIU: tiuScore,
      maxTIU: 175,
      scoreTKP: tkpScore,
      maxTKP: 225,
      totalScore: twkScore + tiuScore + tkpScore,
      maxTotalScore: 550,
      passedTWK,
      passedTIU,
      passedTKP,
      passedAll,
    };

    onFinishExam(resultSummary, sessionData);
  };

  return (
    <div className="space-y-4 pb-12">
      {/* Official CAT Header Bar */}
      <div className="bg-slate-900 border-2 border-teal-500/40 rounded-2xl p-4 sm:p-5 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-teal-500/20 border border-teal-500/30 flex items-center justify-center font-bold text-teal-300">
            CAT
          </div>
          <div>
            <h1 className="font-extrabold text-sm sm:text-base tracking-wide">
              SIMULASI UJIAN CAT BKN CPNS 2026
            </h1>
            <p className="text-xs text-slate-400">
              Soal Dijawab: <span className="text-teal-400 font-bold">{answeredCount}</span> / {questions.length} | Ragu-ragu: <span className="text-amber-400 font-bold">{flaggedCount}</span>
            </p>
          </div>
        </div>

        {/* Countdown & Quick Action Header */}
        <div className="flex items-center gap-3 justify-between md:justify-end">
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-950 border border-amber-500/40 text-amber-300 font-mono text-base font-bold shadow-inner">
            <Clock className="w-4 h-4 text-amber-400 animate-pulse" />
            <span>{formatTime(secondsRemaining)}</span>
          </div>

          <button
            onClick={() => setShowNavDrawer(!showNavDrawer)}
            className="md:hidden flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 text-xs font-semibold text-slate-200 border border-slate-700"
          >
            <Grid className="w-4 h-4" />
            <span>Nomor</span>
          </button>

          <button
            onClick={() => setShowConfirmModal(true)}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-bold text-xs shadow-md transition-all"
          >
            Selesai Ujian
          </button>
        </div>
      </div>

      {/* Workspace Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Left: Main Question Area */}
        <div className="md:col-span-3 space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl relative">
            {/* Question Subheader */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-4 text-xs">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded bg-teal-500 text-slate-950 font-black">
                  SOAL NO {currentIndex + 1}
                </span>
                <span className={`px-2 py-0.5 rounded font-bold ${
                  currentQuestion.category === 'TWK' 
                    ? 'bg-blue-500/20 text-blue-400' 
                    : currentQuestion.category === 'TIU' 
                    ? 'bg-amber-500/20 text-amber-400' 
                    : 'bg-emerald-500/20 text-emerald-400'
                }`}>
                  Kategori: {currentQuestion.category} ({currentQuestion.subCategory})
                </span>
              </div>

              {/* Ragu-ragu flag button */}
              <button
                onClick={handleToggleFlag}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  flagged[currentQuestion.id]
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
                    : 'bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-700'
                }`}
              >
                <Flag className={`w-3.5 h-3.5 ${flagged[currentQuestion.id] ? 'fill-amber-400 text-amber-400' : ''}`} />
                <span>{flagged[currentQuestion.id] ? 'RAGU-RAGU (AKTIF)' : 'Tandai Ragu-Ragu'}</span>
              </button>
            </div>

            {/* Question Text */}
            <div className="text-slate-100 text-base sm:text-lg font-medium leading-relaxed">
              {currentQuestion.question}
            </div>

            {currentQuestion.codeOrTable && (
              <div className="p-4 rounded-xl bg-slate-950 font-mono text-xs text-amber-300 border border-slate-800 overflow-x-auto whitespace-pre">
                {currentQuestion.codeOrTable}
              </div>
            )}

            {/* Options List */}
            <div className="space-y-3 pt-2">
              {currentQuestion.options.map((opt) => {
                const isSelected = userAnswers[currentQuestion.id] === opt.key;
                return (
                  <button
                    key={opt.key}
                    onClick={() => handleSelectOption(opt.key)}
                    className={`w-full p-4 rounded-xl border text-left transition-all flex items-start gap-3.5 ${
                      isSelected
                        ? 'bg-teal-900/40 border-teal-500 text-teal-200 shadow-md ring-1 ring-teal-500/50'
                        : 'bg-slate-800/60 border-slate-700/80 text-slate-200 hover:bg-slate-800 hover:border-slate-600'
                    }`}
                  >
                    <span className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${
                      isSelected
                        ? 'bg-teal-500 text-slate-950 font-black'
                        : 'bg-slate-800 text-slate-400'
                    }`}>
                      {opt.key}
                    </span>
                    <span className="text-sm leading-relaxed pt-0.5">
                      {opt.text}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Bottom Action Bar */}
          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
              disabled={currentIndex === 0}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white disabled:opacity-40 text-xs font-semibold"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Sebelumnya</span>
            </button>

            <button
              onClick={handleToggleFlag}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                flagged[currentQuestion.id]
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {flagged[currentQuestion.id] ? 'Kuning (Ragu-ragu)' : 'Ragu-ragu'}
            </button>

            <button
              onClick={() => setCurrentIndex((prev) => Math.min(questions.length - 1, prev + 1))}
              disabled={currentIndex >= questions.length - 1}
              className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-slate-950 font-bold disabled:opacity-40 text-xs transition-colors"
            >
              <span>Selanjutnya</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right Desktop / Drawer Mobile: Question Navigation Grid */}
        <div className={`md:block ${showNavDrawer ? 'block' : 'hidden'} md:static fixed inset-0 z-50 bg-slate-950/80 md:bg-transparent backdrop-blur-sm md:backdrop-blur-none p-4 md:p-0`}>
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl max-h-[80vh] md:max-h-none overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-white text-sm flex items-center gap-2">
                <Grid className="w-4 h-4 text-teal-400" />
                <span>Lembar Navigasi Soal</span>
              </h3>
              <button
                onClick={() => setShowNavDrawer(false)}
                className="md:hidden text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Legend */}
            <div className="grid grid-cols-3 gap-2 text-[10px] text-slate-400 pb-2">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-teal-500" />
                <span>Dijawab</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-amber-500" />
                <span>Ragu</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-slate-800 border border-slate-700" />
                <span>Kosong</span>
              </div>
            </div>

            {/* Navigation Grid Buttons 1..N */}
            <div className="grid grid-cols-5 gap-2">
              {questions.map((q, idx) => {
                const isCurrent = idx === currentIndex;
                const isAnswered = !!userAnswers[q.id];
                const isFlagged = !!flagged[q.id];

                let btnStyle = 'bg-slate-800 text-slate-300 hover:bg-slate-700 border-slate-700';

                if (isFlagged) {
                  btnStyle = 'bg-amber-500 text-slate-950 font-black border-amber-400';
                } else if (isAnswered) {
                  btnStyle = 'bg-teal-600 text-slate-950 font-black border-teal-400';
                }

                return (
                  <button
                    key={q.id}
                    onClick={() => {
                      setCurrentIndex(idx);
                      setShowNavDrawer(false);
                    }}
                    className={`h-9 rounded-lg border text-xs font-bold transition-all relative flex items-center justify-center ${btnStyle} ${
                      isCurrent ? 'ring-2 ring-white scale-105 shadow-md' : ''
                    }`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Finish Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 max-w-md w-full space-y-6 shadow-2xl">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center mx-auto">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-extrabold text-white">Konfirmasi Selesai Ujian</h3>
              <p className="text-xs text-slate-400">
                Apakah Anda yakin ingin menyelesaikan simulasi CAT CPNS sekarang?
              </p>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl space-y-2 border border-slate-800 text-xs">
              <div className="flex justify-between text-slate-300">
                <span>Total Soal:</span>
                <span className="font-bold text-white">{questions.length}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Soal Dijawab:</span>
                <span className="font-bold text-teal-400">{answeredCount}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Soal Ragu-ragu:</span>
                <span className="font-bold text-amber-400">{flaggedCount}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Belum Dijawab:</span>
                <span className="font-bold text-rose-400">{questions.length - answeredCount}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs"
              >
                Kembali ke Soal
              </button>
              <button
                onClick={calculateAndFinish}
                className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 text-slate-950 font-bold text-xs shadow-lg shadow-teal-500/20"
              >
                Ya, Selesai Ujian
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
