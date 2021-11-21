//https://jservice.kenzie.academy/api/categories
//https://jservice.kenzie.academy/api/categories/id
//https://jservice.kenzie.academy/api/clues?category=${this.catergory}

//for categories, have 6 random numbers within the id range of cargories choose the categories.
let displayClue;
const boardDisplay = document.querySelector('.boardDisplay')
const jeopradyBoard = document.querySelector('tbody')
const categoryHeaderRow = document.querySelector('.categoryHeaders')

class Board {
    constructor () {
        this.categoryId = [] // array of random catergories - these match the clue Id
        this.categoryTitles = [] //array of titles
        this.firstQuestions= []
        this.secondQuestions = []
        this.thirdQuestions = []
        this.forthQuestions = []
        this.fifthQuestions = []
        this.sixthQuestions = []
    }

    getRandomCategoryIds () {
        let numberOfCategories = 6
        let maxCategories = 3000
        let count = 0

        let randomCategoryId = Math.round(Math.random(1) * maxCategories)
        
        while (count <= numberOfCategories) {
            this.categoryId.push(randomCategoryId+count)//get random number and then 5 different numbers after it.
            count++
        }
        this.fetchCategories()
    }

    fetchCategories () {
    this.categoryId.map(id => {
        fetch(`https://jservice.kenzie.academy/api/categories/${id}`)
        .then(response => response.json())
        .then(category => this.getCategories(category))
    })
    
    }

    getCategories (category) {
        this.categoryTitles.push(category.title)
        const categoryTitle = document.createElement('th')
        categoryTitle.dataset.categoryId = category.id

      this.fetchQuestionById()
    }

    fetchQuestionById () {
        this.categoryId.map(id => {
         fetch(`https://jservice.kenzie.academy/api/clues?category=${id}`)  
            .then(response => response.json())
            .then(clue => {
                this.filterByCategory(clue)
                this.fixValues(clue)
            })
        })
         
    }  

    fixValues (clueObj){
        clueObj.clues.map(clue => {
            if (clue.value === 100 || clue.value === 0) {
                clue.value = 100
            }else if (clue.value > 600 ) {
                clue.value = 600
            }
        })
    }


    filterByCategory (clueObj) {
     clueObj.clues.map(question => {
        if (question.category.title === this.categoryTitles[0]) {
            this.firstQuestions.push(question)
        }else if (question.category.title === this.categoryTitles[1]) {
            this.secondQuestions.push(question)
        }else if (question.category.title === this.categoryTitles[2]) {
            this.thirdQuestions.push(question)
        }else if (question.category.title === this.categoryTitles[3]) {
            this.forthQuestions.push(question)
        }else if (question.category.title === this.categoryTitles[4]) {
            this.fifthQuestions.push(question)
        }else if (question.category.title === this.categoryTitles[5]) {
            this.sixthQuestions.push(question)
        }
    }) 
   } 

