import express, { Request, Response } from 'express';
import cors from "cors";

const app = express();
const PORT = 5173;

app.use(cors())
app.use(express.json());

app.get('/api', (req: Request, res: Response) => {
  res.json({ message: 'Hello from the backend!' });
});

app.get('/sid', (req: Request, res:Response) => {
  res.status(200).send("testing lang")
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
