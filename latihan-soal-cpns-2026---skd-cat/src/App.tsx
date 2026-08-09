import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Dashboard } from './components/Dashboard';
import { CategoryPractice } from './components/CategoryPractice';
import { CATSimulation } from './components/CATSimulation';
import { ExamResult } from './components/ExamResult';
import { QuestionBank } from './components/QuestionBank';
import { AITutorGenerator } from './components/AITutorGenerator';
import { StatisticsHistory } from './components/StatisticsHistory';
import { BookmarkView } from './components/BookmarkView';

import { INITIAL_QUESTIONS } from './data/cpnsQuestions';
import { Question, ExamResultSummary, ExamSession, QuestionCategory } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [questions, setQuestions] = useState<Question[]>(INITIAL_QUESTIONS);

  // LocalStorage state for Bookmarks
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('cpns_bookmarks');
      return saved ? JSON.parse(saved) : ['twk-01', 'tiu-05', 'tkp-03'];
    } catch {
      return ['twk-01', 'tiu-05', 'tkp-03'];
    }
  });

  // LocalStorage state for Exam History
  const [historyList, setHistoryList] = useState<ExamResultSummary[]>(() => {
    try {
      const saved = localStorage.getItem('cpns_history');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Active Exam Session & Result state
  const [currentResult, setCurrentResult] = useState<ExamResultSummary | null>(null);
  const [currentSession, setCurrentSession] = useState<ExamSession | null>(null);

  // Practice category pre-filter
  const [practiceCategory, setPracticeCategory] = useState<QuestionCategory | 'ALL'>('ALL');

  // AI Tutor question to explain trigger
  const [questionToExplain, setQuestionToExplain] = useState<{ question: Question; userAns?: string } | undefined>(undefined);

  // Save Bookmarks to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('cpns_bookmarks', JSON.stringify(bookmarkedIds));
    } catch (e) {
      console.error('Failed to save bookmarks:', e);
    }
  }, [bookmarkedIds]);

  // Save History to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('cpns_history', JSON.stringify(historyList));
    } catch (e) {
      console.error('Failed to save history:', e);
    }
  }, [historyList]);

  const handleToggleBookmark = (id: string) => {
    setBookmarkedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleAddGeneratedQuestions = (newQuestions: Question[]) => {
    setQuestions((prev) => {
      const existingIds = new Set(prev.map((q) => q.id));
      const filteredNew = newQuestions.filter((q) => !existingIds.has(q.id));
      return [...filteredNew, ...prev];
    });
  };

  const handleStartCAT = () => {
    setActiveTab('cat_sim');
  };

  const handleStartPractice = (category?: QuestionCategory) => {
    setPracticeCategory(category || 'ALL');
    setActiveTab('practice');
  };

  const handleStartChallenge = () => {
    setPracticeCategory('ALL');
    setActiveTab('practice');
  };

  const handleFinishExam = (result: ExamResultSummary, session: ExamSession) => {
    setCurrentResult(result);
    setCurrentSession(session);
    setHistoryList((prev) => [result, ...prev]);
    setActiveTab('exam_result');
  };

  const handleAskAI = (question: Question, selectedKey?: string) => {
    setQuestionToExplain({ question, userAns: selectedKey });
    setActiveTab('ai_tutor');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-teal-500 selection:text-slate-950 flex flex-col">
      {/* Top Header Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        bookmarkCount={bookmarkedIds.length}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {activeTab === 'dashboard' && (
          <Dashboard
            onStartCAT={handleStartCAT}
            onStartPractice={handleStartPractice}
            onStartChallenge={handleStartChallenge}
            onOpenAITutor={() => setActiveTab('ai_tutor')}
            onOpenBank={() => setActiveTab('bank')}
            totalQuestionsCount={questions.length}
          />
        )}

        {activeTab === 'practice' && (
          <CategoryPractice
            questions={questions}
            bookmarkedIds={bookmarkedIds}
            onToggleBookmark={handleToggleBookmark}
            onAskAI={handleAskAI}
            initialCategory={practiceCategory}
          />
        )}

        {activeTab === 'cat_sim' && (
          <CATSimulation
            allQuestions={questions}
            onFinishExam={handleFinishExam}
            onExit={() => setActiveTab('dashboard')}
          />
        )}

        {activeTab === 'exam_result' && currentResult && currentSession && (
          <ExamResult
            result={currentResult}
            session={currentSession}
            onRestart={handleStartCAT}
            onAskAI={handleAskAI}
          />
        )}

        {activeTab === 'bank' && (
          <QuestionBank
            questions={questions}
            bookmarkedIds={bookmarkedIds}
            onToggleBookmark={handleToggleBookmark}
            onAskAI={handleAskAI}
          />
        )}

        {activeTab === 'ai_tutor' && (
          <AITutorGenerator
            onAddGeneratedQuestions={handleAddGeneratedQuestions}
            initialQuestionToExplain={questionToExplain}
          />
        )}

        {activeTab === 'stats' && (
          <StatisticsHistory
            historyList={historyList}
            onClearHistory={() => setHistoryList([])}
            onSelectResult={(res) => {
              setCurrentResult(res);
              // Result session if matching
            }}
          />
        )}

        {activeTab === 'bookmarks' && (
          <BookmarkView
            questions={questions}
            bookmarkedIds={bookmarkedIds}
            onToggleBookmark={handleToggleBookmark}
            onAskAI={handleAskAI}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-slate-300">CPNS Master SKD 2026</span>
            <span>— Simulasi Ujian CAT BKN & SPMB</span>
          </div>
          <div>
            Powered by Google Gemini AI Tutor & Analytics
          </div>
        </div>
      </footer>
    </div>
  );
}
