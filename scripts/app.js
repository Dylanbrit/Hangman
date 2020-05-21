// HTTP requests
// To set up communication between our browser and this other server what we need to do is setup an HTTP request
// In this case, we are using an HTTP request to get a random word to use for our Hangman game- as opposed to a word that is coded in to the game by me or a word put in by the user, this will be a random word from third party data
// HTTP (Hypertext Transfer Protocol), is a request response protocol, meaning that we (the developer and the browser) issue some sort of request that goes off to a third party server, the server does some work and gives us back a response- request/response
// Request- describes what we, the person making the request, hope to do
// Response- contains information about what was actually done
// In this case, the request is that we want to generate a random word or phrase. The response is going to contain that random word or phrase
// Side note- Typing in a website into the URL search box is initiating an HTTP request, so is using the script tag to load a script
// For Hangman, we are going to use the url the instructor provided, which returns JSON. We have a key-value pair now that we can request into our JavaScript, and then we can parse it and access the puzzle property for the word

// Here we set up a new instance of the Hangman game, setting up our word argument as 'cat' and our number of guesses allowed as 2
const puzzleEl = document.querySelector('#puzzle')
const guessesEl = document.querySelector('#guesses')
let game1

// Remember, when we add an event listener to the window, that monitors for changes that aren't attached to one specific element. In this case, we are listening for a keypress, so when the user types in a key that reveals a character (i.e. letters and numbers, not the shift key or caps lock key)
// Our event listener accepts a callback function, which fires when the event happens, and on that event property we get access to a property called charCode (character code) that helps us figure out what key was pressed
// The charCode is numbered to represent the keys on our keyboard. The method fromCharCode is a string method that gives us a letter string back from the character code. We use the event's charCode property as the argument that we want translated
// We call the makeGuess method on game 1 and pass in our guess variable (which contains the letter that was typed by the user as a guess). We do this inside of the event listener because we want it to show every time they make a guess
// We then create elements and provide their text content so that the keypress answers and remaining guesses populate on the browser instead of in the console
// For our variable that creates a space for stating how many guesses are left, we set the textContent equal to the status message so that we get the personalized message based on where we are in the game

window.addEventListener('keypress', (e) => {
    const guess = String.fromCharCode(e.charCode)
    game1.makeGuess(guess)
    render()
})

const render = () => {
    puzzleEl.innerHTML = ''
    guessesEl.textContent = game1.statusMessage

    game1.puzzle.split('').forEach((letter) => {
        const letterEl = document.createElement('span')
        letterEl.textContent = letter
        puzzleEl.appendChild(letterEl)
    })
}

const startGame = async () => {
    const puzzle = await getPuzzle('2')
    game1 = new Hangman(puzzle, 5)
    render()
}

document.querySelector('#reset').addEventListener('click', (e) => {
    startGame()
})

startGame()

// getPuzzle('2').then((data) => {
//     console.log(data.puzzle)
// }).catch((error) => {
//     console.log(`Error: ${error}`)
// })

// getLocation().then((location) => {
//     return getCountry(location.country)
// }).then((country) => {
//     console.log(country.name)
// }).catch((error) => {
//     console.log(`Error: ${error}`)
// })

// getCurrentCountry().then((country) => {
//     console.log(country.name)
// }).catch((error) => {
//     console.log(`Error: ${error}`)
// })