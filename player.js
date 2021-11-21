let player1;

class Player {
    constructor (name) {
        this.name = name //ask user for name input
        this.scoreInUSD = 1000 //starting value
        // this.playerNumber = playerNumber
    }

    displayPlayerScore () {
        const playerNameDisplay = document.createElement('h4')
        playerNameDisplay.classList.add('playerNameDisplay')
        playerNameDisplay.innerHTML = `${this.name}`
        playerScoreDisplay.prepend(playerNameDisplay)

        const playerScore = document.createElement('h3')
        playerScore.classList.add('playerScoreView')
        playerScore.innerHTML = `$${this.scoreInUSD}`
        playerNameDisplay.append(playerScore)       
    }

    increaseScore (value) {
        console.log({currentValue:this.scoreInUSD},{Qvalue:value})
       this.updateScore(this.scoreInUSD += value)   
    }

    decreaseScore (value) {
        console.log({currentValue:this.scoreInUSD},{Qvalue:value})
        this.updateScore(this.scoreInUSD -= value)
    }

    updateScore (newValue) {
        this.scoreInUSD = newValue
        const score = document.querySelector('.playerScoreView')
        score.innerHTML = `$${this.scoreInUSD}`
        this.checkForLoss()
    }

    checkForLoss () { 
        if (this.scoreInUSD <= 0) {
            questionDisplay.innerHTML = `Your score is $${player1.scoreInUSD} YOU LOSE!`
            questionDisplay.style.color = 'red'
            answerDisplay.innerHTML = `BETTER LUCK NEXT TIME`
            answerInput.style.visibility = 'hidden'
            answerButton.style.visibility = 'hidden'

            const resetButton = document.createElement('button')
            resetButton.classList.add('resetButton')
            resetButton.textContent = 'Try Again!?'
            answerDisplay.append(resetButton)
            jeopradyBoard.style.visibility = 'hidden'
            
            resetButton.addEventListener('click', () => window.location.reload())

        }else {
            console.log(this.scoreInUSD)
            clueHeading.innerHTML = ''
            
            setTimeout(() => {   //if player hasn't lost, get new clue - give time for user to read results
            questionView.style.color = 'white'
            questionView.innerHTML = ''
            answerView.innerHTML = ''
            answerButton.disabled = false
            jeopradyBoard.style.visibility = 'visible' //stops userfrom clicking questons BEFORE answerForm can reset
            answerForm.reset()
            window.scrollTo(1000,1000)
            }, 2500);
             }
        }
}

//Code for player button

 playerNameButton.addEventListener('click', getName)

 answerDisplay.style.visibility = 'hidden' //hidden until a clue is clicked
 questionDisplay.style.visibility = 'hidden'

function getName (event) {
    event.preventDefault()

    playerNameButton.style.visibility = 'hidden' // makes add player button disappear to prevent more than one player until 2 player logic is written.

    const playerForm = document.createElement('form')
    categoryHeaderRow.append(playerForm)
    const playerInput = document.createElement('input')
    playerInput.classList.add = 'nameInput'
    playerForm.append(playerInput)
    const playerSubmit = document.createElement('button')
    playerForm.append(playerSubmit)
    playerSubmit.textContent = 'Submit'

    playerInput.focus() //focus on input field 

    playerSubmit.addEventListener('click', event => {
        event.preventDefault()
       
        const nameHeader = document.querySelector('.nameHeader')

       player1 = new Player(playerInput.value)
       player1.displayPlayerScore()
    
    playerForm.reset()
    playerForm.style.visibility = 'hidden'
    playerNameButton.style.visibility = 'hidden'
    nameHeader.style.visibility = 'hidden'

    answerDisplay.style.visibility = 'visible'
    questionDisplay.style.visibility = 'visible'

      let gameBoard = new Board() //renders the game board once name is entered
      gameBoard.getRandomCategoryIds()

      //Progress bar idea
      const progBar = document.createElement('progress')
      progBar.max = 100
      progBar.value = 0
      let progCount = 0
      questionDisplay.append(progBar)
       let prog =  setInterval(() => {
                progCount+=10
                progBar.value = progCount
        }, 180);
      questionView.innerHTML = 'Loading Please Wait...'
      //

    setTimeout(() => { //give time for api data to be fetched
     gameBoard.makeRows()
     questionView.innerHTML = ''
     window.scrollTo(1000,1000) //scrolls the page to the complete board.
     clearInterval(prog)
     progBar.style.visibility = 'hidden'// hides loading bar
    }, 2000);
    answerForm.style.visibility = 'hidden'
    answerInput.style.visibility = 'hidden'
     })
}