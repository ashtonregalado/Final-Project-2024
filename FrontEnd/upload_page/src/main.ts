document.addEventListener('DOMContentLoaded', () => {
  const uploadForm = document.getElementById('upload_form') as HTMLFormElement;

  uploadForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const subjectInput = document.getElementById('subject_input') as HTMLInputElement;
    const topicInput = document.getElementById('topic_input') as HTMLInputElement;
    const fileInput = document.getElementById('file_upload') as HTMLInputElement;

    const subject = subjectInput.value;
    const topic = topicInput.value;
    const file = fileInput.files ? fileInput.files[0] : null;

    if (file) {
      // Create an entry for local storage
      const note = {
        subject,
        topic,
        fileName: file.name,
        dateAdded: new Date().toISOString(),
      };

      // Store the note in local storage
      const notes = JSON.parse(localStorage.getItem('notes') || '[]');
      notes.push(note);
      localStorage.setItem('notes', JSON.stringify(notes));

      // Optionally, reset the form
      uploadForm.reset();
      alert('Note uploaded successfully!');
    } else {
      console.error('No file selected.');
    }
  });
});
