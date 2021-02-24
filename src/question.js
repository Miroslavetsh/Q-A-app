export class Question {
    static create(question) {
        return fetch('https://jsproject-eddf3-default-rtdb.firebaseio.com/questions.json', {
                method: 'POST',
                body: JSON.stringify(question),
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then(response => response.json())
            .then(response => {
                question.id = response.name
                return question
            })
            .then(addToLocalStorage)
            .then(Question.renderList)
    }

    static fetch(token) {
        if (!token) {
            return Promise.resolve('<p class="error">You may have token for authorization</p>')
        }
        return fetch(`https://jsproject-eddf3-default-rtdb.firebaseio.com/questions.json?auth=${token}`)
            .then(response => response.json())
            .then(response => {
                if(response && response.error) {
                    return Promise.resolve(`<p class="error">${response.error}</p>`)
                }
                return response ? Object.keys(response).map(key => ({
                    ...response[key],
                    id: key
                })) : []
            })
    }

    static renderList() {
        const questions = getQuestionsFromLocalStorage()

        const html = questions.length 
        ? questions.map(toCard).join('') 
        : `<div class="mui--text-headline">You have no questions(</div>`

        const list = document.getElementById('list')

        list.innerHTML = html
    }

    static listToHTML(questions) {
        return questions.length
        ? `<ol>${questions.map(q => `<li>${q.text}</li>`).join('')}</ol>`
        : `<p>There is no questions</p>`
    }
}

function toCard(question) {
    return `
        <div class="mui--text-black-54">
            ${new Date(question.date).toLocaleDateString()}
            ${new Date(question.date).toLocaleTimeString()}
        </div>
        <div>${question.text}</div>
        <br />
    `
}

function addToLocalStorage(question) {
    const all = getQuestionsFromLocalStorage()
    all.push(question)
    localStorage.setItem('questions', JSON.stringify(all))
}

function getQuestionsFromLocalStorage() {
    return JSON.parse(localStorage.getItem('questions') || '[]')
}