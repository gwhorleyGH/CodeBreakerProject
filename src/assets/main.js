let answer = document.getElementById('answer');
let attempt = document.getElementById('attempt');

function guess() {
    let input = document.getElementById('user-guess');
    if (answer.value === '' || attempt.value === '') {
        setHiddenFields();
    }
    if (!validateInput(input.value)) {
        return;
    }
    attempt.value++;

    if (getResults(input.value)) {
        setMessage('You Win! :)');
        showAnswer(true);
        showReplay();
    }
    else if (attempt.value >= 10) {
        setMessage('You Lose! :(');
        showAnswer(false);
        showReplay();
    }
    else {
        setMessage('Incorrect, try again.');
    }
}

function setHiddenFields() {
    //set answer variable equal to a randomly generated whole number between 0 and 9999
    answer.value = Math.floor(Math.random() * 10000).toString();
     while (answer.value.length < 4) {
        answer.value = "0" + answer.value
    }
    attempt.value = 0;
}

function setMessage(messageText) {
    document.getElementById('message').innerHTML = messageText;
}

function validateInput(inputText) {
    if (inputText.length !== 4) {
        setMessage('Guesses must be exactly 4 characters long.');
        return false;
    }
    return true;
}

function getResults(input) {
    let initialDiv = '<div class="row"><span class="col-md-6">' + input + '</span><div class="col-md-6">';
    for (let i = 0; i < input.length; i++) {
        if (input.charAt(i) === answer.value.charAt(i)) {
            initialDiv += '<span class="glyphicon glyphicon-ok"></span>';
        }
        else if (answer.value.indexOf(input.charAt(i)) > -1) {
            initialDiv += '<span class="glyphicon glyphicon-transfer"></span>';
        }
        else {
            initialDiv += '<span class="glyphicon glyphicon-remove"></span>';
        }
    }
    initialDiv += '</div></div>';
    document.getElementById('results').innerHTML += initialDiv;
    return input === answer.value;
}

function showAnswer(youWin) {
    let code = document.getElementById('code')
    if (youWin) {
        code.className = ' success';
    }
    else {
        code.className = ' failure';
    }
    code.innerHTML = answer.value;
}

function showReplay() {
    document.getElementById('guessing-div').style.display = 'none';
    document.getElementById('replay-div').style.display = 'block';
}
