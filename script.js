let currentScreen = document.getElementById('screenOne')
let afterScreen = document.getElementById('screenTwo')
let buttons = document.querySelectorAll('.keyboard input')


currentScreen.placeholder = '0'
currentScreen.value = '0'
afterScreen.value = ''

let result = ''
let decimalPoint = false
let decimalInCurrentValue = false
let equalButton = false
let lastBottomOperation = false


buttons.forEach(button => {
    button.addEventListener('click', () => {
        if (button.id === "number") {
            if (button.value === '0' & lastBottomOperation === true
                || button.value === '0' & afterScreen.value === '0'
                || button.value === '0' & afterScreen.value === ''
                || button.value === '0' & equalButton === true) {
                null

            } else if (equalButton === true) {
                afterScreen.value = ''
                currentScreen.value = '0'
                writingInScreen(button.value)
                equalButton = false

            } else {
                writingInScreen(button.value)
            }

        } else if (button.id === "operation") {

            if (button.value === '=') {
                equalOperation()
            } else if (equalButton === true) {
                afterScreen.value = currentScreen.value
                currentScreen.value = '0'
                mathOperation(button.value)
                equalButton = false
            } else {
                mathOperation(button.value)
            }

        } else if (button.id === "function") {
            clearOrDelete(button.value)

        } else if (button.id === 'decimalPoint') {
            if (decimalInCurrentValue === false & afterScreen.value === '') {
                afterScreen.value = '0.'
                currentScreen.value = ''
                result = eval(afterScreen.value)
                currentScreen.placeholder = result
                decimalInCurrentValue = true

            } else if (decimalInCurrentValue === false & lastBottomOperation === true) {
                afterScreen.value += '0.'
                currentScreen.value = ''
                result = eval(afterScreen.value)
                currentScreen.placeholder = result
                decimalInCurrentValue = true
                lastBottomOperation = false

            } else if (equalButton == true) {
                afterScreen.value = '0.'
                currentScreen.value = ''
                result = eval(afterScreen.value)
                currentScreen.placeholder = result
                decimalInCurrentValue = true
                equalButton = false

            } else if (decimalInCurrentValue === false) {
                decimalPoint = true
            } else {
                null
            }
        }

        if (currentScreen.placeholder === 'Infinity') {
            currentScreen.placeholder = "error"
        } else {
            null
        }
    })
});


//Declaración de las funciones utilizadas
function writingInScreen(value) {

    if (decimalPoint === true) {
        afterScreen.value += '.' + value
        decimalInCurrentValue = true
        decimalPoint = false

    } else if (afterScreen.value === '' & equalButton === true) {
        afterScreen.value = value

    } else {
        afterScreen.value += value
    }

    currentScreen.value = ''
    result = eval(afterScreen.value)
    currentScreen.placeholder = result
    lastBottomOperation = false
}



function clearOrDelete(value) {

    if (value === 'AC') {
        afterScreen.value = ''
        currentScreen.value = '0'
        currentScreen.placeholder = '0'

    } else if (value === '<<') {
        if (equalButton) {
            clearOrDelete('AC')
            equalButton = false

        } else if (afterScreen.value.length <= 1) {
            afterScreen.value = ''
            currentScreen.value = '0'

        } else if (afterScreen.value[afterScreen.value.length - 2] === '.'
            || afterScreen.value[afterScreen.value.length - 2] === '+'
            || afterScreen.value[afterScreen.value.length - 2] === '-'
            || afterScreen.value[afterScreen.value.length - 2] === '*'
            || afterScreen.value[afterScreen.value.length - 2] === '/') {
            afterScreen.value = afterScreen.value.slice(0, -2)
            result = eval(afterScreen.value)
            currentScreen.placeholder = result

        } else {
            afterScreen.value = afterScreen.value.slice(0, -1)
            result = eval(afterScreen.value)
            currentScreen.placeholder = result
        }
    }

    decimalInCurrentValue = false
    decimalPoint = false
    lastBottomOperation = false
    equalButton = false
}



function mathOperation(value) {

    if (afterScreen.value != '' & lastBottomOperation === false) {
        afterScreen.value += value

    } else if (lastBottomOperation === true & afterScreen.value != '') {
        afterScreen.value = afterScreen.value.slice(0, -1)
        afterScreen.value += value
    } else {
        null
    }
    decimalInCurrentValue = false
    lastBottomOperation = true
}



function equalOperation() {

    if (afterScreen.value[afterScreen.value.length - 1] === '.') {
        afterScreen.value = afterScreen.value.slice(0, -1)
        result = eval(afterScreen.value)
        currentScreen.value = result
        equalButton = true

    } else if (afterScreen.value != '' & lastBottomOperation === false) {
        result = eval(afterScreen.value)
        currentScreen.value = result
        equalButton = true
    } else {
        null
    }

}