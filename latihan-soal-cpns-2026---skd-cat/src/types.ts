export type QuestionCategory = 'TWK' | 'TIU' | 'TKP';

export type SubCategoryTWK = 
  | 'Pancasila & Lambang Negara'
  | 'UUD 1945 & Konstitusi'
  | 'Bhinneka Tunggal Ika'
  | 'NKRI & Sejarah Nasional'
  | 'Nasionalisme & Bela Negara'
  | 'Bahasa Indonesia';

export type SubCategoryTIU = 
  | 'Verbal Analogi'
  | 'Verbal Silogisme'
  | 'Verbal Analitis'
  | 'Numerik Deret Angka'
  | 'Numerik Berhitung Cepat'
  | 'Numerik Soal Cerita'
  | 'Penalaran Figural';

export type SubCategoryTKP = 
  | 'Pelayanan Publik'
  | 'Jejaring Kerja'
  | 'Sosial Budaya'
  | 'Teknologi Informasi & Komunikasi'
  | 'Profesionalisme'
  | 'Anti Radikalisme';

export type SubCategory = SubCategoryTWK | SubCategoryTIU | SubCategoryTKP;

export interface Option {
  key: 'A' | 'B' | 'C' | 'D' | 'E';
  text: string;
  /** For TKP, score ranges from 1 to 5. For TWK & TIU, 5 if correct, 0 if wrong. */
  score?: number;
}

export interface Question {
  id: string;
  category: QuestionCategory;
  subCategory: SubCategory;
  question: string;
  codeOrTable?: string;
  options: Option[];
  /** Correct key for TWK/TIU (A-E) */
  correctAnswer?: 'A' | 'B' | 'C' | 'D' | 'E';
  explanation: string;
  quickTrick?: string; // Rumus cepat atau tips trik khusus
  difficulty: 'Mudah' | 'Sedang' | 'HOTS';
  yearSource?: string; // e.g., 'Soal Standar BKN / SPMB'
}

export interface ExamSession {
  id: string;
  mode: 'simulasi_cat' | 'latihan_kategori' | 'tantangan_harian' | 'ai_generated';
  categoryFilter?: QuestionCategory | 'ALL';
  questions: Question[];
  userAnswers: Record<string, 'A' | 'B' | 'C' | 'D' | 'E'>; // questionId -> option key
  flaggedQuestions: Record<string, boolean>; // questionId -> boolean (ragu-ragu)
  startTime: number; // timestamp
  timeLimitSeconds: number; // default 6000 seconds (100 min) for CAT
  timeRemainingSeconds: number;
  completedAt?: number; // timestamp
}

export interface ExamResultSummary {
  sessionId: string;
  date: string;
  modeName: string;
  totalQuestions: number;
  answeredCount: number;
  timeSpentSeconds: number;
  
  scoreTWK: number;
  maxTWK: number;
  scoreTIU: number;
  maxTIU: number;
  scoreTKP: number;
  maxTKP: number;
  totalScore: number;
  maxTotalScore: number;

  passedTWK: boolean; // >= 65
  passedTIU: boolean; // >= 80
  passedTKP: boolean; // >= 166
  passedAll: boolean;
}

export interface UserStats {
  totalExams: number;
  totalPassed: number;
  highestScore: number;
  averageScore: number;
  totalQuestionsAnswered: number;
  correctPercentageTWK: number;
  correctPercentageTIU: number;
  correctPercentageTKP: number;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  suggestedQuestions?: string[];
}

// BKN CPNS SKD Official Thresholds (Standard Passing Grades)
export const PASSING_GRADES = {
  TWK: 65,  // Min 65 out of 150 (13 correct out of 30)
  TIU: 80,  // Min 80 out of 175 (16 correct out of 35)
  TKP: 166, // Min 166 out of 225 (avg 3.69 per question out of 45)
  TOTAL_MAX: 550,
};
