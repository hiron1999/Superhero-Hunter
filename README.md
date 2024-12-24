# Superhero Hunter

This project is a web application that allows users to search for superheroes, view detailed information, and manage their favorite superheroes list. The app uses the Marvel API to fetch superhero data.

## Features

### Home Page
- **Fetch and Display Superheroes**: Fetch and display a list of superheroes (characters) on the home page.
- **Search Bar**: A search bar that filters out characters based on the search query. For example, typing "bat" in the search box should show "batman".
  - [API example](https://gateway.marvel.com:443/v1/public/characters?ts=<time-stamp>&apikey=<public-key>&hash=<md5(ts+privateKey+publicKey)>)
- **Favorite Button**: Each search result of the superhero should have a favorite button. Clicking this button adds the superhero to the "My favorite superheroes" list.
- **Superhero Detail Page**: Clicking on any particular search result (superhero) opens a new page with more information about that superhero.

### Superhero Page
- **Detailed Information**: Shows a lot of information about the superhero, such as their name, photo, bio, and other information provided by the API (comics, events, series, stories, etc).

### My Favorite Superheroes Page
- **Display Favorite Superheroes**: Displays a list of all the favorite superheroes added by the user.
- **Persistent List**: The list is persistent and retains the same number of superheroes before and after closing the browser.
- **Remove from Favorites**: Each superhero in the list has a remove button. Clicking this button removes the superhero from the list without alerting the user.

## Images

### Home Page
![Home Page](images/home-page.png)

### Superhero Page
![Superhero Page](images/superhero-page.png)

### My Favorite Superheroes Page
![My Favorite Superheroes Page](images/favorite-superheroes-page.png)

## Website

You can view the live project at [Superhero Hunter Website](https://your-website-url.com)

## Usage

1. **Clone the Repository**
   ```sh
   git clone https://github.com/your-username/superhero-hunter.git
   cd superhero-hunter