   makeRows () { //too much repetition but works... break into seperate functions and refactor later.

    categoryHeaderRow.innerHTML = `Select a question!`

    let category1ToShow = this.firstQuestions.slice(0,6)
    let category2ToShow = this.secondQuestions.slice(0,6)
    let category3ToShow = this.thirdQuestions.slice(0,6)
    let category4ToShow = this.forthQuestions.slice(0,6)
    let category5ToShow = this.fifthQuestions.slice(0,6)
    let category6ToShow = this.sixthQuestions.slice(0,6)

    const category1 = document.createElement('th')
    category1.innerHTML = this.categoryTitles[0]
    jeopradyBoard.append(category1)

    const category2 = document.createElement('th')
    category2.innerHTML = this.categoryTitles[1]
    jeopradyBoard.append(category2)

    const category3 = document.createElement('th')
    category3.innerHTML = this.categoryTitles[2]
    jeopradyBoard.append(category3)

    const category4 = document.createElement('th')
    category4.innerHTML = this.categoryTitles[3]
    jeopradyBoard.append(category4)

    const category5 = document.createElement('th')
    category5.innerHTML = this.categoryTitles[4]
    jeopradyBoard.append(category5)

    const category6 = document.createElement('th')
    category6.innerHTML = this.categoryTitles[5]
    jeopradyBoard.append(category6)

         category1ToShow.map(clue => {
        const display100 = document.createElement('td')  
        display100.innerHTML = `$${clue.value}`
        category1.append(display100)
        
        display100.addEventListener('click', (event) => {
            console.log(clue.category.title)
            jeopradyBoard.style.visibility = 'hidden'
            answerForm.style.visibility = 'visible'
            answerInput.style.visibility = 'visible'
            answerButton.style.visibility = 'visible' 
            revealButton.style.visibility = 'visible'
            window.scrollTo(0, 0)  //make window scrolling smoother later - this makes the screen scroll up to x,y coords.
            answerInput.focus()
          
           

            displayClue = new Clue
            displayClue.fetchClue(clue.id)
            event.target.innerHTML = ''

            const timerDisplay = document.createElement('div') //make own function later
            timerDisplay.classList.add('timer')
            questionDisplay.append(timerDisplay)
           
            let questionTimer = setInterval(() => {
                timerDisplay.innerHTML = `${displayClue.timeLimit}`
                displayClue.timeLimit -= 1 //from 30 to 1
              

                if (displayClue.timeLimit === 15) {
                    timerDisplay.style.color = 'yellow'
                }

                if (displayClue.timeLimit < 10) {
                    timerDisplay.style.color = 'red'
                }

                if (displayClue.timeLimit === 0) {
                    clearInterval(questionTimer)
                    player1.decreaseScore(`${displayClue.value}`)

                    questionView.style.color = 'red'
                    questionView.innerHTML =`Sorry you took too long! You lose $${displayClue.value}! 
                    
                    The Answer Was.. ${displayClue.answer}`

                    timerDisplay.style.visibility = 'hidden'
                }
            }, 1000);
           
            //
            display100.remove() //removes clue from board
        })
    })
         category2ToShow.map(clue => {
        const display200 = document.createElement('td')
        display200.innerHTML = `$${clue.value}`
        category2.append(display200)
        
        display200.addEventListener('click', (event) => {
            console.log(clue.category.title)
            jeopradyBoard.style.visibility = 'hidden'
            answerForm.style.visibility = 'visible'
            answerInput.style.visibility = 'visible'
            answerButton.style.visibility = 'visible' 
            revealButton.style.visibility = 'visible'
            window.scrollTo(0, 0)
            answerInput.focus()

            let displayClue = new Clue
            displayClue.fetchClue(clue.id)
            event.target.innerHTML = ''

            const timerDisplay = document.createElement('div') //make own function later
            timerDisplay.classList.add('timer')
            questionDisplay.append(timerDisplay)
           
            let questionTimer = setInterval(() => {
                timerDisplay.innerHTML = `${displayClue.timeLimit}`
                displayClue.timeLimit -= 1 //from 30 to 1
              

                if (displayClue.timeLimit === 15) {
                    timerDisplay.style.color = 'yellow'
                }

                if (displayClue.timeLimit < 10) {
                    timerDisplay.style.color = 'red'
                }

                if (displayClue.timeLimit === 0) {
                    clearInterval(questionTimer)
                    player1.decreaseScore(`${displayClue.value}`)

                    questionView.style.color = 'red'
                    questionView.innerHTML =`Sorry you took too long! You lose $${displayClue.value}! 
                    
                    The Answer Was.. ${displayClue.answer}`

                    timerDisplay.style.visibility = 'hidden'
                }
            }, 1000);
           
            display200.remove()
        })

    })   
     
        category3ToShow.map(clue => {
        const display300 = document.createElement('td')
        display300.innerHTML = `$${clue.value}`
        category3.append(display300)

        display300.addEventListener('click', (event) => {
            console.log(clue.category.title)
            jeopradyBoard.style.visibility = 'hidden'
            answerForm.style.visibility = 'visible'
            answerInput.style.visibility = 'visible'
            answerButton.style.visibility = 'visible' 
            revealButton.style.visibility = 'visible'
            window.scrollTo(0, 0)
            answerInput.focus()

            let displayClue = new Clue
            displayClue.fetchClue(clue.id)
            event.target.innerHTML = ''

            const timerDisplay = document.createElement('div') //make own function later
            timerDisplay.classList.add('timer')
            questionDisplay.append(timerDisplay)
           
            let questionTimer = setInterval(() => {
                timerDisplay.innerHTML = `${displayClue.timeLimit}`
                displayClue.timeLimit -= 1 //from 30 to 1
              

                if (displayClue.timeLimit === 15) {
                    timerDisplay.style.color = 'yellow'
                }

                if (displayClue.timeLimit < 10) {
                    timerDisplay.style.color = 'red'
                }

                if (displayClue.timeLimit === 0) {
                    clearInterval(questionTimer)
                    player1.decreaseScore(`${displayClue.value}`)

                    questionView.style.color = 'red'
                    questionView.innerHTML =`Sorry you took too long! You lose $${displayClue.value}! 
                    
                    The Answer Was.. ${displayClue.answer}`

                    timerDisplay.style.visibility = 'hidden'
                }
            }, 1000);
           
            display300.remove()
        })
    })    
    
         category4ToShow.map(clue => {
        const display400 = document.createElement('td')
        display400.innerHTML = `$${clue.value}`
        category4.append(display400)
        
        display400.addEventListener('click', (event) => {
            console.log(clue.category.title)
            jeopradyBoard.style.visibility = 'hidden'
            answerForm.style.visibility = 'visible'
            answerInput.style.visibility = 'visible'
            answerButton.style.visibility = 'visible' 
            revealButton.style.visibility = 'visible'
            window.scrollTo(0, 0)
            answerInput.focus()

            let displayClue = new Clue
            displayClue.fetchClue(clue.id)
            event.target.innerHTML = ''

            const timerDisplay = document.createElement('div') //make own function later
            timerDisplay.classList.add('timer')
            questionDisplay.append(timerDisplay)
           
            let questionTimer = setInterval(() => {
                timerDisplay.innerHTML = `${displayClue.timeLimit}`
                displayClue.timeLimit -= 1 //from 30 to 1
              

                if (displayClue.timeLimit === 15) {
                    timerDisplay.style.color = 'yellow'
                }

                if (displayClue.timeLimit < 10) {
                    timerDisplay.style.color = 'red'
                }

                if (displayClue.timeLimit === 0) {
                    clearInterval(questionTimer)
                    player1.decreaseScore(`${displayClue.value}`)

                    questionView.style.color = 'red'
                    questionView.innerHTML =`Sorry you took too long! You lose $${displayClue.value}! 
                    
                    The Answer Was.. ${displayClue.answer}`

                    timerDisplay.style.visibility = 'hidden'
                }
            }, 1000);
           
            display400.remove()
        })
    })    
    
        category5ToShow.map(clue => {
        const display500 = document.createElement('td')
        display500.innerHTML =`$${clue.value}`
        category5.append(display500)

        display500.addEventListener('click', (event) => {
            console.log(clue.category.title)
            jeopradyBoard.style.visibility = 'hidden' //stops user from clicking multiple questions
            answerForm.style.visibility = 'visible'
            answerInput.style.visibility = 'visible'
            answerButton.style.visibility = 'visible' 
            revealButton.style.visibility = 'visible'
            window.scrollTo(0, 0)
            answerInput.focus()

            let displayClue = new Clue
            displayClue.fetchClue(clue.id)
            event.target.innerHTML = ''

            const timerDisplay = document.createElement('div') //make own function later
            timerDisplay.classList.add('timer')
            questionDisplay.append(timerDisplay)
           
            let questionTimer = setInterval(() => {
                timerDisplay.innerHTML = `${displayClue.timeLimit}`
                displayClue.timeLimit -= 1 //from 30 to 1
              

                if (displayClue.timeLimit === 15) {
                    timerDisplay.style.color = 'yellow'
                }

                if (displayClue.timeLimit < 10) {
                    timerDisplay.style.color = 'red'
                }

                if (displayClue.timeLimit === 0) {
                    clearInterval(questionTimer)
                    player1.decreaseScore(`${displayClue.value}`)

                    questionView.style.color = 'red'
                    questionView.innerHTML =`Sorry you took too long! You lose $${displayClue.value}! 
                    
                    The Answer Was.. ${displayClue.answer}`

                    timerDisplay.style.visibility = 'hidden'
                }
            }, 1000);
           
            display500.remove()
        })
    })

        category6ToShow.map(clue => {
        const display600 = document.createElement('td')
        display600.innerHTML = `$${clue.value}`
        category6.append(display600)

        display600.addEventListener('click', (event) => {
            console.log(clue.category.title)
            jeopradyBoard.style.visibility = 'hidden'
            answerForm.style.visibility = 'visible'
            answerInput.style.visibility = 'visible'
            answerButton.style.visibility = 'visible' 
            revealButton.style.visibility = 'visible'
            window.scrollTo(0, 0)
            answerInput.focus()

            let displayClue = new Clue
            displayClue.fetchClue(clue.id)
            event.target.innerHTML = ''

            const timerDisplay = document.createElement('div') //make own function later
            timerDisplay.classList.add('timer')
            questionDisplay.append(timerDisplay)
           
            let questionTimer = setInterval(() => {
                timerDisplay.innerHTML = `${displayClue.timeLimit}`
                displayClue.timeLimit -= 1 //from 30 to 1
              

                if (displayClue.timeLimit === 15) {
                    timerDisplay.style.color = 'yellow'
                }

                if (displayClue.timeLimit < 10) {
                    timerDisplay.style.color = 'red'
                }

                if (displayClue.timeLimit === 0) {
                    clearInterval(questionTimer)
                    player1.decreaseScore(`${displayClue.value}`)

                    questionView.style.color = 'red'
                    questionView.innerHTML =`Sorry you took too long! You lose $${displayClue.value}! 
                    
                    The Answer Was.. ${displayClue.answer}`

                    timerDisplay.style.visibility = 'hidden'
                }
            }, 1000);
           
            display600.remove()
        })
    })
  }
}

// Lets player restart - in the future try to reset the player but keep name.
const newGame = document.querySelector('.newGame')

newGame.addEventListener('click', () => {
    window.location.reload()
    answerForm.reset()
})