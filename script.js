class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    }

    clear() {
    this.previousOperand = '';
    this.currentOperand = '';
    this.operation = undefined;
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0,-1);
    }

    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return;
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    chooseOperation(operation) {
        if (this.chooseOperation === '') return;
        if (this.previousOperand != '') {
            this.evaluate();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';

    }

    evaluate() {
        let answer;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if (isNaN(prev) || isNaN(current)) return;
        switch(this.operation) {
            case '+':
                answer = prev + current;
                break;
            case '-':
                answer = prev - current;
                break;
            case '*':
                answer = prev * current;
                break;
            case '/':
                answer = prev / current;
                break;
            default:
                return;
        }
        this.currentOperand = answer;
        this.operation = undefined;
        this.previousOperand = '';
    }

    updateDisplay() {
        this.currentOperandTextElement.textContent = this.currentOperand;
        if (this.operation != null) {
            this.previousOperandTextElement.textContent = `${this.previousOperand} ${this.operation}`;
        } else {
            this.previousOperandTextElement.textContent = '';
        }
    }

}

const numberButtons = document.querySelectorAll('[data-number]');
const allClearButton = document.querySelector('[data-all-clear]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const operationButtons = document.querySelectorAll('[data-operation]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);


allClearButton.addEventListener('click', () => {
    calculator.clear();
    calculator.updateDisplay();
});


deleteButton.addEventListener('click', () => {
    calculator.delete();
    calculator.updateDisplay();
});


numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.textContent);
        calculator.updateDisplay();
    });
});


operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.textContent);
        calculator.updateDisplay();
    });
});


equalsButton.addEventListener('click', () => {
    calculator.evaluate();
    calculator.updateDisplay();
});