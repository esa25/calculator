class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) { 
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()
    }
    clear() { /* clear out diff variable */
        this.currentOperand = '' /* default as empty string */
        this.previousOperand = '' /* default as empty string */
        this.operation = undefined /* since there is no operation selected */
    }
    
    delete() { /* delete single number */
     this.currentOperand = this.currentOperand.toString().slice(0,-1) /* get all the numbers in the current operand to delete it */

    }

    appendNumber(number) { /* user clicks on number to add to screen */
     if (number === '.' && this.currentOperand.includes('.')) return /* so that user can only add decimal once */
     this.currentOperand = this.currentOperand.toString() + number.toString() /* convert the #s into string so that numbers to not get added */
    }

    chooseOperation(operation) { /* user clicks operation */
     if (this.currentOperand === '') return /* check-in if the current operand is empty, it will just return which will stop user from going further */
     if (this.previousOperand !== '') { /* if there is something in the previous operand, we want to compute whatever is in it by calling the compute function */
         this.compute()
     }
     this.operation = operation /* set the operation */
     this.previousOperand = this.currentOperand /* set previous operand equal to the current operand */
     this.currentOperand = '' /* clearing out the current operand so that user can insert a new value */
    }

    compute() { /* take our values inside the calculator and compute it to a single value */
     let computation 
     const prev = parseFloat(this.previousOperand) /* converting the selected value back to numbers */
     const current = parseFloat(this.currentOperand) /* converting the selected value back to numbers */
     if (isNaN(prev) || isNaN(current)) return /* to not let code run if either prev or current is empty */
     switch (this.operation) { /* using a switch statement to lay out all if statments of all operations that the user can use */
         case '+':
             computation = prev + current
             break
         case '-':
             computation = prev - current
             break
         case '*':
             computation = prev * current
             break  
         case '÷':
             computation = prev / current
             break  
         default:
             return  
     }
     this.currentOperand = computation /* set current operand to the result of computation */
     this.operation = undefined 
     this.previousOperand = ''
    }

    getDisplayNumber(number) {
     const stringNumber = number.toString() /* want to split that string on the decimal character inside of it */
     const integerDigits = parseFloat(stringNumber.split('.')[0]) /* convert string into an array where it will split on the decimal and the 1st # is before the decimal */
     const decimalDigits = stringNumber.split('.')[1] /* the 2nd # is after the decimal */
     let integerDisplay
     if (isNaN(integerDigits)) {
         integerDisplay = ''
     } else {
         integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0}) /* dont have any decimal place after this value */
     }
     if (decimalDigits != null) {
         return `${integerDisplay}.${decimalDigits}` /* displaying the integer and decimal digits together */
     } else {
         return integerDisplay
     }
    }
    updateDisplay() { /* update values inside of the output */
     this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand)
     if (this.operation != null) {
        this.previousOperandTextElement.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}` /* to display the previous operand and the operation */ 
     } else {
         this.previousOperandTextElement.innerText = '' /* to clear the previous operand once it is solved */
     }
    }
}

/* creating variables that matches data string from html file */
const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement) /* to call Calculator as a constructor need to have new */

numberButtons.forEach(button => { /* add an event listern to number buttons */
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText) /* append the number of what is inside the selected button */
        calculator.updateDisplay() /* to constantly updating the display every time a button is pressed */
    })
})

operationButtons.forEach(button => { /* add an event listern to operation buttons */
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText) /* call chooseOperation function */
        calculator.updateDisplay() /* to constantly updating the display every time a button is pressed */
    })
})

equalButton.addEventListener('click', button => {
    calculator.compute() /* call compute function */
    calculator.updateDisplay()
})

allClearButton.addEventListener('click', button => {
    calculator.clear() /* call clear function */
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
    calculator.delete() /* call clear function */
    calculator.updateDisplay()
})