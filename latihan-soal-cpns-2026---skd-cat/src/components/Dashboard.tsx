import React from 'react';
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
  HelpCircle,
  FileText,
  ShieldCheck
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
  return (
    <div className="space-y-8 pb-12">
      {/* Hero Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-teal-950 p-6 sm:p-8 border border-slate-700/60 shadow-xl">
        <div className="absolute -right-12 -top-12 w-64 h-64 rounded-full bg-teal-500/10 blur-3xl pointer-events-none" />
        <div className="absolute right-1/3 -bottom-12 w-64 h-64 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 text-teal-300 border border-teal-500/20 text-xs font-medium">
            <Sparkles className="w-3.5 h-3.5 text-teal-400" />
            <span>Bank Soal Standar BKN & SPMB 2026 Updated</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white leading-tight">
            Aplikasi Latihan & Simulasi <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-teal-300 via-emerald-400 to-amber-300 bg-clip-text text-transparent">
              CAT SKD CPNS 2026
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
            Siapkan diri Anda menghadapi Seleksi Kompetensi Dasar (SKD) CPNS dengan simulasi sistem CAT resmi BKN, bank soal HOTS terintegrasi (TWK, TIU, TKP), dan pembahasan AI Tutor otomatis.
          </p>

          <div className="pt-2 flex flex-wrap gap-3">
            <button
              id="btn-hero-cat"
              onClick={onStartCAT}
              className="flex items-center gap-2.5 px-5 py-3 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-slate-950 font-bold text-sm shadow-lg shadow-teal-500/25 transition-all transform active:scale-95"
            >
              <Play className="w-4 h-4 fill-slate-950" />
              <span>Mulai Simulasi CAT BKN (100 Menit)</span>
            </button>

            <button
              id="btn-hero-practice"
              onClick={() => onStartPractice()}
              className="flex items-center gap-2 px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-600/80 font-semibold text-sm transition-all"
            >
              <BookOpen className="w-4 h-4 text-teal-400" />
              <span>Latihan Per Kategori</span>
            </button>
          </div>
        </div>
      </div>

      {/* Passing Grade Official BKN Reference Cards */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-teal-400" />
            <h2 className="text-lg font-bold text-white">Target Passing Grade Resmi SKD CPNS</h2>
          </div>
          <span className="text-xs text-slate-400">KepmenPAN-RB Terkini</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* TWK Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-3 hover:border-slate-700 transition-all">
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
              Pancasila, UUD 1945, NKRI, Bhinneka Tunggal Ika, Nasionalisme, & Bahasa Indonesia.
            </p>
            <button
              onClick={() => onStartPractice('TWK')}
              className="w-full text-xs font-semibold text-blue-400 hover:text-blue-300 flex items-center justify-between pt-1 border-t border-slate-800"
            >
              <span>Latihan TWK</span>
              <span>&rarr;</span>
            </button>
          </div>

          {/* TIU Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-3 hover:border-slate-700 transition-all">
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
              Verbal (Analogi/Silogisme), Numerik (Deret/Berhitung), & Figural.
            </p>
            <button
              onClick={() => onStartPractice('TIU')}
              className="w-full text-xs font-semibold text-amber-400 hover:text-amber-300 flex items-center justify-between pt-1 border-t border-slate-800"
            >
              <span>Latihan TIU</span>
              <span>&rarr;</span>
            </button>
          </div>

          {/* TKP Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-3 hover:border-slate-700 transition-all">
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
              Pelayanan Publik, TIK, Jejaring Kerja, Profesionalisme, & Anti Radikalisme (Skor 1-5).
            </p>
            <button
              onClick={() => onStartPractice('TKP')}
              className="w-full text-xs font-semibold text-emerald-400 hover:text-emerald-300 flex items-center justify-between pt-1 border-t border-slate-800"
            >
              <span>Latihan TKP</span>
              <span>&rarr;</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Feature Cards Grid */}
      <div className="space-y-3">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <Zap className="w-5 h-5 text-amber-400" />
          <span>Fitur Latihan & Modul Belajar</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Card 1: Simulasi CAT */}
          <div className="bg-slate-900 border border-slate-800 hover:border-teal-500/50 rounded-2xl p-5 space-y-4 transition-all group">
            <div className="w-12 h-12 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 group-hover:scale-110 transition-transform">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base">Simulasi CAT SKD BKN</h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Ujian simulasi lengkap 110 soal dengan alokasi waktu 100 menit, navigasi ragu-ragu, dan kalkulasi nilai instant.
              </p>
            </div>
            <button
              onClick={onStartCAT}
              className="w-full py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-slate-950 font-bold text-xs transition-colors flex items-center justify-center gap-2"
            >
              <Play className="w-3.5 h-3.5 fill-slate-950" />
              <span>Mulai Ujian Simulasi</span>
            </button>
          </div>

          {/* Card 2: AI Coach & Tutor */}
          <div className="bg-slate-900 border border-slate-800 hover:border-amber-500/50 rounded-2xl p-5 space-y-4 transition-all group">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base flex items-center justify-between">
                <span>AI Tutor & Generator</span>
                <span className="text-[10px] font-black px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300">
                  GEMINI AI
                </span>
              </h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Tanyakan rumus cepat, jembatan keledai TWK, atau buat soal HOTS baru sesuai topik yang ingin Anda perdalam.
              </p>
            </div>
            <button
              onClick={onOpenAITutor}
              className="w-full py-2.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 font-bold text-xs transition-colors flex items-center justify-center gap-2"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Buka AI Coach CPNS</span>
            </button>
          </div>

          {/* Card 3: Tantangan HOTS Harian */}
          <div className="bg-slate-900 border border-slate-800 hover:border-purple-500/50 rounded-2xl p-5 space-y-4 transition-all group">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
              <Target className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base">Tantangan Harian (10 Soal)</h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Latihan singkat 10 soal acak tingkat HOTS untuk melatih fokus harian sebelum berangkat beraktivitas.
              </p>
            </div>
            <button
              onClick={onStartChallenge}
              className="w-full py-2.5 rounded-xl bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 border border-purple-500/40 font-bold text-xs transition-colors flex items-center justify-center gap-2"
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Mulai Tantangan Harian</span>
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
                  <h3 className="font-bold text-white text-base">Eksplorasi Bank Soal SPMB & Pembahasan</h3>
                  <p className="text-xs text-slate-400">
                    Tersedia {totalQuestionsCount}+ soal terverifikasi lengkap dengan jawaban, rumus cepat, & pembahasan detail.
                  </p>
                </div>
              </div>
              <button
                onClick={onOpenBank}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold text-xs transition-colors whitespace-nowrap"
              >
                Buka Bank Soal &rarr;
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tips Strategi Lulus CPNS 2026 */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Award className="w-5 h-5 text-amber-400" />
          <span>3 Strategi Utama Lulus SKD CPNS 2026</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-300">
          <div className="bg-slate-800/50 p-3.5 rounded-xl border border-slate-700/50 space-y-1.5">
            <div className="font-bold text-teal-300 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              <span>1. Manajemen Waktu 54 Detik</span>
            </div>
            <p className="text-slate-400">
              Setiap soal idealnya dikerjakan dalam ~54 detik. Dahulukan soal TKP dan TWK yang membutuhkan membaca singkat, lalu alokasikan waktu lebih untuk hitungan TIU.
            </p>
          </div>

          <div className="bg-slate-800/50 p-3.5 rounded-xl border border-slate-700/50 space-y-1.5">
            <div className="font-bold text-amber-300 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              <span>2. Trik Nilai 5 pada TKP</span>
            </div>
            <p className="text-slate-400">
              Soal TKP tidak ada jawaban salah (skor 1-5). Pilih opsi yang mencerminkan ASN profesional, ramah pelayanan publik, dan solutif tanpa memicu konflik.
            </p>
          </div>

          <div className="bg-slate-800/50 p-3.5 rounded-xl border border-slate-700/50 space-y-1.5">
            <div className="font-bold text-purple-300 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              <span>3. Evaluasi dengan AI Pembahasan</span>
            </div>
            <p className="text-slate-400">
              Jangan hanya melihat kunci jawaban. Gunakan fitur AI Pembahasan untuk memahami pola konsep dan rumus cepat saat menemukan soal sulit.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
