"use client";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from 'next/navigation';
import { useTheme } from '../context/ThemeContext';
import Dialog from '../components/Dialog'; // Assume you have this component

interface Question {
  id: number;
  text: string;
  options: string[];
}

export default function TestPage() {
  const router = useRouter();
  const { isDarkTheme } = useTheme();
  const searchParams = useSearchParams();
  const category = searchParams.get('category');
  const questionCount = parseInt(searchParams.get('questionCount') || '20', 10);
  const isTimed = searchParams.get('timed') === 'true';

  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{[key: number]: string}>({});
  const [timeRemaining, setTimeRemaining] = useState(questionCount * 60); // 1 minute per question
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    // Replace mock questions with 5 dummy questions
    const mockQuestions: Question[] = [
      {
        id: 1,
        text: "What is the capital of France?",
        options: ['London', 'Berlin', 'Paris', 'Madrid'],
      },
      {
        id: 2,
        text: "Which planet is known as the Red Planet?",
        options: ['Venus', 'Mars', 'Jupiter', 'Saturn'],
      },
      {
        id: 3,
        text: "Who painted the Mona Lisa?",
        options: ['Vincent van Gogh', 'Leonardo da Vinci', 'Pablo Picasso', 'Michelangelo'],
      },
      {
        id: 4,
        text: "What is the largest mammal in the world?",
        options: ['African Elephant', 'Blue Whale', 'Giraffe', 'Hippopotamus'],
      },
      {
        id: 5,
        text: "Which element has the chemical symbol 'O'?",
        options: ['Gold', 'Silver', 'Oxygen', 'Iron'],
      },
    ];
    setQuestions(mockQuestions);
  }, []);

  useEffect(() => {
    if (isTimed) {
      const timer = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 0) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isTimed]);

  const handleAnswerSelect = (questionId: number, answer: string) => {
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  if (questions.length === 0) {
    return <div className="text-center mt-8">Loading questions...</div>;
  }

  const currentQuestion = questions[currentQuestionIndex];

  const handleSubmit = () => {
    // TODO: Implement submit logic
    console.log("Test submitted:", selectedAnswers);
    setShowDialog(true);
  };

  const handleCloseDialog = () => {
    setShowDialog(false);
    router.push('/'); // Route to home page
  };

  return (
    <div className={`container mx-auto px-4 py-8 max-w-3xl ${isDarkTheme ? 'bg-gray-900 text-white' : 'bg-white text-gray-800'} z-50`}>
      <h1 className={`text-3xl font-bold mb-6 text-center ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}>{category || 'General'} Test</h1>
      {isTimed && (
        <div className={`text-xl font-semibold mb-6 text-center ${isDarkTheme ? 'bg-blue-900 text-blue-200' : 'bg-blue-200 text-blue-800'} p-3 rounded-lg`}>
          Time Remaining: {formatTime(timeRemaining)}
        </div>
      )}
      {/* Add progress bar */}
      <div className={`mb-6 ${isDarkTheme ? 'bg-gray-700' : 'bg-gray-200'} rounded-full h-2.5`}>
        <div 
          className="bg-blue-600 h-2.5 rounded-full" 
          style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
        ></div>
      </div>
      <div className={`${isDarkTheme ? 'bg-gray-800' : 'bg-gray-100'} shadow-lg rounded-lg p-6 mb-8`}>
        <h2 className={`text-2xl font-semibold mb-4 ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}>
          Question {currentQuestionIndex + 1} of {questions.length}
        </h2>
        <div className={`mb-6 p-4 ${isDarkTheme ? 'bg-gray-700' : 'bg-white'} rounded-lg shadow-inner`}>
          <p className={`text-lg ${isDarkTheme ? 'text-gray-200' : 'text-gray-700'} whitespace-pre-wrap`}>{currentQuestion.text}</p>
        </div>
        <div className="space-y-3">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              className={`w-full p-3 text-left border rounded-lg transition-colors duration-200 ${
                selectedAnswers[currentQuestion.id] === option
                  ? 'bg-blue-600 text-white'
                  : isDarkTheme
                    ? 'bg-gray-700 text-white hover:bg-gray-600'
                    : 'bg-white text-gray-800 hover:bg-gray-200'
              }`}
              onClick={() => handleAnswerSelect(currentQuestion.id, option)}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
      <div className="flex justify-between">
        <button
          className={`${isDarkTheme ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-gray-300 text-gray-800 hover:bg-gray-400'} px-6 py-2 rounded-lg transition-colors duration-200`}
          onClick={handlePreviousQuestion}
          disabled={currentQuestionIndex === 0}
        >
          Previous
        </button>
        {currentQuestionIndex === questions.length - 1 ? (
          <button
            className={`${
              isDarkTheme
                ? 'bg-blue-700 text-white hover:bg-blue-600'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            } px-6 py-2 rounded-lg transition-colors duration-200`}
            onClick={handleSubmit}
          >
            Submit
          </button>
        ) : (
          <button
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
            onClick={handleNextQuestion}
          >
            Next
          </button>
        )}
      </div>
      {showDialog && (
        <Dialog
          isOpen={showDialog}
          onClose={handleCloseDialog}
          title="Test Submitted"
          content="Your test has been successfully submitted. Thank you!"
        />
      )}
    </div>
  );
}