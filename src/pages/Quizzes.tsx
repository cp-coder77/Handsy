import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, XCircle, RefreshCw, Eye } from 'lucide-react';

interface Question {
  id: number;
  type: 'mcq' | 'fill-in-blank' | 'visual';
  question: string;
  options?: string[];
  correctAnswer: string;
  explanation: string;
  imageUrl?: string;
}

interface Quiz {
  id: number;
  title: string;
  description: string;
  level: string;
  questions: Question[];
}

const quizzes: Quiz[] = [
  {
    id: 1,
    title: 'ASL Basics Quiz',
    description: 'Test your knowledge of basic ASL signs and finger spelling.',
    level: 'Beginner',
    questions: [
      {
        id: 1,
        type: 'mcq',
        question: 'What is the ASL sign for "Hello"?',
        options: [
          'Wave hand side to side',
          'Touch forehead',
          'Thumbs up',
          'Peace sign'
        ],
        correctAnswer: 'Wave hand side to side',
        explanation: 'In ASL, "Hello" is signed by waving your hand from side to side, similar to a regular greeting wave.'
      },
      {
        id: 2,
        type: 'visual',
        question: 'What letter is being signed in this image?',
        imageUrl: 'https://images.unsplash.com/photo-1615514816216-6e96e20be231?auto=format&fit=crop&q=80&w=400',
        correctAnswer: 'A',
        explanation: 'This is the ASL sign for the letter "A". It\'s formed by making a fist with your thumb alongside.'
      }
    ]
  }
];

