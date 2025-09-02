const gridContainer = document.getElementById('grid-container');
const resizeButton = document.getElementById('resize-button');

function createGrid(size) {
    // Clear the existing grid
    gridContainer.innerHTML = '';

    // Set CSS variables for grid dimensions
    gridContainer.style.setProperty('--grid-size', size);

    const squareSize = 800 / size; // Assuming container is 800px

    for (let i = 0; i < size * size; i++) {
        const square = document.createElement('div');
        square.classList.add('grid-square');
        square.style.width = `${squareSize}px`;
        square.style.height = `${squareSize}px`;
        
        // Add hover effect listener
        square.addEventListener('mouseover', handleMouseOver);
        
        gridContainer.appendChild(square);
    }
}

function handleMouseOver(e) {
    const square = e.target;
    
    // Feature 1: Random Color
    if (!square.style.backgroundColor) {
        const randomColor = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
        square.style.backgroundColor = randomColor;
        square.dataset.brightness = 1; // Set initial brightness
    }

    // Feature 2: Progressive Darkening
    let currentBrightness = parseFloat(square.dataset.brightness);
    if (currentBrightness > 0) {
        currentBrightness -= 0.1;
        square.style.filter = `brightness(${currentBrightness})`;
        square.dataset.brightness = currentBrightness;
    }
}

resizeButton.addEventListener('click', () => {
    let newSize = prompt("Enter number of squares per side (max 100):");
    newSize = parseInt(newSize);

    if (newSize > 0 && newSize <= 100) {
        createGrid(newSize);
    } else if (newSize !== null) { // Handle cases where user enters invalid text or cancels
        alert("Please enter a number between 1 and 100.");
    }
});

// Create the initial 16x16 grid on page load
window.addEventListener('load', () => createGrid(16));
