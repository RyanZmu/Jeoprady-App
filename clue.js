// To run this assignment, right click on index.html in the Visual Studio Code file explorer to the left
// and select "Open with Live Server"

// YOUR CODE HERE!

//API notes

//Later on account for white space and puncuation for answer user gives and to what i comepare it too.

//Write a readme file describing the project.

//User class and maybe a Clue class

// Have a reveal answer button to help grading.

//Get rid of 'unparsed' catergories

//Example of Clue object:

//'clues':[ 
 // {
//     "id": 1,
//     "answer": "sheep",
//     "question": "Let's all flock to read Psalm 95, in which humans are compared to these animals",
//     "value": 200,
//     "categoryId": 1,
//     "gameId": 1,
//     "invalidCount": 0,
//     "category": {
//       "id": 1,
//       "title": "THE OLD TESTAMENT", - Catergory name
//       "canon": true
//     },
//     "game": {
//       "aired": "2004-09-06",
//       "canon": true
//     },
//     "canon": true
//   },


//Elements queried
const questionDisplay = document.querySelector('.questionDisplay')
const answerDisplay = document.querySelector('.answerDisplay')
const playerScoreDisplay = document.querySelector('.playerScore')
const playerNameButton = document.querySelector('.playerAdd')
const pageHeader = document.querySelector('.pageHeader')
// let playerIndex = 0

const clueHeading = document.querySelector('.clueHeading')
const questionView = document.querySelector('.questionView')
const answerView = document.querySelector('.answerView')
const answerForm = document.querySelector('.answerForm')
const answerInput = document.querySelector('.answerInput')
const answerButton = document.querySelector('.answerButton') 
const revealButton = document.querySelector('.revealButton')

class Clue {
    constructor() {
        this.id;
        this.categoryId;
        this.question;
        this.answer;
        this.value;
        this.title;

        // features to add later
        this.timeLimit = 30 //seconds
        this.doubleJeopadyChance = Math.floor(Math.random(20*1)*100) 
    }

    fetchClue (id) {
        fetch(`https://jservice.kenzie.academy/api/clues/${id}`)
        .then(response => response.json())
        .then(clue => this.buildClue(clue))
       
        answerForm.reset() //clears form for new answer
    }

    buildClue (clue) {
        //Change clue value so we make our own double jeoprady function later
        if (clue.value === 100 || clue.value === 0) {
            clue.value = 100
        }else if (clue.value > 600 ) {
            clue.value = 600
        }
        //
        
        this.id = clue.id
        this.categoryId = clue.categoryId
        this.question = clue.question
        this.answer = clue.answer
        this.value = clue.value
        this.title = clue.category.title

        this.displayClueToUser()
    }

    displayClueToUser () {
       clueHeading.innerHTML = `${this.title} - $${this.value}`
       questionView.innerHTML = `${this.question}`

       revealButton.addEventListener('click', (event) => {
        event.preventDefault()
        answerView.innerHTML = `Answer: ${this.answer}`
    })

    answerButton.addEventListener('click', (event) => {
        this.userAnswer(event)
    })
}
    //click event for user answer
     userAnswer (event) {
        event.preventDefault()

        let userAnswer = answerInput.value.toLowerCase().replace(/[\s\-\/\'\"\(\)\:]/g,'')
        let simplifiedClue = this.answer.toLowerCase().replace(/[\s\-\/\'\"\(\)\:]/g,'') //gets rid of puncuation
    
        if (simplifiedClue === userAnswer) {
            player1.increaseScore(this.value)
            questionView.innerHTML = `THATS CORRECT! YOU EARNED $${this.value}`
            questionView.style.color = 'yellow'
        }else {
            player1.decreaseScore(this.value)
            questionView.innerHTML = `THATS INCORRECT! YOU LOST $${this.value}!`
            questionView.style.color = 'red'
        }

       answerView.innerHTML = `The Answer Was...${this.answer}!` 
       answerButton.style.visibility = 'hidden' //players cant click after answered.
       answerInput.style.visibility = 'hidden'
       revealButton.style.visibility = 'hidden'
       jeopradyBoard.style.visibility = 'hidden'

       const time = document.querySelector('.timer')
       time.style.visibility = 'hidden'
     
      this.value = 0//resets so the next clue.value wont be added to this one. -- temp. fix for checkLoss running twice.
    } 
}