let runningTotal = 0; //number
let buffer = "0"; //keeping track of what is on screen
let previousOperator = null; //+-=//

const screen = document.querySelector('.screen'); //grab screen to continue writing to screen

function buttonClick (value) {
    if (isNaN(value)) { 
        //this is NOT a number
        handleSymbol(value);
    } else {
        //this is a number
        handleNumber(value);
    }
    screen.innerText = buffer;
}

function handleSymbol(symbol){
    switch(symbol) {
        case 'C':
            buffer = '0';
            runningTotal = '0';
            break;
        case '=':
            if (previousOperator === null) {
                //need two numbers to do math
                return;
            } 
            flushOperation(parseInt(buffer)); //does the math
            previousOperator = null;
            buffer = runningTotal;
            runningTotal = 0;
            break;
        case '←':
            if (buffer.length === 1) {
                buffer = '0';
            }else {
                buffer = buffer.substring(0, buffer.length - 1);
            }
            break;
        case '+':
        case '-':
        case '×':
        case '÷': 
            handleMath(symbol);
            break;
    }
}

function handleMath(symbol) {
    if (buffer === '0') {
        //do nothing
        return;
    }

    const intBuffer = parseInt(buffer); //number 

    if (runningTotal === 0) {
        runningTotal = intBuffer;
    } else {
        flushOperation(intBuffer); //actual math
    }

    previousOperator = symbol;

    buffer = '0';
}

function flushOperation(intBuffer) { //do the math
    if (previousOperator === '+') {
        runningTotal += intBuffer;
    } else if (previousOperator === '-') {
        runningTotal -= intBuffer;
    } else if (previousOperator === '×') {
        runningTotal *= intBuffer;
    } else if (previousOperator === '÷') {
        runningTotal /= intBuffer;
    }
}

function handleNumber(numberString){
    if (buffer === "0") {
        buffer = numberString;
    } else {
        buffer += numberString;
    }  
} //concactenating strings to display the number


function init () {
    document.querySelector('.calc-buttons')//grabbing the section calc-buttons
    .addEventListener('click', function(event) {
        //whenever the click event happens run this function, the browser acts with the object - event//
        buttonClick(event.target.innerText);//we have this function already
    })
}

init (); //need to call the function!