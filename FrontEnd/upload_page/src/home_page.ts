// Define the interface for a note
interface Note {
  subject?: string;
  topic?: string;
  username?: string;
  fileData?: string;
  fileName?: string;
}

document.addEventListener('DOMContentLoaded', () => {
  // Retrieve uploaded notes from localStorage using the correct key
  const notes: Note[] = JSON.parse(localStorage.getItem('notes') || '[]');

  // Get the container for displaying notes
  const notesContainer = document.querySelector<HTMLDivElement>('.notes_container');

  if (!notesContainer) {
    console.error('Notes container not found in the DOM.');
    return;
  }

  // Ensure the container is used correctly
  notesContainer.innerHTML = ''; // Using notesContainer here to clear the content

  // Check if no notes exist
  if (notes.length === 0) {
    const noFilesMessage = document.createElement('p');
    noFilesMessage.textContent = 'No files uploaded yet.';
    noFilesMessage.style.textAlign = 'center';
    noFilesMessage.style.marginTop = '20px';
    notesContainer.appendChild(noFilesMessage);
    return;
  }

  // Loop through each note and add it to the container
  notes.forEach((note, index) => {
    const fileDiv = document.createElement('div');
    fileDiv.classList.add('notes_cont_box');

    const subject = note.subject || 'N/A';
    const topic = note.topic || 'N/A';
    const username = note.username || 'Anonymous';

    fileDiv.innerHTML = `
      <button class="favorites" title="Mark as Favorite">
        <!-- SVG omitted for brevity -->
      </button>
      <button class="download_button" title="Download" data-index="${index}">
        <!-- SVG omitted for brevity -->
      </button>
      <img src="src/pdf.svg" alt="file type" class="file_type_img">
      <p class="subject_cont"><strong>Subject:</strong> ${subject}</p>
      <p class="topic_cont"><strong>Topic:</strong> ${topic}</p>
      <img src="src/profile_notes.svg" alt="profile" class="profile">
      <p class="user_name_cont"><strong class="username">${username}</strong></p>
    `;

    notesContainer.appendChild(fileDiv);  // Using notesContainer to append the fileDiv
  });

  notesContainer.addEventListener('click', (event) => {
    const target = event.target as HTMLElement;

    const button = target.closest<HTMLButtonElement>('.download_button');
    if (!button) return;

    const index = button.getAttribute('data-index');
    const note = notes[Number(index)];

    if (note?.fileData) {
      const link = document.createElement('a');
      link.href = note.fileData;
      link.download = note.fileName || 'download';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      alert('File data not available.');
    }
  });

  console.log('Notes loaded successfully.');
});
