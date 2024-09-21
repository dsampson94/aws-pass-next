// components/Quiz.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import QuizNavigation from './QuizNavigation';
import SubdomainProgress from './SubdomainProgress';
import QuizProgress from './QuizProgress';
import QuizContent from './QuizContent';
import { Question, UserAnswer } from '@/components/quiz/types';

type QuizProps = {
    questions: Question[];
    quizKey: string;
};

const Quiz: React.FC<QuizProps> = ({ questions, quizKey }) => {
    const LOCAL_STORAGE_KEY = `${ quizKey }QuizAnswers`;

    const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
    const [currentQuestion, setCurrentQuestion] = useState<number>(0);
    const [score, setScore] = useState<number>(0);
    const [showScore, setShowScore] = useState<boolean>(false);
    const [showExplanation, setShowExplanation] = useState<boolean>(false);
    const [selectedOption, setSelectedOption] = useState<string>('');
    const [, setIsCorrect] = useState<boolean | null>(null);

    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

    const settingsRef = useRef<HTMLDivElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const [subDomainProgress, setSubDomainProgress] = useState<number>(0);
    const [currentSubDomain, setCurrentSubDomain] = useState<string>(questions[0].subDomain);
    const [currentCriticalTopic, setCurrentCriticalTopic] = useState<string>(questions[0].criticalTopic);

    const totalQuestions = questions.length;

    const findFirstUnanswered = (answers: UserAnswer[]): number => {
        for (let i = 0; i < totalQuestions; i++) {
            const question = questions[i].question;
            const answered = answers.find((ans) => ans.question === question);
            if (!answered) {
                return i;
            }
        }
        return totalQuestions - 1;
    };

    const calculatePercentComplete = (): number => {
        const answeredQuestions = userAnswers.length;
        return Math.round((answeredQuestions / totalQuestions) * 100);
    };

    useEffect(() => {
        const storedAnswers = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (storedAnswers) {
            try {
                const parsedAnswers: UserAnswer[] = JSON.parse(storedAnswers);
                setUserAnswers(parsedAnswers);
                const storedScore = parsedAnswers.filter((answer) => answer.isCorrect).length;
                setScore(storedScore);
                const firstUnanswered = findFirstUnanswered(parsedAnswers);
                setCurrentQuestion(firstUnanswered);
            } catch (error) {
                console.error('Failed to parse stored answers:', error);
            }
        }
    }, [LOCAL_STORAGE_KEY]);

    useEffect(() => {
        const currentQ = questions[currentQuestion];
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

        const questionsInSubDomain = questions.filter((q) => q.subDomain === currentQ.subDomain).length;
        const answeredInSubDomain = userAnswers.filter(
            (ans) => questions.find((q) => q.question === ans.question)?.subDomain === currentQ.subDomain
        ).length;
        setSubDomainProgress(Math.round((answeredInSubDomain / questionsInSubDomain) * 100));
    }, [currentQuestion, userAnswers, questions]);

    const handleOptionSelect = (option: string) => {
        if (selectedOption) return;
        setSelectedOption(option);
        setShowExplanation(true);
        const correct = option === questions[currentQuestion].answer;
        setIsCorrect(correct);
        if (correct) {
            setScore((prev) => prev + 1);
        }

        setUserAnswers((prev) => {
            const updatedAnswers = [...prev];
            const existingIndex = updatedAnswers.findIndex(
                (answer) => answer.question === questions[currentQuestion].question
            );
            if (existingIndex !== -1) {
                if (updatedAnswers[existingIndex].isCorrect && !correct) {
                    setScore((prev) => prev - 1);
                } else if (!updatedAnswers[existingIndex].isCorrect && correct) {
                    setScore((prev) => prev + 1);
                }
                updatedAnswers[existingIndex] = {
                    question: questions[currentQuestion].question,
                    selectedOption: option,
                    isCorrect: correct,
                };
            } else {
                updatedAnswers.push({
                    question: questions[currentQuestion].question,
                    selectedOption: option,
                    isCorrect: correct,
                });
            }

            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedAnswers));

            return updatedAnswers;
        });
    };

    const handleNextQuestion = () => {
        if (currentQuestion + 1 < totalQuestions) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            setShowScore(true);
        }
    };

    const handlePrevQuestion = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(currentQuestion - 1);
        }
    };

    const handleProgressBarClick = (index: number) => {
        setCurrentQuestion(index);
    };

    const handleRestartQuiz = () => {
        setCurrentQuestion(0);
        setSelectedOption('');
        setScore(0);
        setShowScore(false);
        setShowExplanation(false);
        setIsCorrect(null);
        setUserAnswers([]);

        localStorage.removeItem(LOCAL_STORAGE_KEY);

        setIsDropdownOpen(false);
    };

    const handleGoToFirstUnanswered = () => {
        const firstUnanswered = findFirstUnanswered(userAnswers);
        if (userAnswers.length === totalQuestions) {
            alert('All questions have been answered!');
        } else {
            setCurrentQuestion(firstUnanswered);
        }

        setIsDropdownOpen(false);
    };

    const toggleDropdown = () => {
        setIsDropdownOpen((prev) => !prev);
    };

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
            <QuizNavigation
                currentQuestion={ currentQuestion }
                handlePrevQuestion={ handlePrevQuestion }
                handleNextQuestion={ handleNextQuestion }
                selectedOption={ selectedOption }
                totalQuestions={ totalQuestions }
                handleRestartQuiz={ handleRestartQuiz }
                handleGoToFirstUnanswered={ handleGoToFirstUnanswered }
                toggleDropdown={ toggleDropdown }
                isDropdownOpen={ isDropdownOpen }
                settingsRef={ settingsRef }
                dropdownRef={ dropdownRef }
            />

            <SubdomainProgress
                currentSubDomain={ currentSubDomain }
                currentCriticalTopic={ currentCriticalTopic }
                subDomainProgress={ subDomainProgress }
            />

            <QuizProgress
                userAnswers={ userAnswers }
                currentQuestion={ currentQuestion }
                questions={ questions }
                handleProgressBarClick={ handleProgressBarClick }
                totalQuestions={ totalQuestions }
                calculatePercentComplete={ calculatePercentComplete }
            />

            <QuizContent
                showScore={ showScore }
                score={ score }
                totalQuestions={ totalQuestions }
                questions={ questions }
                currentQuestion={ currentQuestion }
                handleOptionSelect={ handleOptionSelect }
                selectedOption={ selectedOption }
                showExplanation={ showExplanation }
                handleRestartQuiz={ handleRestartQuiz }
            />
        </div>
    );
};

export default Quiz;
