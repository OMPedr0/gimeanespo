import React, { useState, useEffect } from "react";
import ButoonsEscolha from "./ButoonsEscolha";

import questions_pt from "./questions_pt"; // Portuguese questions
import questions_en from "./questions_en"; // English questions

const languageQuestions = {
    pt: questions_pt,
    en: questions_en,
    // Add more languages as needed
};

export default function Quiz() {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState("pt");

    const selectedLanguageQuestions = languageQuestions[selectedLanguage];
    const totalQuestions = selectedLanguageQuestions.length;

    const handleOptionSelect = (selectedOption) => {
        const correctAnswer = selectedLanguageQuestions[currentQuestion].resposta;

        if (selectedOption === correctAnswer) {
            setScore(score + 1);
            setShowCorrectAnswer("correct");
        } else {
            setShowCorrectAnswer(correctAnswer);
        }

        if (currentQuestion < totalQuestions - 1) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            setShowScore(true);
        }


    };

    useEffect(() => {
        setCurrentQuestion(0);
        setScore(0);
        setShowScore(false);
    }, [selectedLanguage]);

    const nextQuestion = () => {
        if (currentQuestion < totalQuestions - 1) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            setShowScore(true); // All questions answered, show score
        }
    };

    const restartQuiz = () => {
        setCurrentQuestion(0);
        setScore(0);
        setShowScore(false);
    };

    return (
        <div className="flex flex-col items-center p-4">
            <h1>
                {selectedLanguage === "pt" ? "Jogo de Perguntas - Europa" : "Quiz Questions - Europe"}
            </h1>
            <div className="flex space-x-4">
                <button
                    onClick={() => setSelectedLanguage("pt")}
                    className={`language-button ${selectedLanguage === "pt"
                        ? "bg-blue-500 text-white"
                        : "bg-gray-300 text-gray-800"
                        } py-2 px-4 rounded`}
                >
                    Portuguese
                </button>
                <button
                    onClick={() => setSelectedLanguage("en")}
                    className={`language-button ${selectedLanguage === "en"
                        ? "bg-blue-500 text-white"
                        : "bg-gray-300 text-gray-800"
                        } py-2 px-4 rounded`}
                >
                    English
                </button>
            </div>
            <section className="w-full md:w-96 bg-white rounded-lg p-4">
                {showScore ? (
                    <div className="text-center">
                        <p className="text-black">Quiz completed!</p>
                        <p className="text-black">Your score: {score}</p>

                        <button
                            className="mt-2 bg-blue-500 text-white py-2 px-4 rounded"
                            onClick={restartQuiz}
                        >
                            Restart Quiz
                        </button>
                    </div>
                ) : (
                    <div>
                        <ButoonsEscolha
                            pergunta={selectedLanguageQuestions[currentQuestion].pergunta}
                            opcoes={selectedLanguageQuestions[currentQuestion].opcoes}
                            onOptionSelect={handleOptionSelect}
                        />
                        {showCorrectAnswer && (
                            <div className="text-center mt-2">
                                {showCorrectAnswer === "correct" ? (
                                    <p className="text-green-500">
                                        {selectedLanguage === "pt" ? "Resposta correta" : "Correct answer"}
                                    </p>
                                ) : (
                                    <p className="text-red-500">
                                    {selectedLanguage === "pt"
                                        ? "Resposta incorreta. A resposta correta é:"
                                        : "Incorrect answer. The correct answer is:"}{" "}
                                    {showCorrectAnswer}
                                </p>
                                )}
                                <button
                                    className="mt-2 bg-blue-500 text-white py-2 px-4 rounded"
                                    onClick={nextQuestion}
                                >
                                      {selectedLanguage === "pt" ? "Próxima pergunta" : "Next question"}
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </section>

            <div className="flex justify-center mt-4">
                <img src="/logo.png" alt="Logo" className="h-16" />
            </div>
        </div>
    );
}
