//afficher les photos sans les filtres sur la page éditeur
const photosPageEditeur = document.querySelector(".gallery")


function createFigurePageEditeur (source, texte) {
    let figure = document.createElement('figure');
    photosPageEditeur.appendChild(figure);

    let img = document.createElement('img')
    figure.appendChild(img)

    img.src = source

    let figcaption = document.createElement('figcaption')
    figure.appendChild(figcaption)

    figcaption.textContent = texte
} 

function displayPortfolioPageEditeur (data) {
    for (let i of data) {
        createFigurePageEditeur (i.imageUrl, i.title)
    }
}

function fetchPortfolioPageEditeur () { 
    fetch('http://localhost:5678/api/works')
        .then(response => (response.json()))
        .then(data => displayPortfolioPageEditeur(data))
}

fetchPortfolioPageEditeur()


//creation de la modale
let modal = null

const  openModal = function (event) {
    event.preventDefault()
    const target = document.querySelector(event.target.getAttribute('href'))
    target.style.display = null
    target.removeAttribute('aria.hidden')
    target.setAttribute('aria-modal', 'true')
    modal = target
    modal.addEventListener('click', closeModal)
    modal.querySelector('.js-close-modal').addEventListener('click', closeModal)
    modal.querySelector('.js-modal-stop').addEventListener('click', stopPropagation)

}

document.querySelectorAll(".js-modal").forEach(a => {
    a.addEventListener('click', openModal)
})

const stopPropagation = function (event) {
    event.stopPropagation()
}

const closeModal = function (event) {
    if (modal === null) return
    event.preventDefault()
    modal.style.display = "none"
    modal.setAttribute('aria.hidden', 'true')
    modal.removeAttribute('aria-modal')
    modal.removeEventListener('click', closeModal)
    modal.querySelector('.js-close-modal').removeEventListener('click', closeModal)
    modal.querySelector('.js-modal-stop').removeEventListener('click', stopPropagation)
    modal = null
}
 

// permettre de fermer la modale avec la touche Esc (ne marche pas sur mac)
window.addEventListener('keydown', function (event) {
    if (event.key === "Escape" || event.key === "esc") {
        closeModal(event)
    }
})


//afficher les photos dans la modale
const photosEditer = document.querySelector('.photos-editer')


function createFigureModale (source, texte) {
    let figure = document.createElement('figure');
    photosEditer.appendChild(figure);

    let img = document.createElement('img')
    figure.appendChild(img)

    img.src = source

    let figcaption = document.createElement('figcaption')
    figure.appendChild(figcaption)

    figcaption.textContent = 'éditer'
} 

function displayPortfolioModale (data) {
    for (let i of data) {
        createFigureModale (i.imageUrl, i.title)
    }
}

function fetchPortfolioModale () { 
    fetch('http://localhost:5678/api/works')
        .then(response => (response.json()))
        .then(data => displayPortfolioModale(data))
}

fetchPortfolioModale()
