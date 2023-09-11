import React, { useState, useEffect } from 'react';

function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true); // Estado de carregamento
  const [showQuestions, setShowQuestions] = useState(true); // Estado para controlar a exibição das perguntas
  const [currentQuestion, setCurrentQuestion] = useState(null); // Defina currentQuestion como estado

  const apiKey = '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';

  const fetchQuestionAndOptionsFromOpenAI = async () => {
    setLoading(true); // Defina o estado de carregamento para true ao iniciar a busca

    try {
      const messages = [
        { role: 'system', content: 'Você é um quiz bot.' },
        { role: 'user', content: 'Em ingles crie uma pergunta de quiz para mim sobre a importância da União Europeia (UE) nas nossas vidas.' },
        { role: 'assistant', content: 'Em ingles dê-me quatro opções de resposta em ingles.' },
      ];

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages,
        }),
      });

      if (!response.ok) {
        throw new Error('Erro ao carregar pergunta e opções de resposta');
      }

      const responseData = await response.json();
      console.log(responseData);
      const assistantResponse = responseData.choices[0].message.content;

      const responseLines = assistantResponse.split('\n\n');

      const question = responseLines[1].trim();

      const responseLines2 = assistantResponse.split('\n');

      let optionsStartIndex = responseLines2.findIndex(line => /^[a-z]\)/i.test(line));

      if (optionsStartIndex === -1) {
        optionsStartIndex = 2;
      }

      const options = responseLines2.slice(optionsStartIndex, optionsStartIndex + 4).map(line => line.trim());

      setQuestions([
        ...questions,
        {
          question,
          options,
        },
      ]);

      setCurrentQuestion({ question, options }); // Defina o estado currentQuestion
      setLoading(false); // Defina o estado de carregamento para false após receber a resposta
    } catch (error) {
      console.error('Erro ao carregar pergunta e opções de resposta:', error);
      setLoading(false); // Certifique-se de definir o estado de carregamento para false em caso de erro
    }
  };

  useEffect(() => {
    fetchQuestionAndOptionsFromOpenAI();
  }, []);

  const handleAnswerClick = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }

    if (currentQuestionIndex < 9) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      fetchQuestionAndOptionsFromOpenAI();
    } else {
      // Após responder a última pergunta, ocultar as perguntas
      setShowQuestions(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto p-4 text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
        <p className="text-lg">Loading next question...</p>
      </div>
    );
  }
  

  if (showQuestions) {
    return (
      <div className="container mx-auto p-4 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-black">Question {currentQuestionIndex + 1}</h2>
        <p className="text-lg mb-6 text-black">{currentQuestion && currentQuestion.question}</p>
        <div className="grid grid-cols-2 gap-4">
          {currentQuestion &&
            currentQuestion.options.map((option, index) => (
              <button
                key={index}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => handleAnswerClick(option.toLowerCase() === 'verdadeiro')}
              >
                {option}
              </button>
            ))}
        </div>
        <div className="flex justify-center mt-4">
                <img src="/logo.png" alt="Logo" className="h-16" />
            </div>
      </div>
    );
  } else {
    return (
      <div className="container mx-auto p-4 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4 text-black">Final Score: {score}/10</h1>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => {
            setCurrentQuestionIndex(0);
            setScore(0);
            setQuestions([]);
            setShowQuestions(true);
          }}
        >
          Restart
        </button>
        <div className="flex justify-center mt-4">
                <img src="/logo.png" alt="Logo" className="h-16" />
            </div>
      </div>
    );
  }
  
}

export default Quiz;
