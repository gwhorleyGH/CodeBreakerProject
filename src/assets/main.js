let answer = document.getElementById('answer');
let attempt = document.getElementById('attempt');

function guess() {
    let input = document.getElementById('user-guess');
    //add functionality to guess function here
    if (answer === '' && attempt === '') {
        setHiddenFields()
    }
    if (validateInput(input.value)) {
        attempt++;
    }
    else {
        return false
    }
}

//implement new functions here
function setHiddenFields() {
    //make answer value exactly 4 characters long
    let answerString = (Math.floor(Math.random() * (9999))).toString();
    let padding = "";
    while (answerString.length < 4) {
        let howMany = 4 - answerString.length;
        padding = '0'.repeat(howMany)
    }
    answer = Number.parseInt(padding.concat(answerString));
    attempt = 0;
}

function setMessage(messageText) {
    document.getElementById('message').innerHTML = messageText;
}

function validateInput(inputText) {
    if (inputText.length !== 4) {
        setMessage('Guesses must be exactly 4 characters long.');
        return false
    }
    else {
        return true
    }
}
