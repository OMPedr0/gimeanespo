import React from "react";


export default function (props) {
  const handleOptionSelect = (selectedOption) => {
    props.onOptionSelect(selectedOption);
  };

  return (
    <div className="flex flex-col items-center p-4">
      <p className="mb-2 text-lg text-red-600">{props.pergunta}</p>
      {props.opcoes.map((opcao, index) => (
        <button
          key={index}
          className="mb-2 w-full md:w-64 bg-blue-500 hover:bg-blue-600 text-white rounded-md px-4 py-2 border border-blue-500 hover:border-blue-600 transition"
          onClick={() => handleOptionSelect(opcao)}
        >
          {opcao}
        </button>
      ))}
    </div>
  )
}
