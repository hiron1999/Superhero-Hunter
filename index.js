import { ts, apiKey, hash } from './secure.js';
// console.log(hash);

const superheroList = document.getElementById('superhero-list');

function loadingSuperheroes(load_msg = 'Loading Superheroes...') {
    superheroList.innerHTML = `<h2 style="color: gray">${load_msg}</h2>`;
}

//get superheroes initial caracters
function getSuperheroes() {
    loadingSuperheroes("Get ready for superheros.....");    

    fetch(`https://gateway.marvel.com:443/v1/public/characters?ts=${ts}&limit=20&offset=${Math.random()*100}&apikey=${apiKey}&hash=${hash}`)
        .then(response => response.json())
        .then(data => {
            const superheroes = data.data.results;
            console.log(superheroes);
            displaySuperheroes(superheroes);
        });
}

//search superheroes using name
function searchSuperheroes() {
    loadingSuperheroes("Searching for Superheroes.....");
    const query = document.getElementById('search-input').value;
    fetch(`https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=${query}&ts=${ts}&apikey=${apiKey}&hash=${hash}`)
        .then(response => response.json())
        .then(data => {
            const superheroes = data.data.results;
            console.log(superheroes);
            displaySuperheroes(superheroes);
        });
}


//Load Initial superheroes
document.addEventListener('DOMContentLoaded', getSuperheroes);

//search superheroes
const searchButton = document.getElementById('search-btn');

searchButton.onclick = searchSuperheroes;

//displaySuperheroes in card
function displaySuperheroes(superheroes) {
    
    superheroList.innerHTML = '';
    if (superheroes.length === 0) {
        superheroList.innerHTML = `<h2 style="color: gray">No superheroes found</h2>`;
    }
    superheroes.forEach(superhero => {
        const superheroItem = document.createElement('div');
        superheroItem.className = 'superhero-item';
        const card = document.createElement('div');
        card.className = 'card';

        const img = document.createElement('img');
        img.src = `${superhero.thumbnail.path}.${superhero.thumbnail.extension}`;
        img.alt = superhero.name;
        img.className = 'card-img-top';
        card.appendChild(img);

        const cardBody = document.createElement('div');
        cardBody.className = 'card-body';

        const cardTitle = document.createElement('h5');
        cardTitle.className = 'card-title';
        cardTitle.textContent = superhero.name;
        cardBody.appendChild(cardTitle);

        const favoriteButton = document.createElement('button');
        favoriteButton.id = 'fab-btn';
        favoriteButton.className = 'favorite-button btn btn-danger';
        favoriteButton.onclick = (event) => addToFavorites(event, superhero.id);

        favoriteButton.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"/>
            </svg>
        `;

        cardBody.appendChild(favoriteButton);
        card.appendChild(cardBody);

        superheroItem.appendChild(card);
        superheroItem.onclick = () => openSuperheroPage(superhero.id);
        superheroList.appendChild(superheroItem);
        // mark favourite superheroes
        if (isFavorite(superhero.id)) {
            favoriteButton.style.backgroundColor = '#c82333';
        }

    });
}

function isFavorite(superheroId) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    if (favorites.includes(superheroId)) {
        return true;
    } else {
        return false;
    }
}

function addToFavorites(event,superheroId) {
    event.stopPropagation();
    event.target.style.backgroundColor = '#c82333';

    // console.log(superheroId,event);
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    console.log(favorites);
    if (!favorites.includes(superheroId)) {
        favorites.push(superheroId);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        alert('Superhero added to favorites!');
    } else {
        alert('Superhero is already in favorites!');
    }
}

 function openSuperheroPage(superheroId) {
    window.location.href = `superhero.html?id=${superheroId}`;
    // searchSuperheroesById(superheroId);
}


 
