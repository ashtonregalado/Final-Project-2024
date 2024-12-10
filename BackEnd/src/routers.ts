import express, { Request, Response } from 'express';
import pool from './db';
import multer from 'multer';
import path from 'path';
// import { User } from '../../FrontEnd/upload_page/src/account';
// import { Note } from '../../FrontEnd/upload_page/src/account';
// import { SavedNote } from '../../FrontEnd/upload_page/src/account';

// Set up Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Specify folder to save uploaded files
  },
  filename: (req, file, cb) => {
    // Ensure the file name is unique by appending a timestamp
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// Initialize Multer with the storage configuration
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    // File type validation (only allow images)
    const filetypes = /jpeg|jpg|png|gif|pdf|/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Invalid file type'));
    }
  },
});

const router = express.Router();

//Router for adding a new account to the database

router.post('/add-account', upload.single('ProfilePicture'), async (req: Request, res: Response) => {
  const { UserName, Email, Password } = req.body;
  const profilePicture = req.file ? req.file.path : null;

  try {
    const result = await pool.query('INSERT INTO users (username, email, user_password, profile_picture) VALUES ($1, $2, $3, $4) RETURNING *', [UserName, Email, Password, profilePicture]);
    const userID = result.rows[0].user_id;
    const userName = result.rows[0].user_name;
    res.status(201).json({
      message: 'Account created successfully',
      userId: userID, // Send back the userId to the frontend
      userName: userName,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

//Router to check if account already exist in the database
router.post('/validate-account', async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const result = await pool.query('SELECT user_password FROM users WHERE email = $1', [email]);
    if (result.rowCount === 0) {
      return res.json({ exists: false, validPassword: false });
    }
    const userId = result.rows[0].user_id;
    const userName = result.rows[0].user_name;
    const stored_password = result.rows[0].user_password;
    const isPasswordCorrect = stored_password == password;
    if (!isPasswordCorrect) {
      return res.json({
        exists: true,
        validPassword: !isPasswordCorrect,
      });
    }

    return res.json({
      exists: true,
      validPassword: true,
      userId,
      userName,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Database error' });
  }
});

//Router for fetching data about the logged in user

router.get('/fetch-userData', async (req: Request, res: Response) => {
  const { userID } = req.query;

  if (!userID) {
    return res.status(400).json({ message: 'User ID is required' });
  }

  try {
    // Query user data from the database
    const result = await pool.query('SELECT * FROM users WHERE user_id = $1', [userID]);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Send the user data as response
    const user = result.rows[0];
    return res.json({
      userId: user.user_id,
      userName: user.username,
      email: user.mail,
      profilePicture: user.profile_picture,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Database error' });
  }
});

//Router for fetching notes added by the user
router.get('/fetch-userNotes', async (req: Request, res: Response) => {
  const { userID } = req.query;

  if (!userID) {
    return res.status(400).json({ message: 'User ID is required' });
  }

  try {
    // Query user data from the database
    const result = await pool.query('SELECT * FROM note WHERE user_id = $1', [userID]);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Send the user data as response
    const note = result.rows[0];
    return res.json({
      userId: note.user_id,
      topic: note.topic,
      filepath: note.filepath,
      uploadDate: note.upload_date,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Database error' });
  }
});

router.use('/uploads', express.static(path.join(__dirname, 'uploads')));

router.post('/add-notes', upload.single('filepath'), async (req: Request, res: Response) => {
  const { topic, yearlevel_id, subject_id, upload_date } = req.body;
  const user_id = parseInt(req.body.user_id);
  // const yearlevel_id = parseInt(req.body.yearlevel_id);
  // const subject_id = parseInt(req.body.subject_id);
  const content = req.file ? path.normalize(req.file.path).replace(/\\/g, '/') : null; // Ensure that the file path is being received correctly
  console.log('Year Level ID:', yearlevel_id);
  console.log('Subject ID:', subject_id);

  console.log(req.body);
  console.log(req.file);
  if (!content) {
    return res.status(400).json({ message: 'File upload failed or file missing' });
  }

  try {
    const result = await pool.query('INSERT INTO note (topic, filepath, upload_date, user_id, yearlevel_id, subject_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING note_id', [
      topic,
      content,
      upload_date,
      user_id,
      yearlevel_id,
      subject_id,
    ]);

    const noteID = result.rows[0].note_id;
    const r = result.rows[0];
    console.log(noteID);
    console.log(r);
    res.status(201).json({ message: 'Note added successfully', noteID });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

//Route to get the yearlevel and subject id
router.post('/yearlevel_subject-id', async (req: Request, res: Response) => {
  console.log('Request body:', req.body);
  const { yearLevelName, subjectName } = req.body;

  if (!yearLevelName || !subjectName) {
    return res.status(400).json({ message: 'Year level name and subject name are required' });
  }

  try {
    // Query for year level ID
    const yearLevelResult = await pool.query('SELECT yearLevel_id FROM yearlevel WHERE yearlevel_name = $1', [yearLevelName]);

    if (yearLevelResult.rowCount === 0) {
      return res.status(404).json({ message: 'Year level not found' });
    }

    const yearLevelId = yearLevelResult.rows[0].yearlevel_id;
    console.log('Year level ID fetched:', yearLevelId);
    // Query for subject ID
    const subjectResult = await pool.query('SELECT subject_id FROM subject WHERE subject_name = $1', [subjectName]);

    if (subjectResult.rowCount === 0) {
      return res.status(404).json({ message: 'Subject not found' });
    }

    const subjectId = subjectResult.rows[0].subject_id;

    console.log('Subject ID fetched:', subjectId);

    // Return both IDs in a single response
    res.status(200).json({ yearLevelId, subjectId });
  } catch (error) {
    console.error('Error fetching IDs:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

//For Deleting Notes in the Database. Use the data-note-id attribute in html to use as parameter for deleting.
router.delete('/delete-notes', async (req: Request, res: Response) => {
  const { note_id } = req.query;
  try {
    const result = await pool.query('DELETE FROM note WHERE note_id = $1 RETURNING *', [note_id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Note not found' });
    }
    res.status(200).json({ message: `Note with ID ${note_id} deleted successfully.` });
  } catch (error) {
    console.error('Error deleting note:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

//Router to display the added notes of the user in the My Notes screen
router.get('/get-myNotes', async (req: Request, res: Response) => {
  const { user_id } = req.query;

  try {
    // SQL query with JOINs to fetch notes along with username and subject name
    const result = await pool.query(
      `SELECT note.*, subject.subject_name, users.username
       FROM note
       INNER JOIN subject ON note.subject_id = subject.subject_id
       INNER JOIN users ON note.user_id = users.user_id
       WHERE note.user_id = $1`, 
       [user_id]
    );
    
    // Respond with the notes, including subject_name and username
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error fetching notes:', error);
    res.status(500).json({ message: 'Failed to fetch notes' });
  }
});


//For Searching Notes
router.get('/search-notes', async (req: Request, res: Response) => {
  const { note } = req.query;

  try {
    const results = await pool.query('SELECT * FROM note WHERE topic = $1', [note]);
    res.json(results.rows);
  } catch (error) {
    console.error('Error fetching subject:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

//For Displaying All Notes in the Database to the Homescreen
router.get('/display-notes', async (req: Request, res: Response) => {
  try {
    const results = await pool.query('SELECT note.*, subject.subject_name, users.username FROM note INNER JOIN subject ON note.subject_id = subject.subject_id INNER JOIN users ON note.user_id = users.user_id;');
    res.json(results.rows);
  } catch (error) {
    console.error('Error fetching notes:', error);
    res.status(500).send('Failed to fetch notes.');
  }
});

//For Adding Notes to the SavedNotes
router.post('/save-note', async (req: Request, res: Response) => {
  const { note_id, user_id } = req.body;

  if (!note_id || !user_id) {
    return res.status(400).json({ message: 'note_id and user_id are required' });
  }

  try {
    const result = await pool.query('INSERT INTO saved_notes (note_id, user_id) VALUES ($1, $2) RETURNING *', [note_id, user_id]);
    res.status(201).json({
      message: 'Note saved successfully',
      savedNote: result.rows[0],
    });
  } catch (error) {
    console.error('Error saving note:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

//For Deleting Notes to the SvedNotes

router.delete('/unsave-note', async (req: Request, res: Response) => {
  const { saved_notes_id } = req.query;

  try {
    const result = await pool.query('DELETE FROM saved_notes WHERE saved_notes_id = $1 RETURNING *', [saved_notes_id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Saved Note not found' });
    }
    res.status(200).json({ message: `Saved Note with ID ${saved_notes_id} unsave successfully.` });
  } catch (error) {
    console.error('Error unsaving note:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

//For displaying savednotes by the user in the saved notes screen

router.get('/display-saved_notes', async (req: Request, res: Response) => {
  const { user_id } = req.query;

  if (!user_id) {
    return res.status(400).json({ message: 'User ID is required' });
  }

  try {

    const results = await pool.query(
      `SELECT 
        note.*, 
        saved_notes.saved_notes_id,
        users.username, 
        subject.subject_name
      FROM note
      INNER JOIN saved_notes ON note.note_id = saved_notes.note_id
      INNER JOIN users ON note.user_id = users.user_id
      INNER JOIN subject ON note.subject_id = subject.subject_id
      WHERE saved_notes.user_id = $1`,
      [user_id]
    );

    if (results.rowCount === 0) {
      return res.status(404).json({ message: 'Notes not found' });
    }

    res.json(results.rows);
  } catch (error) {
    console.error('Error getting notes:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
