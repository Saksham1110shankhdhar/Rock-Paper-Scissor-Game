alert("Welcome to Rock Paper Scissors Game!");

let Score={
    ComputerWon:0,
    UserWon:0,
    Tie:0,

    updateScore : function(){
        this.Saveresult();
        document.querySelector('.Score').innerHTML=`<u>Score</u> :
        Computer Won <i class="fa-solid fa-arrow-right fa-beat" style="color:rgb(65, 4, 249);"></i> ${this.ComputerWon}
        <br>You Won  <i class="fa-solid fa-arrow-right fa-beat" style="color:rgb(65, 4, 249);"></i> ${this.UserWon} 
        <br> Tie  <i class="fa-solid fa-arrow-right fa-beat" style="color:rgb(65, 4, 249);"></i> ${this.Tie}`;
   
    },

    Saveresult : function(){
        let scoreStr= JSON.stringify(this);
        localStorage.setItem('Score',scoreStr);
        console.log(`Score Saved : ${scoreStr}`);
    }
};

function initialize(){
    let saveScore=localStorage.getItem('Score');
    if(saveScore){
        console.log(`Previous Score Found : ${saveScore}`);
        let scoreVal=JSON.parse(saveScore);
        Score.ComputerWon=scoreVal.ComputerWon;
        Score.UserWon=scoreVal.UserWon;
        Score.Tie=scoreVal.Tie;
        Score.updateScore();
    }
}

function computerChoice(){
    let  computerChoices=Math.floor(Math.random()*3+1);
    return computerChoices;
}

function computeComputerChoice(){
    let computerChoices=computerChoice();
    let computerChoiceText;
    if (computerChoices===1){
        computerChoiceText=`🪨Rock`;
    }else if(computerChoices===2){
        computerChoiceText=`📃Paper`;
    }else{
        computerChoiceText=`✂️Scissors`;
    }
    return computerChoiceText;
}

function updateResult(userChoice,computerChoice,result){
    document.querySelector('.result').innerHTML=
    `You Choised <i class="fa-solid fa-arrow-right fa-beat" style="color:rgb(227, 102, 249);"></i> ${userChoice}.<br>
    Computer Choised <i class="fa-solid fa-arrow-right fa-beat" style="color:rgb(227, 102, 249);"></i> ${computerChoice}.<br>
    <h3> The Result is <i class="fa-solid fa-forward fa-shake fa-lg" style="color:rgb(249, 36, 221);"></i> ${result}`;
}

function ResetScore(){
    console.log('Resetting Score...');
    Score.ComputerWon=0;
        Score.UserWon=0;
        Score.Tie=0;
        Score.updateScore();
}

function ComputeResult(userChoice,computerChoice){
    let result= 'Unknown';
    
    if(userChoice === computerChoice){
        result=`It's a Tie!⚔`;
        Score.Tie++;
    } else if ((computerChoice === '🪨Rock' && userChoice === '✂️Scissors') ||
               (computerChoice === '✂️Scissors' && userChoice === '📃Paper') ||
               (computerChoice === '📃Paper' && userChoice === '🪨Rock')) {
        result = `*Computer Wins!👻*`;
        Score.ComputerWon++;
        }else{
           result=' --You Won!🏆💪🎉🥳--' ;
            Score.UserWon++;
        }
     Score.updateScore();
     return result;
}

function onRock(){
    const userChoice='🪨Rock';
    let computerChoices=computeComputerChoice();

    let result=ComputeResult(userChoice,computerChoices);
    updateResult(userChoice,computerChoices,result);
}

function onPaper(){
    const userChoice='📃Paper';
    let computerChoices= computeComputerChoice();

    let result=ComputeResult(userChoice,computerChoices);
    updateResult(userChoice,computerChoices,result);
   
}

function onScissors(){
    const userChoice='✂️Scissors';
    let computerChoices= computeComputerChoice();
   
    let result=ComputeResult(userChoice,computerChoices);
    updateResult(userChoice,computerChoices,result);
}

initialize();