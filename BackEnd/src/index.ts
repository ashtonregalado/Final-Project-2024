import express, { Request, Response } from 'express';
import sendEmail from './send-email';
import cors from 'cors';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get('/api', (req: Request, res: Response) => {
  res.json({ message: 'Hello from the backend!' });
});

app.post('/api/send-email', async (req: Request, res: Response) => {
  try {
    const { FirstName,LastName, email, message } = req.body;
    await sendEmail(FirstName,LastName, email, message);
    res.status(200).send('Email has been sent!');
  } catch (error) {
    console.log(error);
    res.status(500).send('something went wrong');
  }
});

app.get('/awit', (req: Request, res: Response) => {
  res.status(200).send('sample');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
