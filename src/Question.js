import React from 'react'
export default function Question(props){
    
    

    const escapeSpecial=(text)=>{
        return text
        .replaceAll("&quot;","'")
        .replaceAll("&#039;","'")
        .replaceAll("&rsquo;","'")
        .replaceAll("&shy;","'")
        .replaceAll("&lrm;","'")
    }

    const displayOptions = props.options.map(item => {
        const styles = {
        backgroundColor: item.isSelected?'#D6DBF5':'#FBF7F6'
        }
        const cleanOptions = escapeSpecial(item.answer)
        return props.showResult ?
         (<button  key={item.id}  onClick={()=>props.holdAnswer(item.id,props.id)} className={`quiz-answer ${!props.isScored && item.isSelected ? 'incorrect-answer':
         props.isScored && item.isSelected?'correct-answer': ""}`}>{cleanOptions}</button>):
        (<button  key={item.id}  style={styles} onClick={()=>props.holdAnswer(item.id,props.id)} className="quiz-answer">{cleanOptions}</button>)
    })
   
    return(
        <section className = "Question">
        <h1 className="quiz-question">{props.question}</h1>
        <div className="btn-row">
          { displayOptions }
        </div>
          <p className='right-answer'>
          {props.showResult && 
          !props.isScored &&
           `The correct answer is : ${props.correct_answer}`}
           </p>
        <hr/>
        </section>
    )
}
        