// We set up out Hangman constructor function to take in two arguments- what word are we trying to guess and how many guesses do we have left
// We set up the word to equal word set to lower case and we use the split method on it, which separates all of the letters individually when passing in '' with no letters or spaces
// We set up a third property, guessedLetters, to track the letters that the user has already guessed. We start by setting it equal to an empty array so that letters can be added to it by the user
    // const Hangman = function (word, remaingingGuesses) {
    //     this.word = word.toLowerCase().split('')
    //     this.remaingingGuesses = remaingingGuesses
    //     this.guessedLetters = ['']
    //     this.status = 'playing'
    // }

// This prototype method is for seeing where in the game the user is. We want the user to be able to see if they are still playing the game, if they have failed the game, or if they have finished the game
// 
    // Hangman.prototype.calculateStatus = function () {
    //     const finished = this.word.every((letter) => this.guessedLetters.includes(letter))
    //     if (this.remaingingGuesses === 0) {
    //         this.status = 'failed'
    //     } else if (finished) {
    //         this.status = 'finished'
    //     } else {
    //         this.status = 'playing'
    //     }
    // }

// We set up this status message to let the player know a personalized message about their game
// We use an if/else conditional to set up a return statement based on what the game's playing status is
    // Hangman.prototype.statusMessage = function () {
    //     if (this.status === 'playing') {
    //         return `Guesses left: ${this.remaingingGuesses}`
    //     } else if (this.status === 'failed') {
    //         return `Nice try! The word was "${this.word.join('')}"`
    //     } else {
    //         return 'Great work! You guessed the word.'
    //     }
    // }

// We set up this prototype so that all of our instances can use this function
// The goal here is to make it so that we establish the puzzle that needs to be solved, and then for each letter in the word we return either the correctly guessed letter or an asterisk
// For each letter inside of our word (which is now split into its individual letters thanks to the split method we used on it in the constructor function), we want to add to the puzzle depending on if the letter was guessed or not
// To do this we set up an if/else conditional, with the condition being whether or not guessedLetters includes the individual letter passed in to our word, or if it includes a space (some words have a space, such as New Jersey)
// If the letter is not included, then we add * to our puzzle for each letter. This will happen automatically when we first run it, since before any letters are guessed, the boolean would be false as no letters were passed in that are included in the word
// Then we have the function return the puzzle so we can see how the player is guessing
    // Hangman.prototype.getPuzzle = function () {
    //     let puzzle = ''

    //     this.word.forEach((letter) => {
    //         if (this.guessedLetters.includes(letter) || letter === ' ') {
    //             puzzle += letter
    //         } else {
    //             puzzle += '*'
    //         }
    //     })

    //     return puzzle
    // }

// We are setting up the method below to make guesses
// First, we set our guess to lower case because the user might enter a letter in a different case and it won't produce a match unless we set it all equal to lower case
// We want to make sure that, if the letter the user is guessing is unique (has not been tried yet), then the letter will be pushed into the guessedLetters property so we can keep track of it
// Also, we want to make sure that we decrement the remaining turns if the user guesses wrong. When playing hangman, if you guess a wrong letter, you lose a turn. But, we don't want to punish the user if they guess the same incorrect letter twice. So we set this if statement up to only decrement the remainingGuesses if the guess is unique and is not included in the word
// The two variables we set up just make this code a little cleaner. A guess is unique if it is not included in the guessedLetters already, and a guess is bad if it is not included in the word
// We want to set this game up so that the user can't keep making guesses if the game is over. So we say that is the status is not playing (so it is either failed or finished) we return nothing, that way the rest of the code will not run
    // Hangman.prototype.makeGuess = function (guess) { 
    //     guess = guess.toLowerCase()
    //     const isUnique = !this.guessedLetters.includes(guess)
    //     const isBadGuess = !this.word.includes(guess)

    //     if (this.status !== 'playing') {
    //         return
    //     }

    //     if (isUnique) {
    //         this.guessedLetters.push(guess)
    //     }

    //     if (isUnique && isBadGuess) {
    //         this.remaingingGuesses--
    //     }
    //     this.calculateStatus()
    // }

// Class syntax version of Hangman

class Hangman {
    constructor(word, remaingingGuesses) {
        this.word = word.toLowerCase().split('')
        this.remaingingGuesses = remaingingGuesses
        this.guessedLetters = ['']
        this.status = 'playing'
    }
    calculateStatus() {
        const finished = this.word.every((letter) => this.guessedLetters.includes(letter) || letter === ' ')
        if (this.remaingingGuesses === 0) {
            this.status = 'failed'
        } else if (finished) {
            this.status = 'finished'
        } else {
            this.status = 'playing'
        }
    }
    get statusMessage() {
        if (this.status === 'playing') {
            return `Guesses left: ${this.remaingingGuesses}`
        } else if (this.status === 'failed') {
            return `Nice try! The word was "${this.word.join('')}"`
        } else {
            return 'Great work! You guessed the word.'
        }
    }
    get puzzle() {
        let puzzle = ''

        this.word.forEach((letter) => {
            if (this.guessedLetters.includes(letter) || letter === ' ') {
                puzzle += letter
            } else {
                puzzle += '*'
            }
        })

        return puzzle
    }
    makeGuess(guess) {
        guess = guess.toLowerCase()
        const isUnique = !this.guessedLetters.includes(guess)
        const isBadGuess = !this.word.includes(guess)

        if (this.status !== 'playing') {
            return
        }

        if (isUnique) {
            this.guessedLetters.push(guess)
        }

        if (isUnique && isBadGuess) {
            this.remaingingGuesses--
        }
        this.calculateStatus()
    }
}