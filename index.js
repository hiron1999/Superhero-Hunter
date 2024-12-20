const apiKey = '<public-key>';
const privateKey = '<private-key>';
const ts = new Date().getTime();
const hash = md5(ts + privateKey + apiKey);

function searchSuperheroes() {
    const query = document.getElementById('search-input').value;
    fetch(`https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=${query}&ts=${ts}&apikey=${apiKey}&hash=${hash}`)
        .then(response => response.json())
        .then(data => {
            const superheroes = data.data.results;
            displaySuperheroes(superheroes);
        });
}

function displaySuperheroes(superheroes) {
    const superheroList = document.getElementById('superhero-list');
    superheroList.innerHTML = '';
    superheroes.forEach(superhero => {
        const superheroItem = document.createElement('div');
        superheroItem.className = 'superhero-item';
        superheroItem.innerHTML = `
            <h3>${superhero.name}</h3>
            <img src="${superhero.thumbnail.path}.${superhero.thumbnail.extension}" alt="${superhero.name}" width="100">
            <button class="favorite-button" onclick="addToFavorites('${superhero.id}')">Add to Favorites</button>
        `;
        superheroItem.onclick = () => openSuperheroPage(superhero.id);
        superheroList.appendChild(superheroItem);
    });
}

function addToFavorites(superheroId) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
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
}

function md5(string) {
    // Implement MD5 hashing function or use a library
}