export default function Quizzes() {
  const navigate = useNavigate();
  const [currentQuiz, setCurrentQuiz] = useState<Quiz | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [showResult, setShowResult] = useState(false);
  const [answers, setAnswers] = useState<string[]>([]);
  const [showExplanation, setShowExplanation] = useState(false);

  const startQuiz = (quiz: Quiz) => {
    setCurrentQuiz(quiz);
    setCurrentQuestionIndex(0);
    setSelectedAnswer('');
    setShowResult(false);
    setAnswers([]);
    setShowExplanation(false);
  };

  const handleAnswer = () => {
    if (!currentQuiz) return;
    
    const newAnswers = [...answers, selectedAnswer];
    setAnswers(newAnswers);

    if (currentQuestionIndex < currentQuiz.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer('');
      setShowExplanation(false);
    } else {
      setShowResult(true);
    }
  };

  const calculateScore = () => {
    if (!currentQuiz) return 0;
    const correctAnswers = answers.filter(
      (answer, index) => answer === currentQuiz.questions[index].correctAnswer
    );
    return Math.round((correctAnswers.length / currentQuiz.questions.length) * 100);
  };

  const restartQuiz = () => {
    if (!currentQuiz) return;
    startQuiz(currentQuiz);
  };

  return (
    <div className="min-h-screen pt-24 px-4">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-gray-600 hover:text-purple-600 transition"
            >
              <ArrowLeft className="w-5 h-5" />
              Back
            </button>
            <h1 className="text-4xl font-serif text-purple-900">ASL Quizzes</h1>
          </div>

          {!currentQuiz ? (
            <div className="grid gap-6">
              {quizzes.map(quiz => (
                <div key={quiz.id} className="bg-white rounded-2xl p-6 shadow-sm">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">{quiz.title}</h2>
                  <p className="text-gray-600 mb-4">{quiz.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full">
                      {quiz.level}
                    </span>
                    <button
                      onClick={() => startQuiz(quiz)}
                      className="bg-purple-600 text-white px-6 py-2 rounded-full hover:bg-purple-700 transition"
                    >
                      Start Quiz
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : showResult ? (
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Quiz Complete!</h2>
                <div className="text-6xl font-bold text-purple-600 mb-4">
                  {calculateScore()}%
                </div>
                <p className="text-gray-600">
                  You answered {answers.filter((answer, index) => 
                    answer === currentQuiz.questions[index].correctAnswer
                  ).length} out of {currentQuiz.questions.length} questions correctly
                </p>
              </div>
              
              <div className="space-y-6 mb-8">
                {currentQuiz.questions.map((question, index) => (
                  <div key={question.id} className="border-b border-gray-200 pb-4">
                    <p className="font-medium text-gray-900 mb-2">
                      Question {index + 1}: {question.question}
                    </p>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="font-medium">Your answer:</span>
                      <span className={answers[index] === question.correctAnswer ? 
                        'text-green-600' : 'text-red-600'}>
                        {answers[index]}
                      </span>
                      {answers[index] === question.correctAnswer ? 
                        <CheckCircle2 className="w-4 h-4 text-green-600" /> :
                        <XCircle className="w-4 h-4 text-red-600" />
                      }
                    </div>
                    {answers[index] !== question.correctAnswer && (
                      <div className="text-sm text-gray-600 mt-1">
                        <span className="font-medium">Correct answer:</span> {question.correctAnswer}
                      </div>
                    )}
                    <p className="text-sm text-gray-600 mt-2">{question.explanation}</p>
                  </div>
                ))}
              </div>

              <div className="flex justify-center gap-4">
                <button
                  onClick={restartQuiz}
                  className="flex items-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-full hover:bg-purple-700 transition"
                >
                  <RefreshCw className="w-5 h-5" />
                  Retake Quiz
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Question {currentQuestionIndex + 1} of {currentQuiz.questions.length}
                  </h2>
                  <div className="w-32 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-purple-600 transition-all duration-300"
                      style={{ width: `${((currentQuestionIndex + 1) / currentQuiz.questions.length) * 100}%` }}
                    />
                  </div>
                </div>
                
                <p className="text-xl text-gray-900 mb-6">
                  {currentQuiz.questions[currentQuestionIndex].question}
                </p>

                {currentQuiz.questions[currentQuestionIndex].imageUrl && (
                  <img
                    src={currentQuiz.questions[currentQuestionIndex].imageUrl}
                    alt="Quiz question"
                    className="w-full max-w-md mx-auto rounded-xl mb-6"
                  />
                )}

                <div className="space-y-4">
                  {currentQuiz.questions[currentQuestionIndex].type === 'mcq' && 
                    currentQuiz.questions[currentQuestionIndex].options?.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedAnswer(option)}
                        className={`w-full text-left p-4 rounded-lg border transition ${
                          selectedAnswer === option
                            ? 'border-purple-600 bg-purple-50'
                            : 'border-gray-200 hover:border-purple-200'
                        }`}
                      >
                        {option}
                      </button>
                    ))
                  }

                  {currentQuiz.questions[currentQuestionIndex].type === 'fill-in-blank' && (
                    <input
                      type="text"
                      value={selectedAnswer}
                      onChange={(e) => setSelectedAnswer(e.target.value)}
                      placeholder="Type your answer..."
                      className="w-full p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  )}
                </div>
              </div>

              <div className="flex justify-between items-center">
                <button
                  onClick={() => setShowExplanation(!showExplanation)}
                  className="flex items-center gap-2 text-gray-600 hover:text-purple-600 transition"
                >
                  <Eye className="w-5 h-5" />
                  {showExplanation ? 'Hide' : 'Show'} Explanation
                </button>
                <button
                  onClick={handleAnswer}
                  disabled={!selectedAnswer}
                  className={`px-6 py-3 rounded-full transition ${
                    selectedAnswer
                      ? 'bg-purple-600 text-white hover:bg-purple-700'
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  {currentQuestionIndex === currentQuiz.questions.length - 1 ? 'Finish' : 'Next'}
                </button>
              </div>

              {showExplanation && (
                <div className="mt-6 p-4 bg-purple-50 rounded-lg">
                  <p className="text-gray-700">
                    {currentQuiz.questions[currentQuestionIndex].explanation}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}