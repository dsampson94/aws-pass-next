'use client';

import { useState, useEffect, useRef } from 'react';
import cloudPractitionerQuestions from '@/questions/cloud-practitioner';
import {
    FaCheckCircle,
    FaTimesCircle,
    FaRedo,
    FaCheck,
    FaTimes,
    FaCog,
    FaBookmark,
} from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

type UserAnswer = {
    question: string;
    selectedOption: string;
    isCorrect: boolean;
};

export default function CloudPractitionerQuiz() {
    const LOCAL_STORAGE_KEY = 'cloudPractitionerQuizAnswers';

    // State Variables
    const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
    const [currentQuestion, setCurrentQuestion] = useState<number>(0);
    const [score, setScore] = useState<number>(0);
    const [showScore, setShowScore] = useState<boolean>(false);
    const [showExplanation, setShowExplanation] = useState<boolean>(false);
    const [selectedOption, setSelectedOption] = useState<string>('');
    const [, setIsCorrect] = useState<boolean | null>(null);

    // Dropdown State
    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

    // Refs for Dropdown Handling
    const settingsRef = useRef<HTMLDivElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Subdomain Progress State Variables
    const [subDomainProgress, setSubDomainProgress] = useState<number>(0);
    const [currentSubDomain, setCurrentSubDomain] = useState<string>(
        cloudPractitionerQuestions[0].subDomain
    );
    const [currentCriticalTopic, setCurrentCriticalTopic] = useState<string>(
        cloudPractitionerQuestions[0].criticalTopic
    );

    const totalQuestions = cloudPractitionerQuestions.length;

    // Helper Function to Find First Unanswered Question
    const findFirstUnanswered = (answers: UserAnswer[]): number => {
        for (let i = 0; i < totalQuestions; i++) {
            const question = cloudPractitionerQuestions[i].question;
            const answered = answers.find((ans) => ans.question === question);
            if (!answered) {
                return i;
            }
        }
        // If all questions are answered, return the last index
        return totalQuestions - 1;
    };

    // Calculate percentage complete based on number of answered questions
    const calculatePercentComplete = (): number => {
        const answeredQuestions = userAnswers.length;
        return Math.round((answeredQuestions / totalQuestions) * 100);
    };

    // Load User Answers from Local Storage on Mount
    useEffect(() => {
        const storedAnswers = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (storedAnswers) {
            try {
                const parsedAnswers: UserAnswer[] = JSON.parse(storedAnswers);
                setUserAnswers(parsedAnswers);

                // Calculate Score
                const storedScore = parsedAnswers.filter((answer) => answer.isCorrect).length;
                setScore(storedScore);

                // Set Current Question to First Unanswered
                const firstUnanswered = findFirstUnanswered(parsedAnswers);
                setCurrentQuestion(firstUnanswered);
            } catch (error) {
                console.error('Failed to parse stored answers:', error);
            }
        }
    }, []);

    // Synchronize State When currentQuestion or userAnswers Change
    useEffect(() => {
        const currentQ = cloudPractitionerQuestions[currentQuestion];
        setCurrentSubDomain(currentQ.subDomain);
        setCurrentCriticalTopic(currentQ.criticalTopic);

        const answer = userAnswers.find((ans) => ans.question === currentQ.question);
        if (answer) {
            setSelectedOption(answer.selectedOption);
            setIsCorrect(answer.isCorrect);
            setShowExplanation(true);
        } else {
            setSelectedOption('');
            setIsCorrect(null);
            setShowExplanation(false);
        }

        // Update Subdomain Progress
        const questionsInSubDomain = cloudPractitionerQuestions.filter(
            (q) => q.subDomain === currentQ.subDomain
        ).length;
        const answeredInSubDomain = userAnswers.filter(
            (ans) =>
                cloudPractitionerQuestions.find(q => q.question === ans.question)?.subDomain === currentQ.subDomain
        ).length;
        setSubDomainProgress(Math.round((answeredInSubDomain / questionsInSubDomain) * 100));
    }, [currentQuestion, userAnswers]);

    // Handle Option Selection
    const handleOptionSelect = (option: string) => {
        if (selectedOption) return; // Prevent multiple selections
        setSelectedOption(option);
        setShowExplanation(true);
        const correct = option === cloudPractitionerQuestions[currentQuestion].answer;
        setIsCorrect(correct);
        if (correct) {
            setScore((prev) => prev + 1);
        }

        // Save or Update User Answer
        setUserAnswers((prev) => {
            const updatedAnswers = [...prev];
            const existingIndex = updatedAnswers.findIndex(
                (answer) => answer.question === cloudPractitionerQuestions[currentQuestion].question
            );
            if (existingIndex !== -1) {
                // If the question was previously answered, update it
                // Adjust score accordingly
                if (updatedAnswers[existingIndex].isCorrect && !correct) {
                    setScore((prev) => prev - 1);
                } else if (!updatedAnswers[existingIndex].isCorrect && correct) {
                    setScore((prev) => prev + 1);
                }
                updatedAnswers[existingIndex] = {
                    question: cloudPractitionerQuestions[currentQuestion].question,
                    selectedOption: option || 'No Answer',
                    isCorrect: correct,
                };
            } else {
                // If it's a new answer, add it to the array
                updatedAnswers.push({
                    question: cloudPractitionerQuestions[currentQuestion].question,
                    selectedOption: option || 'No Answer',
                    isCorrect: correct,
                });
            }

            // Persist Updated Answers to Local Storage
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedAnswers));

            return updatedAnswers;
        });
    };

    // Handle Navigation to Next Sequential Question
    const handleNextQuestion = () => {
        if (currentQuestion + 1 < totalQuestions) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            // If all questions are answered, show the score
            setShowScore(true);
        }
    };

    // Handle Navigation to Previous Question
    const handlePrevQuestion = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(currentQuestion - 1);
        }
    };

    // Handle Progress Bar Clicks
    const handleProgressBarClick = (index: number) => {
        setCurrentQuestion(index);
    };

    // Handle Quiz Restart
    const handleRestartQuiz = () => {
        setCurrentQuestion(0);
        setSelectedOption('');
        setScore(0);
        setShowScore(false);
        setShowExplanation(false);
        setIsCorrect(null);
        setUserAnswers([]);

        // Clear Stored Answers from Local Storage
        localStorage.removeItem(LOCAL_STORAGE_KEY);

        // Close Dropdown if Open
        setIsDropdownOpen(false);
    };

    // Handle Go to First Unanswered Question
    const handleGoToFirstUnanswered = () => {
        const firstUnanswered = findFirstUnanswered(userAnswers);
        if (userAnswers.length === totalQuestions) {
            // All questions are answered
            alert('All questions have been answered!');
        } else {
            setCurrentQuestion(firstUnanswered);
        }

        // Close Dropdown if Open
        setIsDropdownOpen(false);
    };

    // Toggle Dropdown Visibility
    const toggleDropdown = () => {
        setIsDropdownOpen((prev) => !prev);
    };

    // Close Dropdown When Clicking Outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node) &&
                settingsRef.current &&
                !settingsRef.current.contains(event.target as Node)
            ) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="flex flex-col py-2 items-center justify-center transition-colors duration-500">
            {/* Navigation Buttons: Back, Settings (Dropdown), Next */}
            <div className="flex items-center mb-4 w-full max-w-2xl space-x-2">
                {/* Back Button */}
                <button
                    className={`flex items-center justify-center p-2 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-lg transition-all duration-300
            ${currentQuestion === 0
                        ? 'cursor-not-allowed opacity-50'
                        : 'hover:bg-gray-400 dark:hover:bg-gray-500 cursor-pointer'
                    }`}
                    onClick={handlePrevQuestion}
                    disabled={currentQuestion === 0}
                    aria-label="Go to Previous Question"
                >
                    Back
                </button>

                {/* Spacer */}
                <div className="flex-1"></div>

                {/* Settings Dropdown */}
                <div className="relative" ref={settingsRef}>
                    <button
                        className="flex items-center justify-center p-2 bg-blue-500 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-600 dark:hover:bg-blue-700 transition duration-300 focus:outline-none"
                        onClick={toggleDropdown}
                        aria-label="Settings"
                    >
                        <FaCog className="h-5 w-5" />
                    </button>

                    {/* Dropdown Menu */}
                    <AnimatePresence>
                        {isDropdownOpen && (
                            <motion.div
                                ref={dropdownRef}
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                                className="absolute -left-24 mt-2 w-56 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg z-10"
                            >
                                <ul className="py-1">
                                    {/* Go to First Unanswered Question Option */}
                                    <li>
                                        <button
                                            onClick={handleGoToFirstUnanswered}
                                            className="w-full flex whitespace-nowrap items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                                            aria-label="Go to First Unanswered Question"
                                        >
                                            <FaBookmark className="mr-3 h-4 w-4" />
                                            First Unanswered Question
                                        </button>
                                    </li>

                                    {/* Restart Quiz Option */}
                                    <li>
                                        <button
                                            onClick={handleRestartQuiz}
                                            className="w-full flex items-center whitespace-nowrap px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                                            aria-label="Restart Quiz"
                                        >
                                            <FaRedo className="mr-2.5 -ml-0.5 h-3 w-3" />
                                            Restart Quiz
                                        </button>
                                    </li>
                                </ul>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Next Question Button */}
                <button
                    className={`flex items-center justify-center p-2 bg-blue-500 dark:bg-blue-600 text-white rounded-lg transition-all duration-300
            ${selectedOption
                        ? 'hover:bg-blue-600 dark:hover:bg-blue-700 cursor-pointer'
                        : 'cursor-not-allowed opacity-50'
                    }`}
                    onClick={handleNextQuestion}
                    disabled={!selectedOption}
                    aria-label="Go to Next Question"
                >
                    {currentQuestion + 1 === totalQuestions ? 'Finish Quiz' : 'Next Question'}
                </button>
            </div>

            {/* Overall Progress Bar with Clickable Segments */}
            <div className="w-full max-w-2xl mb-4">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Question {currentQuestion + 1} of {totalQuestions}
                    </span>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {calculatePercentComplete()}% Complete
                    </span>
                </div>

                {/* Container for Segmented Progress Bar */}
                <div className="w-full bg-gray-200 rounded-full h-4 dark:bg-gray-700 flex relative">
                    {/* Filled Portion */}
                    <div
                        className="bg-green-500 h-4 rounded-full transition-width duration-300"
                        style={{ width: `${calculatePercentComplete()}%` }}
                    ></div>

                    {/* Clickable Segments with Icons */}
                    <div className="absolute inset-0 flex justify-between">
                        {cloudPractitionerQuestions.map((_, index) => {
                            const isCurrent = index === currentQuestion;
                            const isAnswered = userAnswers.find(
                                (ans) => ans.question === cloudPractitionerQuestions[index].question
                            );
                            const isCorrect = isAnswered?.isCorrect;

                            return (
                                <button
                                    key={index}
                                    onClick={() => handleProgressBarClick(index)}
                                    className={`relative w-6 h-6 rounded-full focus:outline-none transition 
                    ${
                                        isCurrent
                                            ? 'bg-blue-600 ring-2 ring-blue-300'
                                            : isAnswered
                                                ? isCorrect
                                                    ? 'bg-green-500'
                                                    : 'bg-red-500'
                                                : 'bg-gray-400 dark:bg-gray-500'
                                    }
                    hover:bg-blue-700`}
                                    aria-label={`Go to question ${index + 1}`}
                                >
                                    {/* Display Icons for Answered Questions */}
                                    {isAnswered && !isCurrent && (
                                        <span className="absolute inset-0 flex items-center justify-center text-xs text-white">
                                            {isCorrect ? <FaCheck /> : <FaTimes />}
                                        </span>
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Subdomain Progress Bar */}
            <div className="w-full max-w-2xl mb-6">
                <div className="flex justify-between items-center mb-1">
                    <span className="text-xs w-2/5 font-medium text-gray-700 dark:text-gray-300">
                        {currentSubDomain}
                    </span>
                    <span className="text-xs w-1/2 text-right font-medium text-gray-700 dark:text-gray-300">
                        {currentCriticalTopic}
                    </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 dark:bg-gray-700">
                    <div
                        className="bg-green-500 h-3 rounded-full transition-width duration-300"
                        style={{ width: `${subDomainProgress}%` }}
                    ></div>
                </div>
            </div>

            {/* Quiz Content */}
            <div className="max-w-2xl w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 relative">
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
                                <h3 className="text-xl font-semibold text-blue-800 dark:text-blue-200 mb-2">
                                    {cloudPractitionerQuestions[currentQuestion].question}
                                </h3>
                            </div>

                            {/* Options */}
                            <ul className="space-y-3">
                                {cloudPractitionerQuestions[currentQuestion].options.map(
                                    (option, index) => {
                                        const isOptionCorrect =
                                            option === cloudPractitionerQuestions[currentQuestion].answer;
                                        const isOptionSelected = option === selectedOption;

                                        return (
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
                                                        } else if (isOptionCorrect) {
                                                            handleNextQuestion();
                                                        }
                                                    }}
                                                    disabled={!!selectedOption && !isOptionCorrect}
                                                    className={`w-full flex items-center justify-between px-4 py-2 border rounded-lg text-left transition-colors duration-300 focus:outline-none
                            ${
                                                        selectedOption
                                                            ? isOptionCorrect
                                                                ? 'bg-green-100 dark:bg-green-700 border-green-500 cursor-pointer'
                                                                : isOptionSelected
                                                                    ? 'bg-red-100 dark:bg-red-700 border-red-500 cursor-default'
                                                                    : 'bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 cursor-default'
                                                            : 'bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 hover:bg-blue-50 dark:hover:bg-blue-800 cursor-pointer'
                                                    }
                          `}
                                                    aria-pressed={isOptionSelected}
                                                >
                          <span className="text-gray-800 dark:text-gray-200">
                            {option}
                          </span>
                                                    {selectedOption && (
                                                        isOptionCorrect ? (
                                                            <FaCheckCircle className="h-6 w-6 text-green-500" />
                                                        ) : isOptionSelected ? (
                                                            <FaTimesCircle className="h-6 w-6 text-red-500" />
                                                        ) : null
                                                    )}
                                                </button>
                                            </motion.li>
                                        );
                                    }
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
                                            {cloudPractitionerQuestions[currentQuestion].explanation}
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
