import React from "react";
import ButoonsEscolha from "./ButoonsEscolha";

import questions from "./questions"; // Importe o array de perguntas

import { useState } from "react";

export default function (props) {

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);

    const handleOptionSelect = (selectedOption) => {
        if (selectedOption === questions[currentQuestion].resposta) {
            setScore(score + 1);
        }

        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            setCurrentQuestion(questions.length); // Finaliza o quiz quando todas as perguntas forem respondidas
        }
    };


    return (
        <div className="flex flex-col items-center p-4">
            <p className="text-xl mb-4 ">Jogo de Perguntas - Europa</p>
            <section className="w-full md:w-96 bg-white rounded-lg">
                {currentQuestion < questions.length ? (
                    <ButoonsEscolha
                        pergunta={questions[currentQuestion].pergunta}
                        opcoes={questions[currentQuestion].opcoes}
                        onOptionSelect={handleOptionSelect}
                    />
                ) : (
                    <div className="text-center">
                        <p className=" text-black">Quiz completed!</p>
                        <p className=" text-black">Your score: {score}</p>
                    </div>
                )}
            </section>
        </div>
    )
}