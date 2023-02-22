//afficher les photos sans les filtres sur la page éditeur
const photosPageEditeur = document.querySelector(".gallery")

function createFigurePageEditeur (source, texte) {
    //photosPageEditeur.innerHTML = '';
    // tout effacer avant de créer
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
        .then(response => response.json())
        .then(data => displayPortfolioPageEditeur(data))
}

fetchPortfolioPageEditeur()


//creation de la modale
let modal = null

const openModal = function (event) {
    event.preventDefault()
    const target = document.querySelector(event.target.getAttribute('href'))
    target.style.display = null
    target.removeAttribute('aria.hidden')
    target.setAttribute('aria-modal', 'true')
    modal = target
    modal.addEventListener('click', (event) => {
        closeModal(event)
        resetPageModale()
    })
    modal.querySelector('.js-close-modal').addEventListener('click', closeModal)
    modal.querySelector('.js-close-modal-page2').addEventListener('click', closeModal)
    modal.querySelector('.js-modal-stop').addEventListener('click', stopPropagation)
    modalePage2.style.display = "none";
    labelImageModalePage2.style.display = "flex";
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
    modal.querySelector('.js-close-modal-page2').removeEventListener('click', closeModal)
    modal.querySelector('.js-modal-stop').removeEventListener('click', stopPropagation)
    modal = null
    afficheImage.src = ""
}
 

// permettre de fermer la modale avec la touche Esc (ne marche pas sur mac)
window.addEventListener('keydown', function (event) {
    if (event.key === "Escape" || event.key === "esc") {
        closeModal(event)
    }
})


//afficher les photos dans la modale
const photosEditer = document.querySelector('.photos-editer')

const token = localStorage.getItem('token');

function createFigureModale (source, id) {
    // photosEditer.innerHTML = '';
    // tout effacer avant de créer
    let figure = document.createElement('figure');
    photosEditer.appendChild(figure);

    let img = document.createElement('img')
    figure.appendChild(img)

    img.src = source

    let figcaption = document.createElement('figcaption')
    figure.appendChild(figcaption)

    figcaption.textContent = 'éditer'
    
    //création  de l'îcone poubelle pour supprimer les images dans le modale
    const trash = document.createElement('i');
    figure.appendChild(trash);
    trash.className = 'fa-solid fa-trash-can';

    trash.addEventListener("click", (event) => {
        event.preventDefault();
        removeAllphotosPageEditeurChild()
        removeAllphotosPageEditeurModaleChild()
        fetchPortfolioPageEditeur();
        fetchPortfolioModale();
        fetchDelete("http://localhost:5678/api/works/" + id)
    })
} 

//click supprime
function fetchDelete (url) { 
    fetch(url, {
    method : "DELETE",
    headers : {
            "Content-Type": "application/json",
            "Authorization": "bearer " + token,
    }})
}

function displayPortfolioModale (data) {
    for (let i of data) {
        createFigureModale (i.imageUrl, i.id)
    }
}

function fetchPortfolioModale () { 
    fetch('http://localhost:5678/api/works')
        .then(response => response.json())
        .then(data => displayPortfolioModale(data))

}

fetchPortfolioModale()

function removeAllphotosPageEditeurModaleChild () {
    photosEditer.innerHTML = '';
}

//changer entre la page 1 et 2 de la modale 
const boutonAJouterPhotoModale = document.querySelector(".button-ajouter-photo")
const modalePage1 = document.querySelector(".modal-page1")
const modalePage2 =  document.querySelector(".modal-page2")
const flecheRetourModale1 = document.querySelector(".fleche-retour-modal2")

function pageModale2 () {
    modalePage1.style.display = "none";
    modalePage2.style.display = "";
}

function resetPageModale () {
    modalePage1.style.display = "block";
    modalePage2.style.display = "none";
}

boutonAJouterPhotoModale.addEventListener('click', pageModale2)
flecheRetourModale1.addEventListener('click', resetPageModale)

//chargement de l'image selectionnée dans la 2eme page de la modale 
const afficheImage = document.getElementById("imagepreview")
const labelImageModalePage2 = document.querySelector(".label-ajout-image")

function previewImage (e) {
    // e.files contient un objet FileList
    const [image] = e.files

    // "image" est un objet File
    if (image) {
         // On change l'URL de l'image
        afficheImage.src = URL.createObjectURL(image)
        labelImageModalePage2.style.display = "none";
    }
}

const formAjoutPhoto = document.querySelector(".form-ajout-photo")
const boutonValider = document.getElementById("bouton-valider")
const ImagePreview = document.querySelector(".input-img-modal-page2");
const titreFormulaire = document.getElementById("titre");
const categorieFormulaire = document.getElementById("categorie");


//vérification du formulaire
function verifForm () {
    if (values.image == "") {
        boutonValider.style.backgroundColor = '#A7A7A7';
        boutonValider.style.cursor = 'pointer';
        return;
    }
    
    if (values.title == "") {
        boutonValider.style.backgroundColor = '#A7A7A7';
        boutonValider.style.cursor = 'pointer';
        return;
    } 
    
    if (values.category == "") {
        boutonValider.style.backgroundColor = '#A7A7A7';
        boutonValider.style.cursor = 'pointer';
        return;
    }

    boutonValider.style.backgroundColor = '#1D6154';
    boutonValider.style.cursor = 'pointer';
}

let values = {
    'image' : '',
    'title' : '',
    'category' : ''
}

ImagePreview.addEventListener('change', (e) => {
    values.image = e.target.value;
    verifForm();
})

titreFormulaire.addEventListener('input', (e) => {
    values.title = e.target.value;
    verifForm();
})

categorieFormulaire.addEventListener('change', (e) => {
    values.category = e.target.value;
    verifForm();
})


//affiche message d'erreur en rouge pour le formulaire d'ajout sur la modale
formAjoutPhoto.addEventListener('submit', function (e) {
    e.preventDefault();

    if (ImagePreview.value == "") {
        const errorImage = document.querySelector(".error-photo");
        errorImage.innerHTML = "Importer une image"
        errorImage.style.color = "red"
    } else if (titreFormulaire.value == "") {
        const errorTitre = document.querySelector(".error-titre");
        errorTitre.innerHTML = "le champs titre est requis"
        errorTitre.style.color = "red"
    } else if (categorieFormulaire.value == "") {
        const errorCategorie = document.querySelector(".error-categorie");
        errorCategorie.innerHTML = "Choisir une catégorie"
        errorCategorie.style.color = "red"
    } else {
        //envoyer les nouvelles images à l'API
        const formData = new FormData(formAjoutPhoto);
    
        fetch('http://localhost:5678/api/works', {
            method: 'POST',
            headers : {
                "Authorization": "bearer " + token,
               },
            body: formData
        })
        .then(response => response.json());

        removeAllphotosPageEditeurChild();
        removeAllphotosPageEditeurModaleChild();
        fetchPortfolioPageEditeur();
        fetchPortfolioModale();
        closeModal(e);
    }

})

function removeAllphotosPageEditeurChild () {
    photosPageEditeur.innerHTML = '';
}

