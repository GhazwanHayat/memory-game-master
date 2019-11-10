//First step: I will creat the <li><i> elements for the html:
function CreateGrid() {
    //1st step:Getting the paremter node <ul> so I can append shildren to it.
    const UlDeck = document.querySelector('.deck');
    for(i = 0; i < 16; i++) {
        const NewCard = document.createElement('li');
        NewCard.className = 'card';
        NewCard.addEventListener('click', ClickedLi);
        const NewI = document.createElement('i');
        NewCard.appendChild(NewI);
        UlDeck.appendChild(NewCard);
    }
    
}
CreateGrid();

//2nd step:make a function to give classes to the <li> elements:
//geting the collection of the <i> elements to assign classes to them.
let ListOfI = document.querySelectorAll('.deck .card i');
//now to start the function:
function AssignClasses(array) {
    array[0].className = "fa fa-diamond";
    array[1].className = "fa fa-paper-plane-o";
    array[2].className = "fa fa-anchor";
    array[3].className = "fa fa-bolt";
    array[4].className = "fa fa-cube";
    array[5].className = "fa fa-anchor";
    array[6].className = "fa fa-leaf";
    array[7].className = "fa fa-bicycle";
    array[8].className = "fa fa-diamond";
    array[9].className = "fa fa-bomb";
    array[10].className = "fa fa-leaf";
    array[11].className = "fa fa-bomb";
    array[12].className = "fa fa-bolt";
    array[13].className = "fa fa-bicycle";
    array[14].className = "fa fa-paper-plane-o";
    array[15].className = "fa fa-cube";
}
AssignClasses(ListOfI);

//I replaced the provided shuffle function.
//3rd step:Here I will use a list of all my <li> elements to shuffle
//and I will call it on page load.
const cards = document.querySelectorAll('.card');
(function shuffle() {
    cards.forEach(card => {
      let randomPos = Math.floor(Math.random() * 15);
      card.style.order = randomPos;
    });
  })();

let hasFlipped = false;
let LockBord = false;
let firstCard, secondCard;
let countMoves = 0;
let firstClick = false;
let matchCount = 0;
document.querySelector('.moves').innerHTML = countMoves ; //this to change the showed moves  
let stars = document.querySelectorAll('.stars .fa-star');//here so I can alter the star rating
//4th Step: I add the Event Listner to <li> elements.
//here is one function will be used in all <li> elements.
function ClickedLi(){
    //this will stop the player from pressing other cards while I show the nmatched cards.     
    if (LockBord == true){
        return;
    }
    //this will prevent an error which you press the same card and get a match
    if (this === firstCard){
        return;
    }
    //this will save the information of the first card and make open and shown 
    if (!hasFlipped){
        hasFlipped = true;
        firstCard = this;
        firstCard.classList.add('open' , 'show');
        //this if to determain that the timer will start with the first click from the player.
        if(firstClick == false){
            startTimer();
            firstClick = true;
        }
        return;
    }
    //this will save the information of the secound card and call the matching function to chick if the caeds are matched or not.
    else{
        secondCard=this;
        secondCard.classList.add('open' , 'show');
        ChickForMatch();
        
        
    }
    //this is the function that will chick if the cards are matched.
    function ChickForMatch(){
        //it will chick by the class of the <i> element:
        //in case it is a match
        if(firstCard.querySelector('.deck .card i').className == secondCard.querySelector('.deck .card i').className){
            firstCard.classList.remove('open' , 'show');
            firstCard.classList.add('match');
            secondCard.classList.add('match');
            //I will remove the event listner from the matched cards so they are not clickable anymore
            firstCard.removeEventListener('click', ClickedLi);
            secondCard.removeEventListener('click', ClickedLi);
            //I will count a move and change the shown moves
            countMoves++;
            document.querySelector('.moves').innerHTML = countMoves ;
            matchCount++;
            setTimeout(() =>{
                if(matchCount == 8){
                    alert("CONGRATULATIONS YOU WON in" + countMoves + " moves");
                    document.location.reload();
                    clearInterval(interval);}
            }, 200);
            //I altered the rating based on the moves
            if (countMoves == 16){
                stars [2].className = 'fa fa-star-o';
            }
            else if (countMoves == 19){
                stars [1].className = 'fa fa-star-o';
            }
            else if (countMoves == 21){
                stars [0].className = 'fa fa-star-o';
            }
           resetBoard();
        }
        else{
            NotMatched();
        }
    }
    //and this if the cards don't match
    function NotMatched(){
        // I will lock the board so the player won't press other cards while the unmatched cards are shown.
        LockBord = true;
        //I will increase the move count 
        countMoves++;
        document.querySelector('.moves').innerHTML = countMoves ;
        if (countMoves == 16){
            stars [2].className = 'fa fa-star-o';
        }
        else if (countMoves == 19){
            stars [1].className = 'fa fa-star-o';
        }
        else if (countMoves == 21){
            stars [0].className = 'fa fa-star-o';
        }
        //this so the player get some time to memorize the unmatched cards
        setTimeout(() =>{
            firstCard.classList.remove('open' , 'show');
            secondCard.classList.remove('open' , 'show');
            resetBoard();
        }, 800);
    }

    function resetBoard(){
        hasFlipped = false;
        LockBord = false;
        firstCard = null;
        secondCard = null;
    }   
}
let second = 0, minute = 0;
let interval;
//this is the timer with diffrent represented condetions,and the representation will be applyed every secound 
document.querySelector('.timer').innerHTML = '00:00';
function startTimer(){
    interval = setInterval(function(){
        if ((second < 10) && (minute < 10)){
        document.querySelector('.timer').innerHTML = '0' + minute + ':' + '0' + second;
        second++;
        }
        else if ((second >= 10) && (minute < 10)){
            document.querySelector('.timer').innerHTML = '0' + minute + ':' + second;
            second++;
            if(second == 60){
                minute++;
                second=0;
            }
        }
        else if ((second < 10) && (minute <= 10)){
            document.querySelector('.timer').innerHTML = minute + ':' + '0' + second;
            second++;
            }
            else if ((second >= 10) && (minute <= 10)){
                document.querySelector('.timer').innerHTML = minute + ':' + second;
                second++;
                if(second == 60){
                    minute++;
                    second=0;
                }
            }
            
    },1000);
}
//and this to re-start the game
let Restart = document.querySelector('.restart');
Restart.addEventListener('click',  function(){
    (function shuffle() {
        cards.forEach(card => {
          let randomPos = Math.floor(Math.random() * 15);
          card.style.order = randomPos;
        });
      })();
    hasFlipped = false;
    LockBord = false;
    secondCard;
    countMoves = 0;
    second = 0;
    minute = 0;
    clearInterval(interval);
    document.querySelector('.moves').innerHTML = countMoves ;
    document.querySelector('.timer').innerHTML = '00:00';
    stars [2].className = 'fa fa-star';
    stars [1].className = 'fa fa-star';
    stars [0].className = 'fa fa-star';
    firstClick = false;
    if (firstCard == null){
        return;
    }
    else{
        firstCard.className = 'card';
    }
});