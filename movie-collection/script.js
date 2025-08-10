// script.js

document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const moviesGrid = document.getElementById('movies-grid');
    const apiKey = 'e74be34';
    const movieTitles = ["Pokemon Detective Pikachu", "Elio"];

    // Theme toggle functionality
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('light-theme');
        themeToggle.textContent = body.classList.contains('light-theme') ? '🌙' : '🌞';
    });

    fetchMovies();

    async function fetchMovies() {
        moviesGrid.innerHTML = '';

        for (const title of movieTitles) {
            if (title.trim() === '') continue;

            const response = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&t=${encodeURIComponent(title)}`);
            const data = await response.json();

            if (data.Response === 'True') {
                createMovieCard(data);
            } else {
                console.warn(`Could not find movie: ${title}`);
            }
        }
    }

    function createMovieCard(movie) {
        const movieCard = document.createElement('div');
        movieCard.classList.add('movie-card');
        movieCard.innerHTML = `
            <img src="${movie.Poster}" alt="${movie.Title} Poster">
            <h3>${movie.Title}</h3>
        `;

        movieCard.addEventListener('click', () => {
            showMovieDetails(movie);
        });

        moviesGrid.appendChild(movieCard);
    }

    function showMovieDetails(movie) {
        // Simple alert for now, can be replaced with a modal
        alert(`Title: ${movie.Title}\nYear: ${movie.Year}\nPlot: ${movie.Plot}`);
    }
});