import express, { Application, Request, Response } from 'express';
const app: Application = express();
import cors from 'cors';
import { StudentRouters } from './app/modules/student/student.route';

// parsers
app.use(express.json());
app.use(cors());
// application routes
app.use('/api/v1/students', StudentRouters);

const getAController = (req: Request, res: Response) => {
  const a = 10;
  res.send(a);
};
app.get('/', getAController);

export default app;
