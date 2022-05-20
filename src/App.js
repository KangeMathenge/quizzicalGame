import React from 'react'
import { nanoid } from 'nanoid'
import Intro from './Intro'
import Question from './Question'
// import data from './data'

export default function App(){
    
    const [quizData, setQuizData] = React.useState([])
    const [startQuiz, setStartQuiz] = React.useState(false)
    const [score, setScore] = React.useState(0)
    const [showResult, setShowResult] = React.useState(false)
    const [restart, setRestart] = React.useState(false)
    

    React.useState(()=>{
       async function getQuizData(){
       const  res = await fetch("https://opentdb.com/api.php?amount=5&category=9&difficulty=easy&type=multiple")
        const data = await res.json()
        setQuizData(data.results)
        }
        getQuizData()
    },[restart])
    
    // React.useEffect(()=>{
    //      setQuizData(data)
    // },[restart])
    
    const holdAnswer=(ansId,questionId)=>{
        setQuizData(prevData => prevData.map(item => {
            if(item.id === questionId){
                return({
                    ...item,
                    options:item.options.map(ans =>{
                        if(ans.id === ansId){       
                       return {
                             ...ans,
                            isSelected:!ans.isSelected  
                        }
                    }else{
                            return {
                             ...ans,
                            isSelected:false  
                        }
                        }                      
                        }
                )
                ,scored: item.correct_answer === item.options.find(ans => ans.id === ansId).answer?true:false // how is this working 🤦‍♂️
                })         
            }else{
                return item
            }
        }))   
    }

    //shuffle answers using Fisher-Yates algorithm
    const shuffleAnswer = (array)=>{
    for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array.map(ans => {
      return{
          id:nanoid(),
          answer:ans,
          isSelected:false
      }
  })
}
    //escape special punctiation
    const escapeSpecial=(text)=>{
        return text
        .replaceAll("&quot;","'")
        .replaceAll("&#039;","'")
        .replaceAll("&shy;","-")
        .replaceAll("&rsquo;","‘")
        .replaceAll("&Irm;","'")
        .replaceAll("&Eacute;","é")
        
        
    }
//map over quizData to get desired data 
    function renderQuiz(){
        setStartQuiz(true)
        setQuizData(prevData => {
            return prevData.map(item=>(
                {
                    id:nanoid(),
                    question:item.question,
                    correct_answer:item.correct_answer,
                    options:shuffleAnswer([...item.incorrect_answers,item.correct_answer]),
                    scored:false
                }
            ))
        })
    }
    const restartQuiz = ()=>{
        setRestart(prevStart => !prevStart)
       const reloadPage = window.location.reload()
       reloadPage()
        // renderQuiz()
        // setStartQuiz(true)
        // setScore(0)
    }
    const scoreQuiz = ()=>{
        const myScore = quizData.filter(item => item.scored)
        setScore(myScore.length)
        setShowResult(true)
        // console.log(score)
    }
    
    const questionElements = quizData.map(item => {
        const myQuest = escapeSpecial(item.question)
         return <Question     
            key= {item.id}    
            id={item.id}  
            question = {myQuest}
            correct_answer = {item.correct_answer}
            options = {item.options}
            showResult = {showResult}
            isScored = {item.scored}
            holdAnswer={holdAnswer}
        />
    })
     console.log("rendered")
    return(
        <main >
       
       {
        startQuiz  
        
        ?
        <>
        
           {questionElements }
           
        
        { showResult ? 
        <div className="footer">
          <p className="user-score">You scored {score}/5 correct answers</p>
          <button  className="check-quiz" onClick={restartQuiz}>
            Play Again
          </button>
        </div>
       : 
       <div className="footer">
        <button  className="check-quiz" onClick={scoreQuiz}>
          Check answers
        </button>
        </div>
       }
        </>
       
        :
        <Intro renderQuiz={renderQuiz}/> 
             
        }      
        
        </main>
    )
}