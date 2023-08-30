import React from "react";
import Filho1doSection from "./Filho1doSection";
import ButoonsEscolha from "./ButoonsEscolha";

export default function(props){

    return(
        <div>
            <p className="header">Jogo de Perguntas - Matemática</p>
            <section className="componente">
           <Filho1doSection texto='Perguntas retornadas da API'/>
           <ButoonsEscolha/>
           <ButoonsEscolha/>
           <ButoonsEscolha/>
           <ButoonsEscolha/>
            </section>
        </div>
    )
}