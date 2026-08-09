import React from 'react';
import { ExamResultSummary, PASSING_GRADES } from '../types';
import { 
  BarChart2, 
  Award, 
  TrendingUp, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  RotateCcw 
} from 'lucide-react';

interface StatisticsHistoryProps {
  historyList: ExamResultSummary[];
  onClearHistory: () => void;
  onSelectResult: (res: ExamResultSummary) => void;
}

export const StatisticsHistory: React.FC<StatisticsHistoryProps> = ({
  historyList,
  onClearHistory,
  onSelectResult,
}) => {
  const totalExams = historyList.length;
  const passedExams = historyList.filter((h) => h.passedAll).length;
  const passRate = totalExams > 0 ? Math.round((passedExams / totalExams) * 100) : 0;
  const highestScore = totalExams > 0 ? Math.max(...historyList.map((h) => h.totalScore)) : 0;
  const averageScore = totalExams > 0 
    ? Math.round(historyList.reduce((acc, curr) => acc + curr.totalScore, 0) / totalExams) 
    : 0;

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-teal-500/20 text-teal-400 border border-teal-500/30 flex items-center justify-center font-bold">
            <BarChart2 className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-bold text-white text-base">Statistik & Riwayat Tryout SKD</h2>
            <p className="text-xs text-slate-400">Analisis perkembangan nilai dan tingkat kelulusan passing grade BKN Anda</p>
          </div>
        </div>

        {totalExams > 0 && (
          <button
            onClick={onClearHistory}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-rose-300 border border-slate-700 text-xs font-semibold"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Riwayat</span>
          </button>
        )}
      </div>

      {/* Overview Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-1">
          <span className="text-xs text-slate-400">Total Ujian CAT</span>
          <div className="text-2xl font-black text-white">{totalExams} <span className="text-xs font-normal text-slate-400">kali</span></div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-1">
          <span className="text-xs text-slate-400">Tingkat Kelulusan</span>
          <div className="text-2xl font-black text-emerald-400">{passRate}%</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-1">
          <span className="text-xs text-slate-400">Skor Tertinggi</span>
          <div className="text-2xl font-black text-amber-400">{highestScore} <span className="text-xs font-normal text-slate-400">/ 550</span></div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-1">
          <span className="text-xs text-slate-400">Rata-rata Skor</span>
          <div className="text-2xl font-black text-teal-300">{averageScore}</div>
        </div>
      </div>

      {/* History Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl overflow-hidden">
        <h3 className="font-bold text-white text-sm">Daftar Riwayat Ujian</h3>

        {historyList.length === 0 ? (
          <div className="text-center py-12 text-slate-400 space-y-2">
            <Clock className="w-10 h-10 mx-auto text-slate-600" />
            <p className="text-sm">Belum ada riwayat simulasi yang diselesaikan.</p>
            <p className="text-xs text-slate-500">Selesaikan simulasi CAT atau latihan soal untuk melihat statistik di sini.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950 text-slate-400 font-bold border-b border-slate-800">
                <tr>
                  <th className="p-3">Tanggal</th>
                  <th className="p-3">Mode</th>
                  <th className="p-3 text-center">TWK</th>
                  <th className="p-3 text-center">TIU</th>
                  <th className="p-3 text-center">TKP</th>
                  <th className="p-3 text-center">Total Skor</th>
                  <th className="p-3 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {historyList.map((item) => (
                  <tr key={item.sessionId} className="hover:bg-slate-800/40 transition-colors">
                    <td className="p-3 font-semibold text-white whitespace-nowrap">{item.date}</td>
                    <td className="p-3 whitespace-nowrap">{item.modeName}</td>
                    <td className="p-3 text-center font-bold text-blue-400">{item.scoreTWK}</td>
                    <td className="p-3 text-center font-bold text-amber-400">{item.scoreTIU}</td>
                    <td className="p-3 text-center font-bold text-emerald-400">{item.scoreTKP}</td>
                    <td className="p-3 text-center font-black text-white text-sm">{item.totalScore}</td>
                    <td className="p-3 text-center whitespace-nowrap">
                      <span className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] inline-flex items-center gap-1 ${
                        item.passedAll ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                      }`}>
                        {item.passedAll ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                        {item.passedAll ? 'LULUS' : 'TIDAK LULUS'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
