var $startBtn = document.getElementById("start");
var $timer = document.getElementById("timer");
var $questionContainer = document.getElementById("question-container");
var $question = document.getElementById("question");
var $choicesList = document.getElementById("choicesList");

var questions = quiz;
let timeLeft = 10000;

//target start button
$startBtn.addEventListener('click', startGame);

function startGame() {
    event.preventDefault();
    //Then a timer starts
    
    // console.log(timeLeft);
    var timer = setInterval(function () {
        $timer.innerText = `Time Left: ${timeLeft}`;
        timeLeft -= 1;
        if (timeLeft === 0) {
            endGame();
        }
        if (timeLeft > 0) {
            setTimeout(timer, 1000);
        }
        if (timeLeft < 0) {
            timeLeft = 0;
        }
    })
    showQuestion();

}
   //I am presented with a question
   const showQuestion = () => {
    
       console.log("I'm working");
    var question = questions.shift();  
    // for (i=0; i < questions.length; i++) {
        // question = questions[i];
        $question.innerText = `${question.title}`;
        // console.log(question['choices']);
        question['choices'].forEach(choice => {
            var $choice = document.createElement('li');
            
            $choice.innerText= `${choice}`;
            $choicesList.append($choice);
            // if ( i = i + 1) {
                // return;
            // }
            $choicesList.addEventListener("click", (event) => {clickAnswer(event, question.answer)})
        });
          
    //    }
     }
       //When I answer a question
const clickAnswer = (event, answer) => {
    event.preventDefault();

    //Then I am presented with another question
    if (event.target.innerText === answer) {
        event.target.style.backgroundColor = '#164032';
        timeLeft+=1;
        if (questions.length !== 0) {
            $choicesList.innerHTML = '';
            showQuestion();
        //When all questions are answered or the timer reaches 0
        } else {
             endGame(); 
        }
    //When I answer a question incorrectly
    } else {
        event.target.style.borderColor = '#e53935';
      event.target.style.backgroundColor = '#661917';
        timeLeft-=1;
        if (questions.length !== 0) {
            $choicesList.innerHTML = '';
            showQuestion();
        //When all questions are answered or the timer reaches 0
        } else {
            //Then the game is over
             endGame(); 
        }
    }
}

//When the game is over
const endGame = () => {
document.getElementById("nameSubmit").addEventListener("click", submitName)
}
//Then I can save my initials and score
const submitName = (event) => {
    event.preventDefault();

    const playerName = document.getElementById("player").value;
    const player = {
        name: playerName,
        score: timeLeft
    }
    //console.log(player);
    localStorage.setItem(`name: ${playerName}`, `score: ${timeLeft}`);
    localStorage.getItem(player);

};