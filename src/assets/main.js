let answer = document.getElementById('answer');
let attempt = document.getElementById('attempt');

function guess() {
    let input = document.getElementById('user-guess');
    if (answer === '' && attempt === '') {
        setHiddenFields()
    }
    if (validateInput(input.value)) {
        attempt++;
    }
    else if (!validateInput(input.value)) {
        return false
    }
    if (getResults(input)) {
        setMessage('You Win! :)')
        showAnswer(true)
        showReplay()
    }
    else if (!getResults(input) && attempt >= 10) {
        setMessage('You Lose! :(')
        showAnswer(false)
        showReplay()
    }
    else if (!getResults(input) && attempt < 10) {
        setMessage('Incorrect, try again.')
    }
}

function setHiddenFields() {
    //set answer variable equal to a randomly generated whole number between 0 and 9999
    let answerString = String(Math.floor(Math.random() * 9999));
    let padding = '';
     if (answerString.length < 4) {
        let howMany = 4 - answerString.length;
        padding = '0'.repeat(howMany)
    }
    answer.value = padding.concat(answerString);
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

function getResults(input) {
    let initialDiv = '<div class="row"><span class="col-md-6">' + input.value + '</span><div class="col-md-6">';
    let correctChars = 0;
    for (let i = 0; i < input.length; i++) {
        if (input.value.charAt(i) === answer.value.charAt(i)) {
            initialDiv += '<span class="glyphicon glyphicon-ok">' + input.value.charAt(i) + '</span>';
            correctChars++;
        }
        else if (input.value.charAt(i) !== answer.value.charAt(i) && answer.value.includes(input.value.charAt(i))) {
            initialDiv += '<span class="glyphicon glyphicon-transfer">' + input.value.charAt(i) + '</span>';
        }
        else if (!answer.value.includes(input.value.charAt(i))) {
            initialDiv += '<span class="glyphicon glyphicon-remove">' + input.value.charAt(i) + '</span>';
        }
    }
    initialDiv += '</div></div>';
    document.getElementById('results').innerHTML = initialDiv;
    return correctChars === input.length
}

function showAnswer(youWin) {
    /*
    This function should set the innerHTML of the code label to the value of the answer hidden input. In addition to this it should take the parameter as a true or false (indicating if the player won or lost) if the parameter is true add success to code's className otherwise it should add failure. (note the space before success and failure)
     */
    document.getElementById('code').innerHTML = answer.value;
    if (youWin) {
        document.getElementById('code').className = ' success';
    }
    else {
        document.getElementById('code').className = ' failure';
    }
}

function showReplay() {
    document.getElementById('guessing-div').style.display = 'none';
    document.getElementById('replay-div').style.display = 'block';
}
