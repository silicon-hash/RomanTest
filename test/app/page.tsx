"use client";
import { useState } from "react";
import { useRouter } from 'next/navigation';
import { useTheme } from './context/ThemeContext';

export default function Home() {
  const router = useRouter();
  const { isDarkTheme } = useTheme();
  const [showDialog, setShowDialog] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showQuestionCountDialog, setShowQuestionCountDialog] = useState(false);
  const [questionCount, setQuestionCount] = useState<number | null>(null);
  const [showTimerDialog, setShowTimerDialog] = useState(false);
  const [isTimedTest, setIsTimedTest] = useState<boolean | null>(null);
  const [activeTab, setActiveTab] = useState('Tests');

  const categories = ["Maths", "Physics", "Science", "History", "Literature"];
  const questionOptions = [25, 50, 75];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white p-4">
      <div className="w-full max-w-3xl">
        <div className="flex mb-6">
          <button
            onClick={() => setActiveTab('Tests')}
            className={`flex-1 py-2 text-center ${
              activeTab === 'Tests'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            Tests
          </button>
          <button
            onClick={() => setActiveTab('Flashcards')}
            className={`flex-1 py-2 text-center ${
              activeTab === 'Flashcards'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            Flashcards
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <svg className="w-6 h-6 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <h2 className="text-xl font-semibold">Start a test</h2>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-4">Begin a new assessment</p>
            <button
              onClick={() => setShowDialog(true)}
              className="px-4 py-2 bg-white dark:bg-gray-700 text-gray-800 dark:text-white rounded shadow hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
            >
              Start
            </button>
          </div>

          <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <svg className="w-6 h-6 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
              </svg>
              <h2 className="text-xl font-semibold">See the last test</h2>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-4">Review your recent performance</p>
            <button className="px-4 py-2 bg-white dark:bg-gray-700 text-gray-800 dark:text-white rounded shadow hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
              View
            </button>
          </div>

          <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <svg className="w-6 h-6 text-purple-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              <h2 className="text-xl font-semibold">Create tests</h2>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-4">Design your own assessments</p>
            <button className="px-4 py-2 bg-white dark:bg-gray-700 text-gray-800 dark:text-white rounded shadow hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
              Create
            </button>
          </div>

          <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <svg className="w-6 h-6 text-yellow-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h2 className="text-xl font-semibold">Test history</h2>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-4">View past test results</p>
            <button className="px-4 py-2 bg-white dark:bg-gray-700 text-gray-800 dark:text-white rounded shadow hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
              History
            </button>
          </div>
        </div>
      </div>

      {showDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-xl max-w-md w-full relative">
            <button
              onClick={() => {
                setShowDialog(false);
                setSelectedCategory(null);
              }}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              aria-label="Close"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <h2 className="text-2xl font-bold mb-6 text-center text-black dark:text-white">Choose a Category</h2>
            <div className="space-y-3">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`w-full px-4 py-3 text-left text-lg rounded-md transition duration-200 ease-in-out flex justify-between items-center ${
                    selectedCategory === category
                      ? "bg-blue-100 dark:bg-blue-700 text-black dark:text-white font-semibold"
                      : "text-black dark:text-white hover:bg-blue-50 dark:hover:bg-blue-800"
                  }`}
                >
                  {category}
                  {selectedCategory === category && (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500 dark:text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </button>
              ))}
            </div>
            <button
              onClick={() => {
                if (selectedCategory) {
                  setShowDialog(false);
                  setShowQuestionCountDialog(true);
                }
              }}
              className={`mt-8 w-full px-4 py-3 rounded-md transition duration-200 ease-in-out ${
                selectedCategory
                  ? "bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
                  : "bg-blue-200 text-blue-400 dark:bg-blue-300 dark:text-blue-500 cursor-not-allowed"
              }`}
              disabled={!selectedCategory}
            >
              Next
            </button>
          </div>
        </div>
      )}

      {showQuestionCountDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-xl max-w-md w-full relative">
            <button
              onClick={() => {
                setShowQuestionCountDialog(false);
                setSelectedCategory(null);
                setQuestionCount(null);
              }}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              aria-label="Close"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <h2 className="text-2xl font-bold mb-6 text-center text-black dark:text-white">How many questions?</h2>
            <div className="space-y-3">
              {questionOptions.map((count) => (
                <button
                  key={count}
                  onClick={() => setQuestionCount(count)}
                  className={`w-full px-4 py-3 text-left text-lg rounded-md transition duration-200 ease-in-out flex justify-between items-center ${
                    questionCount === count
                      ? "bg-blue-100 dark:bg-blue-700 text-black dark:text-white font-semibold"
                      : "text-black dark:text-white hover:bg-blue-50 dark:hover:bg-blue-800"
                  }`}
                >
                  {count} questions
                  {questionCount === count && (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500 dark:text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </button>
              ))}
              <div className="relative">
                <input
                  type="number"
                  placeholder="Custom number"
                  min="1"
                  onChange={(e) => setQuestionCount(parseInt(e.target.value) || null)}
                  className="w-full px-4 py-3 text-lg rounded-md border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                />
              </div>
            </div>
            <button
              onClick={() => {
                if (questionCount) {
                  setShowQuestionCountDialog(false);
                  setShowTimerDialog(true);
                }
              }}
              className={`mt-8 w-full px-4 py-3 rounded-md transition duration-200 ease-in-out ${
                questionCount
                  ? "bg-blue-500 text-white hover:bg-blue-600"
                  : "bg-blue-200 text-blue-400 cursor-not-allowed"
              }`}
              disabled={!questionCount}
            >
              Next
            </button>
          </div>
        </div>
      )}

      {showTimerDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-xl max-w-md w-full relative">
            <button
              onClick={() => {
                setShowTimerDialog(false);
                setSelectedCategory(null);
                setQuestionCount(null);
                setIsTimedTest(null);
              }}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              aria-label="Close"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <h2 className="text-2xl font-bold mb-6 text-center text-black dark:text-white">Test Type</h2>
            <div className="space-y-4">
              <button
                onClick={() => setIsTimedTest(true)}
                className={`w-full px-4 py-3 text-left text-lg rounded-md transition duration-200 ease-in-out flex justify-between items-center ${
                  isTimedTest === true
                    ? "bg-blue-100 dark:bg-blue-700 text-black dark:text-white font-semibold"
                    : "text-black dark:text-white hover:bg-blue-50 dark:hover:bg-blue-800"
                }`}
              >
                Timed Test
                {isTimedTest === true && (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500 dark:text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </button>
              <button
                onClick={() => setIsTimedTest(false)}
                className={`w-full px-4 py-3 text-left text-lg rounded-md transition duration-200 ease-in-out flex justify-between items-center ${
                  isTimedTest === false
                    ? "bg-blue-100 dark:bg-blue-700 text-black dark:text-white font-semibold"
                    : "text-black dark:text-white hover:bg-blue-50 dark:hover:bg-blue-800"
                }`}
              >
                No Timer
                {isTimedTest === false && (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500 dark:text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </button>
            </div>
            <button
              onClick={() => {
                // Handle starting the test with selected category, question count, and timer preference
                console.log(`Starting test: ${selectedCategory}, ${questionCount} questions, Timed: ${isTimedTest}`);
                // Push to new route with query parameters
                router.push(`/test?category=${selectedCategory}&questionCount=${questionCount}&timed=${isTimedTest}`);
                // Reset state
                setShowTimerDialog(false);
                setSelectedCategory(null);
                setQuestionCount(null);
                setIsTimedTest(null);
              }}
              className={`mt-8 w-full px-4 py-3 rounded-md transition duration-200 ease-in-out ${
                isTimedTest !== null
                  ? "bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
                  : "bg-blue-200 text-blue-400 dark:bg-blue-300 dark:text-blue-500 cursor-not-allowed"
              }`}
              disabled={isTimedTest === null}
            >
              Start Test
            </button>
          </div>
        </div>
      )}
    </div>
  );
}