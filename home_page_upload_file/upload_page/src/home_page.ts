// Define the interface for a note
interface Note {
    subject?: string;
    topic?: string;
    username?: string;
    fileData?: string;
    fileName?: string;
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    // Retrieve uploaded notes from localStorage using the correct key
    const notes: Note[] = JSON.parse(localStorage.getItem("notes") || "[]");
  
    // Get the container for displaying notes
    const notesContainer = document.querySelector<HTMLDivElement>(".notes_container");
  
    if (!notesContainer) {
      console.error("Notes container not found in the DOM.");
      return;
    }
  
    // Clear the container before populating
    notesContainer.innerHTML = "";
  
    // Check if no notes exist
    if (notes.length === 0) {
      const noFilesMessage = document.createElement("p");
      noFilesMessage.textContent = "No files uploaded yet.";
      noFilesMessage.style.textAlign = "center";
      noFilesMessage.style.marginTop = "20px";
      notesContainer.appendChild(noFilesMessage);
      return;
    }
  
    // Loop through each note and add it to the container
    notes.forEach((note, index) => {
      const fileDiv = document.createElement("div");
      fileDiv.classList.add("notes_cont_box");
  
      const subject = note.subject || "N/A";
      const topic = note.topic || "N/A";
      const username = note.username || "Anonymous";
  
      fileDiv.innerHTML = `
        <button class="favorites" title="Mark as Favorite">
            <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill="none">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="currentColor"></path>
            </svg>
        </button>
        <button class="download_button" title="Download" data-index="${index}">
            <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill="none">
                <path d="M5 20h14v-2H5v2zM11 4h2v12h3l-4 4-4-4h3V4z" fill="currentColor"></path>
            </svg>
        </button>
        <img src="src/pdf.svg" alt="file type" class="file_type_img">
        <p class="subject_cont"><strong>Subject:</strong> ${subject}</p>
        <p class="topic_cont"><strong>Topic:</strong> ${topic}</p>
        <img src="src/profile_notes.svg" alt="profile" class="profile">
        <p class="user_name_cont">
            <strong class="username">${username}</strong>
        </p>
      `;
  
      notesContainer.appendChild(fileDiv);
    });
  
    // Add event listeners for download buttons
    notesContainer.addEventListener("click", (event) => {
      const target = event.target as HTMLElement;
  
      if (target.closest(".download_button")) {
        const button = target.closest<HTMLButtonElement>(".download_button");
        const index = button?.getAttribute("data-index");
        const note = notes[Number(index)];
  
        if (note && note.fileData) {
          const link = document.createElement("a");
          link.href = note.fileData;
          link.download = note.fileName || "download";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        } else {
          alert("File data not available.");
        }
      }
    });
  
    console.log("Notes loaded successfully.");
  });
  