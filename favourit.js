import { ts, apiKey, hash } from './secure.js';
// console.log(hash);
//search superheroes using Id
function searchSuperheroesById(id) {
    return fetch(`https://gateway.marvel.com:443/v1/public/characters/${id}?ts=${ts}&apikey=${apiKey}&hash=${hash}`)
        .then(response => response.json())
        .then(data => {
            const superhero = data.data.results[0];
            console.log(superhero);
            // displaySuperheroeDetails(superhero);
            return superhero;
        });
}



function removeFromFavorites(superheroId) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    favorites = favorites.filter(id => id !== superheroId);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    displaySuperheroes(favorites);
}


//displaySuperheroes in card
function displaySuperheroes(superheroes) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    const superheroList = document.getElementById('superhero-list');
    superheroList.innerHTML = '';
    favorites.forEach(id => {
        const superhero = searchSuperheroesById(id);
        console.log(superhero);
        
        const superheroItem = document.createElement('div');
        superheroItem.className = 'superhero-item';
        superheroItem.innerHTML = `
            <div class="card">
                    <img src="${superhero.thumbnail.path}.${superhero.thumbnail.extension}" alt="${superhero.name}" class="card-img-top">
                    <div class="card-body">
                    <h5 class="card-title">${superhero.name}</h5>
                    <button class="favorite-button btn btn-danger" onclick="removeFromFavorites('${superhero.id}')">remove from Favorites</button>
                    </div>
                </div>`;
        superheroItem.onclick = () => openSuperheroPage(superhero.id);
        superheroList.appendChild(superheroItem);
    });
}



 
