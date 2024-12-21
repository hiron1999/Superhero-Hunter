import { ts, apiKey, hash } from './secure.js';

const heroCard = document.getElementById("details-sheet");
//search superheroes using Id
function searchSuperheroesById(id) {
    // loadingSuperheroes("Fetching Details...");
    fetch(`https://gateway.marvel.com:443/v1/public/characters/${id}?ts=${ts}&apikey=${apiKey}&hash=${hash}`)
        .then(response => response.json())
        .then(data => {
            const superhero = data.data.results[0];
            console.log(superhero);
            displaySuperheroeDetails(superhero);
        });
}

function loadingSuperheroes(load_msg = 'Fetching Details...') {
    heroCard.innerHTML = `<h2 style="color: gray; text-align: center">${load_msg}</h2>`;
}

// populate superhero details
function displaySuperheroeDetails(superhero) {
    const bannerImg = document.querySelector('.banner-img');
    const superheroName = document.querySelector('.superhero-name');
    const superheroDescription = document.querySelector('.superhero-description');
    const comicsSection = document.getElementById('comics');
    const eventsSection = document.getElementById('events');
    const seriesSection = document.getElementById('series');
    const storiesSection = document.getElementById('stories');

    bannerImg.src = `${superhero.thumbnail.path}.${superhero.thumbnail.extension}`;
    superheroName.textContent = superhero.name;
    superheroDescription.textContent = superhero.description || 'Description not available';

    // Populate comics
    comicsSection.innerHTML = '';
    if (superhero.comics.items.length > 0) {
        superhero.comics.items.forEach(comic => {
            const comicItem = document.createElement('a');
            comicItem.textContent = comic.name;
            comicItem.href = comic.resourceURI;
            comicsSection.appendChild(comicItem);
        });
    } else {
        comicsSection.innerHTML = 'Comics not found';
    }

    // Populate events
    eventsSection.innerHTML = '';
    if (superhero.events.items.length > 0) {
        superhero.events.items.forEach(event => {
            const eventItem = document.createElement('a');
            eventItem.textContent = event.name;
            eventItem.href = event.resourceURI;
            eventsSection.appendChild(eventItem);
        });
    } else {
        eventsSection.innerHTML = 'Events not found';
    }

    // Populate series
    seriesSection.innerHTML = '';
    if (superhero.series.items.length > 0) {
        superhero.series.items.forEach(serie => {
            const serieItem = document.createElement('a');
            serieItem.textContent = serie.name;
            serieItem.href = serie.resourceURI;
            seriesSection.appendChild(serieItem);
        });
    } else {
        seriesSection.innerHTML = 'Series not found';
    }

    // Populate stories
    storiesSection.innerHTML = '';
    if (superhero.stories.items.length > 0) {
        superhero.stories.items.forEach(story => {
            const storyItem = document.createElement('a');
            storyItem.textContent = story.name;
            storyItem.href = story.resourceURI;
            storiesSection.appendChild(storyItem);
        });
    } else {
        storiesSection.innerHTML = 'Stories not found';
    }
}

// Get superhero id from query string
function getSuperheroId() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get('id');
}

document.addEventListener('DOMContentLoaded', () => {
    //get id param
    const id = getSuperheroId();
    //search superhero by id
    searchSuperheroesById(id);
});