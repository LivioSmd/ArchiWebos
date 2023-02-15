const buttonConnexion = document.querySelector(".button")
const formConnexion = document.querySelector(".FormulaireConnexion")
const inputEmail = document.getElementById("mail")
const inputPassword = document.getElementById("pass")
const messageError = document.querySelector(".messageError")


formConnexion.addEventListener("submit", (event) => {
    event.preventDefault();

    let data = {
        email : inputEmail.value, 
        password : inputPassword.value
    }

   fetchPost('http://localhost:5678/api/users/login', data)
})


function fetchPost (url, data) {
    fetch(url, {
        method : "POST",
        headers : { "Content-Type": "application/json"},
        body : JSON.stringify(data)
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        //initie l'erreur au cas ou reponse.ok n'est pas exacte 
        throw new Error('Erreur dans l’identifiant ou le mot de passe');
    })
    .then(response => {
        //stockage du token pour l'accès sur les autres pages
        localStorage.setItem('token',response.token)

        //redirige l'utilisateur automatique quand reponse.ok est exact 
        location.href='http://127.0.0.1:5501/login-index.html'
    })
    //attrape l'erreur et message ecrit en rouge sur la page
    .catch(error => { 
        messageError.innerHTML = error.message
        messageError.style.color = "red"
    })
}


