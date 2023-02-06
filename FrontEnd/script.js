const gallery = document.querySelector('.gallery');

function removeAllGalleryChild () {
    gallery.innerHTML = '';
}

function createFigure (source, texte) {
    let figure = document.createElement('figure');
    gallery.appendChild(figure);

    let img = document.createElement('img')
    figure.appendChild(img)

    img.src = source

    let figcaption = document.createElement('figcaption')
    figure.appendChild(figcaption)

    figcaption.textContent = texte
} 


const boutonFiltreTous = document.querySelector(".btn-filtretous")

function displayPortfolio (data) {
    for (let i of data) {
        createFigure (i.imageUrl, i.title)
    }
}

function fetchPortfolio () { 
    fetch('http://localhost:5678/api/works')
        .then(response => (response.json()))
        .then(data => displayPortfolio(data))
}


const boutonFiltreObjet = document.querySelector(".btn-filtreObjets")

function displayFiltreObjet (data) {
    for (let i of data) {
        if(i.categoryId === 1) {    
             createFigure (i.imageUrl, i.title) 
        } else {
            innerHTML = "Some error message"
        }
    }
}

function fetchFiltreObjet () { 
    fetch('http://localhost:5678/api/works')
        .then(response => (response.json()))
        .then(data => displayFiltreObjet(data))
}


const boutonFiltreAppartements = document.querySelector(".btn-filtreappartements")

function displayFiltreAppartements (data) {
    for (let i of data) {
        if(i.categoryId === 2) {    
             createFigure (i.imageUrl, i.title) 
        } else {
            innerHTML = "Some error message"
        }
    }
}

function fetchFiltreAppartements () { 
    fetch('http://localhost:5678/api/works')
        .then(response => (response.json()))
        .then(data => displayFiltreAppartements(data))
}


const boutonFiltreHotelsRetaurants = document.querySelector(".btn-filtrehotelsretaurants")


function displayFiltreHotelsRetaurants (data) {
    for (let i of data) {
        if(i.categoryId === 3) {    
             createFigure (i.imageUrl, i.title) 
        } else {
            innerHTML = "Some error message"
        }
    }
}

function fetchFiltreHotelsRetaurants () { 
    fetch('http://localhost:5678/api/works')
        .then(response => (response.json()))
        .then(data => displayFiltreHotelsRetaurants(data))
}


function filtres () {
    boutonFiltreHotelsRetaurants.addEventListener("click", () => {
        removeAllGalleryChild();    
        fetchFiltreHotelsRetaurants()
    })

    boutonFiltreObjet.addEventListener("click", () => {
        removeAllGalleryChild();    
        fetchFiltreObjet()
    })

    boutonFiltreAppartements.addEventListener("click", () => {
        removeAllGalleryChild();    
        fetchFiltreAppartements()
    })

    boutonFiltreTous.addEventListener("click", () => {
        removeAllGalleryChild();    
        fetchPortfolio()
    })
}

filtres ()
fetchPortfolio()
