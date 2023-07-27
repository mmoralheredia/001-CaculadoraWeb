let screen = document.getElementById('screen')
let buttons = document.querySelectorAll('.keyboard input')

screen.value = '0'

let valueOne = ''
let valueTwo = ''
let currentOperation = ''
let result = ''
let secondValue = false
let decimalPoint = false
let lastButtonIsOperation = false
let lastButtonIsEqual = false

//Eventos de botones de teclado
window.addEventListener("keydown", (event) => {
    if (event.key >= "0" && event.key <= "9" || event.key === "." || event.key === "+"
        || event.key === "-" || event.key === "*" || event.key === "/" || event.key === "Enter"
        || event.key === "Backspace" || event.key === "Escape") {
        buttons.forEach((button) => {
            if (button.value === event.key || event.key === "*" && button.value === "x" || event.key === "Enter" && button.value === "=" || event.key === "Backspace" && button.value === "<<" || event.key === "Escape" && button.value === "AC") {
                button.click()
            }
        })
    }
})


//Eventos de botones en pantalla
buttons.forEach(button => {
    button.addEventListener('click', () => {

        if (screen.value === "Error!") {
            clearOrDelete("AC")
        }

        if (button.id === "number") {
            writingNumbers(button.value)
        } else if (button.id === "operation") {
            if (button.value === '=') {
                equalOperation()
            } else {
                mathOperation(button.value)
            }
        } else if (button.id === "function") {
            clearOrDelete(button.value)
        } else if (button.id === 'decimalPoint') {
            if (lastButtonIsEqual || lastButtonIsOperation) {
                screen.value = '0.'
                lastButtonIsEqual = false
                lastButtonIsOperation = false
            } else if (screen.value.includes('.') === false) {
                decimalPoint = true
            }
        }
    })
})


//Declaración de las funciones utilizadas
function writingNumbers(value) {
    if (decimalPoint === true) {
        screen.value += '.' + value
        decimalPoint = false
    } else if (lastButtonIsOperation || lastButtonIsEqual) {
        screen.value = value
        lastButtonIsOperation = false
        lastButtonIsEqual = false
    } else if (screen.value === '0') {
        screen.value = value
    } else {
        screen.value += value
    }
}

function clearOrDelete(value) {
    if (value === 'AC') {
        screen.value = '0'
        valueOne = ''
        valueTwo = ''
        currentOperation = ''
        result = ''
        secondValue = false
        decimalPoint = false
        lastButtonIsEqual = false
        lastButtonIsOperation = false
    } else if (value === '<<') {
        if (screen.value[screen.value.length - 2] === '.') {
            screen.value = screen.value.slice(0, -2)
            lastButtonIsOperation = false
        } else if (screen.value.length === 1) {
            screen.value = "0"
        } else {
            screen.value = screen.value.slice(0, -1)
            lastButtonIsOperation = false
        }
    }
}

function mathOperation(value) {
    if (lastButtonIsOperation) {
        currentOperation = value
    } else if (secondValue & screen.value != '0') {
        equalOperation()
        valueOne = parseFloat(screen.value)
        currentOperation = value
        secondValue = true
    } else {
        valueOne = parseFloat(screen.value)
        currentOperation = value
        secondValue = true
    }
    lastButtonIsOperation = true
}

function equalOperation() {
    if (!lastButtonIsEqual) {
        valueTwo = parseFloat(screen.value)
    }

    if (currentOperation != '') {
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
            result = 'Error!'
        }
        screen.value = result
        valueOne = result
        lastButtonIsEqual = true
        lastButtonIsOperation = false
        secondValue = false
    }
}