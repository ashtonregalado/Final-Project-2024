//Get the notes in the database that have been added by the user. Uses userId as parameter.
document.addEventListener('DOMContentLoaded', () => {
  //   const userId = localStorage.getItem('userID');
  const currentPath = window.location.pathname;

  // Check if we are on the "My Notes" page
  if (currentPath.includes('home_page.html')) {
    fetchNotes();
  }
});

// Fetch Notes Function
const fetchNotes = async () => {
  try {
    const notesContainer = document.getElementById('publicNotes') as HTMLUListElement;

    if (!notesContainer) {
      console.error('Notes container not found');
      return;
    }

    const response = await fetch(`http://localhost:3000/api/display-notes`);

    const notes = await response.json();

    // Clear existing notes
    notesContainer.innerHTML = '';

    if (notes.length === 0) {
      notesContainer.innerHTML = '<li>No notes found.</li>';
      return;
    }

    notes.forEach((note: { note_id: number; topic: string; upload_date: string }) => {
      const noteElement = document.createElement('li');
      noteElement.className = 'note';
      noteElement.innerHTML = `
          <p><strong>Topic:</strong> ${note.topic}</p>
          <p><strong>Uploaded on:</strong> ${note.upload_date}</p>
          <button class="save-button" data-id="${note.note_id}">Save</button>
          
        `;
      const saveButton = noteElement.querySelector('.save-button') as HTMLButtonElement;
      if (saveButton) {
        saveButton.addEventListener('click', () => {
          const noteId = parseInt(saveButton.getAttribute('data-id') || '', 10);
          const userId = localStorage.getItem('userID');
          if (noteId) {
            saveNote(noteId, userId);
          }
        });
      }
      notesContainer.appendChild(noteElement);
    });
  } catch (error) {
    console.error('Error fetching notes:', error);
  }
};

//Function to save a note to the savednotes screen

const saveNote = async (note_id: number, user_id: number) => {
  if (!note_id || !user_id) return;

  try {
    const response = await fetch(`http://localhost:3000/api/save-note`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ note_id, user_id }),
    });
    if (response.ok) {
      alert('Note saved successfully!');
    } else {
      alert('Failed to save note.');
    }
  } catch (error) {
    console.error('Error saving note:', error);
    alert('An error occurred while saving the note.');
  }
};
