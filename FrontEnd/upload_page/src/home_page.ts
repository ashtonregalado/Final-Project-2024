import fetchFromDB from './fetchFromDB';

// Define the interface for a note
interface Note {
  year?: string;
  subject?: string;
  topic?: string;
  username?: string;
  fileData?: string;
  fileName?: string;
}

document.addEventListener('DOMContentLoaded', async () => {
  // ari example backend usage. use as reference
  const halinSaDB = await fetchFromDB();

  // Retrieve uploaded notes from localStorage using the correct key
  const notes: Note[] = JSON.parse(localStorage.getItem('notes') || '[]');

  // Get the container for displaying notes
  const notesContainer = document.querySelector<HTMLDivElement>('.notes_container');
  const yearSelect = document.getElementById('year') as HTMLSelectElement;
  const subjectInput = document.getElementById('subject_input') as HTMLSelectElement;

  if (!notesContainer || !yearSelect || !subjectInput) {
    console.error('Required DOM elements not found.');
    return;
  }

  // Function to render filtered notes
  function renderNotes(filteredNotes: Note[]): void {
    notesContainer!.innerHTML = ''; // Clear current content

    if (filteredNotes.length === 0) {
      const noFilesMessage = document.createElement('p');
      noFilesMessage.textContent = 'No files available for the selected filters.';
      noFilesMessage.style.textAlign = 'center';
      noFilesMessage.style.marginTop = '20px';
      notesContainer!.appendChild(noFilesMessage);
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
      <div>
        <button class="download_button" title="Download">${halinSaDB}</button>
        <img src="src/pdf.svg" alt="file type" class="file_type_img">
        <p class="subject_cont"><strong>Subject:</strong> ${subject}</p>
        <p class="topic_cont"><strong>Topic:</strong> ${topic}</p>
        <img src="src/profile_notes.svg" alt="profile" class="profile">
        <p class="user_name_cont"><strong class="username">${username}</strong></p>
      </div>
      `;

      fileLink.appendChild(fileDiv);
      notesContainer!.appendChild(fileLink);
    });
  }

  // Function to filter notes based on year and subject
  function filterNotes(): void {
    const selectedYear = yearSelect.value;
    const selectedSubject = subjectInput.value;

    const filteredNotes = notes.filter((note) => {
      const matchesYear = selectedYear ? note.year === selectedYear : true;
      const matchesSubject = selectedSubject ? note.subject === selectedSubject : true;
      return matchesYear && matchesSubject;
    });

    renderNotes(filteredNotes);
  }

  // Function to populate subjects based on the selected year
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
    filterNotes(); // Filter notes whenever the subjects are updated
  }

  // Attach event listeners
  yearSelect.addEventListener('change', () => {
    updateSubjects();
    filterNotes();
  });

  subjectInput.addEventListener('change', filterNotes);

  // Initial render of all notes
  renderNotes(notes);
});
