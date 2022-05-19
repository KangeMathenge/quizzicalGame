import React from 'react'

export default function Intro(props){
    return(
        <div className="quiz-intro">
        <h1 className="quiz-header">Quizzical</h1>
        <p className="quiz-text">Test out you knowledge with a quiz</p>
        <button className="start-quiz" onClick={props.renderQuiz}>Start quiz</button>
        </div>
    )
}