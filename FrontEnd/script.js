const gallery = document.querySelector('.gallery');
gallery.innerHTML = '';

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

function displayPortfolio (data) {
    for (let i of data) {
        createFigure (i.imageUrl, i.title, )
    }
}

function fetchPortfolio () { 
    fetch('http://localhost:5678/api/works')
        .then(response => (response.json()))
        .then(data => displayPortfolio(data))
}

fetchPortfolio ()