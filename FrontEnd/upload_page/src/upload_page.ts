// Define the interface for a note
interface Note {
  year: string;
  subject: string;
  topic: string;
  fileName: string;
  fileData: string | ArrayBuffer | null; // This field is not used in the backend API approach but retained for reference.
  dateAdded: Date;
  username: string;
}

document.addEventListener('DOMContentLoaded', () => {
  const uploadForm = document.getElementById('upload_form') as HTMLFormElement;
  const yearSelect = document.getElementById('year') as HTMLSelectElement;
  const subjectInput = document.getElementById('subject_input') as HTMLSelectElement;

  // Function to update subjects based on the selected year
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

    subjectInput.disabled = subjects.length === 0;
  }

  yearSelect.addEventListener('change', updateSubjects);

  // Handle form submission with API integration
  uploadForm.addEventListener('submit', async function (event: Event) {
    event.preventDefault();

    const year = yearSelect.value;
    const subject = subjectInput.value;
    const topic = (document.getElementById('topic_input') as HTMLInputElement).value;
    const fileUpload = (document.getElementById('file_upload') as HTMLInputElement).files?.[0];

    if (!year || !subject || !topic || !fileUpload) {
      alert('Please fill all fields and select a file.');
      return;
    }

    const username = 'Leander Galido'; // Example username

    const formData = new FormData();
    formData.append('year', year);
    formData.append('subject', subject);
    formData.append('topic', topic);
    formData.append('file', fileUpload);
    formData.append('username', username);

    try {
      const response = await fetch('http://localhost:5000/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload file');
      }

      const note = await response.json();
      console.log('Uploaded note:', note);

      alert('File uploaded successfully!');
      uploadForm.reset();
      subjectInput.disabled = true; // Disable until the user selects a year

      // Redirect to the home page or refresh
      window.location.href = 'home_page.html';
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Error uploading file.');
    }
  });

  // Initialize subject dropdown if a year is preselected
  if (yearSelect.value) {
    updateSubjects();
  }
});
