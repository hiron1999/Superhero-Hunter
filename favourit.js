import { ts, apiKey, hash } from './secure.js';

// console.log(hash);
//search superheroes using Id
const superheroList = document.getElementById('superhero-list');

 function searchSuperheroesById(id) {
    return fetch(`https://gateway.marvel.com:443/v1/public/characters/${id}?ts=${ts}&apikey=${apiKey}&hash=${hash}`)
        .then(response => response.json())
        .then(data => {
            const superhero = data.data.results[0];
            // console.log(superhero);
            // displaySuperheroeDetails(superhero);
            return superhero;
        });
}

function loadingSuperheroes(load_msg = 'Loading Superheroes...') {
    superheroList.innerHTML = `<h2 style="color: gray">${load_msg}</h2>`;
}

function removeFromFavorites(event,superheroId) {
    event.stopPropagation();
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    favorites = favorites.filter(id => id !== superheroId);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    alert('Superhero removed from favorites!');
    displayFavSuperheroes();
}


//displaySuperheroes in card
function displayFavSuperheroes() {

    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    loadingSuperheroes("Assembling your favorite superheroes...");
    superheroList.innerHTML = '';
    favorites.forEach(id => {
         searchSuperheroesById(id).then(superhero => {
        console.log(superhero);

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
        favoriteButton.onclick = (event) => removeFromFavorites(event, superhero.id);

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
         });
    });
}

function openSuperheroPage(superheroId) {
    window.location.href = `superhero.html?id=${superheroId}`;
    // searchSuperheroesById(superheroId);
}

document.addEventListener('DOMContentLoaded', () => {
    displayFavSuperheroes();
});

 
