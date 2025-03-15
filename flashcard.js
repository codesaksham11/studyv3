document.addEventListener('DOMContentLoaded', function() {
    const flashcardDiv = document.getElementById('flashcard');
    const frontDiv = document.querySelector('.front');
    const backDiv = document.querySelector('.back');
    const backButton = document.getElementById('back-button');
    const flipButton = document.getElementById('flip-button');
    const nextButton = document.getElementById('next-button');

    let flashcards = [];  // Array to hold our loaded flashcards
    let currentCardIndex = 0;
    let isFlipped = false;

    // Load selected chapters from localStorage
    const selectedChapters = JSON.parse(localStorage.getItem('selectedChapters')) || []; // Now it's a simple array

    // Function to load flashcards from selected chapters
    async function loadFlashcards() {
        if (selectedChapters.length === 0) {
            frontDiv.textContent = "No chapters selected!"; // Message if no chapters were selected
            backDiv.textContent = "No chapters selected!";
            return; // Exit early if no chapters
        }

        let loadedCardsCount = 0; // Track if any cards were loaded

        for (const chapter of selectedChapters) {
            try {
                // **VERY IMPORTANT LINE - MAKE SURE YOUR CODE LOOKS EXACTLY LIKE THIS:**
                const module = await import(`./data/${chapter}.js`);  // Flat file path - CORRECT!

                if (module.default && Array.isArray(module.default) && module.default.length > 0) {
                    flashcards = flashcards.concat(module.default);  // Add the chapter's flashcards to the main array
                    loadedCardsCount += module.default.length; // Increment loaded card count
                } else {
                    console.warn(`No flashcards found in data/${chapter}.js or invalid format.`);
                }
            } catch (error) {
                console.error(`Failed to load flashcards for data/${chapter}.js:`, error);
                console.warn(`Make sure data/${chapter}.js exists and is correctly formatted.`); // User-friendly warning
            }
        }

        if (loadedCardsCount === 0) {
            frontDiv.textContent = "You are all set for today!"; // "You are all set..." message if no cards loaded
            backDiv.textContent = "You are all set for today!";
        } else {
            displayFlashcard(); // Initial display only if flashcards were loaded
        }
    }

    function displayFlashcard() {
        if (flashcards.length === 0) {
            frontDiv.textContent = "No flashcards available."; // Fallback if flashcards array is somehow empty here
            backDiv.textContent = "No flashcards available.";
            return;
        }

        const card = flashcards[currentCardIndex];

        frontDiv.innerHTML = card.front; // Support HTML content (text, images)
        backDiv.innerHTML = card.back;
        isFlipped = false;
        flashcardDiv.classList.remove('flipped');  // Ensure card starts unflipped
    }

    flipButton.addEventListener('click', function() {
        flashcardDiv.classList.toggle('flipped');
        isFlipped = !isFlipped;
    });

    nextButton.addEventListener('click', function() {
        currentCardIndex = (currentCardIndex + 1) % flashcards.length;  // Cycle through cards
        displayFlashcard();
    });

    backButton.addEventListener('click', function() {
        window.location.href = 'index.html';
    });

    // Load flashcards when the page loads
    loadFlashcards();
});
