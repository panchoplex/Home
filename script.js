// script.js

document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const fetchMoviesBtn = document.getElementById('fetch-movies-btn');
    const moviesGrid = document.getElementById('movies-grid');
    const omdbApiKeyInput = document.getElementById('omdb-api-key');
    const movieTitlesTextarea = document.getElementById('movie-titles');

    // Theme toggle functionality
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-theme');
        themeToggle.textContent = body.classList.contains('dark-theme') ? '🌞' : '🌙';
    });

    fetchMoviesBtn.addEventListener('click', fetchMovies);

    async function fetchMovies() {
        const apiKey = omdbApiKeyInput.value.trim();
        const titles = movieTitlesTextarea.value.trim().split('\n');

        if (!apiKey) {
            alert('Please enter your OMDb API key.');
            return;
        }

        if (titles.length === 0 || titles[0] === '') {
            alert('Please enter at least one movie title.');
            return;
        }

        moviesGrid.innerHTML = '';

        for (const title of titles) {
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