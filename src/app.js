import {createModal, isValid} from './utils'
import {Question} from './question'
import {getAuthFormHTML, authWithEmailAndPassword} from './auth'
import './style.css'

const form = document.getElementById('form')
const modalBtn = document.getElementById('modal-btn')
const input = form.querySelector('#question-input')
const submitBtn = form.querySelector('#submit')

window.addEventListener('load', Question.renderList)
form.addEventListener('submit', submitFormHandler)
modalBtn.addEventListener('click', openModal)
input.addEventListener('input', () => {
    submitBtn.disabled = !isValid(input.value)
})

function submitFormHandler(e) {
    e.preventDefault()

    if (isValid(input.value)) {
        const question = {
            text: input.value.trim(),
            date: new Date().toJSON(),
        }

        submitBtn.disabled = true

        Question.create(question).then(() => {
            input.value = ''
            input.className = ''
            submitBtn.disabled = false
        })
    }
}

function openModal() {
    createModal('Authorization', getAuthFormHTML())
    document
    .getElementById('auth-form')
    .addEventListener('submit', getAuthFormHandler, {
        once: true,
    })
    
}
function getAuthFormHandler(event) {
    event.preventDefault()
    const btn = event.target.querySelector('button')
    const email = event.target.querySelector('#email').value
    const password = event.target.querySelector('#password').value

    btn.disabled = true

    authWithEmailAndPassword(email, password)
    .then(Question.fetch)
    .then(renderModalAfterAuth)
    .then(() => btn.disabled = false)
}

function renderModalAfterAuth(content) {
    if(typeof(content) === 'string') {
        createModal('Alert!!!', content)
    } else {
        createModal('Questions', Question.listToHTML(content))
    }


}