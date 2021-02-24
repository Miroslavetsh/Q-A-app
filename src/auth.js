export function getAuthFormHTML() {
    return `
        <form class="mui-form" id="auth-form">
            <div class="mui-textfield mui-textfield--float-label">
                <input required type="email" id="email">
                <label for="email">Your email</label>
            </div>
            <div class="mui-textfield mui-textfield--float-label">
                <input required type="password" id="password">
                <label for="password">Your password</label>
            </div>
            <button type="submit" class="mui-btn mui-btn--raised mui-btn--primary">Sign in</button>
        </form>
    `
}

export function authWithEmailAndPassword(email, password) {
    const apiKey = 'AIzaSyDKP6Z7kCHkTFoUBNo_98cogztTkOzXRh8'
    return fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`, {
        method: 'POST',
        body: JSON.stringify({
            email, password,
            returnSecureToken: true,
        }),
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(response => response.json())
    .then(data => data.idToken)
}