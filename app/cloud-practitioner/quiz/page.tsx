'use client';

import { useState } from 'react';
import cloudPractitionerQuestions from '@/questions/cloud-practitioner';
import { FaCheckCircle, FaTimesCircle, FaRedo, FaInfoCircle } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

type UserAnswer = {
    question: string;
    selectedOption: string;
    isCorrect: boolean;
};

export default function CloudPractitionerQuiz() {
    const [currentQuestion, setCurrentQuestion] = useState<number>(0);
    const [selectedOption, setSelectedOption] = useState<string>('');
    const [score, setScore] = useState<number>(0);
    const [showScore, setShowScore] = useState<boolean>(false);
    const [showExplanation, setShowExplanation] = useState<boolean>(false);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
    const [isPopupVisible, setIsPopupVisible] = useState(false); // Popup visibility state

    const totalQuestions = cloudPractitionerQuestions.length;
    const currentSubDomain = cloudPractitionerQuestions[currentQuestion].subDomain;

    const handleOptionSelect = (option: string) => {
        if (selectedOption) return; // Prevent multiple selections
        setSelectedOption(option);
        setShowExplanation(true);
        const correct = option === cloudPractitionerQuestions[currentQuestion].answer;
        setIsCorrect(correct);
        if (correct) {
            setScore((prev) => prev + 1);
        }

        // Save user answer
        setUserAnswers((prev) => [
            ...prev,
            {
                question: cloudPractitionerQuestions[currentQuestion].question,
                selectedOption: option || 'No Answer',
                isCorrect: correct,
            },
        ]);
    };

    const handleNextQuestion = () => {
        setSelectedOption('');
        setIsCorrect(null);
        setShowExplanation(false);

        const nextQuestion = currentQuestion + 1;
        if (nextQuestion < totalQuestions) {
            setCurrentQuestion(nextQuestion);
        } else {
            setShowScore(true);
        }
    };

    const handlePrevQuestion = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(currentQuestion - 1);
            setSelectedOption('');
            setShowExplanation(false);
        }
    };

    const handleRestartQuiz = () => {
        setCurrentQuestion(0);
        setSelectedOption('');
        setScore(0);
        setShowScore(false);
        setShowExplanation(false);
        setIsCorrect(null);
        setUserAnswers([]);
    };

    return (
        <div className="flex flex-col py-8 items-center justify-center transition-colors duration-500">
            {/* Back and Next Buttons at the Top */}
            <div className="flex justify-between mb-4 w-full max-w-2xl">
                <button
                    className="bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-200 py-2 px-4 rounded-lg"
                    onClick={handlePrevQuestion}
                    disabled={currentQuestion === 0}
                >
                    Back
                </button>
                <button
                    className="bg-blue-500 dark:bg-blue-600 text-white py-2 px-4 rounded-lg"
                    onClick={handleNextQuestion}
                    disabled={!selectedOption}
                >
                    {currentQuestion < totalQuestions - 1 ? 'Next Question' : 'Finish Quiz'}
                </button>
            </div>

            {/* Progress Bar */}
            <div className="w-full max-w-2xl mb-4">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Question {currentQuestion + 1} of {totalQuestions}
                    </span>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {Math.round(((currentQuestion + 1) / totalQuestions) * 100)}% Complete
                    </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                    <div
                        className="bg-blue-500 h-2.5 rounded-full"
                        style={{ width: `${((currentQuestion + 1) / totalQuestions) * 100}%` }}
                    ></div>
                </div>
            </div>

            <div className="max-w-2xl w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 relative">
                {/* Progress Information Popup */}
                <div className="absolute top-4 right-4">
                    <FaInfoCircle
                        size={24}
                        className="text-gray-600 dark:text-gray-300 cursor-pointer"
                        onMouseEnter={() => setIsPopupVisible(true)}
                        onMouseLeave={() => setIsPopupVisible(false)}
                    />
                    <AnimatePresence>
                        {isPopupVisible && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.3 }}
                                className="absolute bg-white dark:bg-gray-700 shadow-lg rounded-lg p-4 w-64 right-10 text-sm"
                            >
                                <p>
                                    <strong>Subdomain:</strong> {currentSubDomain}
                                </p>
                                <p>
                                    <strong>Critical Topic:</strong>{' '}
                                    {cloudPractitionerQuestions[currentQuestion].criticalTopic}
                                </p>
                                <p>
                                    <strong>
                                        Question {currentQuestion + 1} of {totalQuestions}
                                    </strong>
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {showScore ? (
                    <AnimatePresence>
                        <motion.div
                            key="score"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            className="text-center"
                        >
                            <h2 className="text-3xl font-bold text-green-600 dark:text-green-400">
                                Quiz Completed!
                            </h2>
                            <div className="mt-4 flex items-center justify-center">
                                <span className="text-4xl font-extrabold text-blue-600 dark:text-blue-400">
                                    {score}
                                </span>
                                <span className="text-2xl font-medium text-gray-500 dark:text-gray-300 ml-2">
                                    / {totalQuestions}
                                </span>
                            </div>
                            <p className="mt-4 text-md text-gray-700 dark:text-gray-300">
                                Great job! You have covered important AWS concepts.
                            </p>

                            {/* Restart Quiz Button */}
                            <div className="mt-6">
                                <button
                                    onClick={handleRestartQuiz}
                                    className="flex items-center justify-center space-x-2 bg-blue-500 dark:bg-blue-600 text-white font-semibold px-6 py-2 rounded-full shadow hover:bg-blue-600 dark:hover:bg-blue-700 transition duration-300"
                                >
                                    <FaRedo className="h-5 w-5" />
                                    <span>Restart Quiz</span>
                                </button>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                ) : (
                    <AnimatePresence>
                        <motion.div key={currentQuestion} animate={{ opacity: 1, x: 0 }}>
                            {/* Question Card */}
                            <div className="mb-4">
                                <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-2">
                                    {cloudPractitionerQuestions[currentQuestion].question}
                                </h3>
                            </div>

                            {/* Options */}
                            <ul className="space-y-3">
                                {cloudPractitionerQuestions[currentQuestion].options.map(
                                    (option, index) => (
                                        <motion.li
                                            key={index}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                        >
                                            <button
                                                onClick={() => {
                                                    if (!selectedOption) {
                                                        handleOptionSelect(option);
                                                    } else if (
                                                        option ===
                                                        cloudPractitionerQuestions[
                                                            currentQuestion
                                                            ].answer
                                                    ) {
                                                        // User clicks on the correct answer again
                                                        handleNextQuestion();
                                                    }
                                                }}
                                                className={`w-full flex items-center justify-between px-4 py-2 border rounded-lg text-left transition-colors duration-300 focus:outline-none
                                                    ${
                                                    selectedOption
                                                        ? option ===
                                                        cloudPractitionerQuestions[
                                                            currentQuestion
                                                            ].answer
                                                            ? 'bg-green-100 dark:bg-green-700 border-green-500 cursor-pointer'
                                                            : selectedOption === option
                                                                ? 'bg-red-100 dark:bg-red-700 border-red-500'
                                                                : 'bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600'
                                                        : 'bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 hover:bg-blue-50 dark:hover:bg-blue-800 cursor-pointer'
                                                }
                                                `}
                                                aria-pressed={selectedOption === option}
                                            >
                                                <span className="text-gray-800 dark:text-gray-200">
                                                    {option}
                                                </span>
                                                {selectedOption && (
                                                    option ===
                                                    cloudPractitionerQuestions[currentQuestion]
                                                        .answer ? (
                                                        <FaCheckCircle className="h-6 w-6 text-green-500" />
                                                    ) : selectedOption === option ? (
                                                        <FaTimesCircle className="h-6 w-6 text-red-500" />
                                                    ) : null
                                                )}
                                            </button>
                                        </motion.li>
                                    )
                                )}
                            </ul>

                            {/* Explanation */}
                            <AnimatePresence>
                                {showExplanation && (
                                    <motion.div
                                        key="explanation"
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="mt-4 p-3 bg-blue-50 dark:bg-blue-700 border-l-4 border-blue-500 dark:border-blue-400 rounded overflow-hidden"
                                    >
                                        <h4 className="text-md font-semibold text-blue-700 dark:text-blue-300">
                                            Explanation:
                                        </h4>
                                        <p className="mt-2 text-gray-700 dark:text-gray-300">
                                            {
                                                cloudPractitionerQuestions[currentQuestion]
                                                    .explanation
                                            }
                                        </p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    </AnimatePresence>
                )}
            </div>
        </div>
    );
}
