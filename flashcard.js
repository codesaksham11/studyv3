document.addEventListener('DOMContentLoaded', function() {
    const flashcardDiv = document.getElementById('flashcard');
    const frontDiv = document.querySelector('.front');
    const backDiv = document.querySelector('.back');
    const backButton = document.getElementById('back-button');
    const flipButton = document.getElementById('flip-button');
    const nextButton = document.getElementById('next-button');
    const resetButton = document.getElementById('reset-button'); // Get Reset Button

    let flashcards = [];
    let currentCardIndex = 0;
    let isFlipped = false;

    const selectedChapters = JSON.parse(localStorage.getItem('selectedChapters')) || [];

    async function loadFlashcards() {
        if (selectedChapters.length === 0) {
            frontDiv.textContent = "No chapters selected!";
            backDiv.textContent = "No chapters selected!";
            return;
        }

        let loadedCardsCount = 0;

        for (const chapter of selectedChapters) {
            try {
                const module = await import(`./data/${chapter}.js`);
                if (module.default && Array.isArray(module.default) && module.default.length > 0) {
                    flashcards = flashcards.concat(module.default);
                    loadedCardsCount += module.default.length;
                } else {
                    console.warn(`No flashcards in data/${chapter}.js or invalid format.`);
                }
            } catch (error) {
                console.error(`Error loading data/${chapter}.js:`, error);
                console.warn(`Check if data/${chapter}.js exists and is correct.`);
            }
        }

        if (loadedCardsCount === 0) {
            frontDiv.textContent = "You are all set for today!";
            backDiv.textContent = "You are all set for today!";
        } else {
            displayFlashcard();
        }
    }

    function displayFlashcard() {
        if (flashcards.length === 0) {
            frontDiv.textContent = "No flashcards available.";
            backDiv.textContent = "No flashcards available.";
            return;
        }

        const card = flashcards[currentCardIndex];
        frontDiv.innerHTML = card.front;
        backDiv.innerHTML = card.back;
        isFlipped = false;
        flashcardDiv.classList.remove('flipped');
    }

    flipButton.addEventListener('click', function() {
        flashcardDiv.classList.toggle('flipped');
        isFlipped = !isFlipped;
    });

    nextButton.addEventListener('click', function() {
        currentCardIndex = (currentCardIndex + 1) % flashcards.length;
        displayFlashcard();
    });

    backButton.addEventListener('click', function() {
        window.location.href = 'index.html';
    });

    resetButton.addEventListener('click', function() { // Reset Button Functionality
        currentCardIndex = 0; // Go back to the first card
        displayFlashcard();   // Display the first card
    });

    loadFlashcards();
});
