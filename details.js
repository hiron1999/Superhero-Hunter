import { ts, apiKey, hash } from './secure.js';
//search superheroes using Id
function searchSuperheroesById(id) {
    fetch(`https://gateway.marvel.com:443/v1/public/characters/${id}?ts=${ts}&apikey=${apiKey}&hash=${hash}`)
        .then(response => response.json())
        .then(data => {
            const superhero = data.data.results[0];
            console.log(superhero);
            displaySuperheroeDetails(superhero);
        });
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
    superhero.comics.items.forEach(comic => {
        const comicItem = document.createElement('a');
        comicItem.textContent = comic.name;
        comicItem.href = comic.resourceURI;
        comicsSection.appendChild(comicItem);
    });

    // Populate events
    eventsSection.innerHTML = '';
    superhero.events.items.forEach(event => {
        const eventItem = document.createElement('p');
        eventItem.textContent = event.name;
        eventsSection.appendChild(eventItem);
    });

    // Populate series
    seriesSection.innerHTML = '';
    superhero.series.items.forEach(serie => {

        const serieItem = document.createElement('a');
        serieItem.textContent = serie.name;
        serieItem.href = serie.resourceURI;
        seriesSection.appendChild(serieItem);
    });

    // Populate stories
    storiesSection.innerHTML = '';
    superhero.stories.items.forEach(story => {
        const storyItem = document.createElement('a');
        storyItem.textContent = story.name;
        storyItem.href = story.resourceURI;
        storiesSection.appendChild(storyItem);
    });
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