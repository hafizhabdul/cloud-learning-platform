import React, { useState, useEffect, useCallback } from 'react';
import { Clock, CheckCircle, XCircle, ArrowLeft, RotateCcw } from 'lucide-react';
import type { AzureQuiz, AzureQuizAttempt } from '../../types/azure';

interface AzureQuizComponentProps {
  quiz: AzureQuiz;
  onComplete: (attempt: AzureQuizAttempt) => void;
  onExit: () => void;
}

export const AzureQuizComponent: React.FC<AzureQuizComponentProps> = ({
  quiz,
  onComplete,
  onExit
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string[]>>({});
  const [timeLeft, setTimeLeft] = useState(quiz.timeLimit * 60); // Convert minutes to seconds
  const [isCompleted, setIsCompleted] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  const currentQuestion = quiz.questions[currentQuestionIndex];

  useEffect(() => {
    if (timeLeft > 0 && !isCompleted) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !isCompleted) {
      handleSubmit();
    }
  }, [timeLeft, isCompleted]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerSelect = (questionId: string, optionId: string) => {
    if (currentQuestion.type === 'multiple-select') {
      const currentAnswers = answers[questionId] || [];
      const updatedAnswers = currentAnswers.includes(optionId)
        ? currentAnswers.filter(id => id !== optionId)
        : [...currentAnswers, optionId];
      setAnswers({ ...answers, [questionId]: updatedAnswers });
    } else {
      setAnswers({ ...answers, [questionId]: [optionId] });
    }
  };

  const calculateScore = useCallback(() => {
    let correctCount = 0;
    
    quiz.questions.forEach(question => {
      const userAnswers = answers[question.id] || [];
      const correctAnswers = question.correctAnswers;
      
      if (userAnswers.length === correctAnswers.length && 
          userAnswers.every(answer => correctAnswers.includes(answer))) {
        correctCount++;
      }
    });

    return Math.round((correctCount / quiz.questions.length) * 100);
  }, [quiz.questions, answers]);

  const handleSubmit = useCallback(() => {
    const finalScore = calculateScore();
    setScore(finalScore);
    setIsCompleted(true);
    setShowResults(true);

    const attempt: AzureQuizAttempt = {
      id: `attempt-${Date.now()}`,
      date: new Date(),
      score: finalScore,
      timeSpent: (quiz.timeLimit * 60) - timeLeft,
      answers
    };

    onComplete(attempt);
  }, [calculateScore, timeLeft, answers, onComplete, quiz.timeLimit]);

  const nextQuestion = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const previousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const getAnswerStatus = (questionId: string, optionId: string) => {
    if (!showResults) return null;
    
    const question = quiz.questions.find(q => q.id === questionId);
    const userAnswers = answers[questionId] || [];
    const isUserSelected = userAnswers.includes(optionId);
    const isCorrect = question?.correctAnswers.includes(optionId);

    if (isCorrect && isUserSelected) return 'correct';
    if (isCorrect && !isUserSelected) return 'missed';
    if (!isCorrect && isUserSelected) return 'wrong';
    return null;
  };

  const getAnswerStatusColor = (status: string | null) => {
    switch (status) {
      case 'correct':
        return 'bg-green-100 border-green-500 text-green-800';
      case 'missed':
        return 'bg-yellow-100 border-yellow-500 text-yellow-800';
      case 'wrong':
        return 'bg-red-100 border-red-500 text-red-800';
      default:
        return 'bg-white border-gray-300 text-gray-900 hover:border-blue-500';
    }
  };

  if (showResults) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Quiz Results</h2>
            <div className={`text-6xl font-bold mb-4 ${score >= quiz.passingScore ? 'text-green-600' : 'text-red-600'}`}>
              {score}%
            </div>
            <p className={`text-xl ${score >= quiz.passingScore ? 'text-green-600' : 'text-red-600'}`}>
              {score >= quiz.passingScore ? 'Congratulations! You passed!' : 'Keep studying and try again!'}
            </p>
            <p className="text-gray-600 mt-2">
              Passing score: {quiz.passingScore}% | Time spent: {formatTime((quiz.timeLimit * 60) - timeLeft)}
            </p>
          </div>

          <div className="space-y-6">
            {quiz.questions.map((question, index) => {
              const userAnswers = answers[question.id] || [];
              const isCorrect = userAnswers.length === question.correctAnswers.length && 
                               userAnswers.every(answer => question.correctAnswers.includes(answer));

              return (
                <div key={question.id} className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-start space-x-3 mb-4">
                    {isCorrect ? (
                      <CheckCircle className="w-6 h-6 text-green-500 mt-1" />
                    ) : (
                      <XCircle className="w-6 h-6 text-red-500 mt-1" />
                    )}
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">
                        Question {index + 1}: {question.question}
                      </h3>
                      <div className="space-y-2">
                        {question.options.map((option) => {
                          const status = getAnswerStatus(question.id, option.id);
                          return (
                            <div
                              key={option.id}
                              className={`p-3 rounded-lg border-2 ${getAnswerStatusColor(status)}`}
                            >
                              <div className="flex items-center space-x-3">
                                <span className="font-medium">{option.text}</span>
                                {status === 'correct' && <CheckCircle className="w-4 h-4 text-green-600" />}
                                {status === 'wrong' && <XCircle className="w-4 h-4 text-red-600" />}
                                {status === 'missed' && <span className="text-yellow-600 text-sm">(Correct answer)</span>}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                        <p className="text-sm text-blue-800">
                          <strong>Explanation:</strong> {question.explanation}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex justify-center space-x-4 mt-8">
            <button
              onClick={onExit}
              className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors"
            >
              Back to Module
            </button>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors flex items-center space-x-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Retake Quiz</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex items-center justify-between">
          <button
            onClick={onExit}
            className="flex items-center space-x-2 text-blue-600 hover:text-blue-700"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Exit Quiz</span>
          </button>
          
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-gray-500" />
              <span className={`font-medium ${timeLeft < 300 ? 'text-red-600' : 'text-gray-700'}`}>
                {formatTime(timeLeft)}
              </span>
            </div>
            <div className="text-sm text-gray-600">
              Question {currentQuestionIndex + 1} of {quiz.questions.length}
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Progress</span>
          <span className="text-sm text-gray-600">
            {Math.round(((currentQuestionIndex + 1) / quiz.questions.length) * 100)}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestionIndex + 1) / quiz.questions.length) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Question */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            {currentQuestion.question}
          </h2>
          <div className="flex items-center space-x-4 text-sm text-gray-600 mb-6">
            <span className={`px-2 py-1 rounded-full ${
              currentQuestion.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
              currentQuestion.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
              'bg-red-100 text-red-800'
            }`}>
              {currentQuestion.difficulty}
            </span>
            <span>Type: {currentQuestion.type}</span>
            {currentQuestion.type === 'multiple-select' && (
              <span className="text-blue-600">Select all that apply</span>
            )}
          </div>
        </div>

        <div className="space-y-3 mb-8">
          {currentQuestion.options.map((option) => {
            const isSelected = (answers[currentQuestion.id] || []).includes(option.id);
            return (
              <button
                key={option.id}
                onClick={() => handleAnswerSelect(currentQuestion.id, option.id)}
                className={`w-full p-4 text-left border-2 rounded-lg transition-colors ${
                  isSelected
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-300 hover:border-blue-300'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-4 h-4 rounded-full border-2 ${
                    isSelected ? 'border-blue-500 bg-blue-500' : 'border-gray-400'
                  }`}>
                    {isSelected && <div className="w-2 h-2 bg-white rounded-full mx-auto mt-1"></div>}
                  </div>
                  <span className="text-gray-900">{option.text}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={previousQuestion}
            disabled={currentQuestionIndex === 0}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 disabled:text-gray-400 disabled:cursor-not-allowed"
          >
            Previous
          </button>

          <div className="flex space-x-4">
            {currentQuestionIndex === quiz.questions.length - 1 ? (
              <button
                onClick={handleSubmit}
                className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
              >
                Submit Quiz
              </button>
            ) : (
              <button
                onClick={nextQuestion}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
              >
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
