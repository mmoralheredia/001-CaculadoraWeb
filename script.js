let currentScreen = document.getElementById('screenOne')
let afterScreen = document.getElementById('screenTwo')
let buttons = document.querySelectorAll('.keyboard input')

currentScreen.value = '0'
afterScreen.value = '0'

let valueOne = ''
let valueTwo = ''
let currentOperation = ''
let afterOperation = ''
let secondValue = false
let result = ''
let decimalPoint = false

buttons.forEach(button => {
    button.addEventListener('click', () => {

        if (button.id === "number") {
            writingNumbers(button.value)

        } else if (button.id === "operation") {
            if (button.value === '=') {
                equalOperation()
            } else {
                mathOperation(button.value)
                afterOperation = currentOperation
            }

        } else if (button.id === "function") {
            clearOrDelete(button.value)

        } else if (button.id === 'decimalPoint') {
            if (currentScreen.value.includes('.') === false) {
                decimalPoint = true
            } else {
                null
            }
        }
    })
});


//Declaración de las funciones utilizadas
function writingNumbers(value) {
    if (decimalPoint === true) {
        currentScreen.value += '.' + value
        decimalPoint = false

    } else if (currentScreen.value === '0') {
        currentScreen.value = value

    } else {
        currentScreen.value += value
    }
}

function clearOrDelete(value) {
    if (value === 'AC') {
        currentScreen.value = '0'
        afterScreen.value = '0'
        valueOne = ''
        valueTwo = ''
        currentOperation = ''
        secondValue = false
        result = ''
        decimalPoint = false

    } else if (value === '<<') {
        if (currentScreen.value[currentScreen.value.length - 2] === '.') {
            currentScreen.value = currentScreen.value.slice(0, -2)

        } else if (decimalPoint === true) {
            currentScreen.value = currentScreen.value.slice(0, -1)
            decimalPoint = false

        } else if (currentScreen.value.length === 1) {
            currentScreen.value = '0'

        } else {
            currentScreen.value = currentScreen.value.slice(0, -1)
        }
    }
}

function mathOperation(value) {
    if (secondValue === true & currentScreen.value === '0') {
        afterScreen.value = afterScreen.value.slice(0, -1)
        currentOperation = value
        afterScreen.value = afterScreen.value + value

    } else if (secondValue === true & currentScreen.value != '0') {
        console.log('estoy aquí')
        equalOperation()

        //!operación de encadenar operaciones

    } else {
        valueOne = parseFloat(currentScreen.value)
        currentOperation = value
        afterScreen.value = currentScreen.value + value
        currentScreen.value = '0'
        secondValue = true
    }
}

function equalOperation() {
    afterScreen.value += currentScreen.value
    valueTwo = parseFloat(currentScreen.value)

    switch (currentOperation) {
        case '+':
            result = valueOne + valueTwo
            break;
        case '-':
            result = valueOne - valueTwo
            break;
        case 'x':
            result = valueOne * valueTwo
            break;
        case '/':
            result = valueOne / valueTwo
            break;
        default:
            break;
    }

    if (result == 'Infinity') {
        result = 'Error'
    } else {
        null
    }
    currentScreen.value = result
}