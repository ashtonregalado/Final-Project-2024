interface Note {
    subject: string;
    topic: string;
    fileName: string;
    dateAdded: string;
}

document.addEventListener("DOMContentLoaded", () => {
    const notes: Note[] = JSON.parse(localStorage.getItem("notes") || "[]");
    const notesContainer = document.querySelector(".notes_cont") as HTMLDivElement;

    if (notes.length === 0) {
        const noNotesMessage = document.createElement("p");
        noNotesMessage.textContent = "No notes uploaded yet.";

        noNotesMessage.style.backgroundColor = "#fcc857"; 
        
        notesContainer.appendChild(noNotesMessage);
    } else {
        notes.forEach(note => {
            // Create a div for each note entry
            const noteDiv = document.createElement("div");
            noteDiv.classList.add("note_entry");

            // Create the file upload container
            const fileContainer = document.createElement("div");
            fileContainer.classList.add("file_container");

            const fileInput = document.createElement("input");
            fileInput.type = "image";
            fileInput.classList.add("file_cont");
            fileInput.src = `path/to/your/files/${note.fileName}`; // Display uploaded file as an image, you can also replace it with actual file input functionality.
            fileInput.alt = note.fileName;

            fileContainer.appendChild(fileInput);
            noteDiv.appendChild(fileContainer);

            // Create the notes info container
            const notesInfo = document.createElement("div");
            notesInfo.classList.add("notes_info");

            notesInfo.innerHTML = `
                <p class="subject_cont"><strong>Subject:</strong> ${note.subject}</p>
                <p class="topic_cont"><strong>Topic:</strong> ${note.topic}</p>
                <p class="date_cont"><strong>Date added:</strong> ${new Date(note.dateAdded).toLocaleString()}</p>
            `;

            // Append the file and info containers to the noteDiv
            noteDiv.appendChild(notesInfo);

            // Finally, append the entire noteDiv to the notes container
            notesContainer.appendChild(noteDiv);
        });
    }
});