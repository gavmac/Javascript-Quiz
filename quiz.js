// We start, as usual, with waiting for the page to be loaded with all the elements.  
// After this, we set up our needed variables. We grab the questionArea, answerArea, 
// the checker area (where our correct/false-div will be placed), 
// set a variable ‘current’, that will tell us at what question the user is and 
// create an object that will hold all our questions and answers. 
// The last digit in the array (in allQuestions) is the correct answer.

window.onload = function () {
  
  var questionArea = document.getElementsByClassName('questions')[0],
      answerArea   = document.getElementsByClassName('answers')[0],
      checker      = document.getElementsByClassName('checker')[0],
      progress     = document.getElementsByClassName('progress')[0],
      current      = 0,
  
     // An object that holds all the questions + possible answers.
     // In the array --> last digit gives the correct answer-position
      allQuestions = {
        'What is Canada\'s national animal?' : ['Beaver', 'Duck', 'Horse', 'Beaver'],
        
        'What is converted into alcohol during brewing?' : ['Grain', 'Sugar' , 'Water', 'Sugar'],
        
        'Is this the coolest short questionare you have ever done ' : ['Yes', 'No', 'Maybe', 'Yes']
      };


/////////////////////// Load Questions and Answer /////////////////////////


function loadQuestion(curr) {
  // This function loads all the questions into the question area
  // Grabs the current question based on the current  
  //This variable grabs all the "keys" of and puts them into an array
  //The [curr] at the end will give us the right question
var question = Object.keys(allQuestions)[curr];

  
questionArea.innerHTML = "";
  // First remove any html from the question area

  // Then add the question
  questionArea.innerHTML = question;
}


function loadAnswers(curr) {

//This function is going to load the answers into the answer array
// It grabs the needed answer-array with the help of the current variable
// Every answer is added with an 'on-click' - function

// Grab all possible answers from the current question ??? Just the one questions array
var answers = allQuestions[Object.keys(allQuestions)[curr]];


//Make sure answer array is empty
answerArea.innerHTML = "";
//Add all the possible answers to the answerArea
// By minusing the length the loop stops after 3 cycles

for(var i = 0; i < answers.length-1; i++) {
  var createDiv = document.createElement("div"),
  text = document.createTextNode(answers[i]);

  createDiv.appendChild(text);

  //This adds the onClick function to the answer
  // The click will set of a function that check if the answer is correct
  createDiv.addEventListener("click", checkAnswer(answers[i], answers));

  answerArea.appendChild(createDiv);

  }
}

//////////////////////////// Check Answer /////////////////////////////////

// This is the function that will run, when clicked on one of the answers
// Check if the given answer is the same as the correctAnswer

// After this check if its the last question
// If it is empty the answer array and let them now its done

function checkAnswer(answer, questionArr) {

  return function() {
  var givenAnswer = answer;
  var correctAnswer = questionArr[3];
  console.log(questionArr[3]);

  if(answer === correctAnswer) {
    addChecker(true);
  } else {
    addChecker(false);
  }

  if(current < Object.keys(allQuestions).length - 1) {
    current += 1;

    loadQuestion(current);
    loadAnswers(current);
  } else {
    questionArea.innerHTML = 'Done';
    answerArea.innerHTML ="";
  };
}
}

////////////////////  The AddChecker  ///////////////////
function addChecker(bool) {
  //This function adds the true/false div to the page
  // Used to see if it was correct or false

  var createDiv = document.createElement("div"),
  text = document.createTextNode(current + 1);

  var createNewDiv = document.createElement("div");


  createDiv.appendChild(text);

  if(bool){
    createDiv.className += 'correct';
    checker.appendChild(createDiv);
    
  } else {
    createDiv.className += 'false';
    checker.appendChild(createDiv);
  }

   progress.innerHTML = "You have answered " + (current+1) + " out of" + " " + Object.keys(allQuestions).length;

  }

  // Start the Quiz

  loadAnswers(current);
  loadQuestion(current);

};


