interface Note {
  year: string;
  subject: string;
  topic: string;
  username: string;
}

document.addEventListener('DOMContentLoaded', () => {

  // Predefined array of notes
  const notes: Note[] = [
    { year: 'first', subject: 'Calculus 1', topic: 'Derivatives', username: 'Ashton' },
    { year: 'second', subject: 'Data Structures', topic: 'Trees', username: 'Joshua' },
    { year: 'third', subject: 'Machine Learning', topic: 'Neural Networks', username: 'Leander' },
    { year: 'fourth', subject: 'Capstone Project', topic: 'AI App', username: 'Ryan' },
  ];

  const notesContainer = document.querySelector<HTMLDivElement>('.notes_container');
  const yearSelect = document.getElementById('year') as HTMLSelectElement | null;
  const subjectInput = document.getElementById('subject_input') as HTMLSelectElement | null;
  const searchInput = document.querySelector<HTMLInputElement>('.search_input');

  if (!notesContainer || !yearSelect || !subjectInput || !searchInput) {
    console.error('Required DOM elements not found.');
    return;
  }

  // Render filtered notes
  function renderNotes(filteredNotes: Note[]): void {
    notesContainer.innerHTML = '';

    if (filteredNotes.length === 0) {
      const noFilesMessage = document.createElement('p');
      noFilesMessage.textContent = 'No files available for the selected filters.';
      noFilesMessage.style.textAlign = 'center';
      noFilesMessage.style.marginTop = '20px';
      notesContainer.appendChild(noFilesMessage);
      return;
    }

    filteredNotes.forEach((note) => {
      const fileLink = document.createElement('a');
      fileLink.href = 'file_preview_page.html';
      fileLink.classList.add('notes_lists');

      const fileDiv = document.createElement('div');
      fileDiv.classList.add('notes_cont_box');

      const subject = note.subject || 'N/A';
      const topic = note.topic || 'N/A';
      const username = note.username || 'Anonymous';

      fileDiv.innerHTML = `
        <button class="favorites" title="Mark as Favorite"></button>
        <button class="download_button" title="Download"></button>
        <img src="src/assets/pdf.svg" alt="file type" class="file_type_img">
        <p class="subject_cont"><strong>Subject:</strong> ${subject}</p>
        <p class="topic_cont"><strong>Topic:</strong> ${topic}</p>
        <img src="src/assets/profile_notes.svg" alt="profile" class="profile">
        <p class="user_name_cont"><strong class="username">${username}</strong></p>
      `;

      fileLink.appendChild(fileDiv);
      notesContainer.appendChild(fileLink);
    });
  }

  // Filter notes based on user input
  function filterNotes(): void {
    const selectedYear = yearSelect.value;
    const selectedSubject = subjectInput.value;
    const searchQuery = searchInput.value.toLowerCase();

    const filteredNotes = notes.filter((note) => {
      const matchesYear = selectedYear ? note.year === selectedYear : true;
      const matchesSubject = selectedSubject ? note.subject === selectedSubject : true;
      const matchesSearch = searchQuery
        ? note.subject.toLowerCase().includes(searchQuery) ||
          note.topic.toLowerCase().includes(searchQuery)
        : true;

      return matchesYear && matchesSubject && matchesSearch;
    });

    renderNotes(filteredNotes);
  }

  // Update subjects dropdown based on selected year
  function updateSubjects(): void {
    const year = yearSelect.value;
    let subjects: string[] = [];

    if (year === 'first') {
      subjects = ['Calculus 1', 'Chemistry', 'Software Development 1', 'Physics', 'General Math'];
    } else if (year === 'second') {
      subjects = ['Algorithms', 'Data Structures', 'Linear Algebra', 'Operating Systems'];
    } else if (year === 'third') {
      subjects = ['Machine Learning', 'Computer Networks', 'Software Engineering'];
    } else if (year === 'fourth') {
      subjects = ['Capstone Project', 'Advanced Programming', 'Distributed Systems'];
    }

    subjectInput.innerHTML = '<option value="">Select Subject</option>';
    subjects.forEach((subject) => {
      const option = document.createElement('option');
      option.value = subject;
      option.textContent = subject;
      subjectInput.appendChild(option);
    });

    subjectInput.disabled = false;
    filterNotes();
  }

  // Event listeners
  yearSelect.addEventListener('change', () => {
    updateSubjects();
    filterNotes();
  });

  subjectInput.addEventListener('change', filterNotes);
  searchInput.addEventListener('input', filterNotes);

  // Initial render
  renderNotes(notes);
});
