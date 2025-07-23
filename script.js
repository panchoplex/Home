// script.js

document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const dropArea = document.getElementById('drop-area');
    const fileInput = document.getElementById('file-input');
    const sitesGrid = document.getElementById('sites-grid');

    // Theme toggle functionality
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-theme');
        themeToggle.textContent = body.classList.contains('dark-theme') ? '🌞' : '🌙';
    });

    // Drag and drop functionality
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, preventDefaults, false);
        document.body.addEventListener(eventName, preventDefaults, false);
    });

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    dropArea.addEventListener('drop', handleDrop, false);
    fileInput.addEventListener('change', handleFiles, false);

    function handleDrop(e) {
        const dt = e.dataTransfer;
        const files = dt.files;
        handleFiles(files);
    }

    function handleFiles(files) {
        [...files].forEach(uploadFile);
    }

    function uploadFile(file) {
        // Simulate file upload and site generation
        const siteName = file.name.split('.')[0];
        const siteCard = document.createElement('div');
        siteCard.classList.add('site-card');
        siteCard.innerHTML = `
            <img src="sites/${siteName}/preview.jpg" alt="${siteName} Preview">
            <h3>${siteName}</h3>
            <a href="sites/${siteName}/index.html" target="_blank">Visit Site</a>
        `;
        sitesGrid.appendChild(siteCard);
    }
});