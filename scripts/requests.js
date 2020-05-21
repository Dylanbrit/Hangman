// Making an HTTP request
// The first thing we need to do is initialize a request using a constructor function provided to us by the browser, done below:
// Then, we set up an event listener to access the information and do something meaningful with it
// readystate checks to see if the request is in its complete and final state before the event fires
// When readystate changes, our event handler fires. There are five states of readystate, each with a value from 0-4, showing the state of the request (unsent, .open() has been called, .send() has been used, loading, and done)
// We are only ever going to really check for 4, because we only want to do something with the information once we have it back in its complete and final form
// Since readystatechange checks for any change to readystate, we want to specify that we only take action once it reaches the stage indexed as 4, since that is when the data is ready
// e.target contains the request itself, and we check for its readystate property to see if it is in state 4. We also only want to check this if we successfully received our response. To do this, we check the status to make sure it is 200, which is the indicator that things went well
// If we look under Network settings in our developer tools in the browser, we can see a lot of this information, including one we did not set up- the Status
// The status code describes how things went- was it successful, did it fail because we used it incorrectly, or because it was taken down for maintenance?
// e.target contains a property called responseText, which contains our JSON response. We are going to use this to extract our new puzzle to print. We will extract it as JSON and parse it
// Once parsed, we now have an object that has a "puzzle" property and its value is the new puzzle phrase we want to use
// Then we have two methods we need to use on our variable to send a request
// .open is where we initialize our request, and this is where we configure two important pieces of information- the HTTP method (we will be using GET), and the URL
// .send is where we send off the request. The process is not instant, it takes time to connect with the server and for the server to generate a phrase, and it also takes time for the server to get teh response back to me

// const getPuzzleOld = (wordCount) => {
//     return fetch(`http://puzzle.mead.io/puzzle?wordCount=${wordCount}`).then((response) => {
//         if (response.status === 200) {
//             return response.json()
//         } else {
//             throw new Error('Unable to fetch puzzle')
//         }
//     })
// }

const getPuzzle = async (wordCount) => {
    const response = await fetch(`//puzzle.mead.io/puzzle?wordCount=${wordCount}`)
    if (response.status === 200) {
        const data = await response.json()
        return data.puzzle
    } else {
        throw new Error('Unable to get puzzle')
    }
}


// Below, we are setting up or function to retrieve the country
// We do our HTTP request
// Then we set up an event listener to fire. If everything goes well, we parse our JSON text and use find to save to the variable country whenever we find a match between the country's alpha2Code and the countryCode argument passed in
// Then, we call our callback function with the argument for undefined in place of our error (since there is no error) and the country variable in place for our country argument
// When called, the code from app.js runs, which will check to see if it is an error or not. Since it is not an error, we print the success message which calls for the name property on our country object
// If there is an error, our callback function is called to pass in the error message for error and undefined for our callback. Then our error message will print

// const getCountry = async (countryCode) => {
//     const response = await fetch('//restcountries.eu/rest/v2/all')
//     if (response.status === 200) {
//         const data = await response.json()
//         return data.find((country) => country.alpha2Code === countryCode)
//     } else {
//         throw new Error('Unable to fetch data')
//     }
// }

// const getLocation = async () => {
//     const response = await fetch('//ipinfo.io/json?token=92a9279735080c')
//     if (response.status === 200) {
//         return response.json()
//     } else {
//         throw new Error('Unable to find location')
//     }
// }

// const getCurrentCountry = async () => {
//     const location = await getLocation()
//     const country = await getCountry(location.country)
//     return country
// }