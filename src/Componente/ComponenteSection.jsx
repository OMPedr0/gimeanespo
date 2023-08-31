import React, { useState } from "react";
import ButoonsEscolha from "./ButoonsEscolha";

import questions_pt from "./questions_pt"; // Portuguese questions
import questions_en from "./questions_en"; // English questions

const languageQuestions = {
    pt: questions_pt,
    en: questions_en,
    // Add more languages as needed
};

export default function Quiz(props) {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);

    const [selectedLanguage, setSelectedLanguage] = useState('pt'); // Default language is Portuguese

    const handleOptionSelect = (selectedOption) => {
        console.log("Selected Language:", selectedLanguage);
        console.log("Current Question Index:", currentQuestion);
        
        const selectedLanguageQuestions = languageQuestions[selectedLanguage];
        console.log("Selected Language Questions:", selectedLanguageQuestions);
    
        const correctAnswer = selectedLanguageQuestions[currentQuestion].resposta;
    

        if (selectedOption === correctAnswer) {
            setScore(score + 1); // Increase the score when the answer is correct
            setShowCorrectAnswer("correct");
        } else {
            setShowCorrectAnswer(correctAnswer);
        }

        // Move the setCurrentQuestion logic outside the if-else block
        if (currentQuestion < languageQuestions[selectedLanguage].length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            setShowCorrectAnswer(false); // Reset the correct answer display
            setCurrentQuestion(0); // Reset the question index
        }
    };

    const nextQuestion = () => {
        setShowCorrectAnswer(false);
        if (currentQuestion < languageQuestions[selectedLanguage].length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        }
    };

    return (
        <div className="flex flex-col items-center p-4">
            {selectedLanguage === "pt" ? "Jogo de Perguntas - Europa" : "Quiz Questions - Europe"}
            <div className="flex space-x-4">
                <button
                    onClick={() => setSelectedLanguage('pt')}
                    className={`language-button ${selectedLanguage === 'pt' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-800'} py-2 px-4 rounded`}
                >
                    Portuguese
                </button>
                <button
                    onClick={() => setSelectedLanguage('en')}
                    className={`language-button ${selectedLanguage === 'en' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-800'} py-2 px-4 rounded`}
                >
                    English
                </button>
                {/* Add more buttons for other languages if needed */}
            </div>
            <section className="w-full md:w-96 bg-white rounded-lg">
                {currentQuestion < languageQuestions[selectedLanguage].length ? (
                    <div>
                        <ButoonsEscolha
                            pergunta={languageQuestions[selectedLanguage][currentQuestion].pergunta}
                            opcoes={languageQuestions[selectedLanguage][currentQuestion].opcoes}
                            onOptionSelect={handleOptionSelect}
                        />
                        {showCorrectAnswer && (
                            <div className="text-center mt-2">
                                {showCorrectAnswer === "correct" ? (
                                    <p className="text-green-500">Resposta correta!</p>
                                ) : (
                                    <p className="text-red-500">
                                        Resposta incorreta. A resposta correta é:{" "}
                                        {showCorrectAnswer}
                                    </p>
                                )}
                                <button
                                    className="mt-2 bg-blue-500 text-white py-2 px-4 rounded"
                                    onClick={nextQuestion}
                                >
                                    Próxima pergunta
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="text-center">
                        <p className="text-black">Quiz completed!</p>
                        <p className="text-black">Your score: {score}</p>
                    </div>
                )}
            </section>

            <div className="flex justify-center mt-4">
                <img src="/logo.png" alt="Logo" className="h-16" />
            </div>
        </div>
    );
}
