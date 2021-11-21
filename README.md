# Kenzie Academy JavaScript Assignment

Complete your work inside of `code.js`

Follow the instructions provided on my.kenzie.academy for this assignment.


##Purpose Of Project

- Interact with the jService API and pull random categories and questions to build a Jeoprady board.

- Display my understanding of OOJS programming and also Functional Programming to show my ability to create responsive webpages that can react to user interaction.

#How To Play
<details>
- Enter a player name and load a randomized Jeoprady board.

- Click any value on the board under a desired category and answer the question.

- Game will keep track of your score and show you the correct answer at the end.

- A Show Answer button helps users solve a clue.

- Race the timer, if it runs out you'll lose points!

- Don't worry about Punctuation,Captialization or Spacing for the answers. 
</details>

#To Do
<details>
- Display the proper question values in ascending order 100-600

- When player presses new game, just refresh board and keep the player object intact if possible.

- Implement the timer function to count down from 30 to 0 and then once it hits 0, the player loses money if no answer has been given. Pass to player 2 once Two Player is implemented. -- Paritally Done

- Work on the Double Jeoprady function so we can have a few values get doubled based on a set chance.

- Add some animations and make mobile friendly.

- Align my code with standard.js code style.

- Remove puncuation from the answers so the user doesn't need to worry about ". -, ', etc. - Done

- Get rid of repeated questions on the board.

- Add double Jeoprady logic.

- Fix the makeRows function inside of boardLogic and make it into a few seperate functions for better readibility.

- Break out the boardLogic file into another file or more functions. Too verbose.
</details>

#Known Issues
<details>
- Repeated questions on the board.

- Values are not 100-600 like a normal jeoprady board.

- Sometimes the board does load a full 6 questions for each category.

- When player loses, board still reloads.

- The timer sometimes wont go away after a question. Fix in progress.
</details>
