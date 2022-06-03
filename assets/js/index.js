import { getTheme } from './changeThemes.js'

const screen = document.querySelector('#screen') || null

const initialValue = {
	displayValue: 0,
	firstValue: null,
	haveAnOperand: false,
	operator: null,
}

const calculatorOperations = {
	x: (num1, num2) => num1 * num2,
	'/': (num1, num2) => num1 / num2,
	'+': (num1, num2) => num1 + num2,
	'-': (num1, num2) => num1 - num2,
}

/* CÁLCULO DE LA OPERACIÓN MATEMATICA */
const calculate = (firstOperand, secondOperand, operator) =>
	calculatorOperations[operator](firstOperand, secondOperand) || null

/* ACTUALIZAR DIGITOS EN LA PANTALLA */
const updateDisplay = () => {
	screen.textContent = initialValue['displayValue']
}

/* RESTABLECER LA CALCULADORA */
const resetCalculator = () => {
	initialValue.displayValue = 0
	initialValue.firstValue = null
	initialValue.haveAnOperand = false
	initialValue.operator = null
	updateDisplay()
}

/* OBTENER Y MOSTRAR NUMEROS EN LA PANTALLA */
const showDigit = (number) => {
	const { displayValue, haveAnOperand } = initialValue

	if (haveAnOperand) {
		initialValue.displayValue = number
		initialValue.haveAnOperand = false
	} else {
		initialValue.displayValue = displayValue === 0 ? number : `${displayValue}${number}`
	}

	updateDisplay()
}

/* AGREGAR PUNTO DECIMAL AL NUMERO EN LA PANTALLA */
const showDecimal = (dot) => {
	const { haveAnOperand } = initialValue

	if (haveAnOperand) {
		initialValue.displayValue = '0.'
		initialValue.haveAnOperand = false
		updateDisplay()
		return
	}

	if (initialValue.displayValue === 0) {
		initialValue.displayValue += dot
	}

	updateDisplay()
}

/* CAPTURAR EL OPERADOR MATEMATICO */
const getOperator = (nextOperator) => {
	const { displayValue, firstValue, operator } = initialValue
	const inputValue = parseFloat(displayValue)

	if (firstValue === null && !isNaN(inputValue)) {
		initialValue.firstValue = inputValue
	} else if (operator) {
		const result = calculate(firstValue, inputValue, operator)
		initialValue.firstValue = parseFloat(result.toFixed(4))
		initialValue.displayValue = parseFloat(result.toFixed(4))

		updateDisplay()
	}

	initialValue.operator = nextOperator
	initialValue.haveAnOperand = true

	console.table(initialValue)
}

/* CAPTURAR EL VALOR DE LOS BOTONES CUANDO SE HACE CLIKC EN ELLOS */
const getInputValue = () => {
	const keypad = document.querySelector('#keypad')
	keypad.addEventListener('click', (event) => {
		const { target } = event
		const { value } = target

		if (!target.classList.contains('btn')) return

		const isOperator = target.classList.contains('operator')
		const isControl = target.classList.contains('control')
		const isDecimal = target.classList.contains('decimal')

		if (isOperator) {
			getOperator(value)
			return
		}
		if (isControl) {
			resetCalculator()

			return
		}
		if (isDecimal) {
			showDecimal(value)
			return
		}

		showDigit(value)
	})
	updateDisplay()
}

getTheme()
getInputValue()
