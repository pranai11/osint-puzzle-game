
import React, { useState, useEffect, useCallback } from 'react';
import { LEVELS } from './data/levels';
import { Level, Question } from './types';
import ToolsPanel from './components/ToolsPanel';
import { CheckCircleIcon, XCircleIcon } from './components/icons';

const App: React.FC = () => {
  const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
  const [gameState, setGameState] = useState<'playing' | 'level-complete' | 'game-over'>('playing');
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [feedback, setFeedback] = useState<Record<number, boolean>>({});
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(0);
  const [usedHintsCount, setUsedHintsCount] = useState(0);

  const currentLevel = LEVELS[currentLevelIndex];

  useEffect(() => {
    if (gameState === 'playing') {
      const timer = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [gameState]);

  const resetForNewLevel = useCallback((levelIndex: number) => {
    setCurrentLevelIndex(levelIndex);
    setAnswers({});
    setFeedback({});
    setGameState('playing');
    setTime(0);
    setUsedHintsCount(0);
  }, []);
  
  const handleAnswerChange = (questionId: number, value: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const handleSubmit = () => {
    const newFeedback: Record<number, boolean> = {};
    let allCorrect = true;
    let correctCount = 0;

    currentLevel.questions.forEach(q => {
      const isCorrect = (answers[q.id] || '').trim().toLowerCase() === q.answer.toLowerCase();
      newFeedback[q.id] = isCorrect;
      if (isCorrect) {
        correctCount++;
      } else {
        allCorrect = false;
      }
    });

    setFeedback(newFeedback);

    if (allCorrect) {
      // Calculate score: base score + time bonus - hint penalty
      const timeBonus = Math.max(0, 300 - time); // Bonus for finishing under 5 mins
      const hintPenalty = usedHintsCount * 50;
      const levelScore = 1000 + timeBonus - hintPenalty;
      setScore(prev => prev + levelScore);
      setGameState('level-complete');
    }
  };

  const handleNextLevel = () => {
    const nextLevelIndex = currentLevelIndex + 1;
    if (nextLevelIndex < LEVELS.length) {
      resetForNewLevel(nextLevelIndex);
    } else {
      setGameState('game-over');
    }
  };

  const handleRestart = () => {
    setScore(0);
    resetForNewLevel(0);
  };

  const handleUseHint = () => {
    if(usedHintsCount < currentLevel.hints.length) {
        setUsedHintsCount(prev => prev + 1);
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  const renderLevelContent = (level: Level) => (
    <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6 h-full flex flex-col">
      <h2 className="text-2xl font-bold text-cyan-400 mb-2">{level.title}</h2>
      <p className="text-gray-400 mb-4 italic">{level.scenario}</p>
      
      <div className="flex flex-wrap gap-4 mb-4">
        {level.imageUrls.map((url, index) => (
            <div key={index} className="flex-1 min-w-[280px] rounded-lg overflow-hidden border-2 border-gray-700 hover:border-cyan-500 transition-colors duration-300">
                <img src={url} alt={`Evidence ${index + 1}`} className="w-full h-full object-cover"/>
            </div>
        ))}
      </div>

      <div className="space-y-4">
        {level.questions.map((q) => (
          <div key={q.id}>
            <label htmlFor={`q-${q.id}`} className="block text-sm font-medium text-gray-300 mb-1">{q.text}</label>
            <div className="relative">
              <input
                type="text"
                id={`q-${q.id}`}
                value={answers[q.id] || ''}
                onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                disabled={gameState !== 'playing'}
                className="w-full bg-gray-900 border border-gray-600 rounded-md py-2 px-3 text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none transition"
              />
              {feedback[q.id] === true && <CheckCircleIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-green-500" />}
              {feedback[q.id] === false && <XCircleIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-red-500" />}
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-auto pt-6">
        {gameState === 'playing' && (
          <button onClick={handleSubmit} className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 px-4 rounded-lg transition duration-300">
            Submit Analysis
          </button>
        )}
      </div>
    </div>
  );

  const renderOverlay = () => {
    if (gameState === 'level-complete') {
      return (
        <div className="absolute inset-0 bg-black/70 flex items-center justify-center backdrop-blur-sm z-10">
          <div className="bg-gray-800 p-8 rounded-lg border border-cyan-500 text-center shadow-2xl">
            <h2 className="text-3xl font-bold text-green-400 mb-2">Success!</h2>
            <p className="text-gray-300 mb-6">You've cracked the case. Proceed to the next assignment.</p>
            <button onClick={handleNextLevel} className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-2 px-6 rounded-lg transition">
              Next Level
            </button>
          </div>
        </div>
      );
    }
    if (gameState === 'game-over') {
       return (
        <div className="absolute inset-0 bg-black/70 flex items-center justify-center backdrop-blur-sm z-10">
          <div className="bg-gray-800 p-8 rounded-lg border border-cyan-500 text-center shadow-2xl">
            <h2 className="text-3xl font-bold text-cyan-400 mb-2">Game Complete</h2>
            <p className="text-gray-300 mb-4">Your final score is: <span className="font-bold text-white">{score}</span></p>
            <p className="text-gray-400 mb-6">A true digital ghost. Well done, agent.</p>
            <button onClick={handleRestart} className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-2 px-6 rounded-lg transition">
              Play Again
            </button>
          </div>
        </div>
      );
    }
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-6 pb-4 border-b-2 border-gray-700 flex justify-between items-center">
          <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-wider">
                OSINT<span className="text-cyan-400">::GUARDIAN</span>
              </h1>
              <p className="text-sm text-gray-400">Level {currentLevelIndex + 1} of {LEVELS.length}</p>
          </div>
          <div className="text-right">
              <div className="text-lg font-semibold text-white">Score: <span className="text-cyan-400">{score}</span></div>
              <div className="text-sm text-gray-400 font-mono">Time: {formatTime(time)}</div>
          </div>
        </header>
        
        <main className="grid grid-cols-1 lg:grid-cols-5 gap-6 relative">
          <div className="lg:col-span-3">
             {renderLevelContent(currentLevel)}
          </div>
          <div className="lg:col-span-2">
            <ToolsPanel level={currentLevel} onHintUsed={handleUseHint} usedHintsCount={usedHintsCount} />
          </div>
          {renderOverlay()}
        </main>
      </div>
    </div>
  );
};

export default App;
