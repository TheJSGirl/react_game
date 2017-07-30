import React, {Component} from  'react';
import QuizeOptions from './QuizOptions';

class Quiz extends Component {
    constructor(props){
        super(props);
        let correct = false;
        let gameOver= false;
        let riddle = this.playGame();
        this.state={
            riddle,
            correct,
            gameOver
        }; 

        this.renderOptions = this.renderOptions.bind(this);
        this.checkResults  = this.checkResults.bind(this);
    }

    checkResults(option){
        if(this.state.riddle.answer === option){
            console.log("you played awsome");
            this.setState({correct: true, gameOver: true});
        }
        else{
            console.log("try next time");
            this.setState({correct: false, gameOver: false});
        }
        return console.log  ('checkresults called '+ option);
    }

    randomNumber(min, max){
        return Math.floor(Math.random() * (max-min+1))+min;
    }

    generateRandomOptions(sum){
        let result = sum;
        let resultsArray =[];
        let randomNumberArray = [];

        while(randomNumberArray.length <= 3){
            let randomNumber = this.randomNumber(1, 19);
            //avoid same random number again
            if (randomNumberArray.indexOf(randomNumber) > -1) continue;
            randomNumberArray.push(randomNumber);

        }
        console.log(randomNumberArray);
        for(let i=0; i<3; i++){

             let addSubtract = this.randomNumber(0,1);
                if(addSubtract ===1){
                    //add the number to the result
                    result+=randomNumberArray[i];
                    resultsArray.push(result);
                }

                else{
                    //substract the number from the result
                    result-= randomNumberArray[i];
                    resultsArray.push(result);
                    
                }
        }
       

        return resultsArray;
    }

    playGame(){
        // console.log(this.randomNumber(20, 50), this.randomNumber(20, 50));
       let  field1 = this.randomNumber(20,50);
       let  field2 = this.randomNumber(20,50);
       let  result = field1 + field2; 
       let resultsArray= this.generateRandomOptions(result);
       resultsArray.push(result);
       //avoid the same position on every iteration
       resultsArray.sort((a, b)=>{
           return 0.5 - Math.random();
       })
    
       let riddle  = {
            
            resultsArray:resultsArray,
            field1: field1,
            field2: field2,   
            answer: result
        };
        console.log(riddle);
        return(riddle);
    }

    renderOptions(){
        return(
            <div className="options">
                {this.state.riddle.resultsArray.map((option,  i) => 
                 <QuizeOptions option = {option} key={i} checkResults= {(option)=>this.checkResults(option )}/>
                )} 
               
                                                
            </div>
                    

        );
    }

    render(){
        return(
            <div className="quiz">
                <div className="quiz-content">
                    <p className="question">
                        What is the sum of <span className="text-info">{this.state.riddle.field1}</span> and <span className="text-info">{this.state.riddle.field2}</span> ?
                        {this.renderOptions()}
                    </p>
                    Correct: {this.state.correct ? "True" : "False"}<br/>
                    GameOver:{this.state.gameOver? "True" : "False"}
                    <div className="play-again"><a className="button">Play Again</a></div>
                </div>
            </div>
        )
    }

}

export default Quiz;