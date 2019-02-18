//TicTacToe 
//CSC220 Homework 2
//Emily Rhyu

//Sources: 
//https://www.w3schools.com/js/js_arrays.asp
//https://www.w3schools.com/jsref/event_target.asp
//https://www.w3schools.com/jsref/jsref_some.asp
//https://www.w3schools.com/jsref/jsref_every.asp
//https://www.w3schools.com/jsref/jsref_indexof_array.asp
//https://stackoverflow.com/questions/41279553/tic-tac-toe-javascript-cant-determine-a-loop-or-function-to-check-winner

//boolean to check whose turn it is
var turn=true;

//counter to determine number of moves/boxes filled. Used to determine tie.
var counter=0;

//Empty arrays for recording locations of x's and o's aka movements of each player
var player1 = [];
var player2 = [];

//array of subarrays for ways player can win
var wins=[
['11','12','13'],
['21','22','23'],
['31','32','33'],
['11','21','31'],
['12','22','32'],
['13','23','33'],
['11','22','33'],
['31','22','13']
];

//function to change box color 
function changeBoxCol() {
    if(this.innerHTML==""){
        this.style.backgroundColor = "LightPink";
    }
}

//function to change box color back to white 
function changeBoxColBack() {
    this.style.backgroundColor = "White";
}

//Event handlers for button color change and click event
changeCol=document.getElementsByTagName("td");         //gets all elements of tag td 
for (td of changeCol){                                 //loop to attach event handlers
    td.addEventListener("mouseover",changeBoxCol);     //when mouse over, change box color
    td.addEventListener("mouseout",changeBoxColBack);  //when move away mouse, change box color back
    td.addEventListener("click",takeTurn)              //when click, do function takeTurn()
}

//function that allow users to play/place x's and o's
function takeTurn() {

    if(this.innerHTML==""){                           //make sure box is empty first
        if (turn==true){       
            this.innerHTML = "X"                      //place x
            player1.push(event.target.id);            //record location of x in player1 array
            findWinner();                             //call findWinner() function to check for win
            turn=false;                               //player 2 turn now
            counter++;                                //count each move
            console.log(player1);
        }
        else if (turn==false) {
            this.innerHTML = "O"                      //place o
            player2.push(event.target.id);            //record location of o in player2 array
            findWinner();                             //call findWinner() function to check for win
            turn=true;                                //player 1 turn now
            counter++;                                //count each move
            console.log(player2);
        }
    }
    else{
        console.log("filled");                        //if the box is filled, don't place x or o
        this.style.backgroundColor="white";           //set background back to white
    }
    console.log(counter);
}

//function that figures out the winner
function findWinner() {
   
    //does player 1 win?
    var result = wins.some(function(ar) {             //some() checks if any in array pass test. See if get any of arrays in wins[]
        return ar.every(function(e) {                 //every() checks if all in array pass test. See if get all strings in subarray of wins[]
        return player1.indexOf(e) != -1               //indexof() searches array for item and returns position. check if strings are there.
        })
    })
    console.log(result);                              //true if win, false otherwise

    //does player 2 win? (same process as for player 1)
    var result2 = wins.some(function(er) {
        return er.every(function(b) {
        return player2.indexOf(b) != -1
        })
    })
    console.log(result2);                            //true if win, false otherwise

    //print results
    //player 1 wins
    if (result==true){             
        document.getElementById("winner").innerHTML="X Wins"   //print "X wins" in <p> element
        for (td of changeCol){                                 //loop to assign event handler
            td.removeEventListener("click",takeTurn);          //disable clicking
        } 
    }

    //player 2 wins
    if (result2==true){
        document.getElementById("winner").innerHTML="O Wins"   //print "O W Wins" in <p> element
        for (td of changeCol){                                 //loop to assign event handler
            td.removeEventListener("click",takeTurn);          //disable clicking
        }
    } 
    
    //tie
    if (counter==8 && result==false && result2==false){        //if board full and neither player has won
            document.getElementById("winner").innerHTML="Game End - Tie "    //print tie in <p> element
            for (td of changeCol){                             //loop to assign event handler
                td.removeEventListener("click",takeTurn);      //disable clicking
            }
        }
}










