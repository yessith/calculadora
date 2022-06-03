const listRadioBtn = document.querySelectorAll('input[type=radio]')
const body = document.querySelector('#container')
const themes = ['theme-1', 'theme-2', 'theme-3']

listRadioBtn.forEach((item) => {
	item.addEventListener('click', (event) => {
		const theme = event.target.value
		item.setAttribute('checked', 'checked')
		body.classList.remove(...themes)
		body.classList.add(theme)
		localStorage.setItem('theme', theme)
	})
})

const getUserPreferences = () => {
	const light = window.matchMedia('(prefers-color-scheme: light)').matches
	const dark = window.matchMedia('(prefers-color-scheme: dark)').matches
	const [value] = body.classList

	if (light) {
		const radioInput = document.querySelector('#theme-2')
		radioInput.setAttribute('checked', 'checked')
		body.classList.remove(value)
		body.classList.add('theme-2')
	}

	if (dark) {
		const radioInput = document.querySelector('#theme-3')
		radioInput.setAttribute('checked', 'checked')
		body.classList.remove(value)
		body.classList.add('theme-3')
	}
}

const userThemePreference = localStorage.getItem('theme')

export const getTheme = () => {
	if (userThemePreference !== null) {
		const radioInput = document.querySelector(`#${userThemePreference}`)
		radioInput.setAttribute('checked', 'checked')
		body.classList.remove(...themes)
		body.classList.add(userThemePreference)
	} else {
		getUserPreferences()
	}
}
