document.addEventListener('DOMContentLoaded', function() {
    const startButton = document.getElementById('start-button');

    startButton.addEventListener('click', function() {
        const selectedChapters = {};

        // Get all subjects
        const subjects = document.querySelectorAll('.subject');

        subjects.forEach(subject => {
            const subjectName = subject.id;  // "chemistry", "physics", etc.
            selectedChapters[subjectName] = [];  // Initialize the subject with an empty array

            const chapterCheckboxes = subject.querySelectorAll('input[type="checkbox"]');
            chapterCheckboxes.forEach(checkbox => {
                if (checkbox.checked) {
                    selectedChapters[subjectName].push(checkbox.value); // Add the chapter value
                }
            });

            if (selectedChapters[subjectName].length === 0) {
                delete selectedChapters[subjectName];
            }

        });

        // Save selected chapters to localStorage
        localStorage.setItem('selectedChapters', JSON.stringify(selectedChapters));

        // Redirect to the flashcard page
        window.location.href = 'flashcard.html';
    });
});
