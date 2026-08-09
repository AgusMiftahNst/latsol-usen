import React, { useState } from 'react';
import { 
  Play, 
  BookOpen, 
  Sparkles, 
  CheckCircle2, 
  Target, 
  Award, 
  Clock, 
  TrendingUp, 
  Zap, 
  FileText,
  ShieldCheck,
  Flame,
  ThumbsUp,
  AlertTriangle,
  ArrowRight,
  User,
  HeartHandshake,
  CheckSquare,
  Square
} from 'lucide-react';
import { PASSING_GRADES, QuestionCategory } from '../types';

interface DashboardProps {
  onStartCAT: () => void;
  onStartPractice: (category?: QuestionCategory) => void;
  onStartChallenge: () => void;
  onOpenAITutor: () => void;
  onOpenBank: () => void;
  totalQuestionsCount: number;
}

export const Dashboard: React.FC<DashboardProps> = ({
  onStartCAT,
  onStartPractice,
  onStartChallenge,
  onOpenAITutor,
  onOpenBank,
  totalQuestionsCount,
}) => {
  // Interactive checklist state for Amru's daily goals
  const [completedGoals, setCompletedGoals] = useState<Record<string, boolean>>({
    goal1: false,
    goal2: true,
    goal3: false,
  });

  const toggleGoal = (id: string) => {
    setCompletedGoals(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Hero Welcome Banner - Warm Friendly Bestie Style for Amru Husayni */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-teal-950 p-6 sm:p-8 border border-teal-500/30 shadow-2xl">
        <div className="absolute -right-12 -top-12 w-72 h-72 rounded-full bg-teal-500/15 blur-3xl pointer-events-none" />
        <div className="absolute right-1/3 -bottom-12 w-64 h-64 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 text-teal-300 border border-teal-500/20 text-xs font-semibold">
            <Flame className="w-3.5 h-3.5 text-amber-400 animate-bounce" />
            <span>Sapaan Khusus Sahabat CPNS 2026</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white leading-tight">
            Halo <span className="bg-gradient-to-r from-teal-300 via-emerald-300 to-amber-300 bg-clip-text text-transparent">Amru Husayni!</span> 👋 <br />
            <span className="text-xl sm:text-2xl font-bold text-slate-200">
              Siap Bikin Bangga Sekeluarga Jadi ASN Tahun Ini?
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
            Semangat terus, Bro Usen! Nggak usah pusing atau spaneng. Latihan dikit-dikit tiap hari tapi konsisten, dijamin soal SKD BKN bertekuk lutut. Pilih menu latihan di bawah, gas sekarang!
          </p>

          <div className="pt-2 flex flex-wrap gap-3">
            <button
              id="btn-hero-cat"
              onClick={onStartCAT}
              className="flex items-center gap-2.5 px-5 py-3 rounded-2xl bg-gradient-to-r from-teal-500 via-emerald-500 to-teal-400 hover:from-teal-400 hover:to-emerald-400 text-slate-950 font-black text-sm shadow-xl shadow-teal-500/25 transition-all transform active:scale-95"
            >
              <Play className="w-4.5 h-4.5 fill-slate-950" />
              <span>🔥 Gas Simulasi CAT (100 Menit)</span>
            </button>

            <button
              id="btn-hero-practice"
              onClick={() => onStartPractice()}
              className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-600/80 font-bold text-sm transition-all shadow-md"
            >
              <BookOpen className="w-4 h-4 text-teal-400" />
              <span>📚 Asah Per Kategori Bro</span>
            </button>

            <button
              onClick={onOpenAITutor}
              className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 font-bold text-sm transition-all"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>🤖 Tanya Coach AI CPNS</span>
            </button>
          </div>
        </div>
      </div>

      {/* SPECIAL SECTION: Progress Persiapan PNS Amru Husayni (Usen) */}
      <div className="bg-slate-900/90 border border-teal-500/30 rounded-3xl p-6 sm:p-7 space-y-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-teal-500/5 rounded-full blur-2xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center text-slate-950 font-black text-lg shadow-lg shadow-teal-500/20">
              AH
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-extrabold text-white">Progress Persiapan PNS Amru Husayni</h2>
                <span className="px-2 py-0.5 text-[10px] font-black rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  AKUN USEN
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Pantauan amunisi & readiness Amru menuju tes SKD CPNS 2026
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-slate-800/80 px-4 py-2 rounded-2xl border border-slate-700">
            <div className="text-right">
              <div className="text-[10px] text-slate-400 font-semibold uppercase">Estimasi Kesiapan</div>
              <div className="text-lg font-black text-emerald-400">78% READY!</div>
            </div>
            <div className="w-10 h-10 rounded-full border-4 border-emerald-500 border-t-teal-300 flex items-center justify-center text-xs font-bold text-white">
              78%
            </div>
          </div>
        </div>

        {/* Readiness Bar */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs font-bold text-slate-300">
            <span>Tingkat Kesiapan SKD Amru</span>
            <span className="text-teal-400">Tinggal 22% lagi menuju Passing Grade Nyaman!</span>
          </div>
          <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-700">
            <div 
              className="h-full bg-gradient-to-r from-teal-500 via-emerald-400 to-amber-400 rounded-full transition-all duration-1000 shadow-sm"
              style={{ width: '78%' }}
            />
          </div>
        </div>

        {/* Strengths & Weaknesses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Kelebihan Amru */}
          <div className="bg-slate-950/60 rounded-2xl p-4 border border-emerald-500/30 space-y-3">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
              <ThumbsUp className="w-4.5 h-4.5 text-emerald-400" />
              <span>Kelebihan & Modul Terkuat Kamu (Amru)</span>
            </div>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li className="flex items-start gap-2 bg-emerald-950/20 p-2.5 rounded-xl border border-emerald-500/20">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white">TKP (Pelayanan Publik & TIK) Mantap!</strong>
                  <p className="text-slate-400 mt-0.5">
                    Skor TKP Amru konsisten tinggi. Insting dalam memilih keputusan bernilai 5 poin udah oke banget!
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-2 bg-emerald-950/20 p-2.5 rounded-xl border border-emerald-500/20">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white">TIU Verbal & Analogi Kata Cepat</strong>
                  <p className="text-slate-400 mt-0.5">
                    Soal analogi, silogisme, dan hubungan kata berhasil disapu bersih dalam waktu singkat!
                  </p>
                </div>
              </li>
            </ul>
          </div>

          {/* Kekurangan / PR Amru */}
          <div className="bg-slate-950/60 rounded-2xl p-4 border border-amber-500/30 space-y-3">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
              <AlertTriangle className="w-4.5 h-4.5 text-amber-400" />
              <span>PR & Kekurangan Yang Perlu Dipoles (Amru)</span>
            </div>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li className="flex items-start gap-2 bg-amber-950/20 p-2.5 rounded-xl border border-amber-500/20">
                <div className="w-4 h-4 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center font-black text-[10px] shrink-0 mt-0.5">!</div>
                <div>
                  <strong className="text-white">TIU Hitungan & Deret Bertingkat</strong>
                  <p className="text-slate-400 mt-0.5">
                    Kadang waktu terbuang saat hitung manual. Perlu kuasai trik rumus cepat dan penyederhanaan persen.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-2 bg-amber-950/20 p-2.5 rounded-xl border border-amber-500/20">
                <div className="w-4 h-4 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center font-black text-[10px] shrink-0 mt-0.5">!</div>
                <div>
                  <strong className="text-white">TWK Hafalan Pasal & Sejarah</strong>
                  <p className="text-slate-400 mt-0.5">
                    Pasal UUD 1945 & BPUPKI/PPKI masih sering tertukar. Buka AI Tutor buat minta jembatan keledai!
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Rekomendasi Langkah Hari Ini for Amru */}
        <div className="bg-slate-950/80 rounded-2xl p-4 border border-teal-500/20 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-teal-300 font-bold text-sm">
              <Target className="w-4.5 h-4.5 text-teal-400" />
              <span>Rekomendasi Langkah Amru Hari Ini</span>
            </div>
            <span className="text-[11px] text-slate-400">Klik checklist kalau udah selesai, Bro!</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            {/* Goal 1 */}
            <div 
              onClick={() => toggleGoal('goal1')}
              className={`p-3 rounded-xl border transition-all cursor-pointer flex items-start gap-2.5 ${
                completedGoals.goal1 
                  ? 'bg-teal-950/30 border-teal-500/50 text-slate-300' 
                  : 'bg-slate-900 border-slate-700/80 hover:border-slate-600 text-slate-200'
              }`}
            >
              {completedGoals.goal1 ? (
                <CheckSquare className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
              ) : (
                <Square className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
              )}
              <div className="space-y-1">
                <span className={`font-bold block ${completedGoals.goal1 ? 'line-through text-slate-400' : 'text-white'}`}>
                  1. Latihan 10 Soal Hitungan TIU
                </span>
                <p className="text-[11px] text-slate-400 leading-tight">
                  Tembus soal deret angka biar jemari lu terbiasa nemu pola rumusnya!
                </p>
              </div>
            </div>

            {/* Goal 2 */}
            <div 
              onClick={() => toggleGoal('goal2')}
              className={`p-3 rounded-xl border transition-all cursor-pointer flex items-start gap-2.5 ${
                completedGoals.goal2 
                  ? 'bg-teal-950/30 border-teal-500/50 text-slate-300' 
                  : 'bg-slate-900 border-slate-700/80 hover:border-slate-600 text-slate-200'
              }`}
            >
              {completedGoals.goal2 ? (
                <CheckSquare className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
              ) : (
                <Square className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
              )}
              <div className="space-y-1">
                <span className={`font-bold block ${completedGoals.goal2 ? 'line-through text-slate-400' : 'text-white'}`}>
                  2. Minta AI Jembatan Keledai TWK
                </span>
                <p className="text-[11px] text-slate-400 leading-tight">
                  Gunakan menu AI Tutor buat minta cara singkat hapal pasal UUD.
                </p>
              </div>
            </div>

            {/* Goal 3 */}
            <div 
              onClick={() => toggleGoal('goal3')}
              className={`p-3 rounded-xl border transition-all cursor-pointer flex items-start gap-2.5 ${
                completedGoals.goal3 
                  ? 'bg-teal-950/30 border-teal-500/50 text-slate-300' 
                  : 'bg-slate-900 border-slate-700/80 hover:border-slate-600 text-slate-200'
              }`}
            >
              {completedGoals.goal3 ? (
                <CheckSquare className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
              ) : (
                <Square className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
              )}
              <div className="space-y-1">
                <span className={`font-bold block ${completedGoals.goal3 ? 'line-through text-slate-400' : 'text-white'}`}>
                  3. Jajal Tantangan 10 Soal HOTS
                </span>
                <p className="text-[11px] text-slate-400 leading-tight">
                  Latihan kilat acak buat uji refleks & ketahanan mental Amru.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Target Passing Grade BKN - Informal Labels */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-teal-400" />
            <h2 className="text-lg font-bold text-white">Target Passing Grade BKN (Minimal Harus Amru Tembus!)</h2>
          </div>
          <span className="text-xs text-slate-400">Standar Resmi MenPAN-RB</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* TWK Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3 hover:border-slate-700 transition-all">
            <div className="flex items-center justify-between">
              <span className="px-2 py-0.5 rounded text-xs font-bold bg-blue-500/20 text-blue-400 border border-blue-500/30">
                TWK
              </span>
              <span className="text-xs text-slate-400">30 Soal</span>
            </div>
            <div>
              <div className="text-xs text-slate-400">Tes Wawasan Kebangsaan</div>
              <div className="text-2xl font-black text-white mt-0.5">
                {PASSING_GRADES.TWK} <span className="text-xs font-normal text-slate-400">/ 150 Poin</span>
              </div>
            </div>
            <p className="text-xs text-slate-400 line-clamp-2">
              Pancasila, UUD 1945, NKRI, Bhinneka Tunggal Ika, & Bahasa Indonesia.
            </p>
            <button
              onClick={() => onStartPractice('TWK')}
              className="w-full text-xs font-bold text-blue-400 hover:text-blue-300 flex items-center justify-between pt-2 border-t border-slate-800"
            >
              <span>Sikat TWK Bro &rarr;</span>
            </button>
          </div>

          {/* TIU Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3 hover:border-slate-700 transition-all">
            <div className="flex items-center justify-between">
              <span className="px-2 py-0.5 rounded text-xs font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30">
                TIU
              </span>
              <span className="text-xs text-slate-400">35 Soal</span>
            </div>
            <div>
              <div className="text-xs text-slate-400">Tes Intelegensi Umum</div>
              <div className="text-2xl font-black text-white mt-0.5">
                {PASSING_GRADES.TIU} <span className="text-xs font-normal text-slate-400">/ 175 Poin</span>
              </div>
            </div>
            <p className="text-xs text-slate-400 line-clamp-2">
              Verbal (Analogi), Numerik (Hitungan/Deret), & Figural.
            </p>
            <button
              onClick={() => onStartPractice('TIU')}
              className="w-full text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center justify-between pt-2 border-t border-slate-800"
            >
              <span>Latihan TIU Sekarang &rarr;</span>
            </button>
          </div>

          {/* TKP Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3 hover:border-slate-700 transition-all">
            <div className="flex items-center justify-between">
              <span className="px-2 py-0.5 rounded text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                TKP
              </span>
              <span className="text-xs text-slate-400">45 Soal</span>
            </div>
            <div>
              <div className="text-xs text-slate-400">Tes Karakteristik Pribadi</div>
              <div className="text-2xl font-black text-white mt-0.5">
                {PASSING_GRADES.TKP} <span className="text-xs font-normal text-slate-400">/ 225 Poin</span>
              </div>
            </div>
            <p className="text-xs text-slate-400 line-clamp-2">
              Pelayanan Publik, TIK, Jejaring Kerja, & Anti Radikalisme (Skor 1-5).
            </p>
            <button
              onClick={() => onStartPractice('TKP')}
              className="w-full text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center justify-between pt-2 border-t border-slate-800"
            >
              <span>Bantai TKP Dapet Skor 5 &rarr;</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Feature Cards Grid - Friendly Informal Actions */}
      <div className="space-y-3">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <Zap className="w-5 h-5 text-amber-400" />
          <span>Menu Tempur Amru</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Card 1: Simulasi CAT */}
          <div className="bg-slate-900 border border-slate-800 hover:border-teal-500/50 rounded-2xl p-5 space-y-4 transition-all group">
            <div className="w-12 h-12 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 group-hover:scale-110 transition-transform">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base">Simulasi CAT SKD Full (100 Menit)</h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Ujian simulasi persis asli BKN: 110 soal, timer 100 menit, tombol ragu-ragu, & hasil nilai instant.
              </p>
            </div>
            <button
              onClick={onStartCAT}
              className="w-full py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-slate-950 font-bold text-xs transition-colors flex items-center justify-center gap-2"
            >
              <Play className="w-3.5 h-3.5 fill-slate-950" />
              <span>Gasss Ujian Simulasi!</span>
            </button>
          </div>

          {/* Card 2: AI Coach & Tutor */}
          <div className="bg-slate-900 border border-slate-800 hover:border-amber-500/50 rounded-2xl p-5 space-y-4 transition-all group">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base flex items-center justify-between">
                <span>AI Coach CPNS Amru</span>
                <span className="text-[10px] font-black px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300">
                  GEMINI AI
                </span>
              </h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Bingung rumus cepat atau mau tanya trik hafalan? Curhat & minta buatkan soal HOTS baru ke AI Tutor!
              </p>
            </div>
            <button
              onClick={onOpenAITutor}
              className="w-full py-2.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 font-bold text-xs transition-colors flex items-center justify-center gap-2"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Buka AI Coach CPNS</span>
            </button>
          </div>

          {/* Card 3: Tantangan HOTS Harian */}
          <div className="bg-slate-900 border border-slate-800 hover:border-purple-500/50 rounded-2xl p-5 space-y-4 transition-all group">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
              <Target className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base">Tantangan Kilat (10 Soal HOTS)</h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Nggak punya waktu lama? Coba latihan 10 soal acak ini sebelum Amru tidur atau beraktivitas harian!
              </p>
            </div>
            <button
              onClick={onStartChallenge}
              className="w-full py-2.5 rounded-xl bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 border border-purple-500/40 font-bold text-xs transition-colors flex items-center justify-center gap-2"
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Cobain Tantangan Harian</span>
            </button>
          </div>

          {/* Card 4: Bank Soal Lengkap */}
          <div className="bg-slate-900 border border-slate-800 hover:border-blue-500/50 rounded-2xl p-5 space-y-4 transition-all group md:col-span-2 lg:col-span-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-base">Gudang Bank Soal SPMB & Pembahasan Detail</h3>
                  <p className="text-xs text-slate-400">
                    Tersedia {totalQuestionsCount}+ soal terverifikasi lengkap dengan trik cepat & kunci pembahasan.
                  </p>
                </div>
              </div>
              <button
                onClick={onOpenBank}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-xs transition-colors whitespace-nowrap"
              >
                Intip Bank Soal Bro &rarr;
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Pesan Motivasi Sahabat */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <HeartHandshake className="w-5 h-5 text-teal-400" />
          <span>3 Pesan Sahabat Biar Amru Lulus Tahun Ini</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-300">
          <div className="bg-slate-800/50 p-3.5 rounded-xl border border-slate-700/50 space-y-1.5">
            <div className="font-bold text-teal-300 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-teal-400" />
              <span>1. Manajemen Waktu 54 Detik</span>
            </div>
            <p className="text-slate-400">
              Setiap soal dikerjakan rata-rata 54 detik. Jangan mandek di 1 soal susah, lewati dulu dan kejar soal yang Amru udah jago!
            </p>
          </div>

          <div className="bg-slate-800/50 p-3.5 rounded-xl border border-slate-700/50 space-y-1.5">
            <div className="font-bold text-amber-300 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-amber-400" />
              <span>2. Trik Poin 5 TKP</span>
            </div>
            <p className="text-slate-400">
              TKP kuncinya ada di pola pikir ASN yang melayani, profesional, & fleksibel. Selalu pilih opsi paling positif tanpa emosi!
            </p>
          </div>

          <div className="bg-slate-800/50 p-3.5 rounded-xl border border-slate-700/50 space-y-1.5">
            <div className="font-bold text-purple-300 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-purple-400" />
              <span>3. Konsisten Tiap Hari</span>
            </div>
            <p className="text-slate-400">
              Lebih baik 15-20 menit latihan setiap hari daripada SKS semalam sebelum ujian. Semangat terus Amru Husayni!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

