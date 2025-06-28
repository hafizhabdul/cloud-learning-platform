import React, { useState, useEffect } from 'react';
import type { Quiz, Question, QuizAttempt } from '../../types/aws';
import { 
  Clock, 
  CheckCircle, 
  XCircle, 
  ArrowLeft, 
  ArrowRight,
  RotateCcw,
  Award,
  AlertCircle
} from 'lucide-react';

interface QuizComponentProps {
  quiz: Quiz;
  onComplete: (attempt: QuizAttempt) => void;
  onExit: () => void;
}

export const QuizComponent: React.FC<QuizComponentProps> = ({
  quiz,
  onComplete,
  onExit
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [questionId: string]: string | string[] }>({});
  const [timeRemaining, setTimeRemaining] = useState(quiz.timeLimit * 60); // Convert to seconds
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [attempt, setAttempt] = useState<QuizAttempt | null>(null);

  const currentQuestion = quiz.questions[currentQuestionIndex];

  const calculateScore = React.useCallback((): number => {
    let totalPoints = 0;
    let earnedPoints = 0;

    quiz.questions.forEach(question => {
      totalPoints += question.points;
      const userAnswer = answers[question.id];
      
      if (question.type === 'multiple-select') {
        const correctAnswers = Array.isArray(question.correctAnswer) 
          ? question.correctAnswer 
          : [question.correctAnswer];
        const userAnswers = Array.isArray(userAnswer) ? userAnswer : [];
        
        // Partial credit for multiple select
        if (userAnswers.length > 0) {
          const correctSelected = userAnswers.filter(ans => correctAnswers.includes(ans)).length;
          const incorrectSelected = userAnswers.filter(ans => !correctAnswers.includes(ans)).length;
          const partialScore = Math.max(0, (correctSelected - incorrectSelected) / correctAnswers.length);
          earnedPoints += question.points * partialScore;
        }
      } else {
        if (userAnswer === question.correctAnswer) {
          earnedPoints += question.points;
        }
      }
    });

    return totalPoints > 0 ? Math.round((earnedPoints / totalPoints) * 100) : 0;
  }, [answers, quiz.questions]);

  const handleSubmitQuiz = React.useCallback(() => {
    if (!attempt) return;

    const score = calculateScore();
    const finalAttempt: QuizAttempt = {
      ...attempt,
      endTime: new Date(),
      answers,
      score,
      passed: score >= quiz.passingScore
    };

    setAttempt(finalAttempt);
    setQuizCompleted(true);
    onComplete(finalAttempt);
  }, [attempt, answers, quiz.passingScore, onComplete, calculateScore]);

  const handleTimeUp = React.useCallback(() => {
    setQuizCompleted(true);
    handleSubmitQuiz();
  }, [handleSubmitQuiz]);

  const startQuiz = React.useCallback(() => {
    setQuizStarted(true);
    const newAttempt: QuizAttempt = {
      id: `attempt-${Date.now()}`,
      userId: 'current-user', // In real app, get from auth context
      startTime: new Date(),
      answers: {}
    };
    setAttempt(newAttempt);
  }, []);

  const handleAnswer = React.useCallback((questionId: string, answer: string | string[]) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  }, []);

  useEffect(() => {
    if (quizStarted && !quizCompleted && timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            handleTimeUp();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [quizStarted, quizCompleted, timeRemaining, handleTimeUp]);

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const isAnswerCorrect = (question: Question, userAnswer: string | string[]): boolean => {
    if (question.type === 'multiple-select') {
      const correctAnswers = Array.isArray(question.correctAnswer) 
        ? question.correctAnswer 
        : [question.correctAnswer];
      const userAnswers = Array.isArray(userAnswer) ? userAnswer : [];
      return correctAnswers.length === userAnswers.length && 
             correctAnswers.every(ans => userAnswers.includes(ans));
    }
    return userAnswer === question.correctAnswer;
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-600';
      case 'Medium': return 'text-yellow-600';
      case 'Hard': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  // Quiz Introduction Screen
  if (!quizStarted) {
    return (
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{quiz.title}</h2>
          <p className="text-gray-600">{quiz.description}</p>
        </div>

        <div className="grid grid-cols-2 gap-6 mb-8">
          <div className="bg-blue-50 rounded-lg p-4 text-center">
            <Clock className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <div className="font-semibold text-gray-900">{quiz.timeLimit} minutes</div>
            <div className="text-sm text-gray-600">Time Limit</div>
          </div>
          <div className="bg-green-50 rounded-lg p-4 text-center">
            <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <div className="font-semibold text-gray-900">{quiz.questions.length} questions</div>
            <div className="text-sm text-gray-600">Total Questions</div>
          </div>
          <div className="bg-yellow-50 rounded-lg p-4 text-center">
            <Award className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
            <div className="font-semibold text-gray-900">{quiz.passingScore}%</div>
            <div className="text-sm text-gray-600">Passing Score</div>
          </div>
          <div className="bg-purple-50 rounded-lg p-4 text-center">
            <RotateCcw className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <div className="font-semibold text-gray-900">{quiz.attempts.length}</div>
            <div className="text-sm text-gray-600">Previous Attempts</div>
          </div>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-medium text-yellow-800 mb-1">Important Instructions</h4>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>• Read each question carefully before answering</li>
                <li>• Some questions may have multiple correct answers</li>
                <li>• You can navigate between questions before submitting</li>
                <li>• The quiz will auto-submit when time expires</li>
                <li>• Make sure to click "Submit Quiz" when finished</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex gap-4 justify-center">
          <button
            onClick={onExit}
            className="px-6 py-3 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={startQuiz}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Start Quiz
          </button>
        </div>
      </div>
    );
  }

  // Quiz Results Screen
  if (quizCompleted && showResults && attempt) {
    return (
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
            attempt.passed ? 'bg-green-100' : 'bg-red-100'
          }`}>
            {attempt.passed ? (
              <CheckCircle className="w-8 h-8 text-green-600" />
            ) : (
              <XCircle className="w-8 h-8 text-red-600" />
            )}
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {attempt.passed ? 'Congratulations!' : 'Quiz Complete'}
          </h2>
          <p className="text-gray-600">
            {attempt.passed 
              ? `You passed the quiz with ${attempt.score}%` 
              : `You scored ${attempt.score}%. Passing score is ${quiz.passingScore}%`
            }
          </p>
        </div>

        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="bg-blue-50 rounded-lg p-4 text-center">
            <div className="font-semibold text-2xl text-blue-600">{attempt.score}%</div>
            <div className="text-sm text-gray-600">Your Score</div>
          </div>
          <div className="bg-green-50 rounded-lg p-4 text-center">
            <div className="font-semibold text-2xl text-green-600">
              {quiz.questions.filter(q => isAnswerCorrect(q, answers[q.id])).length}
            </div>
            <div className="text-sm text-gray-600">Correct Answers</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 text-center">
            <div className="font-semibold text-2xl text-gray-600">
              {Math.floor((new Date(attempt.endTime!).getTime() - new Date(attempt.startTime).getTime()) / 1000 / 60)}
            </div>
            <div className="text-sm text-gray-600">Minutes Taken</div>
          </div>
        </div>

        {/* Question Review */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Question Review</h3>
          <div className="space-y-4">
            {quiz.questions.map((question, index) => {
              const userAnswer = answers[question.id];
              const isCorrect = isAnswerCorrect(question, userAnswer);
              
              return (
                <div key={question.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm font-medium text-gray-500">Q{index + 1}</span>
                        <span className={`text-sm font-medium ${getDifficultyColor(question.difficulty)}`}>
                          {question.difficulty}
                        </span>
                        <span className="text-sm text-gray-500">{question.points} pts</span>
                      </div>
                      <p className="text-gray-900 mb-2">{question.question}</p>
                    </div>
                    <div className={`flex-shrink-0 ml-4 ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                      {isCorrect ? <CheckCircle className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
                    </div>
                  </div>

                  {question.options && (
                    <div className="space-y-2 mb-3">
                      {question.options.map((option, optionIndex) => {
                        const isCorrectOption = Array.isArray(question.correctAnswer)
                          ? question.correctAnswer.includes(option)
                          : question.correctAnswer === option;
                        const isSelectedOption = Array.isArray(userAnswer)
                          ? userAnswer.includes(option)
                          : userAnswer === option;

                        return (
                          <div
                            key={optionIndex}
                            className={`p-2 rounded border ${
                              isCorrectOption
                                ? 'border-green-200 bg-green-50'
                                : isSelectedOption && !isCorrectOption
                                ? 'border-red-200 bg-red-50'
                                : 'border-gray-200'
                            }`}
                          >
                            <span className="text-sm">
                              {isSelectedOption && (isCorrectOption ? '✓' : '✗')} {option}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  <div className="bg-blue-50 border border-blue-200 rounded p-3">
                    <h5 className="font-medium text-blue-900 mb-1">Explanation:</h5>
                    <p className="text-sm text-blue-800">{question.explanation}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex gap-4 justify-center">
          <button
            onClick={onExit}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Continue Learning
          </button>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Retake Quiz
          </button>
        </div>
      </div>
    );
  }

  // Quiz Interface
  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg">
      {/* Quiz Header */}
      <div className="border-b border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">{quiz.title}</h2>
            <p className="text-sm text-gray-600">
              Question {currentQuestionIndex + 1} of {quiz.questions.length}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className={`flex items-center gap-2 ${timeRemaining < 300 ? 'text-red-600' : 'text-gray-600'}`}>
              <Clock className="w-4 h-4" />
              <span className="font-mono">{formatTime(timeRemaining)}</span>
            </div>
            <button
              onClick={onExit}
              className="text-gray-500 hover:text-gray-700"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-4">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestionIndex + 1) / quiz.questions.length) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Question Content */}
      <div className="p-6">
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-4">
            <span className={`text-sm font-medium ${getDifficultyColor(currentQuestion.difficulty)}`}>
              {currentQuestion.difficulty}
            </span>
            <span className="text-sm text-gray-500">{currentQuestion.points} points</span>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            {currentQuestion.question}
          </h3>
        </div>

        {/* Answer Options */}
        <div className="space-y-3 mb-6">
          {currentQuestion.options?.map((option, index) => (
            <label
              key={index}
              className="flex items-start gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
            >
              <input
                type={currentQuestion.type === 'multiple-select' ? 'checkbox' : 'radio'}
                name={`question-${currentQuestion.id}`}
                value={option}
                checked={
                  currentQuestion.type === 'multiple-select'
                    ? Array.isArray(answers[currentQuestion.id]) && answers[currentQuestion.id].includes(option)
                    : answers[currentQuestion.id] === option
                }
                onChange={(e) => {
                  if (currentQuestion.type === 'multiple-select') {
                    const currentAnswers = Array.isArray(answers[currentQuestion.id]) 
                      ? answers[currentQuestion.id] as string[]
                      : [];
                    
                    if (e.target.checked) {
                      handleAnswer(currentQuestion.id, [...currentAnswers, option]);
                    } else {
                      handleAnswer(currentQuestion.id, currentAnswers.filter(a => a !== option));
                    }
                  } else {
                    handleAnswer(currentQuestion.id, option);
                  }
                }}
                className="mt-0.5"
              />
              <span className="text-gray-900">{option}</span>
            </label>
          ))}
        </div>

        {/* Question Topics */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            {currentQuestion.topics.map((topic, index) => (
              <span 
                key={index}
                className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
              >
                {topic}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="border-t border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1))}
            disabled={currentQuestionIndex === 0}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            <ArrowLeft className="w-4 h-4" />
            Previous
          </button>

          <div className="flex gap-2">
            {quiz.questions.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentQuestionIndex(index)}
                className={`w-8 h-8 rounded-full text-sm font-medium ${
                  index === currentQuestionIndex
                    ? 'bg-blue-600 text-white'
                    : answers[quiz.questions[index].id]
                    ? 'bg-green-100 text-green-800'
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>

          {currentQuestionIndex === quiz.questions.length - 1 ? (
            <button
              onClick={() => setShowResults(true)}
              className="flex items-center gap-2 px-6 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700"
            >
              Submit Quiz
            </button>
          ) : (
            <button
              onClick={() => setCurrentQuestionIndex(Math.min(quiz.questions.length - 1, currentQuestionIndex + 1))}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
            >
              Next
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
