document.addEventListener('DOMContentLoaded', function() {
    const startButton = document.getElementById('start-button');
    const subjects = document.querySelectorAll('.subject');

    // Add click event listeners to subject titles
    subjects.forEach(subject => {
        const title = subject.querySelector('.subject-title');
        const chapters = subject.querySelector('.chapters');

        title.addEventListener('click', () => {
            // Toggle the display of the chapters
            chapters.style.display = chapters.style.display === 'none' ? 'block' : 'none';
        });
    });

    startButton.addEventListener('click', function() {
        const selectedChapters = []; // Store as a simple array of strings

        const chapterCheckboxes = document.querySelectorAll('.chapters input[type="checkbox"]');
        chapterCheckboxes.forEach(checkbox => {
            if (checkbox.checked) {
                selectedChapters.push(checkbox.value); // Store only the chapter value
            }
        });

        localStorage.setItem('selectedChapters', JSON.stringify(selectedChapters));
        window.location.href = 'flashcard.html';
    });
});
